using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LogThongKeDGHLApp.Commands;

public class UpdateLogThongKeDGHLCommandHandler : ICommandHandler<UpdateLogThongKeDGHLCommand>
{
    private readonly IRepositoryWithEvents<LogThongKeDGHLCongDan> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;


    public UpdateLogThongKeDGHLCommandHandler(IRepositoryWithEvents<LogThongKeDGHLCongDan> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;

    }

    public async Task<Result> Handle(UpdateLogThongKeDGHLCommand request, CancellationToken cancellationToken)
    {

        string sql = @"SELECT * FROM  Business.LogThongKeDGHLCongDans WHERE MaHoSo = @MaHoSo";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<LogThongKeDGHLCongDan>(sql, request);

        if (data == null)
            throw new NotFoundException($"LogThongKeDGHL với mã hồ sơ: {request.MaHoSo} chưa được thêm vào hệ thống");
        if(data.HoanThanhDanhGia == true)
            throw new NotFoundException($"LogThongKeDGHL với mã hồ sơ: {request.MaHoSo} đã được đánh giá");

        var updatedLogThongKeDGHL = data.Update(request.DonVi,request.NgayTao,request.MaHoSo,request.NguoiDanhGia,request.TraLoi1,request.TraLoi2,request.TraLoi3,request.TraLoi4,request.TraLoi5,request.TraLoi6,request.TraLoi7,request.TraLoi8,request.TraLoi9,request.TraLoi10,request.TraLoi11,request.HoanThanhDanhGia);
        await _repositoryWithEvents.UpdateAsync(updatedLogThongKeDGHL, cancellationToken);
        return (Result)Result.Success();

    }
}