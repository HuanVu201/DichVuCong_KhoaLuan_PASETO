﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Infrastructure.DvcPayment;
using Microsoft.Extensions.Configuration;

namespace TD.DichVuCongApi.Infrastructure.Common;
public class CommonServices : ICommonServices
{
    private CommonSettings _settings;
    public CommonServices(IOptions<CommonSettings> settings)
    {
        _settings = settings.Value;
    }

    public CommonSettings Get()
    {
        return _settings;
    }


}
