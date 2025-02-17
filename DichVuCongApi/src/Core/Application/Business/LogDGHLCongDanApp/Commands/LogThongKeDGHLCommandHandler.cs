using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp.Commands;
public class LogThongKeDGHLCommandHandler : ICommandHandler<LogThongKeDGHLCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<LogThongKeDGHLCongDan> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;

    public LogThongKeDGHLCommandHandler(IRepositoryWithEvents<LogThongKeDGHLCongDan> repositoryWithEvents, IDapperRepository dapperRepository) {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }


    public async Task<Result<DefaultIdType>> Handle(LogThongKeDGHLCommand request, CancellationToken cancellationToken)
    {
        string sql = @"SELECT * FROM  Business.LogThongKeDGHLCongDans WHERE MaHoSo = @MaHoSo";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<LogThongKeDGHLCongDan>(sql, request);
        if(data == null)
        {
            var menu = LogThongKeDGHLCongDan.Create(request.DonVi, request.NgayTao, request.MaHoSo, request.NguoiDanhGia, request.TraLoi1, request.TraLoi2, request.TraLoi3, request.TraLoi4, request.TraLoi5, request.TraLoi6, request.TraLoi7, request.TraLoi8, request.TraLoi9, request.TraLoi10, request.TraLoi11, request.HoanThanhDanhGia);
            await _repositoryWithEvents.AddAsync(menu, cancellationToken);
            return Result<DefaultIdType>.Success(menu.Id);
        }
        else
        {
            throw new NotFoundException($"LogThongKeDGHL với mã hồ sơ: {request.MaHoSo} đã được đánh giá");
        }

    }
}
