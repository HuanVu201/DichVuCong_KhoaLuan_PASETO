namespace TD.DichVuCongApi.Application.Catalog.NotificationApp.Dtos;
using System.Text.Json.Serialization;
public class SearchNotificationDto : IDto
{
    public Guid Id { get; set; }
    public Guid HoSoId { get; set; }
    public string MaHoSo { get; set; }
    public string Topic { get; set; }
    public string Type { get; set; }
    public string? Title { get; set; }
    public string? Data { get; set; }
    public string? Content { get; set; }
    public string? Description { get; set; }
    public string? Link { get; set; }
    public string? FullPath { get; set; }
    public DateTime? CreatedOn { get; set; }
    public bool? IsRead { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
