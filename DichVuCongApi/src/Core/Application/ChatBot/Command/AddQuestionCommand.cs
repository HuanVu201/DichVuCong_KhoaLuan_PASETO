using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.ChatBot.Command;
public class AddQuestionCommand : PaginationFilter, IRequest<PaginationResponse<object>>
{
    public string? Id { get; set; }
    public string listKeyStr { get; set; }
    public string capThucHien{ get; set; }

    public string? fieldsStr { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 100;
    public new int PageNumber { get; set; } = 1;
}
