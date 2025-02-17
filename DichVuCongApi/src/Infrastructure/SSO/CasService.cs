using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Security;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Xml;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Application.Common.SSO;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Infrastructure.Auth.Jwt;
using TD.DichVuCongApi.Infrastructure.Identity;
using TD.DichVuCongApi.Infrastructure.Multitenancy;
using TD.DichVuCongApi.Shared.Authorization;

namespace TD.DichVuCongApi.Infrastructure.SSO;
public class CasService : ICasService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly JwtSettings _jwtSettings;
    private readonly TDTenantInfo? _currentTenant;
    private IConfiguration _configuration;
    private IServiceLogger _serviceLogger;

    public CasService(IDapperRepository dapperRepository, UserManager<ApplicationUser> userManager,
        IOptions<JwtSettings> jwtSettings, TDTenantInfo? currentTenant, IConfiguration configuration, IServiceLogger serviceLogger)
    {
        _dapperRepository = dapperRepository;
        _userManager = userManager;
        _jwtSettings = jwtSettings.Value;
        _currentTenant = currentTenant;
        _configuration = configuration;
        _serviceLogger = serviceLogger;
    }

    public async Task<string?> CheckUserSSOCas(string ticket, string? urlRedirect)
    {
        string? cashost = _configuration.GetValue<string>("SSOCAS:Cashost");
        string? returnUrl = _configuration.GetValue<string>("SSOCAS:ReturnUrl");
        if (!string.IsNullOrEmpty(urlRedirect))
        {
            returnUrl += "?UrlRedirect=" + urlRedirect;
        }

        string? usrName = string.Empty;
        string? validateurl = cashost + "p3/serviceValidate?" +
              "ticket=" + ticket + "&" +
              "service=" + returnUrl;
        try
        {
            using (var client = new WebClient())
            {
                ServicePointManager.ServerCertificateValidationCallback =
                   new RemoteCertificateValidationCallback(
                        delegate
                        { return true; });

                var str = client.OpenRead(validateurl);
                if (str == null) return null;
                var reader = new StreamReader(str);
                string? resp = reader.ReadToEnd();
                var xDoc = new XmlDocument();
                xDoc.LoadXml(resp);
                usrName = xDoc.GetElementsByTagName("cas:user")[0].InnerText;
            }
        }
        catch
        {
            usrName = null;
        }

        return usrName;
    }

    public async Task<string?> GetTokenAsync(string userName, string? ipAddress, string? device = null)
    {
        var user = await _userManager.FindByNameAsync(userName);

        // var user = await _dapperRepository.QueryFirstOrDefaultAsync<ApplicationUser>("SELECT top 1 * from [Identity].Users WHERE UserName = @UserName", new
        // {
        //    UserName = userName
        // });
        if (user != null)
        {
            // var info = new UserLoginInfo("SSOCas", user.UserName, "SSOCas");
            // var res = await _userManager.AddLoginAsync(user, info);
            var token = await GenerateTokensAndUpdateUser(user, ipAddress);
            ServiceLogAuthenRequestParams req = new ServiceLogAuthenRequestParams()
            {
                Fullname = user.FullName,
                Username = user.UserName,
                IP = ipAddress,
                Token = token.Token,
                TypeUser = user.TypeUser,
                TypeLogin = "CAS",
                Device = device
            };
            await _serviceLogger.LogAuthenAsync(req);
            return JsonSerializer.Serialize(token, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }
        else
        {
            return null;
        }
    }

    private async Task<TokenResponse> GenerateTokensAndUpdateUser(ApplicationUser user, string? ipAddress)
    {
        string token = GenerateJwt(user, ipAddress);

        // user.RefreshToken = GenerateRefreshToken();
        // user.RefreshTokenExpiryTime = DateTime.Now.AddDays(_jwtSettings.RefreshTokenExpirationInDays);

        // await _userManager.UpdateAsync(user);
        await UpdateUserAsync(user.UserName);
        return new TokenResponse(token, user.RefreshToken, user.RefreshTokenExpiryTime);
    }

    private async Task UpdateUserAsync(string UserName)
    {
        await _dapperRepository.ExcuteAsync("Update [Identity].Users Set RefreshToken = @RefreshToken, RefreshTokenExpiryTime=@RefreshTokenExpiryTime where UserName =@UserName", new
        {
            RefreshToken = GenerateRefreshToken(),
            RefreshTokenExpiryTime = DateTime.Now.AddDays(_jwtSettings.RefreshTokenExpirationInDays),
            UserName
        });
    }

    private string GenerateJwt(ApplicationUser user, string ipAddress) =>
        GenerateEncryptedToken(GetSigningCredentials(), GetClaims(user, ipAddress));

    private IEnumerable<Claim> GetClaims(ApplicationUser user, string? ipAddress) =>
        new List<Claim>
        {
            new(TDClaims.NameIdentifier, user.Id),
            new(TDClaims.Sub, user.UserName ?? string.Empty),
            new(TDClaims.Fullname, user.FullName ?? string.Empty),
            new(TDClaims.Email, user.Email ?? string.Empty),
            new(TDClaims.IpAddress, ipAddress ?? string.Empty),
            new(TDClaims.Tenant, _currentTenant!.Id),
            new(TDClaims.PositionName, user.PositionName ?? string.Empty),
            new(TDClaims.GroupCode, user.GroupCode ?? string.Empty),
            new(TDClaims.GroupName, user.GroupName ?? string.Empty),
            new(TDClaims.OfficeCode, user.OfficeCode ?? string.Empty),
            new(TDClaims.OfficeName, user.OfficeName ?? string.Empty),
            new(TDClaims.MaDinhDanh, user.MaDinhDanhOfficeCode ?? string.Empty),
            new(TDClaims.TypeUser, user.TypeUser ?? string.Empty),
        };

    private static string GenerateRefreshToken()
    {
        byte[] randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    private string GenerateEncryptedToken(SigningCredentials signingCredentials, IEnumerable<Claim> claims)
    {
        var token = new JwtSecurityToken(
           claims: claims,
           expires: DateTime.Now.AddMinutes(_jwtSettings.TokenExpirationInMinutes),
           signingCredentials: signingCredentials);
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key)),
            ValidateIssuer = false,
            ValidateAudience = false,
            RoleClaimType = ClaimTypes.Role,
            ClockSkew = TimeSpan.Zero,
            ValidateLifetime = false
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
        if (securityToken is not JwtSecurityToken jwtSecurityToken ||
            !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        {
            throw new UnauthorizedException("Invalid Token.");
        }

        return principal;
    }

    private SigningCredentials GetSigningCredentials()
    {
        byte[] secret = Encoding.UTF8.GetBytes(_jwtSettings.Key);
        return new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256);
    }
}
