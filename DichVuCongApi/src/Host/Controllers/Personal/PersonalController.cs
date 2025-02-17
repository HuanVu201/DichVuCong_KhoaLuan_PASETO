using System.Security.Claims;
using TD.DichVuCongApi.Application.Auditing;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Identity.Users.Password;

namespace TD.DichVuCongApi.Host.Controllers.Identity;

public class PersonalController : VersionNeutralApiController
{
    private readonly IUserService _userService;
    private readonly IADService _adService;

    private readonly IConfiguration _configuration;
    private readonly string? _typeChangePwd;

    public PersonalController(IUserService userService, IConfiguration configuration, IADService adService)
    {
        _userService = userService;
        _adService = adService;
        _configuration = configuration;
        _typeChangePwd = _configuration.GetValue<string>("TypeChangePwd");
    }

    [HttpGet("profile")]
    [OpenApiOperation("Get profile details of currently logged in user.", "")]
    public async Task<ActionResult<UserDetailsDto>> GetProfileAsync(CancellationToken cancellationToken)
    {
        return User.GetUserId() is not { } userId || string.IsNullOrEmpty(userId)
            ? Unauthorized()
            : Ok(await _userService.GetAsync(userId, cancellationToken));
    }

    [HttpPut("profile")]
    [OpenApiOperation("Update profile details of currently logged in user.", "")]
    public async Task<ActionResult> UpdateProfileAsync(UpdateUserRequest request)
    {
        if (User.GetUserId() is not { } userId || string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        await _userService.UpdateAsync(request, userId);
        return Ok();
    }

    [HttpPut("change-password")]
    [OpenApiOperation("Change password of currently logged in user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    public async Task<ActionResult> ChangePasswordAsync(ChangePasswordRequest model)
    {
        if (User.GetUserId() is not { } userId || string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        switch(_typeChangePwd)
        {
            case "Local":
                await _userService.ChangePasswordAsync(model, userId);
                return Ok();
            case "AD":
                string res = _adService.ChangePassword(User.GetUserName() ?? string.Empty, model.Password, model.NewPassword);
                return Ok(res);
            case "SSO":
                return Ok("Vui lòng đổi mật khẩu trên SSO");
            default:
                await _userService.ChangePasswordAsync(model, userId);
                return Ok();
        }
    }

    [HttpGet("permissions")]
    [OpenApiOperation("Get permissions of currently logged in user.", "")]
    public async Task<ActionResult<List<string>>> GetPermissionsAsync(CancellationToken cancellationToken)
    {
        return User.GetUserId() is not { } userId || string.IsNullOrEmpty(userId)
            ? Unauthorized()
            : Ok(await _userService.GetPermissionsAsync(userId, cancellationToken));
    }

    [HttpGet("logs")]
    [OpenApiOperation("Get audit logs of currently logged in user.", "")]
    public Task<List<AuditDto>> GetLogsAsync()
    {
        return Mediator.Send(new GetMyAuditLogsRequest());
    }
}