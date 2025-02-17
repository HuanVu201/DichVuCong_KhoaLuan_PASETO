using System.Security.Claims;
using TD.CitizenAPI.Application.Identity.Users.Password;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Identity.Users.Password;
using TD.DichVuCongApi.Application.Identity.Users.UsersQueries;
using TD.DichVuCongApi.Domain.Identity;

namespace TD.DichVuCongApi.Application.Identity.Users;

public interface IUserService : ITransientService
{
    Task<PaginationResponse<UserDetailsDto>> SearchAsync(UserListFilter filter, CancellationToken cancellationToken);
    Task<PaginationResponse<UserPortalDto>> SearchPortal(SearchUserPortalQuery req, CancellationToken cancellationToken);

    Task<PaginationResponse<NhomLanhDaoUserDto>> SearchNhomLanhDao(SearchNhomLanhDaoQuery filter, CancellationToken cancellationToken);
    Task<bool> ExistsWithNameAsync(string name);
    Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null);
    Task<bool> ExistsWithPhoneNumberAsync(string phoneNumber, string? exceptId = null);
    Task<string?> IsSystemManager();

    Task<List<UserDto>> GetListAsync(CancellationToken cancellationToken);

    Task<int> GetCountAsync(CancellationToken cancellationToken);
    Task<UserDetailsDto> GetCurrentUserAsync(CancellationToken cancellationToken);

    Task<UserDetailsDto> GetAsync(string userId, CancellationToken cancellationToken);
    Task<UserDto> GetUserAsync(string userId, CancellationToken cancellationToken);

    Task<List<UserRoleDto>> GetRolesAsync(string userId, CancellationToken cancellationToken, bool? laQuyenQuanTriDonVi = false);
    Task<string> AssignRolesAsync(string userId, UserRolesRequest request, CancellationToken cancellationToken);

    Task<List<string>> GetPermissionsAsync(string userId, CancellationToken cancellationToken);
    Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken = default);
    Task InvalidatePermissionCacheAsync(string userId, CancellationToken cancellationToken);

    Task ToggleStatusAsync(ToggleUserStatusRequest request, CancellationToken cancellationToken);

    Task<string> GetOrCreateFromPrincipalAsync(ClaimsPrincipal principal);
    Task<string> CreateAsync(CreateUserRequest request, string origin);
    Task<string> CreateWithDefaultPasswordAsync(CreateUserWithDefaultPasswordRequest request, string origin);
    Task UpdateAsync(UpdateUserRequest request, string userId);

    Task<string> ConfirmEmailAsync(string userId, string code, string tenant, CancellationToken cancellationToken);
    Task<string> ConfirmPhoneNumberAsync(string userId, string code);

    Task<string> ForgotPasswordAsync(ForgotPasswordRequest request, string origin);
    Task<string> ResetPasswordAsync(ResetPasswordRequest request);
    Task ChangePasswordAsync(ChangePasswordRequest request, string userId);
    Task UpdateUserAsyncById(UpdateUserRequest request, CancellationToken cancellationToken);
    Task<bool> AdminChangePasswordAsync(AdminResetPasswordRequest request);
    Task<Result> AdminResetPasswordAsync(string request);
    Task<bool> ConfirmDinhDanh();
    Task<string> DeleteAsync(string id);

    Task<bool> UpdateEmailAndPhoneNumber(string email, string phoneNumber, string userName);
    Task<bool> UpdateEmailAndPhoneNumberPortal(UpdateEmailAndPhoneNumberPortalRequest request);
    Task<UserDetailsDto> GetByUsernameAsync(string userName, CancellationToken cancellationToken);
}