using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp;
public class NgayNghiDto : IDto
{
    public Guid Id { get; set; }
    public DateTimeOffset? Date { get; set; }
    public string? Description { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
