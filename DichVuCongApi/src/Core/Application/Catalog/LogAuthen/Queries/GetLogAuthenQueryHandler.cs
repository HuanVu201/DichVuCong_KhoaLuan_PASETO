﻿using Microsoft.Extensions.Configuration;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.LogAuthen.Queries;
using TD.DichVuCongApi.Application.Catalog.LogAuthen.Service;
using TD.DichVuCongApi.Application.Catalog.LogAuthen;
using TD.DichVuCongApi.Catalog.Catalog.LogAuthen.Queries;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;

namespace TD.DichVuCongApi.Catalog.LogAuthen.Queries;
public class GetLogAuthenQueryHandler : IRequestHandler<GetLogAuthenQuery, LogAuthenDetailDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string connectionStr;
    private readonly ILogAuthenService _logAuthenService;
    private readonly ILogger<LogAuthenDetailDto> _logger;


    public GetLogAuthenQueryHandler(IDapperRepository dapperRepository, IConfiguration configuration, ILogAuthenService logAuthenService, ILogger<LogAuthenDetailDto> logger)
    {
        _dapperRepository = dapperRepository;
        _logAuthenService = logAuthenService;
        _logger = logger;
    }

    public async Task<LogAuthenDetailDto> Handle(GetLogAuthenQuery request, CancellationToken cancellationToken)
    {
        var sqlUser = $@"SELECT Email, PhoneNumber, SoDinhDanh, NgayThangNamSinh, GioiTinh
                        FROM [Identity].[Users]
                        WHERE ( UserName = @UserName )";
        try
        {
            LogAuthenDetailDto data = new LogAuthenDetailDto();
            var authenRes = await _logAuthenService.GetLogAuthenDetailAsync(request);

            if (authenRes is not null)
            {
                data.UserName = authenRes.UserName;
                data.FullName = authenRes.FullName;
                data.TypeUser = authenRes.TypeUser;
                data.CreatedAt = authenRes.CreatedAt;
                data.IP = authenRes.IP;
                data.Device = authenRes.Device;

                var userRes = await _dapperRepository.QueryFirstOrDefaultAsync<LogAuthenDetailDto>(sqlUser, new { UserName = data.UserName });
                if (userRes is not null)
                {
                    data.Email = userRes.Email;
                    data.PhoneNumber = userRes.PhoneNumber;
                    data.SoDinhDanh = userRes.SoDinhDanh;
                    data.NgayThangNamSinh = userRes.NgayThangNamSinh;
                    data.GioiTinh = userRes.GioiTinh;
                }

                return data;
            }

            throw new Exception("Có lỗi trong quá trình truy vấn thông tin cá nhân LogAuthen Handler");
        }
        catch (Exception ex)
        {
            throw new Exception("Có lỗi trong quá trình truy vấn thông tin cá nhân LogAuthen Handler: " + ex);
        }
    }
}