using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Portal;
using System.Text.Json;
using System.Net.Http;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp;
public class CoordinatesService
{
    public class TaskCoordinates : IRequest<Result<string>>, ITransientService
    {
    }

    public class TaskCoordinatesHandler : IRequestHandler<TaskCoordinates, Result<string>>, ITransientService
    {
        private readonly IMediator _mediator;
        private readonly IDapperRepository _dapperRepository;
        private readonly ILogger<Group> _logger;

        public TaskCoordinatesHandler(IMediator mediator, IDapperRepository dapperRepository, ILogger<Group> logger)
        {
            _mediator = mediator;
            _dapperRepository = dapperRepository;
            _logger = logger;
        }

        public async Task<Result<string>> Handle(TaskCoordinates request, CancellationToken cancellationToken)
        {
            List<string> huyenIds = new List<string>();
            using (var client = new HttpClient())
            {
                string url = "https://dichvucong.gov.vn/jsp/rest.jsp";

                // Thiết lập headers
                client.DefaultRequestHeaders.Add("Accept", "application/json, text/javascript, */*; q=0.01");
                client.DefaultRequestHeaders.Add("Accept-Language", "vi,en;q=0.9,fr;q=0.8");
                client.DefaultRequestHeaders.Add("DNT", "1");
                client.DefaultRequestHeaders.Add("Origin", "https://dichvucong.gov.vn");
                client.DefaultRequestHeaders.Add("Referer", "https://dichvucong.gov.vn/p/home/dvc-index-tinhthanhpho-tonghop.html");
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36");
                client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");
                client.DefaultRequestHeaders.Add("sec-ch-ua", "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"");
                client.DefaultRequestHeaders.Add("sec-ch-ua-mobile", "?0");
                client.DefaultRequestHeaders.Add("sec-ch-ua-platform", "\"macOS\"");

                client.DefaultRequestHeaders.Add("Cookie", "route=1709107682.592.2518.225579; JSESSIONID=A492C26BC10324BBFDF27584594E917F; TS0115bee1=01f551f5ee8643d09ea9a2b83020be238c0ea8be9f7bd97609b1cc4c7e46d625517d0a3715c29573095260bf60e58165336b9c5f8e");

                var contentBodyCacHuyen = new StringContent(
                    "params=%7B%22type%22%3A%22ref%22%2C%22p_nam%22%3A%222024%22%2C%22p_6thang%22%3A0%2C%22p_tinh_id%22%3A%2211342%22%2C%22p_linhvuc%22%3A%220%22%2C%22p_huyen_id%22%3A%22%22%2C%22p_thutuc_id%22%3A%220%22%2C%22pageIndex%22%3A1%2C%22pageSize%22%3A100%2C%22p_default%22%3A0%2C%22p_xa_id%22%3A%220%22%2C%22p_quy%22%3A0%2C%22p_thang%22%3A0%2C%22service%22%3A%22report_by_year_service_part2%22%7D",
                    Encoding.UTF8,
                    "application/x-www-form-urlencoded");

                var responseHuyen = await client.PostAsync(url, contentBodyCacHuyen);
                string jsonResultHuyen = await responseHuyen.Content.ReadAsStringAsync();

                try
                {
                    var resultArrayHuyen = JsonSerializer.Deserialize<List<DataItem>>(jsonResultHuyen);
                    if (resultArrayHuyen != null && resultArrayHuyen.Any())
                    {
                        var coordinatesListHuyen = resultArrayHuyen.Select(item => new CoordinatesServiceDto
                        {
                            ID = item.ID,
                            GEO_JSON = item.GEO_JSON,
                            TEN_COQUAN = item.TEN_COQUAN,
                            MA_COQUAN = item.MA_COQUAN
                        }).ToList();

                        foreach (var coordinates in coordinatesListHuyen)
                        {

                            if (!string.IsNullOrEmpty(coordinates.MA_COQUAN) && !string.IsNullOrEmpty(coordinates.ID))
                            {
                                huyenIds.Add(coordinates.ID);
                                string sqlExcute = UpdateSQLHandler(coordinates.MA_COQUAN, coordinates.GEO_JSON.Replace("{\"type\":\"MultiPolygon\",\"coordinates\":", string.Empty)[..^1]);
                                await _dapperRepository.ExcuteAsync(sqlExcute);
                            }
                        }

                        if (huyenIds.Count > 0)
                        {
                            var res = await CoordinatesXaHandler(huyenIds, cancellationToken);
                            if (res != null && res.Failed)
                            {
                                return Result<string>.Fail(res.Message);
                            }
                        }

                        return Result<string>.Success("Data array processed successfully.");
                    }
                }
                catch (JsonException ex)
                {
                    return Result<string>.Fail($"QuanHuyen - JSON deserialization error: {ex.Message}. Raw JSON: {jsonResultHuyen}");
                }

                return Result<string>.Fail($"QuanHuyen - Failed to process the data. Raw JSON: {jsonResultHuyen}");
            }
        }

        public async Task<Result<string>> CoordinatesXaHandler(List<string> huyenIds, CancellationToken cancellationToken)
        {
            using (var client = new HttpClient())
            {
                var url = "https://dichvucong.gov.vn/jsp/rest.jsp";

                // Thiết lập headers
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Add("Accept", "application/json, text/javascript, */*; q=0.01");
                client.DefaultRequestHeaders.Add("Accept-Language", "vi,en;q=0.9,fr;q=0.8");
                client.DefaultRequestHeaders.Add("DNT", "1");
                client.DefaultRequestHeaders.Add("Origin", "https://dichvucong.gov.vn");
                client.DefaultRequestHeaders.Add("Referer", "https://dichvucong.gov.vn/p/home/dvc-index-tinhthanhpho-tonghop.html");
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36");
                client.DefaultRequestHeaders.Add("X-Requested-With", "XMLHttpRequest");
                client.DefaultRequestHeaders.Add("sec-ch-ua", "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"");
                client.DefaultRequestHeaders.Add("sec-ch-ua-mobile", "?0");
                client.DefaultRequestHeaders.Add("sec-ch-ua-platform", "\"macOS\"");

                // Thiết lập Cookie
                client.DefaultRequestHeaders.Add("Cookie", "route=1709107682.592.2518.225579; JSESSIONID=67E74F04F7CD7AA515F97453765927A0; TS0115bee1=01f551f5ee3b2e938f75913a8bb18706cd927467d8fb6e3f68dffef194cfaa7eb3c7098043d401776d96715c9429aad979451734f2");
                foreach (string id in huyenIds)
                {
                    // Chuẩn bị dữ liệu để gửi
                    var content = new StringContent(
                        $"params=%7B%22type%22%3A%22ref%22%2C%22p_nam%22%3A%222024%22%2C%22p_6thang%22%3A0%2C%22p_tinh_id%22%3A%2211342%22%2C%22p_linhvuc%22%3A%220%22%2C%22p_huyen_id%22%3A%22{id}%22%2C%22p_thutuc_id%22%3A%220%22%2C%22pageIndex%22%3A1%2C%22pageSize%22%3A100%2C%22p_default%22%3A0%2C%22p_xa_id%22%3A%220%22%2C%22p_quy%22%3A0%2C%22p_thang%22%3A0%2C%22service%22%3A%22report_by_year_service_part2%22%7D",
                        Encoding.UTF8,
                        "application/x-www-form-urlencoded"
                    );

                    // Gửi yêu cầu POST
                    var responseXa = await client.PostAsync(url, content);

                    string jsonResultXa = await responseXa.Content.ReadAsStringAsync();

                    try
                    {
                        var resultArray = JsonSerializer.Deserialize<List<DataItem>>(jsonResultXa);
                        if (resultArray != null && resultArray.Any())
                        {
                            var coordinatesList = resultArray.Select(item => new CoordinatesServiceDto
                            {
                                ID = item.ID,
                                GEO_JSON = item.GEO_JSON,
                                TEN_COQUAN = item.TEN_COQUAN,
                                MA_COQUAN = item.MA_COQUAN
                            }).ToList();

                            foreach (var coordinates in coordinatesList)
                            {

                                if (!string.IsNullOrEmpty(coordinates.MA_COQUAN))
                                {
                                    string sqlExcute = UpdateSQLHandler(coordinates.MA_COQUAN, coordinates.GEO_JSON.Replace("{\"type\":\"MultiPolygon\",\"coordinates\":", string.Empty)[..^1]);
                                    await _dapperRepository.ExcuteAsync(sqlExcute);
                                }
                            }

                        }
                    }
                    catch (JsonException ex)
                    {
                        return Result<string>.Fail($"XaPhuong - JSON deserialization error: {ex.Message}. Raw JSON: {jsonResultXa}");
                    }

                }

                return Result<string>.Success("Data array processed successfully.");
            }
        }
    }

    private static string UpdateSQLHandler(string? maDinhDanh, string? coordinates)
    {
        string tableName = "[Catalog].[Groups]";
        string whereString = $" WHERE DeletedOn is null and MaDinhDanh is not null and MaDinhDanh = N'{maDinhDanh}' ";

        return
            $"IF EXISTS (SELECT Id FROM {tableName} {whereString}) " +
                $"BEGIN UPDATE {tableName} " +
                        $"SET Coordinates = '{coordinates}' " +
                        $"{whereString} " +
                        $"END ";
    }

    public class CoordinatesServiceDto
    {
        public string? ID { get; set; }
        public string? GEO_JSON { get; set; }
        public string? TEN_COQUAN { get; set; }
        public string? MA_COQUAN { get; set; }
    }

    public class ResultWrapper
    {
        [JsonPropertyName("TOTAL")]
        public string Total { get; set; }

        [JsonPropertyName("ROW")]
        public List<DataItem> Data { get; set; }
    }

    public class DataItem
    {
        [JsonPropertyName("ID")]
        public string ID { get; set; }

        [JsonPropertyName("GEO_JSON")]
        public string GEO_JSON { get; set; }

        [JsonPropertyName("TEN_COQUAN")]
        public string TEN_COQUAN { get; set; }

        [JsonPropertyName("MA_COQUAN")]
        public string MA_COQUAN { get; set; }
    }
}
