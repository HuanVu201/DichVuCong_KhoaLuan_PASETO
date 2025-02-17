using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
public class DeleteThanhPhanHuongDanNopHoSoByMaHoSoHandler : ICommandHandler<DeleteThanhPhanHuongDanNopHoSoByMaHoSo>
{
    private readonly string tableName = "[Business].[ThanhPhanHuongDanNopHoSos]";
    private readonly IDapperRepository _repository;

    public DeleteThanhPhanHuongDanNopHoSoByMaHoSoHandler(IDapperRepository repository) => _repository = repository;

    public async Task<Result> Handle(DeleteThanhPhanHuongDanNopHoSoByMaHoSo request, CancellationToken cancellationToken)
    {
        string sql = $"DELETE FROM {tableName} WHERE HoSo = @HoSo";
        await _repository.ExcuteAsync(sql, new
        {
            HoSo = request.HoSo
        });
        return (Result)Result.Success();
    }
}
