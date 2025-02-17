using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;



namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class GetHoSoTheoDonViQuery : ICommand<HoSoTheoCanBoXuLyDto>
{
    public string MaHoSo { get; set; }
    public string UserId { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
}
