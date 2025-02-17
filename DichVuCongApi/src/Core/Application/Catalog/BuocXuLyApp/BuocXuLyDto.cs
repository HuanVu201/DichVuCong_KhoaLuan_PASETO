using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp;
public class BuocXuLyDto : IDto
{
    public Guid Id { get; set; }
    public string TenBuoc { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
