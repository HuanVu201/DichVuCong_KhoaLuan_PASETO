using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp;
using TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.QrCodeServive;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;

public class XuatPhieuHuongDanBoSungCommandHandler : IQueryHandler<XuatPhieuHuongDanBoSungCommand, object>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IQrCodeService _qrCodeService;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly string tableName = "[Business].[HuongDanNopHoSos]";
    private readonly string userTableName = "[Identity].[Users]";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly IReadRepository<HuongDanNopHoSo> _readRepository;
    public XuatPhieuHuongDanBoSungCommandHandler(IReadRepository<HuongDanNopHoSo> readRepository, IDapperRepository dapperRepository, IQrCodeService qrCodeService, IMediator mediator, IMinioService minioService)
    {
        _dapperRepository = dapperRepository;
        _qrCodeService = qrCodeService;
        _mediator = mediator;
        _minioService = minioService;
        _readRepository = readRepository;
    }

    public async Task<Result<object>> Handle(XuatPhieuHuongDanBoSungCommand request, CancellationToken cancellationToken)
    {
        string maGiayTo = request.Id + "_" + request.MaLoaiPhieu;
        string sqlGiayToHoSo = $@"SELECT Id, PDFPhieu, MaGiayTo, DocxPhieu FROM Business.GiayToHoSos Where MaGiayTo=@MaGiayTo And SuDung = '1'";
        var gths = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToHoSoDto>(sqlGiayToHoSo, new { MaGiayTo = maGiayTo });

        

        string sql = $"SELECT {tableName}.*, {userTableName}.FullName NguoiTiepNhan, {thuTucTableName}.TenTTHC, {groupsTableName}.GroupName, {groupsTableName}.Catalog, " +
             $" {thuTucTableName}.MaLinhVucChinh, {thuTucTableName}.LinhVucChinh TenLinhVuc, {groupsTableName}.SoDienThoai SoDienThoaiDonVi, {groupsTableName}.MaDinhDanh, {groupsTableName}.MaTinh " +
             $"FROM {tableName} " +
             $"INNER JOIN {userTableName} " +
             $"ON {tableName}.NguoiNhanHoSo = {userTableName}.Id " +
             $"INNER JOIN {thuTucTableName} " +
             $"ON {tableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
                 $"INNER JOIN {groupsTableName} " +
             $"ON {groupsTableName}.GroupCode = {tableName}.DonViId " +
             $"WHERE {tableName}.Id = @ID";
        var result = await _dapperRepository.QueryFirstOrDefaultAsync<XuatPhieuHuongDanBoSungDto>(sql, new { Id = request.Id });
        SearchThanhPhanHuongDanNopHoSoQuery searchThanhPhan = new SearchThanhPhanHuongDanNopHoSoQuery();
        if (result is not null)
        {
            if (gths is not null && !string.IsNullOrEmpty(gths.PDFPhieu))
            {

                result.Id = request.Id;
                result.UrlPhieu = gths.PDFPhieu;
                result.DocxPhieu = gths.DocxPhieu;
            }

            searchThanhPhan.HoSo = result?.Id.ToString();
            searchThanhPhan.PageSize = 100;
            searchThanhPhan.PageNumber = 1;
            var thanhPhan = await _mediator.Send(searchThanhPhan);
            if (thanhPhan != null && thanhPhan.Data != null && thanhPhan.Data.Count > 0)
                result.ThanhPhanHuongDanNopHoSos = thanhPhan.Data;

            var tenTinhUpper = string.Empty;
            if (!string.IsNullOrEmpty(result.MaTinh))
            {
                try
                {
                    string sqlQueryDiaBan = $@"SELECT Id, TenDiaBan FROM Catalog.DiaBans Where MaDiaBan =@MaDiaBan";
                    var diaBan = await _dapperRepository.QueryFirstOrDefaultAsync<DiaBanDto>(sqlQueryDiaBan, new { MaDiaBan = result.MaTinh });
                    if (diaBan is not null)
                    {
                        tenTinhUpper = diaBan.TenDiaBan.ToUpper();
                    }

                    result.TenTinh = diaBan.TenDiaBan;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi trong quá trình lấy địa bàn");
                    Console.WriteLine(ex.ToString());
                }
            }

            //Lấy URL Phôi
            var urlPhoi = string.Empty;
            try
            {
                urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
                {
                    LoaiPhoi = request.LoaiPhoi,
                    Code = request.Code,
                    MaDonVi = result.DonViId,
                    MaThuTuc = result.MaTTHC,
                    MaLinhVuc = result.MaLinhVucChinh
                });
                if (!string.IsNullOrEmpty(urlPhoi))
                {
                    result.UrlPhoi = urlPhoi;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Có lỗi trong quá trình lấy mẫu phôi.");
                Console.WriteLine(ex.Message);
            }

            return Result<object>.Success(result);

        }
        throw new NotFoundException($"Hướng dẫn nộp hồ sơ với id: {request.Id} chưa được thêm trên hệ thống hoặc đã bị xóa");
    }

}
