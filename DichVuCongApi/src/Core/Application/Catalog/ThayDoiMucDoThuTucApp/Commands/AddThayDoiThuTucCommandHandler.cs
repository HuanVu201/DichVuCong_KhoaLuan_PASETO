using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Commands;
public class AddThayDoiThuTucCommandHandler : ICommandHandler<AddThayDoiThuTucCommand, Guid>
{
    private readonly IRepositoryWithEvents<ThayDoiMucDoThuTuc> _repositoryWithEvents;
    public AddThayDoiThuTucCommandHandler(IRepositoryWithEvents<ThayDoiMucDoThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThayDoiThuTucCommand request, CancellationToken cancellationToken)
    {
        var thayDoiMucDoThuTuc = ThayDoiMucDoThuTuc.Create(request.ThuTuc,request.DonVi,request.ThoiGian,request.MucDoCu,request.MucDoMoi,request.NguoiCapNhat);
        await _repositoryWithEvents.AddAsync(thayDoiMucDoThuTuc, cancellationToken);
        return Result<Guid>.Success(thayDoiMucDoThuTuc.Id);
    }

}
