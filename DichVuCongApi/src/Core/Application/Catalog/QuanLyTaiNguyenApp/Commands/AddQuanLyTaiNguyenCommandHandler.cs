using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Commands;
public class AddQuanLyTaiNguyenCommandHandler : ICommandHandler<AddQuanLyTaiNguyenCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<QuanLyTaiNguyen> _repositoryWithEvents;
    public AddQuanLyTaiNguyenCommandHandler(IRepositoryWithEvents<QuanLyTaiNguyen> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddQuanLyTaiNguyenCommand request, CancellationToken cancellationToken)
    {
        var QuanLyTaiNguyen = new QuanLyTaiNguyen(request.DinhKem, request.Ten, request.Mota, (bool)request.Public, (bool)request.SuDung,request.ThuTu,request.KichThuocTep);
        await _repositoryWithEvents.AddAsync(QuanLyTaiNguyen, cancellationToken);
        return Result<DefaultIdType>.Success(QuanLyTaiNguyen.Id);
    }
}
