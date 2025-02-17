using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class UpdateNgayNopSauKhiNopPhiHandler : ICommandHandler<UpdateNgayNopSauKhiNopPhiRequest>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IInjectConfiguration _configuration;
    public UpdateNgayNopSauKhiNopPhiHandler(IDapperRepository dapperRepository, IReadRepository<NgayNghi> repositoryNgayNghi, IInjectConfiguration configuration)
    {
        _dapperRepository = dapperRepository;
        _repositoryNgayNghi = repositoryNgayNghi;
        _configuration = configuration;
    }

    public async Task<Result> Handle(UpdateNgayNopSauKhiNopPhiRequest request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
        var caculateTime = new CaculateTime(_configuration);
        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, 8, "Ngày làm việc");
        string sql = $"UPDATE Business.Hosos SET NgayNopHoSo = '{currentTime}', HanTiepNhan = '{ngayHenTraCaNhan}' " +
            $"WHERE MaHoSo = '{request.MaHoSo}' AND TrangThaiHoSoId = '1' ";
        await _dapperRepository.ExcuteAsync(sql, cancellationToken);
        return (Result)Result.Success();
    }
}
