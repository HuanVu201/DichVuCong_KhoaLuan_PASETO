using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class GetDuLieuOCRQuery: IQuery<DuLieuOCRDto>
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string fileUrl { get; set; }
    public string maNhanDienOCR { get; set; }
}