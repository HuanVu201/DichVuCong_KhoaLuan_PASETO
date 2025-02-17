using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Net.Http.Json;
using System.Net.NetworkInformation;
using System.Net.WebSockets;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Shared.Authorization;
using static TD.DichVuCongApi.Application.Catalog.ThuTucApp.Service;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class CSDLDanCuResponse
{
    public string error_code { get; set; }
    public string message { get; set; }
}

public class CheckUserReponse
{
    public string Id { get; set; }
}

public class GetCDSLDanCu_DiaChiSelect
{
    public string TenDiaBan { get; set; }
    public string MaDiaBan { get; set; }
}

public class GetCSDLDanCuQueryHandler : IQueryHandler<GetCSDLDanCuQuery, UserCSDLResponse>
{
    private readonly ICurrentUser _user;
    private readonly IUserService _userService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<LogCSDLDanCuDoanhNghiep> _repositoryLogCSDL;
    private readonly bool enableOtp = false;
    public GetCSDLDanCuQueryHandler(
        IRepository<LogCSDLDanCuDoanhNghiep> repositoryLogCSDL,
        ICurrentUser currentUser,
        IUserService userService,
        IDapperRepository dapperRepository)
    {
        _repositoryLogCSDL = repositoryLogCSDL;
        _user = currentUser;
        _userService = userService;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<UserCSDLResponse>> Handle(GetCSDLDanCuQuery request, CancellationToken cancellationToken)
    {
        string sqlGetUserNew = $"SELECT TOP 1 PhoneNumber, Email FROM {SchemaNames.Identity}.{TableNames.Users} WHERE UserName = @UserName";
        string sqlCheckUserExist = "SELECT TOP 1 Id FROM [Identity].[Users] WHERE UserName = @UserName";
        string sqlGetUser = "SELECT TOP 1 Id, FullName, HoVaTen, GroupCode, Cha,ChuHo,DanToc,GioiTinh,Me,NamSinh,NgayThangNamSinh,NguoiDaiDien,NhomMau,NoiDangKyKhaiSinh,NoiOHienTai,QueQuan,QuocTich,SoCMND,SoDinhDanh,SoSoHoKhau,ThuongTru,TinhTrangHonNhan,TonGiao,VoChong FROM [Identity].[Users] WHERE UserName = @UserName";
        string sqlGetDiaChi = "SELECT MaDiaBan, TenDiaBan From [Catalog].[DiaBans] WHERE MaDiaBan In @MaDiaBan";
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlUpdateUser = $@"UPDATE [Identity].[Users] SET
                            SoDinhDanh = @SoDinhDanh,
                            HoVaTen = @HoVaTen,
                            SoCMND = @SoCMND,
                            FullName = @FullName,
                            GioiTinh = @GioiTinh,
                            DanToc = @DanToc,
                            TonGiao = @TonGiao,
                            TinhTrangHonNhan = @TinhTrangHonNhan,
                            NhomMau = @NhomMau,
                            NamSinh = @NamSinh,
                            NgayThangNamSinh = @NgayThangNamSinh,
                            NoiDangKyKhaiSinh = @NoiDangKyKhaiSinh,
                            QuocTich = @QuocTich,
                            QueQuan = @QueQuan,
                            ThuongTru = @ThuongTru,
                            NoiOHienTai = @NoiOHienTai,
                            Cha = @Cha,
                            Me = @Me,
                            VoChong = @VoChong,
                            NguoiDaiDien = @NguoiDaiDien,
                            SoSoHoKhau = @SoSoHoKhau

                            WHERE Id = @Id";

        var userId = _user.GetUserId().ToString();

        using (var httpClient = new HttpClient())
        {
            try
            {
                var log = new LogCSDLDanCuDoanhNghiep(_user.GetUserName(), currentTime, _user.GetUserOfficeCode(), JsonConvert.SerializeObject(request), "CSDL Dân cư");
                await _repositoryLogCSDL.AddAsync(log);
                HttpResponseMessage response = await httpClient.PostAsJsonAsync(request.Url, new
                {
                    request.HoVaTen,
                    request.SoDinhDanh,
                    request.SoCMND,
                    request.NgayThangNam,
                    request.Nam,
                    request.MaTichHop,
                    request.MaDVC,
                    request.MaCanBo,
                    MaYeuCau = request.MaYeuCau + currentTime.Second.ToString()
                });
                string xmlResponse = await response.Content.ReadAsStringAsync();
                var serializerSettings = new JsonSerializerSettings();
                serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                var responseData = JsonConvert.DeserializeObject<CSDLDanCuResponse>(xmlResponse, serializerSettings);
                var jsonData = Xml2Json.Parse<CSDLDanCuJSONResponse>(responseData.message);
                var congDan = jsonData.Envelope.Body.CongdanCollection.CongDan;
                var soDinhDanh = congDan.LoaiTaiKhoan == "2" ? congDan.MaSoThue : congDan.SoDinhDanh;
                var email = !string.IsNullOrEmpty(congDan.ThuDienTu) && congDan.ThuDienTu?.Split('@').Length == 2 ? congDan.ThuDienTu: congDan.SoDinhDanh + "@dichvucong.gov.vn" ;
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

                var userExist = await _dapperRepository.QueryFirstOrDefaultAsync<CheckUserReponse>(sqlCheckUserExist, new
                {
                    UserName = soDinhDanh
                });

                var diaBans = await _dapperRepository.QueryAsync<GetCDSLDanCu_DiaChiSelect>(sqlGetDiaChi, new
                {
                    MaDiaBan = maDiaBans
                });

                congDan.ThuongTru.TenTinhThanh = diaBans.FirstOrDefault(x => x.MaDiaBan == maTinhThanhThuongTru)?.TenDiaBan ?? "";
                congDan.ThuongTru.TenQuanHuyen = diaBans.FirstOrDefault(x => x.MaDiaBan == maQuanHuyenThuongTru)?.TenDiaBan ?? "";
                congDan.ThuongTru.TenPhuongXa = diaBans.FirstOrDefault(x => x.MaDiaBan == maPhuongXaThuongTru)?.TenDiaBan ?? "";

                congDan.QueQuan.TenTinhThanh = diaBans.FirstOrDefault(x => x.MaDiaBan == maTinhThanhQueQuan)?.TenDiaBan ?? "";
                congDan.QueQuan.TenQuanHuyen = diaBans.FirstOrDefault(x => x.MaDiaBan == maQuanHuyenQueQuan)?.TenDiaBan ?? "";
                congDan.QueQuan.TenPhuongXa = diaBans.FirstOrDefault(x => x.MaDiaBan == maPhuongXaQueQuan)?.TenDiaBan ?? "";

                congDan.NoiDangKyKhaiSinh.TenTinhThanh = diaBans.FirstOrDefault(x => x.MaDiaBan == maTinhThanhNoiDangKyKhaiSinh)?.TenDiaBan ?? "";
                congDan.NoiDangKyKhaiSinh.TenQuanHuyen = diaBans.FirstOrDefault(x => x.MaDiaBan == maQuanHuyenNoiDangKyKhaiSinh)?.TenDiaBan ?? "";
                congDan.NoiDangKyKhaiSinh.TenPhuongXa = diaBans.FirstOrDefault(x => x.MaDiaBan == maPhuongXaNoiDangKyKhaiSinh)?.TenDiaBan ?? "";

                congDan.NoiOHienTai.TenTinhThanh = diaBans.FirstOrDefault(x => x.MaDiaBan == maTinhThanhNoiOHienTai)?.TenDiaBan ?? "";
                congDan.NoiOHienTai.TenQuanHuyen = diaBans.FirstOrDefault(x => x.MaDiaBan == maQuanHuyenNoiOHienTai)?.TenDiaBan ?? "";
                congDan.NoiOHienTai.TenPhuongXa = diaBans.FirstOrDefault(x => x.MaDiaBan == maPhuongXaNoiOHienTai)?.TenDiaBan ?? "";

                if (userExist != null) // đã có user
                {
                    if (request.UpdateEntity == true)
                    {
                        var effectRows = await _dapperRepository.ExcuteAsync(sqlUpdateUser, new
                        {
                            Id = userExist.Id,
                            SoDinhDanh = soDinhDanh,
                            SoCMND = congDan.SoCMND,
                            FullName = congDan.HoVaTen.Ten,
                            HoVaTen = JsonConvert.SerializeObject(congDan.HoVaTen),
                            GioiTinh = congDan.GioiTinh,
                            DanToc = congDan.DanToc,
                            TonGiao = congDan.TonGiao,
                            TinhTrangHonNhan = congDan.TinhTrangHonNhan,
                            NhomMau = congDan.NhomMau,
                            NamSinh = congDan.NgayThangNamSinh.Nam,
                            NgayThangNamSinh = JsonConvert.SerializeObject(congDan.NgayThangNamSinh),
                            NoiDangKyKhaiSinh = JsonConvert.SerializeObject(congDan.NoiDangKyKhaiSinh),
                            QuocTich = congDan.QuocTich,
                            QueQuan = JsonConvert.SerializeObject(congDan.QueQuan),
                            ThuongTru = JsonConvert.SerializeObject(congDan.ThuongTru),
                            NoiOHienTai = JsonConvert.SerializeObject(congDan.NoiOHienTai),
                            Cha = JsonConvert.SerializeObject(congDan.Cha),
                            Me = JsonConvert.SerializeObject(congDan.Me),
                            VoChong = JsonConvert.SerializeObject(congDan.VoChong),
                            NguoiDaiDien = JsonConvert.SerializeObject(congDan.NguoiDaiDien),
                            ChuHo = JsonConvert.SerializeObject(congDan.ChuHo),
                            SoSoHoKhau = congDan.SoSoHoKhau,
                            //DiaChiThuongTru = congDan.ThuongTru.ChiTiet + ", " + diaChiThuongTru.TenDiaBan,
                            //DiaChiKhaiSinh = congDan.NoiDangKyKhaiSinh.ChiTiet + ", " + diaChiKhaiSinh.TenDiaBan,
                            //DiaChiQueQuan = congDan.QueQuan.ChiTiet + ", " + diaChiQueQuan.TenDiaBan
                        });
                        if (effectRows == 0)
                        {
                            return Result<UserCSDLResponse>.Fail($"Cập nhật user {congDan.SoDinhDanh} thất bại");
                        }
                    }
                } else // chưa có user
                {
                    var password = "Default@123";

                    
                    var createUserParams = new CreateUserRequest()
                    {
                        TypeUser = "CongDan",
                        IsActive = true,
                        Email = email,
                        UserName = soDinhDanh,
                        Password = password,
                        ConfirmPassword = password,
                        SoDinhDanh = soDinhDanh,
                        SoCMND = congDan.SoCMND,
                        FullName = congDan.HoVaTen.Ten,
                        HoVaTen = JsonConvert.SerializeObject(congDan.HoVaTen),
                        GioiTinh = congDan.GioiTinh,
                        DanToc = congDan.DanToc,
                        TonGiao = congDan.TonGiao,
                        TinhTrangHonNhan = congDan.TinhTrangHonNhan,
                        NhomMau = congDan.NhomMau,
                        NamSinh = congDan.NgayThangNamSinh.Nam,
                        NgayThangNamSinh = JsonConvert.SerializeObject(congDan.NgayThangNamSinh),
                        NoiDangKyKhaiSinh = JsonConvert.SerializeObject(congDan.NoiDangKyKhaiSinh),
                        QuocTich = congDan.QuocTich,
                        QueQuan = JsonConvert.SerializeObject(congDan.QueQuan),
                        ThuongTru = JsonConvert.SerializeObject(congDan.ThuongTru),
                        NoiOHienTai = JsonConvert.SerializeObject(congDan.NoiOHienTai),
                        Cha = JsonConvert.SerializeObject(congDan.Cha),
                        Me = JsonConvert.SerializeObject(congDan.Me),
                        VoChong = JsonConvert.SerializeObject(congDan.VoChong),
                        NguoiDaiDien = JsonConvert.SerializeObject(congDan.NguoiDaiDien),
                        ChuHo = JsonConvert.SerializeObject(congDan.ChuHo),
                        SoSoHoKhau = congDan.SoSoHoKhau,
                        //DiaChiThuongTru = congDan.ThuongTru.ChiTiet + ", " + diaChiThuongTru.TenDiaBan,
                        //DiaChiKhaiSinh = congDan.NoiDangKyKhaiSinh.ChiTiet + ", " + diaChiKhaiSinh.TenDiaBan,
                        //DiaChiQueQuan = congDan.QueQuan.ChiTiet + ", " + diaChiQueQuan.TenDiaBan
                    };
                    await _userService.CreateAsync(createUserParams, "");
                }
                
                var userRes = await _dapperRepository.QueryFirstOrDefaultAsync<UserCSDLResponse>(sqlGetUserNew, new
                {
                    UserName = soDinhDanh
                });
                var res = new UserCSDLResponse()
                {
                    SoDinhDanh = soDinhDanh,
                    SoCMND = congDan.SoCMND,
                    FullName = congDan.HoVaTen.Ten,
                    HoVaTen = JsonConvert.SerializeObject(congDan.HoVaTen),
                    GioiTinh = congDan.GioiTinh,
                    DanToc = congDan.DanToc,
                    TonGiao = congDan.TonGiao,
                    TinhTrangHonNhan = congDan.TinhTrangHonNhan,
                    NhomMau = congDan.NhomMau,
                    NamSinh = congDan.NgayThangNamSinh.Nam,
                    NgayThangNamSinh = JsonConvert.SerializeObject(congDan.NgayThangNamSinh),
                    NoiDangKyKhaiSinh = JsonConvert.SerializeObject(congDan.NoiDangKyKhaiSinh),
                    QuocTich = congDan.QuocTich,
                    QueQuan = JsonConvert.SerializeObject(congDan.QueQuan),
                    ThuongTru = JsonConvert.SerializeObject(congDan.ThuongTru),
                    NoiOHienTai = JsonConvert.SerializeObject(congDan.NoiOHienTai),
                    Cha = JsonConvert.SerializeObject(congDan.Cha),
                    Me = JsonConvert.SerializeObject(congDan.Me),
                    VoChong = JsonConvert.SerializeObject(congDan.VoChong),
                    NguoiDaiDien = JsonConvert.SerializeObject(congDan.NguoiDaiDien),
                    ChuHo = JsonConvert.SerializeObject(congDan.ChuHo),
                    SoSoHoKhau = congDan.SoSoHoKhau,
                    Email = userRes != null && userRes.Email != null && userRes.Email.EndsWith("@dichvucong.gov.vn") ? string.Empty : userRes.Email,
                    PhoneNumber = userRes?.PhoneNumber ?? string.Empty,
                };
                if (!string.IsNullOrEmpty(request.MaHoSo))
                {
                    await _dapperRepository.ExcuteAsync("UPDATE Business.HoSos SET SoDinhDanh = @SoDinhDanh WHERE MaHoSo = @MaHoSo", new
                    {
                        SoDinhDanh = soDinhDanh,
                        MaHoSo = request.MaHoSo
                    });
                }
                return Result<UserCSDLResponse>.Success(res);
            }
            catch (Exception ex)
            {
                return Result<UserCSDLResponse>.Fail(ex.Message);
            }
        }
    }
}
