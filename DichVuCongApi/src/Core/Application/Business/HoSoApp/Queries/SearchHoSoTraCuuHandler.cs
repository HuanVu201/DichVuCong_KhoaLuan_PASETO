using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class ReCapchaResponse
{
    public bool Success { get; set; }
    public string Challenge_ts { get; set; }
    public string HostName { get; set; }
    public string error_codes { get; set; }

}

public class SearchHoSoTraCuuQueryWhereBuilder
{
    public static string Build(SearchHoSoTraCuu req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND hs.MaHoSo = @MaHoSo ";
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            where += " AND (hs.SoGiayToChuHoSo = @SoDinhDanh OR hs.SoGiayToNguoiUyQuyen = @SoDinhDanh) ";
        if (req.Removed == false)
            where += " AND hs.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchHoSoTraCuuHandler : ICommandHandler<SearchHoSoTraCuu, HoSoDto>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchHoSoTraCuuHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<HoSoDto>> Handle(SearchHoSoTraCuu request, CancellationToken cancellationToken)
    {
        var where = SearchHoSoTraCuuQueryWhereBuilder.Build(request);
        var sqlCheck = @"SELECT TOP(1) SoGiayToChuHoSo, SoGiayToNguoiUyQuyen
                          FROM  Business.HoSos 
                          WHERE MaHoSo = @maHoSo";

        var sql = $@"SELECT TOP 1 hs.ID, ChuHoSo, SoDienThoaiChuHoSo, EmailChuHoSo, hs.MaTruongHop, hs.MaTTHC, hs.TrangThaiHoSoId,
		            UyQuyen, NgayTiepNhan, NgayHenTra, hs.CreatedOn, hs.MaHoSo, KenhThucHien, DiaChiChuHoSo,
		            CASE WHEN DangKyNhanHoSoQuaBCCIData != null AND DangKyNhanHoSoQuaBCCIData <> '' THEN
					json_value(DangKyNhanHoSoQuaBCCIData, '$.diaChi') ELSE '' END as DiaChi, tt.TenTTHC, HinhThucThu, SoTien, g.GroupName as TenDonVi,NgayNopHoSo
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    LEFT JOIN Catalog.Groups g on hs.DonViId = g.MaDinhDanh
                    outer apply (select top 1 HinhThucThu, SoTien from Business.YeuCauThanhToans yctt where hs.MaHoSo = yctt.MaHoSo) as yctt
                    {where}";


        using (var httpClient = new HttpClient())
        {

            httpClient.BaseAddress = new Uri($"https://www.google.com/recaptcha/api/siteverify");
            httpClient.DefaultRequestHeaders
                  .Accept
                  .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
            HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Post, "");
            requestMessage.Content = new StringContent($"secret={request.GetSecretKey()}&response={request.MaCaptCha}",
                                    Encoding.UTF8,
                                    "application/x-www-form-urlencoded");//CONTENT-TYPE header

            var httpResponse = await httpClient.SendAsync(requestMessage);
            string response = await httpResponse.Content.ReadAsStringAsync();
            var responseData = JsonConvert.DeserializeObject<ReCapchaResponse>(response);

            if (responseData.Success == true)
            {
                var resCheck = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sqlCheck, new
                {
                    MaHoSo = request.MaHoSo,
                });

                if (resCheck == null)
                {
                    return Result<HoSoDto>.Fail("Mã hồ sơ không hợp lệ!");
                }
                else
                {

                    if (resCheck.SoGiayToChuHoSo == request.SoDinhDanh || resCheck.SoGiayToNguoiUyQuyen == request.SoDinhDanh)
                    {
                        var data = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sql, new
                        {
                            MaHoSo = request.MaHoSo,
                            SoDinhDanh = request.SoDinhDanh
                        }, null, cancellationToken);
                        return Result<HoSoDto>.Success(data: data);
                    }
                    else
                    {
                        return Result<HoSoDto>.Fail("Vui lòng nhập đúng số định danh chủ hồ sơ/người ủy quyền!");
                    }
                }

            }
            else
            {
                //throw new customexception("người dùng nhập mã capcha chưa đúng", statuscode: system.net.httpstatuscode.badrequest);
                return Result<HoSoDto>.Fail("Mã Recaptcha không hợp lệ!");
            }
        }

    }
}
