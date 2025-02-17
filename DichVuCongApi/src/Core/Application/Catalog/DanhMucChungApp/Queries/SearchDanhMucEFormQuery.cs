using Newtonsoft.Json;
namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Queries;
public class SearchDanhMucEFormQuery : IRequest<SearchDanhMucEFormResponse>
{
    public string? TenDanhMuc { get; set; }
    public string? Code { get; set; }
    public string? ParentCode { get; set; }
    public string? Type { get; set; }
    public string? Search { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public int Limit { get; set; } = 500;
    public int Skip { get; set; } = 0;
}
public static class SearchDanhMucEFormData
{
    public class Data
    {
        public string __type { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
    public class Error
    {
        public int code { get; set; } = 200;
        public string internalMessage { get; set; } = string.Empty;
        public string userMessage { get; set; } = string.Empty;
    }
}
public class SearchDanhMucEFormResponse
{
    public List<SearchDanhMucEFormData.Data> data { get; set; }
    public SearchDanhMucEFormData.Error error { get; set; }
    public int total { get; set; } = 0;

}