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
namespace TD.DichVuCongApi.Application.Catalog.TraCuuHopTacXaApp.Queries;

public class GetTraCuuHopTacXaHandler : IQueryHandler<GetTraCuuHopTacXaQuery, CoopCert>
{
    private readonly HttpClient _httpClient;

    public GetTraCuuHopTacXaHandler(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Result<CoopCert>> Handle(GetTraCuuHopTacXaQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var response = await _httpClient.GetAsync($"https://apidvc.thanhhoa.gov.vn/apiDKKD/HopTacXa/chiTietHopTacXa?mst={request.Id}");

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var businessInfo = JsonConvert.DeserializeObject<HopTacXa>(content);
            if (businessInfo.CoopCert != null)
            {
                return Result<CoopCert>.Success(businessInfo.CoopCert[0]);
            }
            else
            {
                return Result<CoopCert>.Fail("CoopCert : null");
            }

        }
        catch (Exception ex)
        {
            // Handle exception and return a failure result
            return Result<CoopCert>.Fail(ex.Message);
        }
    }
}
