﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.MemoryCacheService;
public class MemoryCacheServiceRequestParams
{
    public string? Key { get; set; }
    public string? Value { get; set; }
    public int? CacheTime { get; set; }
}
