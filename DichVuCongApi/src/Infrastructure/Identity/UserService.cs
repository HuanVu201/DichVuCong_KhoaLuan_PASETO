using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Finbuckle.MultiTenant;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.FileStorage;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Specification;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Identity;
using TD.DichVuCongApi.Infrastructure.Auth;
using TD.DichVuCongApi.Infrastructure.Persistence.Context;
using TD.DichVuCongApi.Shared.Authorization;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Threading;
using TD.DichVuCongApi.Infrastructure.Persistence.Repository;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using Org.BouncyCastle.Ocsp;
using TD.DichVuCongApi.Application.Identity.Users.Password;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Identity.Users.UsersQueries;

namespace TD.DichVuCongApi.Infrastructure.Identity;

internal partial class UserService : IUserService
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IRepositoryWithEvents<LogDeletedUser> _repositoryLogDeletedUser;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly ApplicationDbContext _db;
    private readonly IStringLocalizer _t;
    private readonly IJobService _jobService;
    private readonly IMailService _mailService;
    private readonly SecuritySettings _securitySettings;
    private readonly IEmailTemplateService _templateService;
    private readonly IFileStorageService _fileStorage;
    private readonly IEventPublisher _events;
    private readonly ICacheService _cache;
    private readonly ICacheKeyService _cacheKeys;
    private readonly ITenantInfo _currentTenant;
    private readonly ICurrentUser _currentUser;
    private readonly ICommonServices _commonServices;
    public UserService(
        SignInManager<ApplicationUser> signInManager,
        UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager,
        IRepositoryWithEvents<LogDeletedUser> repositoryLogDeletedUser,
        ApplicationDbContext db,
        IStringLocalizer<UserService> localizer,
        IJobService jobService,
        IMailService mailService,
        IEmailTemplateService templateService,
        IFileStorageService fileStorage,
        IEventPublisher events,
        ICacheService cache,
        ICacheKeyService cacheKeys,
        ITenantInfo currentTenant,
        ICurrentUser currentUser,
        IOptions<SecuritySettings> securitySettings,
        IDapperRepository dapperRepository,
        ICommonServices commonServices)
    {
        _repositoryLogDeletedUser = repositoryLogDeletedUser;
        _signInManager = signInManager;
        _userManager = userManager;
        _roleManager = roleManager;
        _db = db;
        _t = localizer;
        _jobService = jobService;
        _mailService = mailService;
        _templateService = templateService;
        _fileStorage = fileStorage;
        _events = events;
        _cache = cache;
        _cacheKeys = cacheKeys;
        _currentTenant = currentTenant;
        _securitySettings = securitySettings.Value;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
        _commonServices = commonServices;
    }
    public async Task<PaginationResponse<NhomLanhDaoUserDto>> SearchNhomLanhDao(SearchNhomLanhDaoQuery req, CancellationToken cancellationToken)
    {
        string sql = @"
        select FullName, u.Id, r.Name, u.OfficeName, u.GroupName,u.OfficeCode, u.UserName, u.MaDinhDanhOfficeCode,u.PositionName  from 
          [Identity].users u inner join 
          [Identity].UserRoles ur on u.Id = ur.UserId inner join
          (select rc.ClaimValue, rc.RoleId from [Identity].RoleClaims rc) as rc on ur.RoleId = rc.RoleId
            inner join [Identity].Roles r on ur.RoleId = r.Id
          where u.TypeUser = 'CanBo' and
           (u.OfficeCode = @OfficeCode and rc.ClaimValue = 'Permissions.NhomLanhDaoDonVi.View') 
           or (u.GroupCode = @GroupCode and rc.ClaimValue = 'Permissions.NhomLanhDaoPhong.View')";
        var res = await _dapperRepository.PaginatedListSingleQueryAsync<NhomLanhDaoUserDto>(sql, req.PageSize, "Id", cancellationToken, param: req);
        return res;
    }
    public async Task<PaginationResponse<UserDetailsDto>> SearchAsync(UserListFilter filter, CancellationToken cancellationToken)
    {

        var spec = new UserListFilterSpec(filter);
        var specPag = new UserListPaginationFilterSpec(filter);

        var users = await _userManager.Users
            .WithSpecification(specPag)
            .ProjectToType<UserDetailsDto>()
            .ToListAsync(cancellationToken);
        int count = await _userManager.Users
            .WithSpecification(spec)
            .CountAsync(cancellationToken);

        return new PaginationResponse<UserDetailsDto>(users, count, filter.PageNumber, filter.PageSize);
    }

   

    public async Task<PaginationResponse<UserPortalDto>> SearchPortal(SearchUserPortalQuery req, CancellationToken cancellationToken)
    {
        string sql = $@"SELECT
                    Id
                  ,UserOrder
                  ,[UserName]
                  ,[FullName]
                  ,[GroupCode]
	              ,OfficeCode
	              ,ChucDanh
                  ,[OfficeName]
	              ,PhoneNumber
                  ,[PositionName]
                  ,Email
                  ,[TypeUser]
                  ,[HoVaTen]
                  ,[LaCanBoTiepNhan]
                  FROM [Identity].[Users] where [LaCanBoTiepNhan] = 1 and TypeUser = 'CanBo' and DeletedOn is null";
        var res = await _dapperRepository.PaginatedListSingleQueryAsync<UserPortalDto>(sql, req.PageSize, "UserOrder", cancellationToken, param: req);
        return res;
    }


    public async Task UpdateUserAsyncById(UpdateUserRequest request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users.Where(u => u.Id == request.Id).FirstOrDefaultAsync(cancellationToken);
        
        _ = user ?? throw new NotFoundException(_t["User Not Found."]);
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>("SELECT top 1 MaDinhDanh,GroupCode FROM Catalog.Groups WHERE GroupCode = @OfficeCode", new
        {
            OfficeCode = request.OfficeCode ?? user.OfficeCode
        });
        var groupInfo = await _dapperRepository.QueryFirstOrDefaultAsync<Group>("SELECT top 1 MaDinhDanh,GroupCode,GroupName FROM Catalog.Groups WHERE GroupCode = @GroupCode", new
        {
            GroupCode = request.GroupCode ?? user.GroupCode
        });
        user.FullName = request.FullName ?? user.FullName;
        user.TaiKhoanQLVB = request.TaiKhoanQLVB ?? user.TaiKhoanQLVB;
        user.SoDinhDanh = request.SoDinhDanh ?? user.SoDinhDanh;
        user.ChucDanh = request.ChucDanh ?? user.ChucDanh;
        user.LaCanBoTiepNhan = request.LaCanBoTiepNhan ?? user.LaCanBoTiepNhan;
        user.IsActive = request.ActivateUser;
        user.GroupCode = groupInfo.GroupCode ?? user.GroupCode;
        user.GroupName = groupInfo.GroupName ?? user.GroupName;
        user.Email = request.Email ?? user.Email;
        user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;
        user.OfficeCode = request.OfficeCode ?? user.OfficeCode;
        user.UserOrder = request.UserOrder ?? user.UserOrder;
        user.PositionCode = request.PositionCode ?? user.PositionCode;
        user.PositionName = request.PositionName ?? user.PositionName;
        user.OfficeName = request.OfficeName ?? user.OfficeName;
        user.MaDinhDanhOfficeCode = group?.MaDinhDanh ?? user.MaDinhDanhOfficeCode;
        user.LastModifiedBy = _currentUser.GetUserId();
        user.LastModifiedOn = DateTime.Now;
        user.ImageUrl = request.ImageUrl ?? string.Empty;
        await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id));
        await _userManager.UpdateAsync(user);
    }

    public async Task<bool> ExistsWithNameAsync(string name)
    {
        EnsureValidTenant();
        return await _userManager.FindByNameAsync(name) is not null;
    }

    public async Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null)
    {
        EnsureValidTenant();
        return await _userManager.FindByEmailAsync(email.Normalize()) is ApplicationUser user && user.Id != exceptId;
    }

    public async Task<bool> ExistsWithPhoneNumberAsync(string phoneNumber, string? exceptId = null)
    {
        EnsureValidTenant();
        return await _userManager.Users.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber) is ApplicationUser user && user.Id != exceptId;
    }

    private void EnsureValidTenant()
    {
        if (string.IsNullOrWhiteSpace(_currentTenant?.Id))
        {
            throw new UnauthorizedException(_t["Invalid Tenant."]);
        }
    }

    public async Task<List<UserDto>> GetListAsync(CancellationToken cancellationToken) =>
        (await _userManager.Users
                .AsNoTracking()
                .ToListAsync(cancellationToken))
            .Adapt<List<UserDto>>();

    public Task<int> GetCountAsync(CancellationToken cancellationToken) =>
        _userManager.Users.AsNoTracking().CountAsync(cancellationToken);

    public async Task<UserDetailsDto> GetCurrentUserAsync(CancellationToken cancellationToken)
    {
        var user = await _userManager.Users
            .AsNoTracking()
            .Where(u => u.Id == _currentUser.GetUserId().ToString())
            .FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        return user.Adapt<UserDetailsDto>();
    }

    public async Task<UserDetailsDto> GetAsync(string userId, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users
            .AsNoTracking()
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        return user.Adapt<UserDetailsDto>();
    }
    public async Task<UserDto> GetUserAsync(string userId, CancellationToken cancellationToken)
    {
        var user = await GetAsync(userId, cancellationToken);
        return user.Adapt<UserDto>();
    }
    public async Task<UserDetailsDto> GetByUsernameAsync(string username, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users
            .AsNoTracking()
            .Where(u => u.UserName == username)
            .FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        return user.Adapt<UserDetailsDto>();
    }

    public async Task ToggleStatusAsync(ToggleUserStatusRequest request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users.Where(u => u.Id == request.UserId).FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        bool isAdmin = await _userManager.IsInRoleAsync(user, TDRoles.QuanTriHeThong);
        if (isAdmin)
        {
            throw new ConflictException(_t["Administrators Profile's Status cannot be toggled"]);
        }

        user.IsActive = request.ActivateUser;

        await _userManager.UpdateAsync(user);

        await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id));
    }

    
}