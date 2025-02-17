using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;




namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class ThemMoiHoSoCommandHandler : ICommandHandler<ThemMoiHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IGenerateMaHoSo _generateMaHoSo;
    private readonly DongBoTaoMoiHoSoSettings _settings;
    private readonly IInjectConfiguration _injectConfiguration;
    private readonly IReadRepository<ThuTuc> _repositoryThuTuc;
    private readonly IReadRepository<TruongHopThuTuc> _repositoryTruongHopThuTuc;
    private readonly IHoSoServices _hoSoServices;
    private readonly IMinioService _minioService;
    private readonly IReadRepository<NgayNghi> _ngayNghiRepository;
    private readonly IReadRepository<ThanhPhanThuTuc> _repositoryThanhPhanThuTuc;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<Domain.Business.ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;

    public class NguoiTiepNhan
    {
        public string DonViId { get; set; }
        public string NguoiTiepNhanId { get; set; }
        public string TaiKhoanTiepNhan { get; set; }
        public string FullName { get; set; }
    }


    public ThemMoiHoSoCommandHandler(
        IRepository<HoSo> repositoryWithEvents,
        IDapperRepository dapperRepository,
        IOptions<DongBoTaoMoiHoSoSettings> options
        , IGenerateMaHoSo generateMaHoSo,
        IInjectConfiguration injectConfiguration,
        IReadRepository<ThuTuc> repositoryThuTuc,
        IReadRepository<TruongHopThuTuc> repositoryTruongHopThuTuc
        , IHoSoServices hoSoServices,
         IMinioService minioService,
         IReadRepository<NgayNghi> ngayNghiRepository,
        IReadRepository<ThanhPhanThuTuc> repositoryThanhPhanThuTuc,
        IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IRepository<Domain.Business.ThanhPhanHoSo> repositoryThanhPhanHoSo,
        INguoiXuLyHoSoService nguoiXuLyHoSoService
        )
    {
        _repositoryHoSo = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _settings = options.Value;
        _generateMaHoSo = generateMaHoSo;
        _injectConfiguration = injectConfiguration;
        _repositoryThuTuc = repositoryThuTuc;
        _repositoryTruongHopThuTuc = repositoryTruongHopThuTuc;
        _hoSoServices = hoSoServices;
        _minioService = minioService;
        _ngayNghiRepository = ngayNghiRepository;
        _repositoryThanhPhanThuTuc = repositoryThanhPhanThuTuc;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<Result> Handle(ThemMoiHoSoCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlGetNguoiTiepNhan = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
                                       where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        string sqlGetMaDinhDanh = @"SELECT Top 1 Id, MaDinhDanh, DonViQuanLy,GroupCode from Catalog.Groups where MaDinhDanh = @MaDinhDanh";
        var thuTuc = await _repositoryThuTuc.GetBySpecAsync(new GetThuTucByMaTTHCSpec(request.MaTTHC));
        var truongHopThuTucs = await _repositoryTruongHopThuTuc.ListAsync(new GetTruongHopThuTucsByMaTTHCSpec(request.MaTTHC), cancellationToken);
        if (!_settings.DonVi.Contains(request.DonVi))
        {
            throw new Exception("Chưa cấu hình DonVi");
        }
        if (!_settings.MaTTHC.Contains(request.MaTTHC))
        {
            throw new Exception("Chưa cấu hình MaTTHC");
        }
        if (!_settings.Key.Contains(request.Key))
        {
            throw new Exception("Chưa cấu hình Key");
        }
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlGetMaDinhDanh, new
        {
            MaDinhDanh = request.DonVi,
        }, cancellationToken: cancellationToken);

        if (truongHopThuTucs == null || truongHopThuTucs.Count == 0)
        {
            return Result<string>.Fail($"Không tồn tại trường hợp thủ tục tương ứng với mã thủ tục: {request.MaTTHC}");
        }
        if (group == null)
        {
            throw new Exception($"Không tồn tại đơn vị ứng với Mã định danh: {request.DonVi}");
        }

        var maHoSo = await _generateMaHoSo.GenerateMaHoSo(group.MaDinhDanh, cancellationToken: cancellationToken);
        if (string.IsNullOrEmpty(maHoSo))
        {
            throw new Exception("tạo mã hồ sơ thất bại");
        }

        var caculateTime = new CaculateTime(_injectConfiguration);

        var truongHopThuTuc = truongHopThuTucs.Find(x => x.ThuTucId == request.MaTTHC);
        if (truongHopThuTuc == null)
        {
            truongHopThuTuc = truongHopThuTucs[0];
        }
        var firstNode = _hoSoServices.GetFirstNode(truongHopThuTuc);

        double thoiGianXuLy = caculateTime.GetThoiGianXuLy(firstNode, "1");
        var ngayNghis = await _ngayNghiRepository.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianXuLy, truongHopThuTuc.LoaiThoiGianThucHien);

        string donViQuanLy = !string.IsNullOrEmpty(group.DonViQuanLy) ? group.DonViQuanLy : request.DonVi;
        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<NguoiTiepNhan>(sqlGetNguoiTiepNhan, new
        {
            DonViId = group.GroupCode,
            MaTTHC = thuTuc.MaTTHC,
        }, cancellationToken: cancellationToken);
        if (nguoiTiepNhan.TaiKhoanTiepNhan == null)
        {
            throw new Exception("Chưa cấu hình người tiếp nhận cho thủ tục");
        }
        var thanhPhanThuTucs = await _repositoryThanhPhanThuTuc.ListAsync(new GetThanhPhanThuTucByMaTTHCSpec(truongHopThuTuc.Ma));
        DateTime? ngayHenTra = truongHopThuTuc.KhongCoNgayHenTra == true ? null : caculateTime.TinhNgayHenTra(ngayNghis, currentTime, (int)truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien);
        try
        {
            string mucDo = thuTuc.MucDo;
            if (truongHopThuTuc.KhongNopTrucTuyen != null && truongHopThuTuc.KhongNopTrucTuyen == true)
            {
                mucDo = "2";
            }
            var hoSo = new HoSo(group.GroupCode, maHoSo, LoaiChuHoSoConstant.CongDan, request.ChuHoSo, request.SoDienThoaiChuHoSo, request.EmailChuHoSo, request.SoGiayToChuHoSo, LoaiChuHoSoConstant.CongDan, null, null, null, null, request.DiaChiChuHoSo,
                null, request.MaTTHC, truongHopThuTuc.Ma, truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), null, null, nguoiTiepNhan.TaiKhoanTiepNhan, request.TrichYeuHoSo, currentTime, request.UyQuyen,
                request.NguoiDuocUyQuyen, request.SoDienThoaiNguoiDuocUyQuyen, request.EmailNguoiDuocUyQuyen, request.SoGiayToNguoiDuocUyQuyen, null, null, null, request.DiaChiNguoiDuocUyQuyen, request.MaTTHC, currentTime, ngayHenTraCaNhan, mucDo, "0", donViTraKq: donViQuanLy);
            string nguoiNhanHoSo = nguoiTiepNhan.TaiKhoanTiepNhan.Substring(0, nguoiTiepNhan.TaiKhoanTiepNhan.IndexOf("##") != -1 ? nguoiTiepNhan.TaiKhoanTiepNhan.IndexOf("##") : nguoiTiepNhan.TaiKhoanTiepNhan.Length) ?? "";
            hoSo.DongBoTaoMoiHoSo(thuTuc.MaLinhVucChinh, thuTuc.TenTTHC, ngayHenTra, nguoiNhanHoSo, firstNode.id, null);
            hoSo.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);
            hoSo.SetKenhThucHien(request.KenhThucHien);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, "", "", null, null, currentTime, trangThai: "2");
            var thanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
            if(request.ThanhPhanHoSo != null)
            {
                foreach (var item in request.ThanhPhanHoSo)
                {
                    string urlGiayTo = string.Empty;
                    int count = item.TepDinhKem.Count;
                    for (int index = 0; index < count; index++)
                    {
                        var i = item.TepDinhKem[index];
                        var dinhKem = await _minioService.UploadFileAsBase64Async(i.Base64, i.TenTep, "", maHoSo);
                        urlGiayTo += dinhKem;

                        if (count > 1 && index < count - 1)
                        {
                            urlGiayTo += "##";
                        }
                    }

                    var thanhPhanHoSo = new Domain.Business.ThanhPhanHoSo(
                        item.TenThanhPhan, maHoSo, item.SoBanChinh, item.SoBanSao, null, urlGiayTo, null, null, null, null, null, null, null, null, null, null
                    );

                    thanhPhanHoSo.SetDinhKemGoc(urlGiayTo);
                    thanhPhanHoSos.Add(thanhPhanHoSo);
                }
            }
          
            await _repositoryHoSo.AddAsync(hoSo, cancellationToken);
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSo.Id, cancellationToken: cancellationToken);
            await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos, cancellationToken);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            return Result<string>.Success(data: maHoSo);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}
