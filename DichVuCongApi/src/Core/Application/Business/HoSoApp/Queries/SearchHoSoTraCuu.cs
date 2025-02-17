using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoTraCuu : ICommand<HoSoDto>
{
    public string MaHoSo { get; set; }
    public string SoDinhDanh { get; set; }
    public string MaCaptCha { get; set; }
    private string SecretKey { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;

    public void SetSecretKey (string key)
    {
        this.SecretKey = key;
    }

    public string GetSecretKey()
    {
        return SecretKey;
    }
}
