using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoTheoBaoCaoTongHopHandler : IRequestHandler<SearchHoSoTheoBaoCaoTongHop, PaginationResponse<HoSoDto>>
{

    private readonly string groupTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    public SearchHoSoTheoBaoCaoTongHopHandler(IDapperRepository dapperRepository, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
    }

    public async Task<PaginationResponse<HoSoDto>> Handle(SearchHoSoTheoBaoCaoTongHop request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        string where = string.Empty;

        if (!string.IsNullOrEmpty(request.MaLinhVucChinh)) where += $" AND {thuTucTableName}.MaLinhVucChinh = @MaLinhVucChinh ";
        if (!string.IsNullOrEmpty(request.MaDonVi)) where += $" AND {hoSoTableName}.DonViId = @MaDonVi ";
        if (!string.IsNullOrEmpty(request.MaDinhDanh)) where += $" AND {groupTableName}.MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(request.MaTTHC)) where += $" AND {hoSoTableName}.MaTTHC = @MaTTHC ";
        if (!string.IsNullOrEmpty(request.KenhThucHien)) where += $" AND ({hoSoTableName}.KenhThucHien = @KenhThucHien)";
        if (!string.IsNullOrEmpty(request.MucDo)) where += $" AND ({hoSoTableName}.KenhThucHien = @MucDo)";
        if(request.MucDos != null && request.MucDos.Count > 0)
        {
            where += $" AND {hoSoTableName}.MucDo IN @MucDos";
        }
        if (request.LoaiDoiTuong == LoaiChuHoSoConstant.CongDan)
        {
            where += $" AND  {hoSoTableName}.LoaiDoiTuong != N'{LoaiChuHoSoConstant.DoanhNghiep}' AND  {hoSoTableName}.LoaiDoiTuong != N'{LoaiChuHoSoConstant.CoQuanNhaNuoc}' ";
        }
        else if (!string.IsNullOrEmpty(request.LoaiDoiTuong))
        {
            where += $" AND  {hoSoTableName}.LoaiDoiTuong = @LoaiDoiTuong ";
        }

        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                where += $" AND ({groupTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' AND {groupTableName}.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                where += $" AND {groupTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }
        if (!string.IsNullOrEmpty(request.Catalog) && string.IsNullOrEmpty(request.MaDinhDanh) && string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            where += $" AND {groupTableName}.Catalog = @Catalog ";
        }
        if (!string.IsNullOrEmpty(request.DonViQuanLy))
        {
            where += $" AND ({groupTableName}.DonViQuanLy = @DonViQuanLy OR {groupTableName}.GroupCode = @DonViQuanLy OR {groupTableName}.OfGroupCode = @DonViQuanLy) ";
        }
        if(!string.IsNullOrEmpty(request.MaTruongHop))
        {
            where += $" AND {hoSoTableName}.MaTruongHop = @MaTruongHop ";
        }
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        if (!string.IsNullOrEmpty(request.TieuChi))
        {
            var tmp = builder.where;
            var tmpSql = tmp.GetType().GetProperty(request.TieuChi).GetValue(tmp, null);
            if (tmpSql != null) where += $"AND {tmpSql}";
        }

        string sql = $"SELECT  ";
        sql += request.TieuChi == "CoNghiaVuTaiChinh" || request.TieuChi == "DaTTTTQuaDvcqg" ? "DISTINCT " : string.Empty;
        sql += $"{hoSoTableName}.ID, {hoSoTableName}.ChuHoSo,{hoSoTableName}.DiaChiChuHoSo,{hoSoTableName}.TrichYeuHoSo, {hoSoTableName}.NgayTra, {hoSoTableName}.SoDienThoaiChuHoSo, {hoSoTableName}.EmailChuHoSo, {hoSoTableName}.MaTruongHop, {hoSoTableName}.MaTTHC, {hoSoTableName}.TrangThaiHoSoId," +
            $"{hoSoTableName}.UyQuyen,{hoSoTableName}.[NguoiUyQuyen], {hoSoTableName}.NgayTiepNhan, {hoSoTableName}.NgayHenTra, {hoSoTableName}.CreatedOn, {hoSoTableName}.MaHoSo, {hoSoTableName}.KenhThucHien, {thuTucTableName}.TenTTHC, " +
            $"{groupTableName}.GroupName as TenDonVi, {hoSoTableName}.NgayNopHoSo, {hoSoTableName}.SoGiayToChuHoSo,{thuTucTableName}.MaLinhVucChinh, {hoSoTableName}.[NgayKetThucXuLy] " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode ";
        if (request.TieuChi == "CoNghiaVuTaiChinh" || request.TieuChi == "DaTTTTQuaDvcqg")
        {
            sql += $"INNER JOIN {yeuCauThanhToanTableName} " +
           $"ON {hoSoTableName}.MaHoSo = {yeuCauThanhToanTableName}.MaHoSo ";
        }

        sql += request.TieuChi == "CoNghiaVuTaiChinh" ? $"WHERE {hoSoTableName}.DeletedOn IS NULL AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) {where}"
            : $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.TiepNhanKyTruoc}) OR ({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) " +
            $"AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaDinhDanh,
            request.MaDinhDanhCha,
            request.MaLinhVucChinh,
            request.MaDonVi,
            request.Catalog,
            request.MaTTHC,
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.KenhThucHien,
            request.DonViQuanLy,
            request.LoaiDoiTuong,
            request.MucDo,
            request.MaTruongHop,
            request.MucDos
        });
        return data;
    }
}
