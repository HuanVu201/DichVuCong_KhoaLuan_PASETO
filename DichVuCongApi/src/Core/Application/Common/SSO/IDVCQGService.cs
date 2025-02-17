﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Identity.Tokens;

namespace TD.DichVuCongApi.Application.Common.SSO;
public interface IDVCQGService : ITransientService
{
    public Task<string?> KiemTraNguoiDungDVCQuocGia(UserInfoDvcqgRequest request);
    public Task<string?> GetTokenAsync(string accessToken, string? ipAddress, string? device = null);
}
