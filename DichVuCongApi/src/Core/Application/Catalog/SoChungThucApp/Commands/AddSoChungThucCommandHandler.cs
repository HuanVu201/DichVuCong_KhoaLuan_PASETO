using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
public class AddSoChungThucCommandHandler : ICommandHandler<AddSoChungThucCommand, Guid>
{
    private readonly IRepositoryWithEvents<SoChungThuc> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;

    public AddSoChungThucCommandHandler(IRepositoryWithEvents<SoChungThuc> repositoryWithEvents, ICurrentUser currentUser,  IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<DefaultIdType>> Handle(AddSoChungThucCommand request, CancellationToken cancellationToken)
    {
        var sqlCountSctGiay = " select COUNT(TenSo) as TotalCount FROM[Catalog].[SoChungThucs] where DonVi = @DonVi and Loai = N'Giấy' and TrangThai = 1  and DeletedOn is null";
        var sqlCountSctDienTu = " select COUNT(TenSo) as TotalCount FROM[Catalog].[SoChungThucs] where DonVi = @DonVi and Loai = N'Điện tử' and TrangThai = 1  and DeletedOn is null";
        var userOfficeCode = _currentUser.GetUserOfficeCode();
        var dataSctGiay = await _dapperRepository.QueryFirstOrDefaultAsync<CountSoChungThucDto>(sqlCountSctGiay, new
        {
            DonVi = userOfficeCode,
        });
        var dataSctDienTu = await _dapperRepository.QueryFirstOrDefaultAsync<CountSoChungThucDto>(sqlCountSctDienTu, new
        {
            DonVi = userOfficeCode
        });
        var soChungThuc = new SoChungThuc(userOfficeCode, request.TenSo,request.SoBatDau,request.SoHienTai,request.NgayBatDau,request.NgayDongSo,request.TrangThai, request.Loai);
        if (request.TrangThai == true)
        {
            if (request.Loai == "Điện tử")
            {
                if (dataSctDienTu.TotalCount >= 1)
                {
                    throw new NotFoundException($"Không thể thêm mới do đã tồn tại 1 sổ điện tử đang mở");
                }
            }
            else if (request.Loai == "Giấy")
            {
                if (dataSctGiay.TotalCount >= 1)
                {
                    throw new NotFoundException($"Không thể thêm mới do đã tồn tại 1 sổ giấy đang mở");
                }
            }
        }
        await _repositoryWithEvents.AddAsync(soChungThuc, cancellationToken);
        return Result<Guid>.Success(soChungThuc.Id);
    }
}
