using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
internal class SearchHoSoTheoHanXuLyQueryWhereBuilder
{
    private static readonly string _hoSoTableName = "Business.HoSos";
    private static readonly BaoCaoTongHopConstants _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    private static readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    internal static string Build(SearchHoSoTheoHanXuLyQuery req)
    {
        string tuNgay = req.TuNgay.ToString("yyyy-MM-dd 00:00:01");
        string denNgay = req.DenNgay.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, _hoSoTableName);
        string where = string.Empty;
        string trangThaiWhere = string.Empty;
        where += $"AND ({builder.where.TiepNhan}) ";
        if (!string.IsNullOrEmpty(req.TrangThaiHoSoId))
            where += " AND TrangThaiHoSoId = @TrangThaiHoSoId";
        if (req.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.QUA_HAN.ToLower())
        {
            trangThaiWhere = $"({builder.where.DaXuLyQuaHan}) OR ({builder.where.DangXuLyQuaHan}) ";
        }
        else if (req.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.DA_XU_LY_QUA_HAN.ToLower())
        {
            trangThaiWhere = $"({builder.where.DaXuLyQuaHan}) ";
        }
        else if (req.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.DANG_XU_LY_QUA_HAN.ToLower())
        {
            trangThaiWhere = $"({builder.where.DangXuLyQuaHan}) ";
        }

        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%'";
        if (!string.IsNullOrEmpty(req.DonViTraKq))
        {
            where += $" AND hs.DonViTraKq = @DonViTraKq";
        }

        if (!string.IsNullOrEmpty(req.DonViQuanLy))
        {
            where += $" AND (g.DonViQuanLy = @DonViQuanLy OR g.GroupCode = @DonViQuanLy OR g.OfGroupCode = @DonViQuanLy) ";
        }

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
        {
            if (!string.IsNullOrEmpty(trangThaiWhere))
            {
                return $" WHERE {_hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {_hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) AND  ({trangThaiWhere}) AND ({where})";
            }
            else
            {
                return $" WHERE {_hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {_hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) AND   ({where})";
            }
        }

        if (!string.IsNullOrEmpty(trangThaiWhere))
        {
            return $" WHERE {_hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {_hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) AND  {trangThaiWhere} ";
        }
        else
        {
            return $" WHERE {_hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {_hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) AND ";
        }
    }

}

public class SearchHoSoTheoHanXuLyQueryHandler : IRequestHandler<SearchHoSoTheoHanXuLyQuery, PaginationResponse<HoSoTheoTrangThaiDto>>
{
    private readonly string _hoSoTableName = "Business.Hosos";
    private readonly string thuTucTableName = "[Catalog].ThuTucs";
    private readonly string trangThai_hoSoTableName = "Business.TrangThaiHoSos";
    private readonly string groupTableName = "[Catalog].Groups";
    private readonly string quaTrinhXuLyTableName = "Business.[QuaTrinhXuLyHoSos]";
    private readonly string userTableName = "[Identity].[Users]";
    private readonly IDapperRepository _dapperRepository;
    public SearchHoSoTheoHanXuLyQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<PaginationResponse<HoSoTheoTrangThaiDto>> Handle(SearchHoSoTheoHanXuLyQuery request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        string tuNgay = request.TuNgay.ToString("yyyy-MM-dd 00:00:01");
        string denNgay = request.DenNgay.ToString("yyyy-MM-dd 23:59:59");
        var results = new PaginationResponse<HoSoTheoTrangThaiDto>();
        var tmpData = new Dictionary<string, HoSoTheoTrangThaiDto>();
        string where = SearchHoSoTheoHanXuLyQueryWhereBuilder.Build(request);
        string sql = $"SELECT DISTINCT  {_hoSoTableName}.Id as Id, {_hoSoTableName}.KenhThucHien, {_hoSoTableName}.NgayTiepNhan,{_hoSoTableName}.TrichYeuHoSo, {_hoSoTableName}.SoDienThoaiChuHoSo,{_hoSoTableName}.TrangThaiHoSoId," +
        $"{_hoSoTableName}.NgayHenTra, {_hoSoTableName}.NgayYeuCauBoSung, {_hoSoTableName}.NgayKetThucXuLy, " +
        $"{_hoSoTableName}.MaHoSo, {_hoSoTableName}.DonViId, {_hoSoTableName}.ChuHoSo, {_hoSoTableName}.DiaChiChuHoSo," +
        $"{_hoSoTableName}.MaTTHC, " +
        $"{_hoSoTableName}.NgayTra,{thuTucTableName}.LinhVucChinh,{thuTucTableName}.TenTTHC, {trangThai_hoSoTableName}.Ten AS TenTrangThaiHoSo," +
        $"donVi.GroupName,donVi.OfGroupName, {_hoSoTableName}.CreatedOn,donVi.MaDinhDanh," +
        $"{quaTrinhXuLyTableName}.NguoiGui, {quaTrinhXuLyTableName}.TenNguoiGui, {quaTrinhXuLyTableName}.ThoiGian, {quaTrinhXuLyTableName}.NgayHetHanBuocXuLy, " +
        $"{userTableName}.GroupName as TenDonViGui," +
        $"donVi.GroupOrder " +
        $"FROM {_hoSoTableName} " +
        $"INNER JOIN {thuTucTableName} " +
        $"ON {_hoSoTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
        $"INNER JOIN {groupTableName} donVi " +
        $"ON donVi.GroupCode = {_hoSoTableName}.DonViId " +
        $"INNER JOIN {trangThai_hoSoTableName} " +
        $"ON {trangThai_hoSoTableName}.Ma = {_hoSoTableName}.TrangThaiHoSoId " +
        $"LEFT JOIN {quaTrinhXuLyTableName} " +
        $"ON {_hoSoTableName}.MaHoSo = {quaTrinhXuLyTableName}.MaHoSo " +
        $"LEFT JOIN {userTableName} " +
        $"ON {userTableName}.Id = {quaTrinhXuLyTableName}.NguoiGui " +
        $" {where} ";

        // sắp xếp

        string order = string.Empty;
        var lstOrderCol = new List<string>() { "GroupOrder", "MaDinhDanh", "CreatedOn DESC" };
        foreach (var item in lstOrderCol.Select((value, index) => new { index, value }))
        {
            order += $" Main.{Regex.Replace(item.value, @"[^0-9a-zA-Z]+", " ")},";
        }

        order = !string.IsNullOrEmpty(order) ? "ORDER BY " + order.Substring(0, order.Length - 1) : string.Empty;
        string paging = $" OFFSET {(request.PageNumber - 1) * request.PageSize} ROWS FETCH NEXT {request.PageSize} ROWS ONLY";
        string queryFull = $"WITH Main AS({sql}), Total AS (SELECT COUNT(ID) AS[TotalCount] FROM Main) SELECT * FROM Main, Total {order} {paging}";
        var data = await _dapperRepository.QueryAsync<HoSoTheoTrangThaiDto, QuaTrinhXuLyHoSoDto, HoSoTheoTrangThaiDto>(queryFull, (hoSoTheoTrangThais, nguoiXuLyQuaHans) =>
        {
            if (!tmpData.TryGetValue(hoSoTheoTrangThais.MaHoSo, out HoSoTheoTrangThaiDto hoSo))
            {
                tmpData.Add(hoSoTheoTrangThais.MaHoSo, hoSo = hoSoTheoTrangThais);
            }

            hoSo.NguoiXuLyQuaHans = hoSo.NguoiXuLyQuaHans ?? new List<QuaTrinhXuLyHoSoDto>();
            if (nguoiXuLyQuaHans != null && nguoiXuLyQuaHans.ThoiGian.HasValue && nguoiXuLyQuaHans.NgayHetHanBuocXuLy.HasValue
            && nguoiXuLyQuaHans.ThoiGian.Value > nguoiXuLyQuaHans.NgayHetHanBuocXuLy.Value)
            {
                bool check = false;
                foreach (var item in hoSo.NguoiXuLyQuaHans)
                {
                    if (nguoiXuLyQuaHans != null && !string.IsNullOrEmpty(nguoiXuLyQuaHans.NguoiGui) && item.NguoiGui == nguoiXuLyQuaHans.NguoiGui)
                    {
                        check = true;
                        break;
                    }
                }

                if (!check) hoSo.NguoiXuLyQuaHans.Add(nguoiXuLyQuaHans);
            }

            // if (nguoiXuLyQuaHans.NgayHetHanBuocXuLy.HasValue && nguoiXuLyQuaHans.ThoiGian.HasValue)
            // {
            //    if (nguoiXuLyQuaHans.ThoiGian.Value > nguoiXuLyQuaHans.NgayHetHanBuocXuLy.Value) hoSo.NguoiXuLyQuaHans.Add(nguoiXuLyQuaHans);
            // }

            return hoSo;
        }, new { TuNgay = tuNgay, DenNgay = denNgay, request.MaDinhDanhCha, request.SearchKeys, request.TrangThaiHoSoId }, splitOn: "MaHoSo,NguoiGui");
        if (tmpData.Count > 0)
        {
            JObject jobj = JObject.Parse(JsonConvert.SerializeObject(data.First()));
            results.Data = tmpData.Values.ToList();
            results.TotalCount = int.Parse(jobj["TotalCount"].ToString());
            results.TotalPages = (int)Math.Ceiling(results.TotalCount / (double)request.PageSize);
        }

        return results;
    }
}