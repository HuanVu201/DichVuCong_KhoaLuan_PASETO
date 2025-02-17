using System.Security.Claims;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Common;
using TD.DichVuCongApi.Domain.Identity;
using TD.DichVuCongApi.Shared.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using TD.DichVuCongApi.Domain.Catalog;
using System.Data;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Domain.Constant;
using DocumentFormat.OpenXml.Vml;
using Group = TD.DichVuCongApi.Domain.Catalog.Group;
using TD.DichVuCongApi.Application.Common.Classes;
using Microsoft.IdentityModel.Tokens;

namespace TD.DichVuCongApi.Infrastructure.Identity;

internal partial class UserService
{
    private readonly IDapperRepository _dapperRepository;

    /// <summary>
    /// This is used when authenticating with AzureAd.
    /// The local user is retrieved using the objectidentifier claim present in the ClaimsPrincipal.
    /// If no such claim is found, an InternalServerException is thrown.
    /// If no user is found with that ObjectId, a new one is created and populated with the values from the ClaimsPrincipal.
    /// If a role claim is present in the principal, and the user is not yet in that roll, then the user is added to that role.
    /// </summary>
    public async Task<string> GetOrCreateFromPrincipalAsync(ClaimsPrincipal principal)
    {
        string? objectId = principal.GetObjectId();
        if (string.IsNullOrWhiteSpace(objectId))
        {
            throw new InternalServerException(_t["Invalid objectId"]);
        }

        var user = await _userManager.Users.Where(u => u.ObjectId == objectId).FirstOrDefaultAsync()
            ?? await CreateOrUpdateFromPrincipalAsync(principal);

        if (principal.FindFirstValue(ClaimTypes.Role) is string role &&
            await _roleManager.RoleExistsAsync(role) &&
            !await _userManager.IsInRoleAsync(user, role))
        {
            await _userManager.AddToRoleAsync(user, role);
        }

        return user.Id;
    }

    private async Task<ApplicationUser> CreateOrUpdateFromPrincipalAsync(ClaimsPrincipal principal)
    {
        string? email = principal.FindFirstValue(ClaimTypes.Upn);
        string? username = principal.GetDisplayName();
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(username))
        {
            throw new InternalServerException(string.Format(_t["Username or Email not valid."]));
        }

        var user = await _userManager.FindByNameAsync(username);
        if (user is not null && !string.IsNullOrWhiteSpace(user.ObjectId))
        {
            throw new InternalServerException(string.Format(_t["Username {0} đã tồn tại, không thể thêm mới."], username));
        }

        if (user is null)
        {
            user = await _userManager.FindByEmailAsync(email);
            if (user is not null && !string.IsNullOrWhiteSpace(user.ObjectId))
            {
                throw new InternalServerException(string.Format(_t["Email {0} đã tồn tại, không thể thêm mới."], email));
            }
        }

        IdentityResult? result;
        if (user is not null)
        {
            user.ObjectId = principal.GetObjectId();
            result = await _userManager.UpdateAsync(user);

            await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id));
        }
        else
        {
            user = new ApplicationUser
            {
                ObjectId = principal.GetObjectId(),
                Email = email,
                NormalizedEmail = email.ToUpperInvariant(),
                UserName = username,
                NormalizedUserName = username.ToUpperInvariant(),
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                IsActive = true
            };
            result = await _userManager.CreateAsync(user);

            await _events.PublishAsync(new ApplicationUserCreatedEvent(user.Id));
        }

        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Validation Errors Occurred."], result.GetErrors(_t));
        }

        return user;
    }

    public async Task<string> CreateAsync(CreateUserRequest request, string origin)
    {
        var res = await _dapperRepository.QueryFirstOrDefaultAsync<Group>("SELECT Top 1 MaDinhDanh FROM Catalog.Groups WHERE GroupCode = @OfficeCode", new
        {
            request.OfficeCode
        });
        var user = new ApplicationUser
        {
            LaCanBoTiepNhan = request.LaCanBoTiepNhan,
            TypeUser = request.TypeUser,
            Email = request.Email,
            FullName = request.FullName,
            ChucDanh = request.ChucDanh,
            UserName = request.UserName,
            HoVaTen = request.HoVaTen,
            PhoneNumber = request.PhoneNumber,
            IsActive = request.IsActive.HasValue ? request.IsActive.Value : false,
            GroupCode = request.GroupCode,
            OfficeCode = request.OfficeCode,
            UserOrder = request.UserOrder.HasValue ? request.UserOrder.Value : 9999,
            PositionCode = request.PositionCode,
            SoDinhDanh = request.SoDinhDanh,
            SoCMND = request.SoCMND,
            GioiTinh = request.GioiTinh,
            DanToc = request.DanToc,
            TonGiao = request.TonGiao,
            TinhTrangHonNhan = request.TinhTrangHonNhan,
            NhomMau = request.NhomMau,
            NamSinh = request.NamSinh,
            NgayThangNamSinh = request.NgayThangNamSinh,
            QuocTich = request.QuocTich,
            NoiDangKyKhaiSinh = request.NoiDangKyKhaiSinh,
            QueQuan = request.QueQuan,
            ThuongTru = request.ThuongTru,
            NoiOHienTai = request.NoiOHienTai,
            Cha = request.Cha,
            Me = request.Me,
            VoChong = request.VoChong,
            NguoiDaiDien = request.NguoiDaiDien,
            ChuHo = request.ChuHo,
            SoSoHoKhau = request.SoSoHoKhau,
            MaDinhDanhOfficeCode = res?.MaDinhDanh
        };
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Validation Errors Occurred."], result.GetErrors(_t));
        }

        //await _userManager.AddToRoleAsync(user, TDRoles.ChuyenVien);

        var messages = new List<string> { string.Format(_t["User {0} Registered."], user.UserName) };

        if (_securitySettings.RequireConfirmedAccount && !string.IsNullOrEmpty(user.Email))
        {
            // send verification email
            string emailVerificationUri = await GetEmailVerificationUriAsync(user, origin);
            RegisterUserEmailModel eMailModel = new RegisterUserEmailModel()
            {
                Email = user.Email,
                UserName = user.UserName,
                Url = emailVerificationUri
            };
            var mailRequest = new MailRequest(
                new List<string> { user.Email },
                _t["Confirm Registration"],
                _templateService.GenerateEmailTemplate("email-confirmation", eMailModel));
            _jobService.Enqueue(() => _mailService.SendAsync(mailRequest, CancellationToken.None));
            messages.Add(_t[$"Please check {user.Email} to verify your account!"]);
        }

        await _events.PublishAsync(new ApplicationUserCreatedEvent(user.Id));

        return string.Join(Environment.NewLine, messages);
    }
    public async Task<string> CreateWithDefaultPasswordAsync(CreateUserWithDefaultPasswordRequest request, string origin)
    {


        var user = new ApplicationUser
        {
            ChucDanh = request.ChucDanh,
            SoDinhDanh = request.SoDinhDanh,
            LaCanBoTiepNhan = request.LaCanBoTiepNhan,
            Email = request.Email,
            FullName = request.FullName,
            UserName = request.UserName,
            PhoneNumber = request.PhoneNumber,
            IsActive = request.IsActive.HasValue ? request.IsActive.Value : true,
            GroupCode = request.GroupCode,
            GroupName = request.GroupName,
            OfficeCode = request.OfficeCode,
            UserOrder = request.UserOrder.HasValue ? request.UserOrder.Value : 9999,
            PositionCode = request.PositionCode,
            PositionName = request.PositionName,
            OfficeName = request.OfficeName,
            TypeUser = request.TypeUser,
            MaDinhDanhOfficeCode = request.MaDinhDanhOfficeCode,
            CreatedBy = _currentUser.GetUserId(),


        };

        // get default password
        CommonSettings defaultPassword = _commonServices.Get();

        if (defaultPassword == null && string.IsNullOrEmpty(defaultPassword.DefaultPassword)) throw new NoNullAllowedException($"default password is not founded!");

        var result = await _userManager.CreateAsync(user, defaultPassword.DefaultPassword);
        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Validation Errors Occurred."], result.GetErrors(_t));
        }


        //await _userManager.AddToRoleAsync(user, TDRoles.ChuyenVien);

        var messages = new List<string> { string.Format(_t["User {0} Registered."], user.UserName) };

        await _events.PublishAsync(new ApplicationUserCreatedEvent(user.Id));

        return string.Join(Environment.NewLine, messages);
    }

    public async Task UpdateAsync(UpdateUserRequest request, string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>("SELECT top 1 MaDinhDanh FROM Catalog.Groups WHERE GroupCode = @OfficeCode", new
        {
            OfficeCode = request.OfficeCode ?? user.OfficeCode
        });
        string currentImage = user.ImageUrl ?? string.Empty;
        if (request.Image != null || request.DeleteCurrentImage)
        {
            user.ImageUrl = await _fileStorage.UploadAsync<ApplicationUser>(request.Image, FileType.Image);
            if (request.DeleteCurrentImage && !string.IsNullOrEmpty(currentImage))
            {
                string root = Directory.GetCurrentDirectory();
                _fileStorage.Remove(System.IO.Path.Combine(root, currentImage));
            }
        }
        user.LaCanBoTiepNhan = request.LaCanBoTiepNhan;
        user.PhoneNumber = request.PhoneNumber;
        user.FullName = request.FullName ?? user.FullName;
        user.HoVaTen = request.HoVaTen ?? user.HoVaTen;

        user.SoDinhDanh = request.SoDinhDanh ?? user.SoDinhDanh;
        user.SoCMND = request.SoCMND ?? user.SoCMND;
        user.GioiTinh = request.GioiTinh ?? user.GioiTinh;
        user.DanToc = request.DanToc ?? user.DanToc;
        user.TonGiao = request.TonGiao ?? user.TonGiao;
        user.TinhTrangHonNhan = request.TinhTrangHonNhan ?? user.TinhTrangHonNhan;
        user.NhomMau = request.NhomMau ?? user.NhomMau;
        user.NamSinh = request.NamSinh ?? user.NamSinh;
        user.NgayThangNamSinh = request.NgayThangNamSinh ?? user.NgayThangNamSinh;
        user.QuocTich = request.QuocTich ?? user.QuocTich;
        user.NoiDangKyKhaiSinh = request.NoiDangKyKhaiSinh ?? user.NoiDangKyKhaiSinh;
        user.QueQuan = request.QueQuan ?? user.QueQuan;
        user.ThuongTru = request.ThuongTru ?? user.ThuongTru;
        user.NoiOHienTai = request.NoiOHienTai ?? user.NoiOHienTai;
        user.Cha = request.Cha ?? user.Cha;
        user.Me = request.Me ?? user.Me;
        user.VoChong = request.VoChong ?? user.VoChong;
        user.NguoiDaiDien = request.NguoiDaiDien ?? user.NguoiDaiDien;
        user.ChuHo = request.ChuHo ?? user.ChuHo;
        user.SoSoHoKhau = request.SoSoHoKhau ?? user.SoSoHoKhau;
        user.MaDinhDanhOfficeCode = group?.MaDinhDanh ?? user.MaDinhDanhOfficeCode;
        user.LastModifiedBy = _currentUser.GetUserId();
        user.LastModifiedOn = DateTime.Now;
        await _userManager.UpdateAsync(user);
        string? phoneNumber = await _userManager.GetPhoneNumberAsync(user);
        if (request.PhoneNumber != phoneNumber)
        {
            await _userManager.SetPhoneNumberAsync(user, request.PhoneNumber);
        }

        var result = await _userManager.UpdateAsync(user);

        await _signInManager.RefreshSignInAsync(user);

        await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id));

        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Update profile failed"], result.GetErrors(_t));
        }
    }
    public async Task<bool> UpdateEmailAndPhoneNumber(string email, string phoneNumber, string userName)
    {
        try
        {
            List<string> updateClause = new List<string>();
            var isNullEmail = string.IsNullOrEmpty(email);
            var isNullPhoneNumber = string.IsNullOrEmpty(phoneNumber);
            if (string.IsNullOrEmpty(userName))
            {
                return false;
            }
            if (isNullEmail && isNullPhoneNumber)
            {
                return false;
            }
            if (!isNullEmail)
            {
                updateClause.Add("Email = CASE WHEN Email IS NULL OR Email = '' OR Email LIKE '%@dichvucong.gov.vn' THEN @email ELSE Email END");
                updateClause.Add("NormalizedEmail = CASE WHEN NormalizedEmail IS NULL OR NormalizedEmail = '' OR NormalizedEmail LIKE '%@DICHVUCONG.GOV.VN' THEN @normalizedEmail ELSE NormalizedEmail END");
            }
            if (!isNullPhoneNumber)
            {
                updateClause.Add("PhoneNumber = CASE WHEN PhoneNumber IS NULL OR PhoneNumber = '' THEN @phoneNumber ELSE PhoneNumber END");
            }
            var effectRows = await _dapperRepository.ExcuteAsync(@$"
        UPDATE {SchemaNames.Identity}.{TableNames.Users}
        SET 
            {string.Join(", ", updateClause)}
        WHERE 
            userName = @userName AND TypeUser = 'CongDan';",
            new
            {
                email = email ?? "",
                normalizedEmail = email?.ToUpper() ?? "",
                phoneNumber,
                userName,
            });
            return effectRows == 1;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public async Task<bool> UpdateEmailAndPhoneNumberPortal(UpdateEmailAndPhoneNumberPortalRequest request)
    {
        try
        {
            List<string> updateClause = new List<string>();
            var isNullEmail = string.IsNullOrEmpty(request.Email);
            var isNullPhoneNumber = string.IsNullOrEmpty(request.PhoneNumber);
            if (string.IsNullOrEmpty(request.UserName))
            {
                return false;
            }
            if (isNullEmail && isNullPhoneNumber)
            {
                return false;
            }
            if (!isNullEmail)
            {
                updateClause.Add("Email = CASE WHEN @email IS NOT NULL THEN @email ELSE Email END");
                updateClause.Add("NormalizedEmail = CASE WHEN @normalizedEmail IS NOT NULL THEN @normalizedEmail ELSE NormalizedEmail END");
            }
            if (!isNullPhoneNumber)
            {
                updateClause.Add("PhoneNumber = CASE WHEN @phoneNumber IS NOT NULL THEN @phoneNumber ELSE PhoneNumber END");
            }
            var effectRows = await _dapperRepository.ExcuteAsync(@$"
                UPDATE {SchemaNames.Identity}.{TableNames.Users}
                SET 
                    {string.Join(", ", updateClause)}
                WHERE 
                    userName = @userName AND TypeUser = 'CongDan';",
                    new
                    {
                        email = request.Email ?? "",
                        normalizedEmail = request.Email?.ToUpper() ?? "",
                        request.PhoneNumber,
                        request.UserName,
                    });
            return effectRows == 1;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public async Task<bool> ConfirmDinhDanh()
    {
        Result res = new Result();
        var userId = _currentUser.GetUserId().ToString();
        if (string.IsNullOrEmpty(userId))
        {
            return false;
        }

        var account = await _userManager.FindByIdAsync(userId);
        if (account == null)
            return false;
        string sqlUpdate = @"UPDATE [Identity].[Users]
                              SET CongDanDinhDanh = 1 
                              WHERE id = @Id";

        var effectRows = await _dapperRepository.ExcuteAsync(sqlUpdate, new { Id = userId ?? "" });
        return effectRows == 1;
    }
}
