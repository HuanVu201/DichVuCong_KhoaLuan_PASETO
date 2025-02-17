using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Application.Common.SSO;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Infrastructure.Auth.Jwt;
using TD.DichVuCongApi.Infrastructure.Identity;
using TD.DichVuCongApi.Infrastructure.Multitenancy;
using TD.DichVuCongApi.Shared.Authorization;

namespace TD.DichVuCongApi.Infrastructure.SSO;
public class VneidService : IVneidService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly JwtSettings _jwtSettings;
    private readonly TDTenantInfo _currentTenant;
    private IConfiguration _configuration;
    private IRepositoryWithEvents<LogCSDLDanCuDoanhNghiep> _repositoryLogCSDL;
    private IServiceLogger _serviceLogger;
    private ILogger<VneidService> _logger;

    public VneidService(IDapperRepository dapperRepository, UserManager<ApplicationUser> userManager, IOptions<JwtSettings> jwtSettings, TDTenantInfo currentTenant, IConfiguration configuration, IRepositoryWithEvents<LogCSDLDanCuDoanhNghiep> repositoryLogCSDL, IServiceLogger serviceLogger, ILogger<VneidService> logger)
    {
        _dapperRepository = dapperRepository;
        _userManager = userManager;
        _jwtSettings = jwtSettings.Value;
        _currentTenant = currentTenant;
        _configuration = configuration;
        _repositoryLogCSDL = repositoryLogCSDL;
        _serviceLogger = serviceLogger;
        _logger = logger;
    }

    public async Task<string?> KiemTraNguoiDungVneidAsync(UserInfoVneidRequest request)
    {
        string? res = string.Empty;
        string logError = string.Empty;
        try
        {
            if (request != null)
            {
                string? soGiayTo = request.SoDinhDanh != null ? request.SoDinhDanh : string.Empty;
                var userCheck = _userManager.Users.Where(x => x.UserName == soGiayTo).FirstOrDefault();
                if (userCheck != null)
                {
                    logError += Environment.NewLine + "userCheck != null";
                    userCheck.IdTokenDVCQG = request.id_token;
                    userCheck.AccessTokenDVCQG = request.access_token;
                    userCheck.UserInfoDVCQG = JsonSerializer.Serialize(request);
                    if (userCheck.TypeUser == "CanBo")
                    {
                        if (userCheck?.DaXacThucCSDLDC == null || userCheck?.DaXacThucCSDLDC == false)
                        {
                            userCheck.NgayThangNamSinh = request.NgayThangNamSinh;
                            userCheck.SoDinhDanh = request.SoDinhDanh;
                            userCheck.NamSinh = request.NgayThangNamSinh != null ? request.NgayThangNamSinh.Substring(0, 4) : string.Empty;
                            userCheck = await CapNhatCSDLDanCu(userCheck);
                            if (userCheck != null)
                            {
                                userCheck.DaXacThucCSDLDC = true;
                                var result = await _userManager.UpdateAsync(userCheck);
                                if (result != null && result.Succeeded)
                                    res = request.access_token;
                            }
                        }
                        else
                        {
                            res = request.access_token;
                        }
                    }
                    else if (userCheck?.DaXacThucCSDLDC == null || userCheck?.DaXacThucCSDLDC == false)
                    {
                        userCheck = await CapNhatCSDLDanCu(userCheck);
                        logError += Environment.NewLine + "userCheck != null - CapNhatCSDLDanCu";

                        userCheck.DaXacThucCSDLDC = true;
                    }

                    if (userCheck != null)
                    {
                        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
                        var log = new LogCSDLDanCuDoanhNghiep(userCheck.UserName, currentTime, userCheck.OfficeCode, string.Empty, "CSDL Dân cư");
                        await _repositoryLogCSDL.AddAsync(log);
                        var result = await _userManager.UpdateAsync(userCheck);
                        if (result != null && result.Succeeded)
                            res = request.access_token;
                    }
                }
                else
                {
                    logError += Environment.NewLine + "userCheck == null";
                    userCheck = new ApplicationUser()
                    {
                        Email = string.Concat(soGiayTo, "@dichvucong.gov.vn"),
                        FullName = request.HoVaTen,
                        UserName = soGiayTo,
                        IsActive = true,
                        SoDinhDanh = request.SoDinhDanh,
                        NgayThangNamSinh = request.NgayThangNamSinh,
                        NamSinh = request.NgayThangNamSinh != null ? request.NgayThangNamSinh.Substring(0, 4) : string.Empty,
                        UserOrder = 100,
                        TypeUser = "CongDan",
                        IdTokenDVCQG = request.id_token,
                        AccessTokenDVCQG = request.access_token,
                    };
                    userCheck = await CapNhatCSDLDanCu(userCheck);
                    logError += Environment.NewLine + "userCheck == null - CapNhatCSDLDanCu";

                    if (userCheck != null)
                    {
                        userCheck.DaXacThucCSDLDC = true;
                        var result = await _userManager.CreateAsync(userCheck, new Guid().ToString());
                        if (result != null && result.Succeeded)
                            res = request.access_token;
                    }
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogInformation("KiemTraNguoiDungVneidAsync_error" +
                Environment.NewLine + JsonSerializer.Serialize(request) +
                Environment.NewLine + ex.Message + logError);
        }

        return res;
    }

    public async Task<ApplicationUser?> CapNhatCSDLDanCu(ApplicationUser? user)
    {
        string logError = string.Empty;
        using (var httpClient = new HttpClient())
        {
            try
            {
                GetCSDLDanCuQuery request = new GetCSDLDanCuQuery
                {
                    Url = _configuration.GetValue<string>("CSDLDanCu_API_ENDPOINT"),
                    MaTichHop = _configuration.GetValue<string>("CSDLDanCu_MaTichHop"),
                    MaCanBo = _configuration.GetValue<string>("CSDLDanCu_MaCanBo"),
                    MaDVC = _configuration.GetValue<string>("CSDLDanCu_MaDVC"),
                    MaYeuCau = _configuration.GetValue<string>("CSDLDanCu_MaYeuCau"),
                    HoVaTen = ToUpperCaseNonWhiteSpaceNonAccentVietnamese(user.FullName),
                    SoDinhDanh = user.SoDinhDanh ?? user.SoCMND,
                    SoCMND = user.SoCMND,
                    NgayThangNam = user.NgayThangNamSinh,
                    Nam = user.NamSinh
                };
                string sqlCheckUserExist = "SELECT TOP 1 Id FROM [Identity].[Users] WHERE UserName = @UserName";
                string sqlGetDiaChi = "SELECT MaDiaBan, TenDiaBan From [Catalog].[DiaBans] WHERE MaDiaBan In @MaDiaBan";
                var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
                using (var client = new HttpClient())
                {
                    var log = new LogCSDLDanCuDoanhNghiep(user.UserName, currentTime, user.OfficeCode, JsonSerializer.Serialize(request), "CSDL Dân cư");
                    await _repositoryLogCSDL.AddAsync(log);
                    HttpResponseMessage response = await httpClient.PostAsJsonAsync(request.Url, new
                    {
                        request.HoVaTen,
                        request.SoDinhDanh,

                        // request.SoCMND,
                        // request.NgayThangNam,
                        request.Nam,
                        request.MaTichHop,
                        request.MaDVC,
                        request.MaCanBo,
                        MaYeuCau = request.MaYeuCau + currentTime.Second.ToString()
                    });

                    string xmlResponse = await response.Content.ReadAsStringAsync();
                    logError += Environment.NewLine + "xmlResponse:" + xmlResponse;
                    var responseData = JsonSerializer.Deserialize<CSDLDanCuResponse>(xmlResponse, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                    });
                    var jsonData = Xml2Json.Parse<CSDLDanCuJSONResponse>(responseData.message);
                    var congDan = jsonData.Envelope.Body.CongdanCollection.CongDan;
                    var userExist = await _dapperRepository.QueryFirstOrDefaultAsync<CheckUserReponse>(sqlCheckUserExist, new
                    {
                        UserName = congDan.SoDinhDanh
                    });

                    string maTinhThanhThuongTru = congDan.ThuongTru.MaTinhThanh;
                    string maQuanHuyenThuongTru = congDan.ThuongTru.MaTinhThanh + "." + congDan.ThuongTru.MaQuanHuyen;
                    string maPhuongXaThuongTru = congDan.ThuongTru.MaTinhThanh + "." + congDan.ThuongTru.MaQuanHuyen + "." + congDan.ThuongTru.MaPhuongXa;
                    string maTinhThanhNoiDangKyKhaiSinh = congDan.NoiDangKyKhaiSinh.MaTinhThanh;
                    string maQuanHuyenNoiDangKyKhaiSinh = congDan.NoiDangKyKhaiSinh.MaTinhThanh + "." + congDan.NoiDangKyKhaiSinh.MaQuanHuyen;
                    string maPhuongXaNoiDangKyKhaiSinh = congDan.NoiDangKyKhaiSinh.MaTinhThanh + "." + congDan.NoiDangKyKhaiSinh.MaQuanHuyen + "." + congDan.NoiDangKyKhaiSinh.MaPhuongXa;
                    string maTinhThanhQueQuan = congDan.QueQuan.MaTinhThanh;
                    string maQuanHuyenQueQuan = congDan.QueQuan.MaTinhThanh + "." + congDan.QueQuan.MaQuanHuyen;
                    string maPhuongXaQueQuan = congDan.QueQuan.MaTinhThanh + "." + congDan.QueQuan.MaQuanHuyen + "." + congDan.QueQuan.MaPhuongXa;
                    string maTinhThanhNoiOHienTai = congDan.NoiOHienTai.MaTinhThanh;
                    string maQuanHuyenNoiOHienTai = congDan.NoiOHienTai.MaTinhThanh + "." + congDan.NoiOHienTai.MaQuanHuyen;
                    string maPhuongXaNoiOHienTai = congDan.NoiOHienTai.MaTinhThanh + "." + congDan.NoiOHienTai.MaQuanHuyen + "." + congDan.NoiOHienTai.MaPhuongXa;
                    List<string> maDiaBans = new List<string>()
                    {
                        maTinhThanhThuongTru,
                        maQuanHuyenThuongTru,
                        maPhuongXaThuongTru,
                        maTinhThanhNoiDangKyKhaiSinh,
                        maQuanHuyenNoiDangKyKhaiSinh,
                        maPhuongXaNoiDangKyKhaiSinh,
                        maTinhThanhQueQuan,
                        maQuanHuyenQueQuan,
                        maPhuongXaQueQuan,
                        maTinhThanhNoiOHienTai,
                        maQuanHuyenNoiOHienTai,
                        maPhuongXaNoiOHienTai,
                    };
                    maDiaBans = maDiaBans.Distinct().ToList();

                    var diaBans = await _dapperRepository.QueryAsync<GetCDSLDanCu_DiaChiSelect>(sqlGetDiaChi, new
                    {
                        MaDiaBan = maDiaBans
                    });

                    congDan.ThuongTru.TenTinhThanh = diaBans.FirstOrDefault(x => x.MaDiaBan == maTinhThanhThuongTru)?.TenDiaBan ?? string.Empty;
                    congDan.ThuongTru.TenQuanHuyen = diaBans.FirstOrDefault(x => x.MaDiaBan == maQuanHuyenThuongTru)?.TenDiaBan ?? string.Empty;
                    congDan.ThuongTru.TenPhuongXa = diaBans.FirstOrDefault(x => x.MaDiaBan == maPhuongXaThuongTru)?.TenDiaBan ?? string.Empty;

                    congDan.QueQuan.TenTinhThanh = diaBans.FirstOrDefault(x => x.MaDiaBan == maTinhThanhQueQuan)?.TenDiaBan ?? string.Empty;
                    congDan.QueQuan.TenQuanHuyen = diaBans.FirstOrDefault(x => x.MaDiaBan == maQuanHuyenQueQuan)?.TenDiaBan ?? string.Empty;
                    congDan.QueQuan.TenPhuongXa = diaBans.FirstOrDefault(x => x.MaDiaBan == maPhuongXaQueQuan)?.TenDiaBan ?? string.Empty;

                    congDan.NoiDangKyKhaiSinh.TenTinhThanh = diaBans.FirstOrDefault(x => x.MaDiaBan == maTinhThanhNoiDangKyKhaiSinh)?.TenDiaBan ?? string.Empty;
                    congDan.NoiDangKyKhaiSinh.TenQuanHuyen = diaBans.FirstOrDefault(x => x.MaDiaBan == maQuanHuyenNoiDangKyKhaiSinh)?.TenDiaBan ?? string.Empty;
                    congDan.NoiDangKyKhaiSinh.TenPhuongXa = diaBans.FirstOrDefault(x => x.MaDiaBan == maPhuongXaNoiDangKyKhaiSinh)?.TenDiaBan ?? string.Empty;

                    congDan.NoiOHienTai.TenTinhThanh = diaBans.FirstOrDefault(x => x.MaDiaBan == maTinhThanhNoiOHienTai)?.TenDiaBan ?? string.Empty;
                    congDan.NoiOHienTai.TenQuanHuyen = diaBans.FirstOrDefault(x => x.MaDiaBan == maQuanHuyenNoiOHienTai)?.TenDiaBan ?? string.Empty;
                    congDan.NoiOHienTai.TenPhuongXa = diaBans.FirstOrDefault(x => x.MaDiaBan == maPhuongXaNoiOHienTai)?.TenDiaBan ?? string.Empty;

                    JsonSerializerOptions jso = new JsonSerializerOptions();
                    jso.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
                    user.SoDinhDanh = congDan.SoDinhDanh;
                    user.SoCMND = congDan.SoCMND;
                    user.FullName = congDan.HoVaTen.Ten;
                    user.HoVaTen = JsonSerializer.Serialize(congDan.HoVaTen, jso);
                    user.GioiTinh = congDan.GioiTinh;
                    user.DanToc = congDan.DanToc;
                    user.TonGiao = congDan.TonGiao;
                    user.TinhTrangHonNhan = congDan.TinhTrangHonNhan;
                    user.NhomMau = congDan.NhomMau;
                    user.NamSinh = congDan.NgayThangNamSinh.Nam;
                    user.NgayThangNamSinh = JsonSerializer.Serialize(congDan.NgayThangNamSinh, jso);
                    user.NoiDangKyKhaiSinh = JsonSerializer.Serialize(congDan.NoiDangKyKhaiSinh, jso);
                    user.QuocTich = congDan.QuocTich;
                    user.QueQuan = JsonSerializer.Serialize(congDan.QueQuan, jso);
                    user.ThuongTru = JsonSerializer.Serialize(congDan.ThuongTru, jso);
                    user.NoiOHienTai = JsonSerializer.Serialize(congDan.NoiOHienTai, jso);
                    user.Cha = JsonSerializer.Serialize(congDan.Cha, jso);
                    user.Me = JsonSerializer.Serialize(congDan.Me, jso);
                    user.VoChong = JsonSerializer.Serialize(congDan.VoChong, jso);
                    user.NguoiDaiDien = JsonSerializer.Serialize(congDan.NguoiDaiDien, jso);
                    user.ChuHo = JsonSerializer.Serialize(congDan.ChuHo, jso);
                    user.SoSoHoKhau = congDan.SoSoHoKhau;
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation("CapNhatCSDLDanCu_error" +
                Environment.NewLine + JsonSerializer.Serialize(user) +
                Environment.NewLine + ex.Message + logError);
                return null;
            }
        }

        return user;
    }

    public async Task<string?> GetTokenAsync(string access_token, string? ipAddress, string? device = null)
    {
        var user = _userManager.Users.FirstOrDefault(x => x.AccessTokenDVCQG == access_token);
        if (user != null)
        {
            // var info = new UserLoginInfo("SSO", user.UserName ?? string.Empty, "SSO");
            // var res = await _userManager.AddLoginAsync(user, info);
            var token = await GenerateTokensAndUpdateUser(user, ipAddress);
            ServiceLogAuthenRequestParams req = new ServiceLogAuthenRequestParams()
            {
                Fullname = user.FullName,
                Username = user.UserName,
                IP = ipAddress,
                Token = token.Token,
                TypeUser = user.TypeUser,
                TypeLogin = "VNeID",
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

        user.RefreshToken = GenerateRefreshToken();
        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(_jwtSettings.RefreshTokenExpirationInDays);

        await _userManager.UpdateAsync(user);

        return new TokenResponse(token, user.RefreshToken, user.RefreshTokenExpiryTime);
    }

    private string GenerateJwt(ApplicationUser user, string? ipAddress) =>
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

    private string? ToUpperCaseNonWhiteSpaceNonAccentVietnamese(string? str)
    {
        if (str == null) return null;
        str = str.ToLower();
        str = Regex.Replace(str, "à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ", "a");
        str = Regex.Replace(str, "è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ", "e");
        str = Regex.Replace(str, "ì|í|ị|ỉ|ĩ", "i");
        str = Regex.Replace(str, "ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ", "o");
        str = Regex.Replace(str, "ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ", "u");
        str = Regex.Replace(str, "ỳ|ý|ỵ|ỷ|ỹ", "y");
        str = Regex.Replace(str, "đ", "d");
        str = Regex.Replace(str, "\u0300|\u0301|\u0303|\u0309|\u0323", string.Empty); // Huyền sắc hỏi ngã nặng
        str = Regex.Replace(str, "\u02C6|\u0306|\u031B", string.Empty); // Â, Ê, Ă, Ơ, Ư
        str = Regex.Replace(str, @"\s", string.Empty); // xóa khoảng cách
        str = Regex.Replace(str, @"[^a-zA-Z0-9]", string.Empty); // xóa ký tự đặc biệt
        return str.ToUpper();
    }
}
