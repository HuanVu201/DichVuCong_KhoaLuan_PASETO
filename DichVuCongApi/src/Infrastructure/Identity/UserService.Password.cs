using Microsoft.AspNetCore.WebUtilities;
using System.Data;
using TD.CitizenAPI.Application.Identity.Users.Password;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Identity.Users.Password;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Identity;

namespace TD.DichVuCongApi.Infrastructure.Identity;

internal partial class UserService
{
    public async Task<string> ForgotPasswordAsync(ForgotPasswordRequest request, string origin)
    {
        EnsureValidTenant();

        var user = await _userManager.FindByEmailAsync(request.Email.Normalize());
        if (user is null || !await _userManager.IsEmailConfirmedAsync(user))
        {
            // Don't reveal that the user does not exist or is not confirmed
            throw new InternalServerException(_t["An Error has occurred!"]);
        }

        // For more information on how to enable account confirmation and password reset please
        // visit https://go.microsoft.com/fwlink/?LinkID=532713
        string code = await _userManager.GeneratePasswordResetTokenAsync(user);
        const string route = "account/reset-password";
        var endpointUri = new Uri(string.Concat($"{origin}/", route));
        string passwordResetUrl = QueryHelpers.AddQueryString(endpointUri.ToString(), "Token", code);
        var mailRequest = new MailRequest(
            new List<string> { request.Email },
            _t["Reset Password"],
            _t[$"Your Password Reset Token is '{code}'. You can reset your password using the {endpointUri} Endpoint."]);
        _jobService.Enqueue(() => _mailService.SendAsync(mailRequest, CancellationToken.None));

        return _t["Password Reset Mail has been sent to your authorized Email."];
    }

    public async Task<string> ResetPasswordAsync(ResetPasswordRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email?.Normalize()!);

        // Don't reveal that the user does not exist
        _ = user ?? throw new InternalServerException(_t["An Error has occurred!"]);

        var result = await _userManager.ResetPasswordAsync(user, request.Token!, request.Password!);

        return result.Succeeded
            ? _t["Password Reset Successful!"]
            : throw new InternalServerException(_t["An Error has occurred!"]);
    }

    public async Task ChangePasswordAsync(ChangePasswordRequest model, string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        var result = await _userManager.ChangePasswordAsync(user, model.Password, model.NewPassword);

        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Change password failed"], result.GetErrors(_t));
        }
    }

    public async Task<bool> AdminChangePasswordAsync(AdminResetPasswordRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.UserName))
        {
            throw new InternalServerException("An Error has occurred!");
        }

        var account = await _userManager.FindByNameAsync(request.UserName);

        if (account == null) throw new InternalServerException($"No Accounts Registered.");
        string resetToken = await _userManager.GeneratePasswordResetTokenAsync(account);

        var result = await _userManager.ResetPasswordAsync(account, resetToken, request.Password ?? string.Empty);

        if (result.Succeeded)
        {
            return true;
        }
        else
        {
            throw new InternalServerException($"Error occured while reseting the password.");
        }
    }

    public async Task<Result> AdminResetPasswordAsync(string id)
    {
        Result res = new Result();
        if (string.IsNullOrEmpty(id))
        {
            throw new InternalServerException("An Error has occurred!");
        }

        var account = await _userManager.FindByIdAsync(id);

        if (account == null) throw new InternalServerException($"No Accounts Registered.");
        var defaultPassword = _commonServices.Get();
        if (defaultPassword == null && string.IsNullOrEmpty(defaultPassword.DefaultPassword)) throw new NoNullAllowedException($"default password is not founded!");
        string resetToken = await _userManager.GeneratePasswordResetTokenAsync(account);
        var result = await _userManager.ResetPasswordAsync(account, resetToken, defaultPassword.DefaultPassword ?? string.Empty);
        var unlock = await _userManager.SetLockoutEnabledAsync(account, true);
        if (result.Succeeded)
        {
            res.Succeeded = true;
            res.Message = defaultPassword.DefaultPassword ?? string.Empty;
            return res;
        }
        else
        {
            throw new InternalServerException($"Error occured while reseting the password.");
        }
    }

    public async Task<string> DeleteAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        _ = user ?? throw new NotFoundException(_t["User Not Found"]);

        await _userManager.DeleteAsync(user);
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var currentUser = _currentUser.GetUserId();
        await _events.PublishAsync(new ApplicationUserDeletedEvent(user.Id));
        var log = new LogDeletedUser(Guid.Parse(user.Id), user.FullName, user.UserName, user.TypeUser, user.GroupCode, user.GroupName, user.OfficeCode, user.OfficeName, user.PositionCode, user.PositionName, user.SoDinhDanh,
            user.SoCMND, user.GioiTinh, user.DanToc, user.TonGiao, user.NgayThangNamSinh, user.NoiDangKyKhaiSinh, user.QueQuan, user.ThuongTru, user.NoiOHienTai, user.Cha, user.Me, user.VoChong,
            user.NguoiDaiDien, user.ChuHo, user.HoVaTen, user.SoSoHoKhau, user.MaDinhDanhOfficeCode, user.ChucDanh, currentTime, currentUser);
        await _repositoryLogDeletedUser.AddAsync(log);

        return string.Format(_t["User {0} Deleted."], user.UserName);
    }
}