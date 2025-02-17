﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;
public class SearchGTSHOutsideKhoTaiLieuQuery : PaginationFilter, IRequest<PaginationResponse<GiayToSoHoaDto>>
{
    public string? MaDinhDanh { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
