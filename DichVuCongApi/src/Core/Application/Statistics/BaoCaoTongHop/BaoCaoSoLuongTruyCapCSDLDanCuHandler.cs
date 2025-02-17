using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TongHopDonVi;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoSoLuongTruyCapCSDLDanCuHandler : IRequestHandler<BaoCaoSoLuongTruyCapCSDLDanCuRequest, BaoCaoTongHopResponse<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string traCuuCSDLDanCuTableName = "[Business].[LogCSDLDanCuDoanhNghieps]";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public BaoCaoSoLuongTruyCapCSDLDanCuHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }
    private async Task<List<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse>> GetBaoCaoTongHop(BaoCaoSoLuongTruyCapCSDLDanCuRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse> result = new List<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse>();
        string where = string.Empty;
        if (request.TuNgay.HasValue)
        {
            var tuNgay = new DateTime(request.TuNgay.Value.Year, request.TuNgay.Value.Month, request.TuNgay.Value.Day, 0, 0, 1);
            where += $"AND {traCuuCSDLDanCuTableName}.[ThoiGian] >= '{tuNgay}' ";
        }
        if (request.DenNgay.HasValue)
        {
            var denNgay = new DateTime(request.DenNgay.Value.Year, request.DenNgay.Value.Month, request.DenNgay.Value.Day, 23, 59, 59);
            where += $"AND {traCuuCSDLDanCuTableName}.[ThoiGian] <= '{denNgay}' ";
        }
        string sql = $"SELECT {groupTableName}.MaDinhDanh MaThongKe, COUNT({traCuuCSDLDanCuTableName}.DonViId) SoLuong  " +
            $"FROM {traCuuCSDLDanCuTableName} " +
            $"INNER JOIN {groupTableName} ON {traCuuCSDLDanCuTableName}.DonViId = {groupTableName}.GroupCode " +
            $"WHERE {traCuuCSDLDanCuTableName}.Loai = N'CSDL Dân cư' {where}" +
            $"GROUP BY {groupTableName}.MaDinhDanh";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse>(sql, cancellationToken);
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        queryGroups.Type = "don-vi";
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        if(!string.IsNullOrEmpty(request.Catalog) && string.IsNullOrEmpty(request.MaDinhDanh) && string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            foreach (var group in groups)
            {
                BaoCaoSoLuongTruyCapCSDLDanCuElementResponse res = new BaoCaoSoLuongTruyCapCSDLDanCuElementResponse();
                res = new BaoCaoSoLuongTruyCapCSDLDanCuElementResponse();
                res.MaThongKe = group.MaDinhDanh;
                res.TenThongKe = group.GroupName;
                var tmpRes = resBaoCao.Where(x => !string.IsNullOrEmpty(x.MaThongKe) && !string.IsNullOrEmpty(group.MaDinhDanh) && x.MaThongKe.StartsWith(group.MaDinhDanh));
                var soLuong = tmpRes != null && tmpRes.Count() > 0 ? tmpRes.Sum(t => t.SoLuong) : 0;
                res.SoLuong = soLuong;
                result.Add(res);
            }

        }
        else
        {
            foreach (var group in groups)
            {
                BaoCaoSoLuongTruyCapCSDLDanCuElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.MaDinhDanh);
                if (res != null) { res.TenThongKe = group.GroupName; }
                else
                {
                    res = new BaoCaoSoLuongTruyCapCSDLDanCuElementResponse();
                    res.MaThongKe = group.MaDinhDanh;
                    res.TenThongKe = group.GroupName;
                }

                result.Add(res);
            }
        }

        return result;
    }

    public async Task<BaoCaoTongHopResponse<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse>> Handle(BaoCaoSoLuongTruyCapCSDLDanCuRequest request, CancellationToken cancellationToken)
    {
        List<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse> result = await GetBaoCaoTongHop(request, cancellationToken);
        return new BaoCaoTongHopResponse<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse>(result);
    }
}