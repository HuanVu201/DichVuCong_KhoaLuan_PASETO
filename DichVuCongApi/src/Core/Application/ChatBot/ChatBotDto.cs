using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Application.ChatBot.Command;

namespace TD.DichVuCongApi.Application.ChatBot;
public class ChatBotDto : IDto
{
    public DefaultIdType ID { get; set; }
    public dynamic GoiTinThuTucQG { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
