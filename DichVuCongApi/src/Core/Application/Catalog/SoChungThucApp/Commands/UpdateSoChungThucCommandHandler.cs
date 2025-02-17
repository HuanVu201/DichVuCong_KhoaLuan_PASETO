using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
public class UpdateSoChungThucCommandHandler : ICommandHandler<UpdateSoChungThucCommand>
{
    private readonly IRepositoryWithEvents<SoChungThuc> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IUserService _userservice;

    public UpdateSoChungThucCommandHandler(IRepositoryWithEvents<SoChungThuc> repositoryWithEvents, IDapperRepository dapperRepository, ICurrentUser currentUser, IUserService userservice)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _userservice = userservice;
    }

    public async Task<Result> Handle(UpdateSoChungThucCommand request, CancellationToken cancellationToken)
    {

        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        var sqlCountSctGiay = " select COUNT(TenSo) as TotalCount FROM[Catalog].[SoChungThucs] where DonVi = @DonVi and Loai = N'Giấy' and TrangThai = 1 and  DeletedOn is null";
        var sqlCountSctDienTu = " select COUNT(TenSo) as TotalCount FROM[Catalog].[SoChungThucs] where DonVi = @DonVi and Loai = N'Điện tử' and TrangThai = 1 and DeletedOn is null";
        var userOfficeCode = _currentUser.GetUserOfficeCode();
        var dataSctGiay = await _dapperRepository.QueryFirstOrDefaultAsync<CountSoChungThucDto>(sqlCountSctGiay, new
        {
            DonVi = userOfficeCode,
        });
        var dataSctDienTu = await _dapperRepository.QueryFirstOrDefaultAsync<CountSoChungThucDto>(sqlCountSctDienTu, new
        {
            DonVi = userOfficeCode
        });
        if (itemExitst == null)
            throw new NotFoundException($"Địa bàn với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.SoHienTai < itemExitst.SoHienTai)
            throw new NotFoundException($"Không thể sửa số hiện tại nhỏ hơn số hiện tại đang có");

        if (request.TrangThai == true)
        {
            if (itemExitst.Loai == "Điện tử") 
            {
                if (dataSctDienTu.TotalCount >= 1)
                {
                    throw new NotFoundException($"Không thể sửa sổ do đã có sổ điện tử đang mở");
                }
            }
            else if (itemExitst.Loai == "Giấy")
            {
                if (dataSctGiay.TotalCount >= 1)
                {
                    throw new NotFoundException($"Không thể sửa sổ do đã có sổ giấy đang mở");
                }
            }
        }
        
        var updatedSoChungThuc = itemExitst.Update(request.DonVi, request.TenSo, request.SoBatDau, request.SoHienTai, request.NgayBatDau, request.NgayDongSo, request.TrangThai, request.Loai);
        await _repositoryWithEvents.UpdateAsync(updatedSoChungThuc, cancellationToken);
        return (Result)Result.Success();
    }
}
