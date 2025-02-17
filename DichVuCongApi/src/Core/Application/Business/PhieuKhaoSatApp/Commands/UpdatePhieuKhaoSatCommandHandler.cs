using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Commands;

public class UpdatePhieuKhaoSatCommandHandler : ICommandHandler<UpdatePhieuKhaoSatCommand>
{
    private readonly IRepositoryWithEvents<PhieuKhaoSat> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;


    public UpdatePhieuKhaoSatCommandHandler(IRepositoryWithEvents<PhieuKhaoSat> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;

    }

    public async Task<Result> Handle(UpdatePhieuKhaoSatCommand request, CancellationToken cancellationToken)
    {

        string sql = @"SELECT * FROM  Business.PhieuKhaoSats WHERE MaHoSo = @MaHoSo";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<PhieuKhaoSat>(sql, request);

        if (data == null)
            throw new NotFoundException($"PhieuKhaoSat với mã hồ sơ: {request.MaHoSo} chưa được thêm vào hệ thống");
        if(data.HoanThanhDanhGia == true)
            throw new NotFoundException($"PhieuKhaoSat với mã hồ sơ: {request.MaHoSo} đã được đánh giá");

        var updatedPhieuKhaoSat = data.Update(request.donVi, request.donViText, request.traLoi1, request.traLoi2, request.traLoi3, request.traLoi4, request.traLoi5, request.traLoi6, request.traLoi7, request.traLoi8, request.traLoi9, request.MaHoSo, request.hinhThucDanhGia, request.mucDoRHL, request.mucDoHL, request.mucDoBT, request.mucDoKHL, request.mucDoRKHL, request.NgayTao, request.nguoiNhapDanhGia, request.nguoiNhapDanhGiaText, request.loaiNhom, request.phongBan, request.phongBanText, true,request.tongDiem,request.xepLoai,request.traLoi10,request.traLoi11);
        await _repositoryWithEvents.UpdateAsync(updatedPhieuKhaoSat, cancellationToken);
        return (Result)Result.Success();

    }
}