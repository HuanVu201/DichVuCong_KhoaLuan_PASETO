using Mapster;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using TD.CitizenAPI.Application.Identity.Users.Password;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.SSO;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Identity.Users.Password;
using TD.DichVuCongApi.Application.Identity.Users.UsersQueries;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Infrastructure.Common.Services;

namespace TD.DichVuCongApi.Host.Controllers.Identity;

public class UsersController : VersionNeutralApiController
{
    private readonly IUserService _userService;
    private readonly ICacheKeyService _cacheKeyService;
    private readonly ICacheService _cacheService;
    private readonly IConfiguration _configuration;
    private readonly IDVCQGService _dVCQGService;
    private readonly IWso2ISService _wso2ISService;
    private readonly ILogger<UsersController> _logger;
    private readonly ICurrentUser _currentUser;
    private readonly IVneidService _vneidService;
    private readonly ICasService _casService;
    private readonly ISmartKiosService _smartKiosService;
    private readonly IMemoryCache _memoryCache;
    private readonly IDapperRepository _dapperRepository;

    public UsersController(IDapperRepository dapperRepository, IUserService userService, IConfiguration configuration, IDVCQGService dVCQGService, IWso2ISService wso2ISService, ILogger<UsersController> logger, ICurrentUser currentUser, IVneidService vneidService, ICasService casService, ISmartKiosService smartKiosService, IMemoryCache memoryCache, ICacheService cacheService, ICacheKeyService cacheKeyService)
    {
        _userService = userService;
        _configuration = configuration;
        _dVCQGService = dVCQGService;
        _wso2ISService = wso2ISService;
        _logger = logger;
        _currentUser = currentUser;
        _vneidService = vneidService;
        _casService = casService;
        _smartKiosService = smartKiosService;
        _memoryCache = memoryCache;
        _cacheService = cacheService;
        _cacheKeyService = cacheKeyService;
        _dapperRepository = dapperRepository;
    }
    private class GetUserOtpSelect
    {
        public string OtpCSDLDC { get; set; }
    }
    private async Task<string> GetUserOtp(string userId)
    {
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<GetUserOtpSelect>($"SELECT TOP 1 OtpCSDLDC FROM {SchemaNames.Identity}.{TableNames.Users} WHERE Id = @Id", new
        {
            Id = userId
        });
        if (data == null) return string.Empty;
        return data.OtpCSDLDC;
    }
    [Authorize]
    [HttpPost("GetCSDLDanCu")]
    [MustHavePermission(TDAction.View, TDResource.NhomCanBoMotCua + "," + TDResource.NhomCanBoTTHCC + "," + TDResource.NhomTraCuuCSDLQuocGiaDanCu)]
    [OpenApiOperation("Lấy dữ liệu từ CSDL dân cư ", "")]
    public async Task<ActionResult> GetCSDKDanCu(GetCSDLDanCuQuery req, CancellationToken cancellation)
    {
        try
        {
            if (!string.IsNullOrEmpty(req.Url) || !string.IsNullOrEmpty(req.MaCanBo) || !string.IsNullOrEmpty(req.MaTichHop) || !string.IsNullOrEmpty(req.MaDVC))
            {
                return StatusCode(500, (Result)Result.Fail("Cấu hình không hợp lệ"));
            }

            req.Url = _configuration.GetValue<string>("CSDLDanCu_API_ENDPOINT");
            req.MaTichHop = _configuration.GetValue<string>("CSDLDanCu_MaTichHop");
            req.MaCanBo = _configuration.GetValue<string>("CSDLDanCu_MaCanBo");
            req.MaDVC = _configuration.GetValue<string>("CSDLDanCu_MaDVC");
            req.MaYeuCau = _configuration.GetValue<string>("CSDLDanCu_MaYeuCau");
            bool enableOtp = _configuration.GetValue<bool?>("CSDLDanCu_EnableOtp") ?? false;
            var userId = _currentUser.GetUserId().ToString();
            bool checkOtp = false;
            if (enableOtp)
            {
                string cacheKey = _cacheKeyService.GetCacheKey("OtpCSDLDC", userId, false);
                string? opt = await _cacheService.GetAsync<string?>(
                cacheKey, cancellation);
                if (opt == null)
                {
                    if (string.IsNullOrEmpty(req.OTP))
                    {
                        return BadRequest((Result)Result.Fail("00"));
                    }
                    var userOtp = await GetUserOtp(userId);
                    if (userOtp != null)
                    {
                        if (userOtp.Trim().ToLower() != req.OTP.Trim().ToLower())
                        {
                            return StatusCode(403, (Result)Result.Fail("01"));
                        }
                        else
                        {
                            await _cacheService.SetAsync<string>(cacheKey, userOtp, TimeSpan.FromMinutes(10), cancellation);
                        }
                    }
                }
            }
            var res = await Mediator.Send(req);
            return StatusCode(200, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, (Result)Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpGet("detail/{SoDinhDanh}")]
    [MustHavePermission(TDAction.View, TDResource.NhomCanBoMotCua + "," + TDResource.NhomCanBoTTHCC)]
    [OpenApiOperation("Lấy dữ liệu user theo số định danh", "")]
    public async Task<ActionResult> GetUserBySoDinhDanh(string SoDinhDanh)
    {
        try
        {
            var res = await Mediator.Send(new TimNhanhUserQuery(SoDinhDanh));
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound((Result)Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, (Result)Result.Fail(ex.Message));
        }
    }

    [HttpPost("search")]
    [MustHavePermission(TDAction.View, TDResource.NhomCanBoMotCua + "," + TDResource.NhomCanBoTTHCC + "," + TDResource.NhomLanhDaoDonVi + "," + TDResource.NhomLanhDaoPhong + "," + TDResource.NhomCanBoXuLyChungThucDienTu + "," + TDResource.NhomChuyenVien + "," + TDResource.NhomQuanTriDonVi + "," + TDResource.NhomVanThuDonVi)]
    [OpenApiOperation("Danh sách người dùng.", "")]
    public Task<PaginationResponse<UserDetailsDto>> SearchAsync(UserListFilter request, CancellationToken cancellationToken)
    {
        return _userService.SearchAsync(request, cancellationToken);
    }

    [HttpGet("SearchPortal")]
    [AllowAnonymous]
    [OpenApiOperation("Danh sách người dùng ngoài cổng.", "")]
    public Task<PaginationResponse<UserPortalDto>> SearchPortal([FromQuery] SearchUserPortalQuery request, CancellationToken cancellationToken)
    {
        return _userService.SearchPortal(request, cancellationToken);
    }


    [HttpGet("NhomLanhDao")]
    [OpenApiOperation("Danh sách lãnh đạo đơn vị/phòng")]
    public Task<PaginationResponse<NhomLanhDaoUserDto>> SearchNhomLanhDao([FromQuery] SearchNhomLanhDaoQuery request, CancellationToken cancellationToken)
    {
        return _userService.SearchNhomLanhDao(request, cancellationToken);
    }

    [HttpGet("currentuser")]
    [OpenApiOperation("Get a user's details.", "")]
    public async Task<UserDto> GetCurrentUserAsync(CancellationToken cancellationToken)
    {
        var res = await _userService.GetCurrentUserAsync(cancellationToken);
        UserDto userDto = res.Adapt<UserDto>();
        return userDto;
    }

    [HttpPut("{id}")]
    [MustHavePermission(TDAction.Update, TDResource.Users)]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [OpenApiOperation("Update user information.", "")]
    public async Task<ActionResult> UpdateUserAsync(string id, UpdateUserRequest request, CancellationToken cancellationToken)
    {
        try
        {
            request.Id = id;
            await _userService.UpdateUserAsyncById(request, cancellationToken);

            return Ok(Result.Success());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    [HttpPut("UpdateCurrentUser/{id}")]
    [OpenApiOperation("Update user information.", "")]
    public async Task<ActionResult> UpdateCurrentUserAsync(string id, UpdateUserRequest request, CancellationToken cancellationToken)
    {
        string userId = _currentUser.GetUserId().ToString().ToLower();
        if (userId != id.ToLower())
            return StatusCode(403, new { message = "Không có quyền cập nhật!" });
        try
        {
            request.Id = id;
            await _userService.UpdateUserAsyncById(request, cancellationToken);

            return Ok(Result.Success());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    [Authorize]
    [HttpGet]
    [MustHavePermission(TDAction.View, TDResource.Users)]
    [OpenApiOperation("Get list of all users.", "")]
    public Task<List<UserDto>> GetListAsync(CancellationToken cancellationToken)
    {
        return _userService.GetListAsync(cancellationToken);
    }

    [HttpGet("{id}")]
    [OpenApiOperation("Get a user's details.", "")]
    public async Task<UserDto> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        return await _userService.GetUserAsync(id, cancellationToken);
    }

    [HttpGet("{id}/roles")]
    [OpenApiOperation("Get a user's roles.", "")]
    public Task<List<UserRoleDto>> GetRolesAsync(string id,bool? laQuyenQuanTriDonVi ,CancellationToken cancellationToken)
    {
        return _userService.GetRolesAsync(id, cancellationToken, laQuyenQuanTriDonVi );
    }

    [HttpPost("{id}/roles")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [MustHavePermission(TDAction.Update, TDResource.UserRoles)]
    [OpenApiOperation("Update a user's assigned roles.", "")]
    public Task<string> AssignRolesAsync(string id, UserRolesRequest request, CancellationToken cancellationToken)
    {
        return _userService.AssignRolesAsync(id, request, cancellationToken);
    }

    [HttpPost]
    [MustHavePermission(TDAction.Create, TDResource.Users)]
    [OpenApiOperation("Creates a new user.", "")]
    public Task<string> CreateAsync(CreateUserRequest request)
    {
        // TODO: check if registering anonymous users is actually allowed (should probably be an appsetting)
        // and return UnAuthorized when it isn't
        // Also: add other protection to prevent automatic posting (captcha?)
        return _userService.CreateAsync(request, GetOriginFromRequest());
    }

    [HttpDelete("{id}")]
    [MustHavePermission(TDAction.Delete, TDResource.Users)]
    [OpenApiOperation("Delete a user.", "")]
    public Task<string> CreateAsync(string id)
    {
        // TODO: check if registering anonymous users is actually allowed (should probably be an appsetting)
        // and return UnAuthorized when it isn't
        // Also: add other protection to prevent automatic posting (captcha?)
        return _userService.DeleteAsync(id);
    }

    [HttpPost("admin-register")]
    [MustHavePermission(TDAction.Create, TDResource.Users)]
    [OpenApiOperation("Creates a new user(default password).", "")]
    public Task<string> CreateWithDefaultPasswordAsync(CreateUserWithDefaultPasswordRequest request)
    {
        // TODO: check if registering anonymous users is actually allowed (should probably be an appsetting)
        // and return UnAuthorized when it isn't
        // Also: add other protection to prevent automatic posting (captcha?)
        return _userService.CreateWithDefaultPasswordAsync(request, GetOriginFromRequest());
    }

    [HttpPost("self-register")]
    [TenantIdHeader]
    [AllowAnonymous]
    [OpenApiOperation("Anonymous user creates a user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [NonAction]
    private Task<string> SelfRegisterAsync(CreateUserRequest request)
    {
        // TODO: check if registering anonymous users is actually allowed (should probably be an appsetting)
        // and return UnAuthorized when it isn't
        // Also: add other protection to prevent automatic posting (captcha?)
        return _userService.CreateAsync(request, GetOriginFromRequest());
    }

    [HttpPost("{id}/toggle-status")]
    [MustHavePermission(TDAction.Update, TDResource.Users)]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [OpenApiOperation("Toggle a user's active status.", "")]
    [NonAction]
    private async Task<ActionResult> ToggleStatusAsync(string id, ToggleUserStatusRequest request, CancellationToken cancellationToken)
    {
        if (id != request.UserId)
        {
            return BadRequest();
        }

        await _userService.ToggleStatusAsync(request, cancellationToken);
        return Ok();
    }

    [HttpGet("confirm-email")]
    [AllowAnonymous]
    [OpenApiOperation("Confirm email address for a user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Search))]
    [NonAction]
    private Task<string> ConfirmEmailAsync([FromQuery] string tenant, [FromQuery] string userId, [FromQuery] string code, CancellationToken cancellationToken)
    {
        return _userService.ConfirmEmailAsync(userId, code, tenant, cancellationToken);
    }

    [HttpGet("confirm-phone-number")]
    [AllowAnonymous]
    [OpenApiOperation("Confirm phone number for a user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Search))]
    [NonAction]
    private Task<string> ConfirmPhoneNumberAsync([FromQuery] string userId, [FromQuery] string code)
    {
        return _userService.ConfirmPhoneNumberAsync(userId, code);
    }

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    [TenantIdHeader]
    [OpenApiOperation("Request a password reset email for a user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [NonAction]
    private Task<string> ForgotPasswordAsync(ForgotPasswordRequest request)
    {
        return _userService.ForgotPasswordAsync(request, GetOriginFromRequest());
    }

    [HttpPost("reset-password")]
    [OpenApiOperation("Reset a user's password.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    public Task<string> ResetPasswordAsync(ResetPasswordRequest request)
    {
        return _userService.ResetPasswordAsync(request);
    }

    [HttpPost("admin-change-password")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Admin thay đổi mật khẩu.", "")]
    public Task<bool> AdminResetPasswordAsync(AdminResetPasswordRequest request)
    {
        return _userService.AdminChangePasswordAsync(request);
    }

    [HttpPost("UpdateEmailAndPhoneNumberPortal")]
    [OpenApiOperation("cập nhật thông tin người dùng", "")]
    public Task<bool> UpdateEmailAndPhoneNumberPortal(UpdateEmailAndPhoneNumberPortalRequest request)
    {
        return _userService.UpdateEmailAndPhoneNumberPortal(request);
    }

    [HttpPost("ConfirmCongDanDinhDanh")]
    [OpenApiOperation("Cập nhật công dân định danh", "")]
    public Task<bool> ConfirmDinhDanh(string? MaCaptCha)
    {
        return _userService.ConfirmDinhDanh();
    }

    [HttpPost("admin-reset-password/{id}")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong + "," + TDResource.NhomQuanTriDonVi)]
    [OpenApiOperation("Admin reset mật khẩu.", "")]
    public Task<Result> AdminResetPasswordAsync(string id)
    {
        return _userService.AdminResetPasswordAsync(id);
    }

    private string GetOriginFromRequest() => $"{Request.Scheme}://{Request.Host.Value}{Request.PathBase.Value}";

    [HttpPost("KiemTraNguoiDungSmartKios")]
    [AllowAnonymous]
    [RequestFormLimits(MultipartBodyLengthLimit = 31457280)]
    [RequestSizeLimit(31457280)]
    public async Task<string?> KiemTraNguoiDungSmartKios(UserInfoSmartKiosRequest request)
    {
        return await _smartKiosService.KiemTraNguoiDungSmartKios(request, GetIpAddress(), GetDevice());
    }

    [HttpPost("KiemTraNguoiDungDVCQuocGia")]
    [AllowAnonymous]
    [RequestFormLimits(MultipartBodyLengthLimit = 31457280)]
    [RequestSizeLimit(31457280)]
    public async Task<string?> KiemTraNguoiDungDVCQuocGia(UserInfoDvcqgRequest request)
    {
        return await _dVCQGService.KiemTraNguoiDungDVCQuocGia(request);
    }

    [HttpPost("KiemTraNguoiDungVneid")]
    [AllowAnonymous]
    [RequestFormLimits(MultipartBodyLengthLimit = 31457280)]
    [RequestSizeLimit(31457280)]
    public async Task<string?> KiemTraNguoiDungVneid(UserInfoVneidRequest request)
    {
        return await _vneidService.KiemTraNguoiDungVneidAsync(request);
    }

    [AllowAnonymous]
    [Route("/sso/callback")]
    public async Task<IActionResult> SsoCallBack(string accessToken, string state)
    {
        string stateDecode = "/";
        if (!string.IsNullOrEmpty(state))
        {
            byte[] base64EncodedBytes = Convert.FromBase64String(state);
            stateDecode = Encoding.UTF8.GetString(base64EncodedBytes);
        }

        string? token = await _dVCQGService.GetTokenAsync(accessToken, GetIpAddress(), GetDevice());
        if (token != null)
        {
            ViewBag.UrlRedirect = stateDecode;
            ViewBag.TokenUser = token;
            ViewBag.HeThong = "HỆ THỐNG HỆ THỐNG DỊCH VỤ CÔNG QUỐC GIA";
        }

        return View("~/Views/Identity/SsoCallback.cshtml");
    }

    [AllowAnonymous]
    [Route("/sso/wso2is")]
    public async Task<IActionResult> SsoWso2is(string? code, string? state)
    {
        string id_token = string.Empty;
        string? token = string.Empty;
        string? client_id = _configuration.GetSection("SSOWSO2IS:Client_id").Value;
        string? client_secret = _configuration.GetSection("SSOWSO2IS:Client_secret").Value;
        string? url_CallBack_login = _configuration.GetSection("SSOWSO2IS:Url_CallBack_login").Value;
        string? url_authorize = _configuration.GetSection("SSOWSO2IS:Url_authorize").Value;
        string? url_get_token = _configuration.GetSection("SSOWSO2IS:Url_get_token").Value;
        string? url_get_user_info = _configuration.GetSection("SSOWSO2IS:Url_get_user_info").Value;
        string? stateDecode = "/dvc";
        _logger.LogInformation("SsoWso2is_state:" + state);
        if (!string.IsNullOrEmpty(state))
        {
            byte[] base64EncodedBytes = Convert.FromBase64String(state);
            stateDecode = Encoding.UTF8.GetString(base64EncodedBytes);
        }

        _logger.LogInformation("SsoWso2is_code:" + code);
        if (string.IsNullOrEmpty(code))
        {
            string urlRedirect = string.Format(url_authorize ?? string.Empty, client_id, url_CallBack_login);
            _logger.LogInformation("SsoWso2is_urlRedirect:" + urlRedirect);
            return Redirect(urlRedirect);
        }

        HttpClientHandler clientHandler = new HttpClientHandler();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

        using (HttpClient client = new HttpClient(clientHandler))
        {
            #region Get access token by authorization code
            Dictionary<string, string> dict = new Dictionary<string, string>
                    {
                        { "grant_type", "authorization_code" },
                        { "code", code },
                        { "redirect_uri", url_CallBack_login ?? string.Empty },
                        { "client_id", client_id ?? string.Empty},
                        { "client_secret", client_secret ?? string.Empty }
                    };
            var req = new HttpRequestMessage(HttpMethod.Post, url_get_token) { Content = new FormUrlEncodedContent(dict) };
            var res = client.SendAsync(req);
            string reOauthToken = res.Result.Content.ReadAsStringAsync().Result;
            _logger.LogInformation("SsoWso2is_reOauthToken:" + reOauthToken);
            OutPutOauthToken? outPutOauthToken = JsonConvert.DeserializeObject<OutPutOauthToken>(reOauthToken);
            string access_token = outPutOauthToken.access_token;
            _logger.LogInformation("SsoWso2is_access_token:" + access_token);
            id_token = outPutOauthToken.id_token;
            #endregion
            #region Get user info by access token
            using (var client2 = new HttpClient(clientHandler))
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                client2.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", access_token);
                var req2 = new HttpRequestMessage(HttpMethod.Post, url_get_user_info);
                req2.Headers.Add("Accept", "application/json;charset=UTF-8");
                req2.Content = new StringContent(string.Empty, Encoding.UTF8, "application/x-www-form-urlencoded");
                var res2 = client2.SendAsync(req2);
                string reOauthUserInfo = res2.Result.Content.ReadAsStringAsync().Result;
                _logger.LogInformation("SsoWso2is_reOauthUserInfo:" + reOauthUserInfo);

                // if (Write_log == "1") Common.WriteLogError("SsoPage", "reOauthUserInfo: " + reOauthUserInfo);
                JObject jObject = JObject.Parse(reOauthUserInfo);
                string user = jObject["sub"].ToString();

                // if (Write_log == "1") Common.WriteLogError("SsoPage", "reUser: " + user);
                token = await _wso2ISService.GetTokenAsync(user, GetIpAddress(), GetDevice());
                var cookieOptions = new CookieOptions();
                cookieOptions.Expires = DateTime.Now.AddDays(1);
                cookieOptions.Path = "/";
                Response.Cookies.Append("id_token_SSOWSO2IS", id_token, cookieOptions);
            }
            #endregion
        }

        ViewBag.UrlRedirect = stateDecode;
        ViewBag.TokenUser = token;
        return View("~/Views/Identity/SsoCallback-wso2is.cshtml");
    }

    [AllowAnonymous]
    [Route("/logout")]
    public async Task<IActionResult> Logout(string? accessToken, string? returnUrl, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(returnUrl))
        {
            returnUrl = "/";
        }

        if (accessToken != null)
        {
            UserDetailsDto? currUsr = null;
            JwtSecurityToken jwtSecurityToken;
            jwtSecurityToken = new JwtSecurityToken(accessToken);
            try
            {
                string? idUser = jwtSecurityToken.Payload["uid"]?.ToString();
                currUsr = await _userService.GetAsync(idUser ?? string.Empty, cancellationToken);
                if (currUsr != null)
                {
                    string? typeUser = currUsr.TypeUser;
                    switch (typeUser)
                    {
                        case "CanBo":
                        case "Admin":
                            string? usingSSOWSO2IS = _configuration.GetSection("SSOWSO2IS:Active").Value;
                            if (usingSSOWSO2IS == "1")
                            {
                                string? url_logout = _configuration.GetSection("SSOWSO2IS:Url_logout").Value;
                                string? url_CallBack_logout = _configuration.GetSection("SSOWSO2IS:Url_CallBack_logout").Value;
                                string? id_token = Request.Cookies["id_token_SSOWSO2IS"];
                                if (id_token != null)
                                {
                                    string urlLogout = string.Format(url_logout ?? string.Empty, url_CallBack_logout, id_token);
                                    Response.Cookies.Delete("id_token_SSOWSO2IS");
                                    return Redirect(urlLogout);
                                }
                            }

                            string? usingSSOCas = _configuration.GetSection("SSOCAS:Active").Value;
                            if (usingSSOCas == "1")
                            {
                                string? cashost = _configuration.GetSection("SSOCAS:Cashost").Value;
                                string? returnUrlLogout = _configuration.GetSection("SSOCAS:ReturnUrlLogout").Value;
                                returnUrl = cashost + "logout?backtologin=" + returnUrlLogout;
                            }

                            break;
                        case "CongDan":
                            string? access_tokenDVCQG = currUsr.AccessTokenDVCQG;
                            string? url_logoutDVCQG = _configuration.GetSection("DVCQG:Url_logout").Value;
                            string? url_logout_callback_DVCQG = _configuration.GetSection("DVCQG:Url_CallBack_logout").Value;
                            if (!string.IsNullOrEmpty(url_logoutDVCQG) && !string.IsNullOrEmpty(url_logout_callback_DVCQG))
                            {
                                string urlLogoutDVCQG = string.Format(url_logoutDVCQG, access_tokenDVCQG, url_logout_callback_DVCQG);
                                return Redirect(urlLogoutDVCQG);
                            }

                            break;
                        default:
                            break;
                    }

                    var diffTimeToken = jwtSecurityToken.ValidTo - DateTime.UtcNow;
                    if (diffTimeToken.TotalSeconds > 0)
                    {
                        // _memoryCache.Set(access_token, "Logout", diffTimeToken);
                    }
                }
            }
            catch
            {

            }
        }

        ViewBag.UrlRedirect = returnUrl;
        return View("~/Views/Identity/Logout.cshtml");
    }

    [AllowAnonymous]
    [Route("/ssovneid/callback")]
    public async Task<IActionResult> SsoVneidCallBack(string accessToken, string state)
    {
        string stateDecode = "/";
        if (!string.IsNullOrEmpty(state))
        {
            byte[] base64EncodedBytes = Convert.FromBase64String(state);
            stateDecode = Encoding.UTF8.GetString(base64EncodedBytes);
        }

        string? token = await _vneidService.GetTokenAsync(accessToken, GetIpAddress(), GetDevice());
        if (token != null)
        {
            ViewBag.UrlRedirect = stateDecode;
            ViewBag.TokenUser = token;
            ViewBag.HeThong = "HỆ THỐNG ĐỊNH DANH ĐIỆN TỬ CẤP BỞI BỘ CÔNG AN";
        }

        ViewBag.HeThong = "HỆ THỐNG ĐỊNH DANH ĐIỆN TỬ CẤP BỞI BỘ CÔNG AN";
        return View("~/Views/Identity/SsoCallback.cshtml");
    }

    [AllowAnonymous]
    [Route("/ssocas/callback")]
    public async Task<IActionResult> SsoCasCallBack([FromQuery] string ticket, [FromQuery] string? UrlRedirect)
    {
        if (!string.IsNullOrEmpty(ticket))
        {
            string? usr = await _casService.CheckUserSSOCas(ticket, UrlRedirect);
            if (usr != null)
            {
                string? token = await _casService.GetTokenAsync(usr, GetIpAddress(), GetDevice());
                if (token != null)
                {
                    ViewBag.UrlRedirect = !string.IsNullOrEmpty(UrlRedirect) ? UrlRedirect : "/";
                    ViewBag.TokenUser = token;
                }
                else
                {
                    ViewBag.Alert = "Đăng nhập không thành công. Vui lòng liên hệ quản trị";
                }
            }
            else
            {
                ViewBag.Alert = "Xác thực tài khoản không thành công. Vui lòng liên hệ quản trị";
            }
        }

        ViewBag.HeThong = "HỆ THỐNG TÀI KHOẢN DÙNG CHUNG CỦA TỈNH";
        return View("~/Views/Identity/SsoCallback.cshtml");
    }

    private string? GetIpAddress() =>
    Request.Headers.ContainsKey("X-Forwarded-For")
        ? Request.Headers["X-Forwarded-For"]
        : HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString() ?? "N/A";
    private string? GetDevice() =>
    Request.Headers.TryGetValue("User-Agent", out var value) ? value : "Unknown";

    [Authorize]
    [HttpGet("GetUsersWithDonViQuanLy")]
    [OpenApiOperation("Lấy dữ liệu người dùng của đơn vị quản lý", "")]
    public async Task<ActionResult> Search([FromQuery] SearchUsersWithDonViQuanLyQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("/api/v1/users/SearchUser")]
    [OpenApiOperation("Lấy dữ liệu người dùng theo bộ lọc", "")]
    public async Task<ActionResult> SearchUser([FromQuery] SearchUserDongBoTTHCQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

}
