using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using Newtonsoft.Json;
using System.Net.Http;
namespace TD.DichVuCongApi.Application.Catalog.TraCuuThongTinDoanhNghiepApp.Queries;

public class GetTraCuuThongTinDoanhNghiepHandler : IQueryHandler<GetTraCuuThongTinDoanhNghiepQuery, EntCert>
{
    private readonly HttpClient _httpClient;

    public GetTraCuuThongTinDoanhNghiepHandler(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Result<EntCert>> Handle(GetTraCuuThongTinDoanhNghiepQuery request, CancellationToken cancellationToken)
    {
        try
        {
                var response = await _httpClient.GetAsync($"https://apidvc.thanhhoa.gov.vn/apiDKKD/DoanhNghiep/chiTietDoanhNghiep?msdn={request.Id}");

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var businessInfo = JsonConvert.DeserializeObject<BusinessInfo>(content);
            if(businessInfo.GetEntCert != null)
            {
                return Result<EntCert>.Success(businessInfo.GetEntCert[0]);
            }
            else
            {
                return Result<EntCert>.Fail("GetEntCert : null");
            }

        }
        catch (Exception ex)
        {
            // Handle exception and return a failure result
            return Result<EntCert>.Fail(ex.Message);
        }
    }
}
