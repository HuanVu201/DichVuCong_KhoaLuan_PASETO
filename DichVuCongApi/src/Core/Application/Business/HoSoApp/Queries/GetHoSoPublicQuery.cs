using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class GetHoSoPublicQuery : ICommand<HoSoPublicDto>
{
    public string MaHoSo { get; set; }
    public string SoDinhDanh { get; set; }
    private string SecretKey { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    //public new int PageSize { get; set; } = 10;
    //public new int PageNumber { get; set; } = 1;

    public void SetSecretKey(string key)
    {
        this.SecretKey = key;
    }
    public string GetSecretKey()
    {
        return SecretKey;
    }
}
