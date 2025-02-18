using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Paseto;
using System.Security.Claims;
using System.Text.Encodings.Web;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Infrastructure.Identity;

namespace TD.DichVuCongApi.Infrastructure.Auth.PASETO;
public class PasetoAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly PasetoTokenService _pasetoTokenService;
    private readonly IMemoryCache _memoryCache;

    public PasetoAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        PasetoTokenService pasetoTokenService,
        IMemoryCache memoryCache)
        : base(options, logger, encoder, clock)
    {
        _pasetoTokenService = pasetoTokenService;
        _memoryCache = memoryCache;
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
        {
            return Task.FromResult(AuthenticateResult.Fail("Missing Authorization Header"));
        }

        string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        string tokenLogout = _memoryCache.Get(token)?.ToString() ?? string.Empty;
        if (!string.IsNullOrEmpty(tokenLogout) && tokenLogout.Contains("Logout"))
            throw new UnauthorizedException("Authentication Failed.");

        PasetoTokenValidationResult result = _pasetoTokenService.DecodePasetoToken(token);

        if (result.IsValid)
        {
            ApplicationUser user = new ApplicationUser();
            string? tenantId = string.Empty;
            string? ipAddress = string.Empty;

            PasetoPayload payload = result.Paseto.Payload;
            object claimsPayload = payload["ClaimOfPaseto"];
            if (string.IsNullOrEmpty(claimsPayload.ToString()))
                throw new UnauthorizedException("Invalid Token.");

            JArray claimsArr = JArray.Parse(claimsPayload.ToString() ?? string.Empty);
            var userIdClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "uid");
            var userNameClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "sub");
            var emailClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "email");
            var ipAddressClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "ipAddress");
            var tenantClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "tenant");
            var groupCodeClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "groupCode");
            var groupNameClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "groupName");
            var officeCodeClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "officeCode");
            var officeNameClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "officeName");
            var positionNameClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "positionName");
            var typeUserClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "typeUser");
            var fullNameClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "fullName");
            var maDinhDanhClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "maDinhDanh");

            if (typeUserClaim.ToString() == "CongDan")
            {
                throw new ForbiddenException("503 Forbidden");
            }

            if (userIdClaim != null)
                user.Id = userIdClaim["Value"].ToString();

            if (userNameClaim != null)
                user.UserName = userNameClaim["Value"].ToString();

            if (emailClaim != null)
                user.Email = emailClaim["Value"].ToString();

            if (ipAddressClaim != null)
                ipAddress = ipAddressClaim["Value"].ToString();

            if (tenantClaim != null)
                tenantId = tenantClaim["Value"].ToString();

            if (groupCodeClaim != null)
                user.GroupCode = groupCodeClaim["Value"].ToString();

            if (groupNameClaim != null)
                user.GroupName = groupNameClaim["Value"].ToString();

            if (officeCodeClaim != null)
                user.OfficeCode = officeCodeClaim["Value"].ToString();

            if (officeNameClaim != null)
                user.OfficeName = officeNameClaim["Value"].ToString();

            if (positionNameClaim != null)
                user.PositionName = positionNameClaim["Value"].ToString();

            if (typeUserClaim != null)
                user.TypeUser = typeUserClaim["Value"].ToString();

            if (fullNameClaim != null)
                user.FullName = fullNameClaim["Value"].ToString();

            if (maDinhDanhClaim != null)
                user.MaDinhDanhOfficeCode = maDinhDanhClaim["Value"].ToString();

            var claims = _pasetoTokenService.GetClaimsFromToken(user, tenantId, ipAddress);
            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
        else
        {
            var endpoint = Context.GetEndpoint();
            if (endpoint?.Metadata.GetMetadata<Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute>() != null)
            {
                return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(new ClaimsPrincipal(), Scheme.Name)));
            }

            throw new UnauthorizedException("Authentication Failed.");
        }
    }
}

// var a = _currentUser.GetUserId();
// var b = _currentUser.GetUserOfficeCode();
// var c = _currentUser.GetUserGroupCode();
// var d = _currentUser.GetUserFullName();
// var e = _currentUser.GetUserGroupName();
// var f = _currentUser.GetUserOfficeName();
// var g = _currentUser.GetUserEmail();
// var h = _currentUser.GetUserName();
// var i = _currentUser.GetUserMaDinhDanh();
// var j = _currentUser.GetUserPositionName();
// var k = _currentUser.GetTypeUser();
// var l = _currentUser.GetTenant();
// var m = _currentUser.IsAuthenticated();