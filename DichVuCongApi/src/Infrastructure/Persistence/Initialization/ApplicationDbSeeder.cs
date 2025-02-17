using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data;
using TD.DichVuCongApi.Infrastructure.Common.Services;
using TD.DichVuCongApi.Infrastructure.Identity;
using TD.DichVuCongApi.Infrastructure.Multitenancy;
using TD.DichVuCongApi.Infrastructure.Persistence.Context;
using TD.DichVuCongApi.Shared.Authorization;
using TD.DichVuCongApi.Shared.Multitenancy;

namespace TD.DichVuCongApi.Infrastructure.Persistence.Initialization;

internal class ApplicationDbSeeder
{
    private readonly TDTenantInfo _currentTenant;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly CustomSeederRunner _seederRunner;
    private readonly ILogger<ApplicationDbSeeder> _logger;
    //private readonly string? _connectionStrLogger;
    public ApplicationDbSeeder(TDTenantInfo currentTenant, RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager, CustomSeederRunner seederRunner, ILogger<ApplicationDbSeeder> logger, IConfiguration configuration)
    {
        _currentTenant = currentTenant;
        _roleManager = roleManager;
        _userManager = userManager;
        _seederRunner = seederRunner;
        _logger = logger;
        //_connectionStrLogger = configuration.GetValue<string?>("ServiceLoggerConnectString");
        //if (_connectionStrLogger.StartsWith("Crypt:"))
        //{
        //    _connectionStrLogger = _connectionStrLogger.Replace("Crypt:", string.Empty);
        //    _connectionStrLogger = Encryption.Decrypt(_connectionStrLogger);
        //}
    }

    public async Task SeedDatabaseAsync(ApplicationDbContext dbContext, CancellationToken cancellationToken)
    {
        await SeedRolesAsync(dbContext);
        await SeedAdminUserAsync();

        // await SeedSupperAdminUserAsync();
        await SeedCatalogConfig(dbContext);
        await SeedCatalogDanhMucChung(dbContext);
        await SeedBusinessScreenAction(dbContext);
        await SeedBusinessLoaiPhiLePhi(dbContext);
        await SeedBusinessTrangThaiHoSo(dbContext);
        await SeedCatalogMenu(dbContext);
        await SeedPortalKenhTin(dbContext);
        await SeedPortalQuanLyLienKet(dbContext);
        await SeedCapThucHienDanhMucChung(dbContext);
        await SeedDatabaseLogger();
        await _seederRunner.RunSeedersAsync(cancellationToken);
    }

    private async Task SeedDatabaseLogger()
    {
        
    }

    private async Task SeedRolesAsync(ApplicationDbContext dbContext)
    {
        foreach (string roleName in TDRoles.DefaultRoles)
        {
            if (await _roleManager.Roles.SingleOrDefaultAsync(r => r.Name == roleName)
                is not ApplicationRole role)
            {
                // Create the role
                //_logger.LogInformation("Seeding {role} Role for '{tenantId}' Tenant.", roleName, _currentTenant.Id);
                role = new ApplicationRole(roleName, $"{roleName} Role for {_currentTenant.Id} Tenant");
                await _roleManager.CreateAsync(role);
            }

            // Assign permissions
            if (roleName == TDRoles.CanBoMotCua)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCanBoMotCua, role);
            }
            else if (roleName == TDRoles.NhomCanBoThucHienPhiDiaGioi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCanBoUpdatePhiDiaGioi, role);
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCanBoViewPhiDiaGioi, role);
            }
            else if (roleName == TDRoles.ChuyenVien)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomChuyenVien, role);
            }
            else if (roleName == TDRoles.LanhDaoPhong)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomLanhDaoPhong, role);
            }
            else if (roleName == TDRoles.LanhDaoDonVi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomLanhDaoDonVi, role);
            }
            else if (roleName == TDRoles.QuanTriDonVi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomQuanTriDonVi, role);
            }
            else if (roleName == TDRoles.CanBoThuPhiTTHCC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCanBoThuPhiTTHCC, role);
            }
            else if (roleName == TDRoles.CanBoTraKQTTHCC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCanBoTraKQTTHCC, role);
            }
            else if (roleName == TDRoles.CanBoTTHCC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCanBoTTHCC, role);
            }
            else if (roleName == TDRoles.CanBoXuLyChungThucDienTu)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCanBoXuLyChungThucDienTu, role);
            }
            else if (roleName == TDRoles.VanThuDonVi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomVanThuDonVi, role);
            }
            else if (roleName == TDRoles.CanBoBCCI)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCanBoBCCI, role);
            }
            else if (roleName == TDRoles.CanBoTraKetQuaCapHuyen)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTraKetQuaCapHuyen, role);
            }
            else if (roleName == TDRoles.VanThuUBNDTinh)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomVanThuUBNDTinh, role);
            }
            else if (roleName == TDRoles.TraCuuCSDLQuocGiaDanCu)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTraCuuCSDLQuocGiaDanCu, role);
            }
            else if (roleName == TDRoles.ThongKeBaoCaoDonVi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomThongKeBaoCaoDonVi, role);
            }
            else if (roleName == TDRoles.TheoDoiHoSoDonVi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTheoDoiHoSoDonVi, role);
            }
            else if (roleName == TDRoles.TraCuuHoSoToanDonVi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTraCuuHoSoToanDonVi, role);
            }
            else if (roleName == TDRoles.DanhGiaHaiLongToanDonVi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomDanhGiaHaiLongToanDonVi, role);
            }else if (roleName == TDRoles.NhomVBDLIS)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomVBDLIS, role);
            }
            else if (roleName == TDRoles.QuanTriHeThong)
            {
                role.IsAdmin = true;
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.Admin, role);

                if (_currentTenant.Id == MultitenancyConstants.Root.Id)
                {
                    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.Root, role);
                }
            }

            /*else if (roleName == TDRoles.SupperAdmin)
            {
                role.IsSupperAdmin = true;
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.Root, role);

                if (_currentTenant.Id == MultitenancyConstants.Root.Id)
                {
                    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.Root, role);
                }
            }*/
        }
    }

    private async Task AssignPermissionsToRoleAsync(ApplicationDbContext dbContext, IReadOnlyList<TDPermission> permissions, ApplicationRole role)
    {
        var currentClaims = await _roleManager.GetClaimsAsync(role);
        foreach (var permission in permissions)
        {
            if (!currentClaims.Any(c => c.Type == TDClaims.Permission && c.Value == permission.Name))
            {
                //_logger.LogInformation("Seeding {role} Permission '{permission}' for '{tenantId}' Tenant.", role.Name, permission.Name, _currentTenant.Id);
                dbContext.RoleClaims.Add(new ApplicationRoleClaim
                {
                    RoleId = role.Id,
                    ClaimType = TDClaims.Permission,
                    ClaimValue = permission.Name,
                    CreatedBy = "ApplicationDbSeeder"
                });
                await dbContext.SaveChangesAsync();
            }
        }
    }

    private async Task SeedAdminUserAsync()
    {
        if (string.IsNullOrWhiteSpace(_currentTenant.Id) || string.IsNullOrWhiteSpace(_currentTenant.AdminEmail))
        {
            return;
        }

        if (await _userManager.Users.FirstOrDefaultAsync(u => u.Email == _currentTenant.AdminEmail)
            is not ApplicationUser adminUser)
        {
            string adminUserName = $"{_currentTenant.Id.Trim()}.Admin".ToLowerInvariant();
            adminUser = new ApplicationUser
            {
                Email = _currentTenant.AdminEmail,
                UserName = adminUserName,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                NormalizedEmail = _currentTenant.AdminEmail?.ToUpperInvariant(),
                NormalizedUserName = adminUserName.ToUpperInvariant(),
                IsActive = true,
                TypeUser = "Admin"
            };

            //_logger.LogInformation("Seeding Default Admin User for '{tenantId}' Tenant.", _currentTenant.Id);
            var password = new PasswordHasher<ApplicationUser>();
            adminUser.PasswordHash = password.HashPassword(adminUser, MultitenancyConstants.DefaultPwd);
            await _userManager.CreateAsync(adminUser);
        }

        // Assign role to user
        if (!await _userManager.IsInRoleAsync(adminUser, TDRoles.QuanTriHeThong))
        {
            //_logger.LogInformation("Assigning Admin Role to Admin User for '{tenantId}' Tenant.", _currentTenant.Id);
            await _userManager.AddToRoleAsync(adminUser, TDRoles.QuanTriHeThong);
        }
    }
    private async Task SeedCatalogConfig(ApplicationDbContext dbContext)
    {
        if (!dbContext.Configs.Any())
        {
            dbContext.Configs.AddRange(
                new List<Domain.Catalog.Config>()
                {
                    new Domain.Catalog.Config("Mẫu phiếu tiếp nhận hồ sơ", "phieu-tiep-nhan-ho-so", 1, true, "Public", string.Empty, "Ví dụ Ninh Thuận: NinhThuan"),
                    new Domain.Catalog.Config("Mẫu phiếu kiểm soát hồ sơ", "phieu-kiem-soat", 2, true, "Public", string.Empty, "Ví dụ Ninh Thuận: NinhThuan"),
                    new Domain.Catalog.Config("Mật khẩu mặc định", "default_password", 1, true, "QuanTri", "Default@123", null),
                    new Domain.Catalog.Config("Recaptcha public key", "recaptcha_site_key", 1, true, "Public", string.Empty, "Recaptcha dùng ở cổng"),
                    new Domain.Catalog.Config("Form đăng nhập - Tên phần mềm", "ten-ung-dung", 1, true, "Public", "HỆ THỐNG THÔNG TIN GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH", null),
                    new Domain.Catalog.Config("Form đăng nhập - Tên đơn vị", "ten-don-vi", 1, true, "Public", "TỈNH ...", null),
                    new Domain.Catalog.Config("Form đăng nhập - Footer", "footer-dang-nhap", 1, true, "Public", "2023 © - Tỉnh ...", null),
                    new Domain.Catalog.Config("Logo đăng nhập", "logo-dang-nhap", 1, true, "Public", "/images/logo-dang-nhap.png", null),
                    new Domain.Catalog.Config("Logo quản trị", "logo-quan-tri", 1, true, "Public", "/images/logo-quan-tri.png", null),
                    new Domain.Catalog.Config("Site Id cổng dịch vụ công", "site_id_portal", 1, true, "Public", " ", "ID cổng của tỉnh để cập nhật dữ liệu EMC"),
                    new Domain.Catalog.Config("Hiển thị chatbot", "show_chatbot", 1, true, "Public", "false", "Hiển thị chatbot ngoài cổng DVC"),
                    new Domain.Catalog.Config("Cấu hình upload", "file_upload", 1, true, "Public", "{ \"size\" : 60, \"accept\": [\"image/png\", \"image/jpg\", \"image/jpeg\", \"image/gif\",\"image/webp\",\"image/svg+xml\", \"application/pdf\", \"application/msword\", \"text/html\", \"application/vnd.openxmlformats-officedocument.wordprocessingml.document\", \"application/vnd.ms-excel\", \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\", \"application/vnd.rar\", \"application/zip\", \"docx\", \"doc\"] }", "Định dạng upload và dung lượng tối đa"),
                    new Domain.Catalog.Config("Tên đơn vị", "ten-don-vi-lowercase", 1, true, "Public", " ", "Tên đơn vị"),
                    new Domain.Catalog.Config("Mã tỉnh", "ma-tinh", 1, true, "Public", " ", "Mã tỉnh"),
                    new Domain.Catalog.Config("Cán bộ thêm đầy đủ các tệp đã ký số vào thành phần hồ sơ trước khi gửi", "post_create_hoso", 1, true, "Public", "{\"uploadSignedFile\":false,\"allowSameFileName\":false}", "Cán bộ thêm đầy đủ các tệp đã ký số vào thành phần hồ sơ trước khi gửi"),
                    new Domain.Catalog.Config("Ngày báo quá hạn xử lý hồ sơ", "ngay-qua-han-xu-ly-ho-so", 1, true, "Public", "2", "Ngày báo quá hạn xử lý hồ sơ"),
                    new Domain.Catalog.Config("Chức năng Ký điện tử công dân", "ky-dien-tu-cong-dan", 1, true, "Public", "1", "Chức năng Ký điện tử công dân"),
                    new Domain.Catalog.Config("Mã bảo mật", "security-code", 1, true, "Public", "0", "Yêu cầu mã bảo mật đăng nhập 1 | 0"),
                    new Domain.Catalog.Config("Cấu hình api theo dõi liên thông QLVB", "config-lien-thong-qlvb", 1, true, "Public", "{\"urlapi\": \"https://api....gov.vn\", \"token\": \"...\"}", "Cấu hình api theo dõiliên thông QLVB"),
                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedCatalogDanhMucChung(ApplicationDbContext dbContext)
    {
        if (!dbContext.DanhMucChungs.Any(x => x.Type == "danh-muc-nganh"))
        {
            dbContext.DanhMucChungs.AddRange(
                new List<Domain.Catalog.DanhMucChung>()
                {
                    new Domain.Catalog.DanhMucChung("Nông nghiệp và Phát triển nông thôn", "000.00.00.G10", 10, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Văn hóa Thể thao và Du lịch", "000.00.00.G16", 16, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Thông tin Truyền thông", "000.00.00.G14", 14, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Giáo dục Đào tạo", "000.00.00.G03", 3, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Công an", "000.00.00.G01", 1, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Y tế", "000.00.00.G18", 18, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Khác", "000.00.00.G66", 23, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Khoa học Công nghệ", "000.00.00.G06", 6, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Giao thông vận tải", "000.00.00.G04", 4, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Lao động - Thương binh và Xã hội", "000.00.00.G07", 7, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Công Thương", "000.00.00.G02", 2, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Ngoại giao", "000.00.00.G08", 8, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Kế hoạch Đầu tư", "000.00.00.G05", 5, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Nội vụ", "000.00.00.G09", 9, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Quốc phòng An ninh", "000.00.00.G11", 11, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Xây dựng", "000.00.00.G17", 17, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Thanh tra", "000.00.00.G20", 20, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Dân tộc", "000.00.00.G21", 21, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Ngân hàng", "000.00.00.G19", 19, true, "danh-muc-nganh"),
                    new Domain.Catalog.DanhMucChung("Tư pháp", "000.00.00.G15", 15, true, "danh-muc-nganh"),
                });

            await dbContext.SaveChangesAsync();
        }

        if (!dbContext.DanhMucChungs.Any(x => x.Type == "dan-toc-bao-tro-xa-hoi"))
        {
            dbContext.DanhMucChungs.AddRange(
                new List<Domain.Catalog.DanhMucChung>()
                {
                    new Domain.Catalog.DanhMucChung("Kinh", "1", 1, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Tày", "2", 2, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Thái", "3", 3, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Hoa", "4", 4, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Khơ-me", "5", 5, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Mường", "6", 6, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Nùng", "7", 7, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("HMông", "8", 8, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Dao", "9", 9, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Gia-rai", "10", 10, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Ngái", "11", 11, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Ê-đê", "12", 12, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Ba na", "13", 13, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Xơ-Đăng", "14", 14, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Sán Chay", "15", 15, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Cơ-ho", "16", 16, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Chăm", "17", 17, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Sán Dìu", "18", 18, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Hrê", "19", 19, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Mnông", "20", 20, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Ra-glai", "21", 21, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Xtiêng", "22", 22, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Bru-Vân Kiều", "23", 23, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Thổ", "24", 24, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Giáy", "25", 25, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Cơ-tu", "26", 26, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Gié Triêng", "27", 27, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Mạ", "28", 28, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Khơ-mú", "29", 29, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Co", "30", 30, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Tà-ôi", "31", 31, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Chơ-ro", "32", 32, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Kháng", "33", 33, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Xinh-mun", "34", 34, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Hà Nhì", "35", 35, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Chu ru", "36", 36, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Lào", "37", 37, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("La Chí", "38", 38, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("La Ha", "39", 39, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Phù Lá", "40", 40, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("La Hủ", "41", 41, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Lự", "42", 42, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Lô Lô", "43", 43, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Chứt", "44", 44, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Mảng", "45", 45, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Pà Thẻn", "46", 46, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Co Lao", "47", 47, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Cống", "48", 48, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Bố Y", "49", 49, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Si La", "50", 50, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Pu Péo", "51", 51, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Brâu", "52", 52, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Ơ Đu", "53", 53, true, "dan-toc-bao-tro-xa-hoi"),
                    new Domain.Catalog.DanhMucChung("Rơ măm", "54", 54, true, "dan-toc-bao-tro-xa-hoi")
                });

            await dbContext.SaveChangesAsync();
        }

        if (!dbContext.DanhMucChungs.Any(x => x.Type == "chuc-vu"))
        {
            dbContext.DanhMucChungs.AddRange(
                new List<Domain.Catalog.DanhMucChung>()
                {
                    new Domain.Catalog.DanhMucChung("Cán bộ", "CB", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Chánh thanh tra", "CTT", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Chánh văn phòng", "CVP", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Phó Chánh văn phòng", "PCVP", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Chi cục trưởng", "CCT", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Chủ tịch", "CT", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Chuyên viên", "CV", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Chuyên viên CN VPDK", "CVCNVPDK", 23, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Giám đốc", "GĐ", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Hạt trưởng", "HT", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Phó Chánh thanh tra", "PCTT", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Phó Chi cục trưởng", "PCCT", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Phó giám đốc", "PGĐ", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Trưởng phòng", "TP", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Phó Trưởng phòng", "PTP", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Văn thư", "VT", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Phó chủ tịch", "PCT", 17, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Thanh tra viên", "TTV", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Trưởng ban", "TB", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Phó trưởng ban", "PTB", 11, true, "chuc-vu"),
                    new Domain.Catalog.DanhMucChung("Chuyên viên xã", "CVX", 15, true, "chuc-vu"),
                });

            await dbContext.SaveChangesAsync();
        }

        if (!dbContext.DanhMucChungs.Any(x => x.Type == "nhom-co-cau"))
        {
            dbContext.DanhMucChungs.AddRange(
                new List<Domain.Catalog.DanhMucChung>()
                {
                    new Domain.Catalog.DanhMucChung("Quận huyện", "quan-huyen", 1, true, "nhom-co-cau"),
                    new Domain.Catalog.DanhMucChung("Sở ngành", "so-ban-nganh", 1, true, "nhom-co-cau"),
                    new Domain.Catalog.DanhMucChung("Xã phường", "xa-phuong", 1, true, "nhom-co-cau"),
                    new Domain.Catalog.DanhMucChung("Chi nhánh VPĐK đất đai", "cnvpdk", 1, true, "nhom-co-cau")
                });

            await dbContext.SaveChangesAsync();
        }

        if (!dbContext.DanhMucChungs.Any(x => x.Type == "nhom-co-cau-khac"))
        {
            dbContext.DanhMucChungs.AddRange(
                new List<Domain.Catalog.DanhMucChung>()
                {
                    new Domain.Catalog.DanhMucChung("Miền núi", "mien-nui", 1, true, "nhom-co-cau-khac"),
                    new Domain.Catalog.DanhMucChung("Hải đảo", "hai-dao", 1, true, "nhom-co-cau-khac")
                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedBusinessScreenAction(ApplicationDbContext dbContext)
    {
        if (!dbContext.Screens.Any() && !dbContext.Actions.Any() && !dbContext.ScreenActions.Any())
        {
            #region add Screen
            var sTiepNhanHSTrucTiep = dbContext.Screens.Add(new Domain.Business.Screen("Menu tiếp nhận hồ sơ trực tiếp", "tiep-nhan-ho-so-truc-tiep", true, true));
            var sDangXLHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu đang xử lý hồ sơ", "dang-xu-ly-ho-so", true, true));
            var sChuyenXLHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu chuyển xử lý hồ sơ", "da-chuyen-xu-ly-ho-so", true, true));
            var sDungXLHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu dừng xử lý hồ sơ", "dung-xu-ly", true, true));
            var sYCTHNghiaVuTaiChinh = dbContext.Screens.Add(new Domain.Business.Screen("Menu yêu cầu thực hiện nghĩa vụ tài chính", "yeu-cau-thuc-hien-nghia-vu-tai-chinh", true, true));
            var sDaChuyenBoSung = dbContext.Screens.Add(new Domain.Business.Screen("Menu đã chuyển bổ sung", "da-chuyen-bo-sung", true, true));
            var sDaChuyenCoKQ = dbContext.Screens.Add(new Domain.Business.Screen("Menu đã chuyển có kết quả", "da-chuyen-co-ket-qua", true, true));
            var sChoBSHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu chờ bổ sung hồ sơ", "cho-bo-sung-ho-so", true, true));
            var sDaBSHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu đã bổ sung hồ sơ", "da-bo-sung-ho-so", true, true));
            var sTiepNhanHSTrucTuyen = dbContext.Screens.Add(new Domain.Business.Screen("Menu tiếp nhận hồ sơ trực tuyến", "tiep-nhan-ho-so-truc-tuyen", true, true));
            var sTraKQTrucTuyen = dbContext.Screens.Add(new Domain.Business.Screen("Menu trả kết quả trực tuyến", "cho-tra-ket-qua-truc-tuyen", true, true));
            var sTraKQTrucTiep = dbContext.Screens.Add(new Domain.Business.Screen("Menu trả kết quả hồ sơ trực tiếp", "cho-tra-ket-qua-truc-tiep", true, true));
            var sChoTraBCCI = dbContext.Screens.Add(new Domain.Business.Screen("Menu chờ trả bcci", "cho-tra-bcci", true, true));
            var sYCBSHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu yêu cầu bổ sung hố sơ", "yeu-cau-bo-sung", true, true));
            var sTraCuuHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu tra cứu hồ sơ", "tra-cuu-ho-so", true, true));

            await dbContext.SaveChangesAsync();
            #endregion
            #region Add Actions
            var aThemMoiHS = dbContext.Actions.Add(new Domain.Business.Action("Thêm mới", "them-moi", 1, null, null, "PlusOutlined", "#4b8df8", null, null));
            var aChuyenBuocXLHS = dbContext.Actions.Add(new Domain.Business.Action("Chuyển bước xử lý", "chuyen-buoc-xu-ly", 2, null, null, "StepForwardOutlined", "#35aa47", null, null));
            var aSuaHS = dbContext.Actions.Add(new Domain.Business.Action("Sửa hồ sơ", "sua-ho-so", 3, null, null, "EditOutlined", "#4b8df8", null, null));
            var aCapNhatKQXLHS = dbContext.Actions.Add(new Domain.Business.Action("Cập nhật kết quả xử lý hồ sơ", "cap-nhat-ket-qua-xu-ly-ho-so", 4, null, null, "CloudUploadOutlined", "#35aa47", null, null));
            var aThayDoiTHXL = dbContext.Actions.Add(new Domain.Business.Action("Thay đổi trường hợp xử lý", "thay-doi-truong-hop-xu-ly", 5, null, null, "SwapOutlined", "#ffb848", null, null));
            var aYCThuPhi = dbContext.Actions.Add(new Domain.Business.Action("Yêu cầu thu phí, lệ phí", "yeu-cau-thu-phi-le-phi-ho-so", 6, null, null, "DollarOutlined", "#4b8df8", null, null));
            var aXoaHS = dbContext.Actions.Add(new Domain.Business.Action("Xóa hồ sơ", "xoa-ho-so", 7, null, null, "DeleteOutlined", "#d84a38", null, null));
            var aTraLaiBuocTruoc = dbContext.Actions.Add(new Domain.Business.Action("Trả lại bước trước", "tra-lai-buoc-truoc", 8, null, null, "StepBackwardOutlined", "#16ffd4", null, null));
            var aChuyenNoiBo = dbContext.Actions.Add(new Domain.Business.Action("Chuyển nội bộ", "chuyen-noi-bo-ho-so", 9, null, null, "RetweetOutlined", "#ffee16", null, null));
            var aKetThucHS = dbContext.Actions.Add(new Domain.Business.Action("Kết thúc", "ket-thuc-ho-so", 10, null, null, "LogoutOutlined", "#d43f23", null, null));
            var aTraKQ = dbContext.Actions.Add(new Domain.Business.Action("Trả kết quả", "tra-ket-qua-ho-so", 11, null, null, "IssuesCloseOutlined", "#1668ff", null, null));
            var aThuHoiHS = dbContext.Actions.Add(new Domain.Business.Action("Thu hồi", "thu-hoi-ho-so", 12, null, null, "RetweetOutlined", "#16fff8", null, null));
            var aYCBS = dbContext.Actions.Add(new Domain.Business.Action("Yêu cầu bổ sung", "yeu-cau-mot-cua-bo-sung-ho-so", 13, null, null, "RollbackOutlined", "#ddff16", null, null));
            var aCapNhatBS = dbContext.Actions.Add(new Domain.Business.Action("Cập nhật bổ sung", "cap-nhat-bo-sung-ho-so", 14, null, null, "EditOutlined", "#46ff16", null, null));
            var aChuyenBuocNhanh = dbContext.Actions.Add(new Domain.Business.Action("Chuyển bước nhanh", "chuyen-buoc-nhanh-ho-so", 15, null, null, "FastForwardOutlined", "#35aa47", null, null));
            var aYCCongDanBS = dbContext.Actions.Add(new Domain.Business.Action("Yêu cầu công dân bổ sung", "yeu-cau-cong-dan-bo-sung-ho-so", 18, null, null, "RollbackOutlined", "#fff516", null, null));
            var aTiepNhanHSTrucTuyen = dbContext.Actions.Add(new Domain.Business.Action("Tiếp nhận", "tiep-nhan-ho-so-truc-tuyen", 1, null, null, "CheckOutlined", "#1bff16", null, null));
            var aTuChoiTiepNhanHSTrucTuyen = dbContext.Actions.Add(new Domain.Business.Action("Từ chối tiếp nhận", "tu-choi-tiep-nhan-ho-so-truc-tuyen", 21, null, null, "StopOutlined", "#da2911", null, null));
            var aTraBS = dbContext.Actions.Add(new Domain.Business.Action("Trả bổ sung", "tra-bo-sung", 1, "Permissions.NhomCanBoMotCua.View", null, "RollbackOutlined", null, null, null));
            var aHoanThanhBS = dbContext.Actions.Add(new Domain.Business.Action("Hoàn thành bổ sung", "hoan-thanh-bo-sung", 15, "Permissions.NhomCanBoMotCua.View", null, "StepForwardOutlined", null, null, null));
            var aKhongTiepNhanHSQH = dbContext.Actions.Add(new Domain.Business.Action("Không tiếp nhận hồ sơ quá hạn", "khong-tiep-nhan-ho-so-bo-sung-qua-han", 15, "Permissions.NhomCanBoMotCua.View", null, "StopOutlined", "#e15535", null, null));
            var aDatLaiHanXL = dbContext.Actions.Add(new Domain.Business.Action("Đặt lại hạn xử lý", "dat-lai-han-xu-ly", 15, "Permissions.NhomQuanTriHeThong.View", null, "RetweetOutlined", "#ffb616", null, null));

            await dbContext.SaveChangesAsync();
            #endregion
            #region Add ScreenAction
            dbContext.ScreenActions.AddRange(// tiep-nhan-ho-so-truc-tiep
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aThemMoiHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aChuyenBuocXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aSuaHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aThayDoiTHXL.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aXoaHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aChuyenBuocNhanh.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// dang-xu-ly-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aChuyenBuocXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aTraLaiBuocTruoc.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aChuyenNoiBo.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aKetThucHS.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aYCBS.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// da-chuyen-xu-ly-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sChuyenXLHS.Entity.Id, aThuHoiHS.Entity.Id),
                    new Domain.Business.ScreenAction(sChuyenXLHS.Entity.Id, aYCThuPhi.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// dung-xu-ly
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sDungXLHS.Entity.Id, aChuyenBuocXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sDungXLHS.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// yeu-cau-thuc-hien-nghia-vu-tai-chinh
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sYCTHNghiaVuTaiChinh.Entity.Id, aChuyenBuocXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sYCTHNghiaVuTaiChinh.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// cho-bo-sung-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sChoBSHS.Entity.Id, aCapNhatBS.Entity.Id),
                    new Domain.Business.ScreenAction(sChoBSHS.Entity.Id, aKhongTiepNhanHSQH.Entity.Id),

                });

            dbContext.ScreenActions.AddRange(// da-bo-sung-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sDaBSHS.Entity.Id, aCapNhatBS.Entity.Id),
                    new Domain.Business.ScreenAction(sDaBSHS.Entity.Id, aHoanThanhBS.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// tiep-nhan-ho-so-truc-tuyen
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTuyen.Entity.Id, aTiepNhanHSTrucTuyen.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTuyen.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTuyen.Entity.Id, aYCBS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTuyen.Entity.Id, aTuChoiTiepNhanHSTrucTuyen.Entity.Id),

                });

            dbContext.ScreenActions.AddRange(// cho-tra-ket-qua-truc-tuyen
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTraKQTrucTuyen.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTraKQTrucTuyen.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sTraKQTrucTuyen.Entity.Id, aTraKQ.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// cho-tra-ket-qua-truc-tiep
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTraKQTrucTiep.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTraKQTrucTiep.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sTraKQTrucTiep.Entity.Id, aTraKQ.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// cho-tra-bcci
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sChoTraBCCI.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sChoTraBCCI.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sChoTraBCCI.Entity.Id, aTraKQ.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// tra-cuu-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTraCuuHS.Entity.Id, aDatLaiHanXL.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// yeu-cau-bo-sung
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sYCBSHS.Entity.Id, aTraBS.Entity.Id),
                });

            await dbContext.SaveChangesAsync();
            #endregion

        }
    }

    private async Task SeedBusinessLoaiPhiLePhi(ApplicationDbContext dbContext)
    {
        if (!dbContext.LoaiPhiLePhis.Any())
        {
            dbContext.LoaiPhiLePhis.AddRange(
                new List<Domain.Business.LoaiPhiLePhi>()
                {
                    new Domain.Business.LoaiPhiLePhi("Phí", "P", true),
                    new Domain.Business.LoaiPhiLePhi("Lệ phí", "LP", true),

                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedBusinessTrangThaiHoSo(ApplicationDbContext dbContext)
    {
        if (!dbContext.TrangThaiHoSos.Any())
        {
            dbContext.TrangThaiHoSos.AddRange(
                new List<Domain.Business.TrangThaiHoSo>()
                {
                    new Domain.Business.TrangThaiHoSo("Mới đăng ký", "1", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Được tiếp nhận", "2", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Không được tiếp nhận", "3", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Đang xử lý", "4", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Yêu cầu bổ sung giấy tờ", "5", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Yêu cầu thực hiện nghĩa vụ tài chính", "6", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Công dân yêu cầu rút hồ sơ", "7", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Dừng xử lý", "8", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Đã xử lý xong", "9", string.Empty, true),
                    new Domain.Business.TrangThaiHoSo("Đã trả kết quả", "10", string.Empty, true),

                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedCatalogMenu(ApplicationDbContext dbContext)
    {
        if (!dbContext.Menus.Any())
        {
            var congDVC = dbContext.Menus.Add(new Domain.Catalog.Menu("Cổng Dịch vụ công", null, 1, true, "portaldvc", "/portaldvc", null, null, null, true));
            var htMotCuaRoot = dbContext.Menus.Add(new Domain.Catalog.Menu("HT một cửa điện tử", null, 2, true, "dvc", "/dvc", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View#Permissions.NhomQuanTriDonVi.View#Permissions.NhomQuanTriHeThong.View", null, true));
            var quanTriCongRoot = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị cổng DVC", null, 4, true, "portaldvc_admin", "/portaldvc_admin", null, "Permissions.NhomQuanTriHeThong.View", null, true));
            var quanTriRoot = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị hệ thống", null, 3, true, "admin", "/admin", null, "Permissions.NhomQuanTriHeThong.View#Permissions.NhomQuanTriDonVi.View", null, true));

            var pTiepNhanHS = dbContext.Menus.Add(new Domain.Catalog.Menu("Tiếp nhận hồ sơ", htMotCuaRoot.Entity.Id, 1, true, "dvc", "/dvc/tiep-nhan-ho-so", "FormOutlined", "Permissions.NhomCanBoMotCua.View", null));
            var pBoSungHS = dbContext.Menus.Add(new Domain.Catalog.Menu("Bổ sung hồ sơ", htMotCuaRoot.Entity.Id, 2, true, "dvc", "/dvc/bo-sung-ho-so", "IssuesCloseOutlined", "Permissions.NhomCanBoMotCua.View", null));
            var pTheoDoiHS = dbContext.Menus.Add(new Domain.Catalog.Menu("Theo dõi hồ sơ", htMotCuaRoot.Entity.Id, 3, true, "dvc", "/dvc/theo-doi-ho-so", "EyeOutlined", "Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null));
            var pTheoDoiHSTN = dbContext.Menus.Add(new Domain.Catalog.Menu("Theo dõi hồ sơ tiếp nhận", htMotCuaRoot.Entity.Id, 10, true, "dvc", "/dvc/theo-doi-ho-so-tn", "EyeOutlined", "Permissions.NhomCanBoMotCua.View", null));
            var pXuLyHS = dbContext.Menus.Add(new Domain.Catalog.Menu("Xử lý hồ sơ", htMotCuaRoot.Entity.Id, 4, true, "dvc", "/dvc/xu-ly-ho-so", "PlayCircleOutlined", "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null));
            var pTraKetQua = dbContext.Menus.Add(new Domain.Catalog.Menu("Trả kết quả", htMotCuaRoot.Entity.Id, 5, true, "dvc", "/dvc/tra-ket-qua", "ExportOutlined", "Permissions.NhomCanBoMotCua.View", null));
            var pThuPhiLePhi = dbContext.Menus.Add(new Domain.Catalog.Menu("Thu phí lệ phí", htMotCuaRoot.Entity.Id, 6, true, "dvc", "/dvc/thu-phi-le-phi", "DollarOutlined", "Permissions.NhomCanBoMotCua.View", null));
            var pTraCuu = dbContext.Menus.Add(new Domain.Catalog.Menu("Tra cứu", htMotCuaRoot.Entity.Id, 7, true, "dvc", "/dvc/tra-cuu", "SearchOutlined", "Permissions.NhomQuanTriHeThong.View#Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null));
            var pThongKeBaoCao = dbContext.Menus.Add(new Domain.Catalog.Menu("Thống kê báo cáo", htMotCuaRoot.Entity.Id, 8, true, "dvc", "/dvc/thong-ke", "FileDoneOutlined", "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null));
            var pQuanTriCongDVC = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị", quanTriCongRoot.Entity.Id, 2, true, "portaldvc_admin", "/portaldvc_admin", "SettingOutlined", "Permissions.NhomQuanTriHeThong.View", null));

            var pQuanTriNguoiDung = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị người dùng", quanTriRoot.Entity.Id, 1, true, "admin", "/admin/quan-tri-nguoi-dung", "UserOutlined", "Permissions.NhomQuanTriHeThong.View", null));
            var pDanhMucDungChung = dbContext.Menus.Add(new Domain.Catalog.Menu("Danh mục dùng chung", quanTriRoot.Entity.Id, 4, true, "admin", "/admin/danh-muc-dung-chung", "MenuUnfoldOutlined", "Permissions.NhomQuanTriHeThong.View", null));
            var pDanhMucDVC = dbContext.Menus.Add(new Domain.Catalog.Menu("Danh mục DVC", quanTriRoot.Entity.Id, 2, true, "admin", "/admin/danh-muc-dvc", "StarOutlined", "Permissions.NhomQuanTriHeThong.View", null));
            var pQuanTriKhac = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị cấu hình", quanTriRoot.Entity.Id, 3, true, "admin", "/admin/quan-tri", "SettingOutlined", "Permissions.NhomQuanTriHeThong.View", null));
            var pQuanTriDonVi = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị đơn vị", quanTriRoot.Entity.Id, 2, true, "admin", "/admin/quan-tri-don-vi", "AlignCenterOutlined", "Permissions.NhomQuanTriDonVi.View", null));

            var pHoSoTrucTuyen = dbContext.Menus.Add(new Domain.Catalog.Menu("Hồ sơ trực tuyến", pThongKeBaoCao.Entity.Id, 3, true, "dvc", "/dvc/thong-ke/tiep-nhan-ho-so-truc-tuyen", "FileDoneOutlined", "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null));
            var pQuyetDinh766 = dbContext.Menus.Add(new Domain.Catalog.Menu("Quyết định 766", pThongKeBaoCao.Entity.Id, 4, true, "dvc", "/dvc/thong-ke/quyet-dinh-766", "FileDoneOutlined", "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null));

            dbContext.Menus.AddRange(
                new List<Domain.Catalog.Menu>()
                {
                    new Domain.Catalog.Menu("Mới tiếp nhận", pTiepNhanHS.Entity.Id, 3, true, "dvc", "/dvc/tiep-nhan-ho-so/moi-tiep-nhan", null, "Permissions.NhomCanBoMotCua.View", "tiep-nhan-ho-so-truc-tiep"),
                    new Domain.Catalog.Menu("Chờ tiếp nhận trực tuyến", pTiepNhanHS.Entity.Id, 4, true, "dvc", "/dvc/tiep-nhan-ho-so/cho-tiep-nhan-truc-tuyen", null, "Permissions.NhomCanBoMotCua.View", "tiep-nhan-ho-so-truc-tuyen"),
                    new Domain.Catalog.Menu("Từ chối tiếp nhận", pTiepNhanHS.Entity.Id, 5, true, "dvc", "/dvc/tiep-nhan-ho-so/tu-choi-tiep-nhan", null, "Permissions.NhomCanBoMotCua.View", null),
                    new Domain.Catalog.Menu("Đã chuyển xử lý", pTiepNhanHS.Entity.Id, 6, true, "dvc", "/dvc/tiep-nhan-ho-so/da-chuyen-xu-ly", null, "Permissions.NhomCanBoMotCua.View", "da-chuyen-xu-ly-ho-so"),
                    new Domain.Catalog.Menu("Yêu cầu bổ sung", pBoSungHS.Entity.Id, 3, true, "dvc", "/dvc/bo-sung-ho-so/yeu-cau-bo-sung", null, "Permissions.NhomCanBoMotCua.View", "yeu-cau-bo-sung"),
                    new Domain.Catalog.Menu("Chờ bổ sung", pBoSungHS.Entity.Id, 4, true, "dvc", "/dvc/bo-sung-ho-so/cho-bo-sung", null, "Permissions.NhomCanBoMotCua.View", "cho-bo-sung-ho-so"),
                    new Domain.Catalog.Menu("Đã bổ sung", pBoSungHS.Entity.Id, 5, true, "dvc", "/dvc/bo-sung-ho-so/da-bo-sung", null, "Permissions.NhomCanBoMotCua.View", "da-bo-sung-ho-so"),
                    new Domain.Catalog.Menu("Đã hoàn thành bổ sung", pBoSungHS.Entity.Id, 6, true, "dvc", "/dvc/bo-sung-ho-so/da-hoan-thanh-bo-sung", null, "Permissions.NhomCanBoMotCua.View", "da-hoan-thanh-bo-sung"),
                    new Domain.Catalog.Menu("Hồ sơ tới hạn", pTheoDoiHS.Entity.Id, 3, true, "dvc", "/dvc/theo-doi-ho-so/ho-so-toi-han", null, "Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "ho-so-toi-han"),
                    new Domain.Catalog.Menu("Hồ sơ quá hạn", pTheoDoiHS.Entity.Id, 4, true, "dvc", "/dvc/theo-doi-ho-so/ho-so-qua-han", null, "Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "ho-so-qua-han"),
                    new Domain.Catalog.Menu("Theo dõi tất cả hồ sơ", pTheoDoiHS.Entity.Id, 5, true, "dvc", "/dvc/theo-doi-ho-so/theo-doi-tat-ca-ho-so", null, "Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "theo-doi-tat-ca-ho-so"),
                    new Domain.Catalog.Menu("Hồ sơ tới hạn", pTheoDoiHSTN.Entity.Id, 3, true, "dvc", "/dvc/theo-doi-ho-so-tn/ho-so-toi-han", null, "Permissions.NhomCanBoMotCua.View", "ho-so-tiep-nhan-toi-han"),
                    new Domain.Catalog.Menu("Hồ sơ quá hạn", pTheoDoiHSTN.Entity.Id, 4, true, "dvc", "/dvc/theo-doi-ho-so-tn/ho-so-qua-han", null, "Permissions.NhomCanBoMotCua.View", null),
                    new Domain.Catalog.Menu("Theo dõi tất cả hồ sơ", pTheoDoiHSTN.Entity.Id, 5, true, "dvc", "/dvc/theo-doi-ho-so-tn/theo-doi-tat-ca-ho-so", null, "Permissions.NhomCanBoMotCua.View", "theo-doi-ho-so-tn"),
                    new Domain.Catalog.Menu("Đang xử lý", pXuLyHS.Entity.Id, 3, true, "dvc", "/dvc/xu-ly-ho-so/dang-xu-ly", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "dang-xu-ly-ho-so"),
                    new Domain.Catalog.Menu("Dừng xử lý", pXuLyHS.Entity.Id, 4, true, "dvc", "/dvc/xu-ly-ho-so/dung-xu-ly", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "dung-xu-ly"),
                    new Domain.Catalog.Menu("Yêu cầu thực hiện nghĩa vụ tài chính", pXuLyHS.Entity.Id, 5, true, "dvc", "/dvc/xu-ly-ho-so/yeu-cau-thuc-hien-nghia-vu-tai-chinh", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "yeu-cau-thuc-hien-nghia-vu-tai-chinh"),
                    new Domain.Catalog.Menu("Đã chuyển xử lý", pXuLyHS.Entity.Id, 6, true, "dvc", "/dvc/xu-ly-ho-so/da-chuyen-xu-ly", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "da-chuyen-xu-ly-ho-so"),
                    new Domain.Catalog.Menu("Đã chuyển có kết quả", pXuLyHS.Entity.Id, 7, true, "dvc", "/dvc/xu-ly-ho-so/da-chuyen-co-ket-qua", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "da-chuyen-co-ket-qua"),
                    new Domain.Catalog.Menu("Đã chuyển bổ sung", pXuLyHS.Entity.Id, 8, true, "dvc", "/dvc/xu-ly-ho-so/da-chuyen-bo-sung", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", "da-chuyen-bo-sung"),
                    new Domain.Catalog.Menu("Chờ trả trực tuyến", pTraKetQua.Entity.Id, 3, true, "dvc", "/dvc/tra-ket-qua/cho-tra-truc-tuyen", null, "Permissions.NhomCanBoMotCua.View", "cho-tra-ket-qua-truc-tuyen"),
                    new Domain.Catalog.Menu("Chờ trả trực tiếp", pTraKetQua.Entity.Id, 4, true, "dvc", "/dvc/tra-ket-qua/cho-tra-truc-tiep", null, "Permissions.NhomCanBoMotCua.View", "cho-tra-ket-qua-truc-tiep"),
                    new Domain.Catalog.Menu("Chờ trả BCCI", pTraKetQua.Entity.Id, 5, true, "dvc", "/dvc/tra-ket-qua/cho-tra-bcci", null, "Permissions.NhomCanBoMotCua.View", "cho-tra-bcci"),
                    new Domain.Catalog.Menu("Xin rút", pTraKetQua.Entity.Id, 6, true, "dvc", "/dvc/tra-ket-qua/xin-rut", null, "Permissions.NhomCanBoMotCua.View", "xin-rut-ho-so"),
                    new Domain.Catalog.Menu("Đã trả", pTraKetQua.Entity.Id, 7, true, "dvc", "/dvc/tra-ket-qua/da-tra", null, "Permissions.NhomCanBoMotCua.View", "da-tra-ho-so"),
                    new Domain.Catalog.Menu("Chờ thu phí", pThuPhiLePhi.Entity.Id, 3, true, "dvc", "/dvc/thu-phi-le-phi/cho-thu-phi", null, "Permissions.NhomCanBoMotCua.View", "cho-thu-phi"),
                    new Domain.Catalog.Menu("Đã thu phí", pThuPhiLePhi.Entity.Id, 4, true, "dvc", "/dvc/thu-phi-le-phi/da-thu-phi", null, "Permissions.NhomCanBoMotCua.View", "da-thu-phi"),
                    new Domain.Catalog.Menu("Đã hoàn phí", pThuPhiLePhi.Entity.Id, 5, true, "dvc", "/dvc/thu-phi-le-phi/da-hoan-phi", null, "Permissions.NhomCanBoMotCua.View", "da-hoan-phi"),
                    new Domain.Catalog.Menu("Hồ sơ đã thu phí trực tuyến", pThuPhiLePhi.Entity.Id, 6, true, "dvc", "/dvc/thu-phi-le-phi/ho-so-da-thu-phi-truc-tuyen", null, "Permissions.NhomCanBoMotCua.View", "ho-so-da-thu-phi-truc-tuyen"),
                    new Domain.Catalog.Menu("Tình hình sử dụng biên lai thu phí, lệ phí", pThuPhiLePhi.Entity.Id, 7, true, "dvc", "/dvc/thu-phi-le-phi/tinh-hinh-su-dung-bien-lai-thu-phi-le-phi", null, "Permissions.NhomCanBoMotCua.View", "tinh-hinh-su-dung-bien-lai-thu-phi"),
                    new Domain.Catalog.Menu("Thống kê thu phí, lệ phí", pThuPhiLePhi.Entity.Id, 8, true, "dvc", "/dvc/thu-phi-le-phi/thong-ke-thu-phi-le-phi", null, "Permissions.NhomCanBoMotCua.View", null),
                    new Domain.Catalog.Menu("CSDL dân cư", pTraCuu.Entity.Id, 3, true, "dvc", "/dvc/tra-cuu/csdl-dan-cu", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Tiếp nhận hồ sơ trực tuyến cấp tỉnh", pHoSoTrucTuyen.Entity.Id, 3, true, "dvc", "/dvc/thong-ke/ho-so-truc-tuyen-cap-tinh", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Tiếp nhận hồ sơ trực tuyến của các cơ sở, ban ngành", pHoSoTrucTuyen.Entity.Id, 4, true, "dvc", "/dvc/thong-ke/ho-so-truc-tuyen-cac-so-ban-nganh", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Tiếp nhận hồ sơ trực tuyến cấp huyện", pHoSoTrucTuyen.Entity.Id, 5, true, "dvc", "/dvc/thong-ke/ho-so-truc-tuyen-cap-huyen", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Tiếp nhận hồ sơ trực tuyến cấp xã", pHoSoTrucTuyen.Entity.Id, 6, true, "dvc", "/dvc/thong-ke/ho-so-truc-tuyen-cap-xa", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),

                    new Domain.Catalog.Menu("Thống kê tiến độ giải quyết", pQuyetDinh766.Entity.Id, 7, true, "dvc", "/dvc/thong-ke/tien-do-giai-quyet", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Thống kê theo dõi chỉ tiêu DVC trực tuyến", pQuyetDinh766.Entity.Id, 8, true, "dvc", "/dvc/thong-ke/theo-doi-chi-tieu-dvc-truc-tuyen", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Thống kê thanh toán trực tuyến", pQuyetDinh766.Entity.Id, 9, true, "dvc", "/dvc/thong-ke/thanh-toan-truc-tuyen", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),

                    new Domain.Catalog.Menu("Chỉ tiêu số hóa", pQuyetDinh766.Entity.Id, 10, true, "dvc", "/dvc/thong-ke/chi-tieu-so-hoa", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Chỉ tiêu DVC trực tuyến", pQuyetDinh766.Entity.Id, 11, true, "dvc", "/dvc/thong-ke/theo-doi-chi-tieu-dvc-truc-tuyen-2", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Chỉ tiêu thanh toán trực tuyến", pQuyetDinh766.Entity.Id, 12, true, "dvc", "/dvc/thong-ke/thanh-toan-truc-tuyen-2", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),
                    new Domain.Catalog.Menu("Chỉ tiêu tiến độ giải quyết", pQuyetDinh766.Entity.Id, 13, true, "dvc", "/dvc/thong-ke/tien-do-giai-quyet-2", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View", null),

                    new Domain.Catalog.Menu("Kênh tin", pQuanTriCongDVC.Entity.Id, 1, true, "portaldvc_admin", "/portaldvc_admin/kenhtin", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Quản lý liên kết", pQuanTriCongDVC.Entity.Id, 2, true, "portaldvc_admin", "/portaldvc_admin/quanlylienket", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Banner", pQuanTriCongDVC.Entity.Id, 3, true, "portaldvc_admin", "/portaldvc_admin/banner", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Footer", pQuanTriCongDVC.Entity.Id, 4, true, "portaldvc_admin", "/portaldvc_admin/footer", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Tin bài", pQuanTriCongDVC.Entity.Id, 5, true, "portaldvc_admin", "/portaldvc_admin/tinbai", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Kiểu nội dung", pQuanTriCongDVC.Entity.Id, 6, true, "portaldvc_admin", "/portaldvc_admin/kieunoidung", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Trạng thái", pQuanTriCongDVC.Entity.Id, 7, true, "portaldvc_admin", "/portaldvc_admin/trangthai", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh sách tài liệu hướng dẫn sử dụng", pQuanTriCongDVC.Entity.Id, 8, true, "portaldvc_admin", "/portaldvc_admin/dstailieuhdsd", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Câu hỏi phổ biến", pQuanTriCongDVC.Entity.Id, 9, true, "portaldvc_admin", "/portaldvc_admin/cauhoiphobien", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Hướng dẫn sử dụng", pQuanTriCongDVC.Entity.Id, 10, true, "portaldvc_admin", "/portaldvc_admin/huongdansudung", null, "Permissions.NhomQuanTriHeThong.View", null),

                    new Domain.Catalog.Menu("Cơ cấu tổ chức", pQuanTriNguoiDung.Entity.Id, 1, true, "admin", "/admin/quan-tri-nguoi-dung/co-cau-to-chuc", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục vai trò", pQuanTriNguoiDung.Entity.Id, 2, true, "admin", "/admin/quan-tri-nguoi-dung/vai-tro", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("TK từ CSDL dân cư", pQuanTriNguoiDung.Entity.Id, 3, false, "admin", "/admin/quan-tri-nguoi-dung/tk-csdl-dan-cu", null, "Permissions.NhomQuanTriHeThong.View", null),

                    new Domain.Catalog.Menu("Danh mục quốc tịch", pDanhMucDungChung.Entity.Id, 3, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=quoc-tich", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục dân tộc", pDanhMucDungChung.Entity.Id, 4, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=dan-toc", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục học vấn", pDanhMucDungChung.Entity.Id, 5, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=hoc-van", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục chức vụ", pDanhMucDungChung.Entity.Id, 6, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=chuc-vu", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục học vị", pDanhMucDungChung.Entity.Id, 7, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=hoc-vi", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục lãnh đạo", pDanhMucDungChung.Entity.Id, 8, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=lanh-dao", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục nghề nghiệp", pDanhMucDungChung.Entity.Id, 9, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=nghe-nghiep", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục tôn giáo", pDanhMucDungChung.Entity.Id, 10, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=ton-giao", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục ngày nghỉ", pDanhMucDungChung.Entity.Id, 11, true, "admin", "/admin/danh-muc-dung-chung/ngay-nghi", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục địa bàn", pDanhMucDungChung.Entity.Id, 12, true, "admin", "/admin/danh-muc-dung-chung/dia-ban", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Danh mục dân tộc Bảo trợ xã hội", pDanhMucDungChung.Entity.Id, 13, true, "admin", "/admin/danh-muc-dung-chung/danh-muc?type=dan-toc-bao-tro-xa-hoi", null, "Permissions.NhomQuanTriHeThong.View", null),

                    new Domain.Catalog.Menu("Lĩnh vực", pDanhMucDVC.Entity.Id, 1, true, "admin", "/admin/danh-muc-dvc/linh-vuc", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Thủ tục", pDanhMucDVC.Entity.Id, 2, true, "admin", "/admin/danh-muc-dvc/thu-tuc", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Thủ tục theo đơn vị", pDanhMucDVC.Entity.Id, 3, true, "admin", "/admin/danh-muc-dvc/thu-tuc-don-vi", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Nhóm người dùng", pDanhMucDVC.Entity.Id, 4, true, "admin", "/admin/danh-muc-dvc/nhom-nguoi-dung", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Mẫu phôi", pDanhMucDVC.Entity.Id, 5, true, "admin", "/admin/danh-muc-dvc/mau-phoi", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Phí, lệ phí", pDanhMucDVC.Entity.Id, 6, true, "admin", "/admin/danh-muc-dvc/phi-lephi", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Trạng thái", pDanhMucDVC.Entity.Id, 7, true, "admin", "/admin/danh-muc-dvc/trang-thai", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Bước xử lý", pDanhMucDVC.Entity.Id, 9, true, "admin", "/admin/danh-muc-dvc/buoc-xu-ly", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Đơn vị", pDanhMucDVC.Entity.Id, 10, true, "admin", "/admin/danh-muc-dvc/don-vi", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Thông báo", pDanhMucDVC.Entity.Id, 11, true, "admin", "/admin/danh-muc-dvc/thong-bao", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Tài khoản thụ hưởng", pDanhMucDVC.Entity.Id, 12, true, "admin", "/admin/danh-muc-dvc/tai-khoan-thu-huong", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Quản lí danh mục ngành", pDanhMucDVC.Entity.Id, 14, true, "admin", "/admin/danh-muc-dvc/quanlydanhmucnganh", null, "Permissions.NhomQuanTriHeThong.View", null),

                    new Domain.Catalog.Menu("Danh sách Menu", pQuanTriKhac.Entity.Id, 3, true, "admin", "/admin/quan-tri/danh-sach-menu", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Quản trị action", pQuanTriKhac.Entity.Id, 4, true, "admin", "/admin/quan-tri/action", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Quản trị screen", pQuanTriKhac.Entity.Id, 5, true, "admin", "/admin/quan-tri/screen", null, "Permissions.NhomQuanTriHeThong.View", null),
                    new Domain.Catalog.Menu("Quản trị config", pQuanTriKhac.Entity.Id, 6, true, "admin", "/admin/quan-tri/config", null, "Permissions.NhomQuanTriHeThong.View", null),

                    new Domain.Catalog.Menu("Danh mục người dùng", pQuanTriDonVi.Entity.Id, 3, true, "admin", "/admin/quan-tri-don-vi/danh-muc-nguoi-dung", null, "Permissions.NhomQuanTriDonVi.View", null),
                    new Domain.Catalog.Menu("Danh mục thủ tục", pQuanTriDonVi.Entity.Id, 4, true, "admin", "/admin/quan-tri-don-vi/danh-muc-thu-tuc", null, "Permissions.NhomQuanTriDonVi.View", null),
                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedPortalKenhTin(ApplicationDbContext dbContext)
    {
        if (!dbContext.KenhTins.Any() || !dbContext.KieuNoiDungs.Any())
        {
            var trangWiki = dbContext.KieuNoiDungs.Add(new Domain.Portal.KieuNoiDung("Trang Wiki", true, false, false));
            var lienKetNgoai = dbContext.KieuNoiDungs.Add(new Domain.Portal.KieuNoiDung("Liên kết ngoài", false, true, false));
            var danhSachKenhCon = dbContext.KieuNoiDungs.Add(new Domain.Portal.KieuNoiDung("Danh sách kênh con", false, false, false));
            var danhSachTinBai = dbContext.KieuNoiDungs.Add(new Domain.Portal.KieuNoiDung("Danh sách tin bài", false, false, true));

            dbContext.KenhTins.AddRange(
                new List<Domain.Portal.KenhTin>()
                {
                    new Domain.Portal.KenhTin("Dịch vụ công trực tuyến", null, string.Empty, 1, string.Empty, lienKetNgoai.Entity.Id, true, false, false, string.Empty, string.Empty, "/portaldvc/dvc-truc-tuyen"),
                    new Domain.Portal.KenhTin("Danh mục thủ tục hành chính", null, string.Empty, 2, string.Empty, lienKetNgoai.Entity.Id, true, false, false, string.Empty, string.Empty, "/portaldvc/danh-muc-tthc"),
                    new Domain.Portal.KenhTin("Thống kê", null, string.Empty, 3, string.Empty, lienKetNgoai.Entity.Id, true, false, false, string.Empty, string.Empty, "/portaldvc/thong-ke"),
                    new Domain.Portal.KenhTin("Thanh toán trực tuyến", null, string.Empty, 4, string.Empty, lienKetNgoai.Entity.Id, true, false, false, string.Empty, string.Empty, "/portaldvc/thanh-toan"),
                    new Domain.Portal.KenhTin("Tra cứu", null, string.Empty, 5, string.Empty, lienKetNgoai.Entity.Id, true, false, false, string.Empty, string.Empty, "/portaldvc/tra-cuu"),
                    new Domain.Portal.KenhTin("Khảo sát DVCTT", null, string.Empty, 7, string.Empty, lienKetNgoai.Entity.Id, false, false, false, string.Empty, string.Empty, string.Empty),
                    new Domain.Portal.KenhTin("Phản ánh kiến nghị", null, string.Empty, 8, string.Empty, lienKetNgoai.Entity.Id, false, false, false, string.Empty, string.Empty, string.Empty),
                    new Domain.Portal.KenhTin("Tin tức", null, string.Empty, 1, string.Empty, danhSachTinBai.Entity.Id, true, false, false, string.Empty, string.Empty, string.Empty),
                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedPortalQuanLyLienKet(ApplicationDbContext dbContext)
    {
        if (!dbContext.QuanLyLienKets.Any())
        {
            dbContext.QuanLyLienKets.AddRange(
                new List<Domain.Portal.QuanLyLienKet>()
                {
                    new Domain.Portal.QuanLyLienKet("Facebook", "facebook", string.Empty, false, 1),
                    new Domain.Portal.QuanLyLienKet("NCSC", "ncsc", string.Empty, true, 1),
                    new Domain.Portal.QuanLyLienKet("Zalo-DVC", "zalo", "https://zalo.me/34162798793657763", true, 1),
                    new Domain.Portal.QuanLyLienKet("Đăng nhập cán bộ", "dang-nhap-can-bo", "/login", true, 1),
                    new Domain.Portal.QuanLyLienKet("Đăng nhập công dân", "dang-nhap-cong-dan", "https://apidvc.....gov.vn/sso/authorize?state=", true, 1),
                    new Domain.Portal.QuanLyLienKet("Đăng nhập vneid", "dang-nhap-vneid", "https://apidvc.....gov.vn/vneidsso/authorize?state=", true, 1),
                    new Domain.Portal.QuanLyLienKet("Ảnh quan tâm Zalo", "image-quan-tam-zalo", "/images/QuanTamZaloNinhThuan.jpg", true, 1),
                    new Domain.Portal.QuanLyLienKet("Link quan tâm Zalo", "link-quan-tam-zalo", "https://zalo.me/34162798793657763", true, 1),
                    new Domain.Portal.QuanLyLienKet("Nút Dịch vụ công trực tuyến", "btnDichVuCongTrucTuyen", "/portaldvc/dvc-truc-tuyen", true, 1),
                    new Domain.Portal.QuanLyLienKet("Nút Dịch vụ công liên thông khai sinh, khai tử", "btnDichVuCongLienThong", "https://lienthong.dichvucong.gov.vn/", true, 1),
                    new Domain.Portal.QuanLyLienKet("Nút Kết quả đánh giá bộ chỉ số", "btnKQDanhGiaBoChiSo", "https://dichvucong.gov.vn/p/home/dvc-index-tinhthanhpho-tonghop.html", true, 1),
                    new Domain.Portal.QuanLyLienKet("Nộp hồ sơ công dân app", "nop-ho-so-cong-dan-app", "/mobile/nop-ho-so-truc-tuyen", true, 1),
                    new Domain.Portal.QuanLyLienKet("Chatbot app", "chatbot-app", "/mobile/nop-ho-so-truc-tuyen", true, 1),
                    new Domain.Portal.QuanLyLienKet("Kết nối cổng dịch vụ công quốc gia", "dvcQuocGia", "https://dichvucong.gov.vn", true, 1),

                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedCapThucHienDanhMucChung(ApplicationDbContext dbContext)
    {
        if (!dbContext.DanhMucChungs.Any(x => x.Type == "cap-thuc-hien"))
        {
            dbContext.DanhMucChungs.AddRange(
                new List<Domain.Catalog.DanhMucChung>()
                {
                    new Domain.Catalog.DanhMucChung("Cấp tỉnh", "CapTinh", 1, true, "cap-thuc-hien"),
                    new Domain.Catalog.DanhMucChung("Cấp huyện", "CapHuyen", 1, true, "cap-thuc-hien"),
                    new Domain.Catalog.DanhMucChung("Cấp xã", "CapXa", 1, true, "cap-thuc-hien"),
                    new Domain.Catalog.DanhMucChung("Cấp bộ", "CapBo", 1, true, "cap-thuc-hien"),
                    new Domain.Catalog.DanhMucChung("Cấp khác", "CapKhac", 1, true, "cap-thuc-hien"),
                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedLoaiKetQuaDanhMucChung(ApplicationDbContext dbContext)
    {
        if (!dbContext.DanhMucChungs.Any(x => x.Type == "loai-van-ban-ket-qua"))
        {
            dbContext.DanhMucChungs.AddRange(
                new List<Domain.Catalog.DanhMucChung>()
                {
                    new Domain.Catalog.DanhMucChung("Quyết định", "QuyetDinh", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Tờ trình", "ToTrinh", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Công văn", "CongVan", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Phiếu xin ý kiến", "PhieuXinYKien", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Giấy phép", "GiayPhep", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Giấy chứng nhận", "GiayChungNhan", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Chứng chỉ", "ChungChi", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Bằng công nhận", "BangCongNhan", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Bản sao", "BanSao", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Phiếu báo", "PhieuBao", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Giấy xác nhận", "GiayXacNhan", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Phù hiệu", "PhuHieu", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Phiếu", "Phieu", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Giấy khen", "GiayKhen", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Bằng khen", "BangKhen", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Báo cáo", "BaoCao", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Hướng dẫn", "HuongDan", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Thông báo", "ThongBao", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Trích lục cải chính", "TrichLucCaiChinh", 1, true, "loai-van-ban-ket-qua"),
                    new Domain.Catalog.DanhMucChung("Trích lục bản sao", "TrichLucBanSao", 1, true, "loai-van-ban-ket-qua"),

                });

            await dbContext.SaveChangesAsync();
        }
    }
}