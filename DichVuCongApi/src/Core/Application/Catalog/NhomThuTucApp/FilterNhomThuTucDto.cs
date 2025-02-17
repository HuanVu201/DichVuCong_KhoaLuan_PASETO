using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp;
public class FilterNhomThuTucDto : IDto
{
    public Guid? Id { get; set; }
    public string Ten { get; set; }

    public string MoTa { get; set; }

    public string Icon { get; set; }
    public string MauSac { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
