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
namespace TD.DichVuCongApi.Application.Catalog.TraCuuHoKinhDoanhApp.Queries;

public class GetTraCuuHoKinhDoanhHandler : IQueryHandler<GetTraCuuHoKinhDoanhQuery, HHCert>
{
    private readonly HttpClient _httpClient;

    public GetTraCuuHoKinhDoanhHandler(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Result<HHCert>> Handle(GetTraCuuHoKinhDoanhQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var response = await _httpClient.GetAsync($"https://apidvc.thanhhoa.gov.vn/apiDKKD/HoKinhDoanh/chiTietHoKinhDoanh?mst={request.Id}");

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var businessInfo = JsonConvert.DeserializeObject<HoKinhDoanh>(content);
            if (businessInfo.HHCert != null)
            {
                return Result<HHCert>.Success(businessInfo.HHCert[0]);
            }
            else
            {
                return Result<HHCert>.Fail("HHCert : null");
            }

        }
        catch (Exception ex)
        {
            // Handle exception and return a failure result
            return Result<HHCert>.Fail(ex.Message);
        }
    }
}
