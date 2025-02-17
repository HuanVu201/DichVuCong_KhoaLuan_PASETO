using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

public class GetTaiKhoanQueryHandler : IRequestHandler<GetTaiKhoanQuery, UserAppDto>
{
    private readonly IDapperRepository _dapperRepository;
    public GetTaiKhoanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<UserAppDto> Handle(GetTaiKhoanQuery request, CancellationToken cancellationToken)
    {
        string sql = $@"Select Id, FullName, UserName, SoDinhDanh, Email, PhoneNumber, GioiTinh, NgayThangNamSinh, TypeUser from [Identity].[Users] where Id Like @Id";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sql, new { LoaiPhoi = $"%{request.Id}%" });

        return data;
    }
}
