using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class UpdateThanhPhanThuTucCSDLCommandHandler : ICommandHandler<UpdateThanhPhanThuTucCSDLCommand>
{
    private readonly string tableName = "[Business].[ThanhPhanThuTucs]";
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<ThanhPhanThuTuc> _repositoryWithEvents;
    private IMediator _mediator;

    public UpdateThanhPhanThuTucCSDLCommandHandler(IDapperRepository dapperRepository, IRepository<ThanhPhanThuTuc> repositoryWithEvents, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }
    public async Task<Result> Handle(UpdateThanhPhanThuTucCSDLCommand request, CancellationToken cancellationToken)
    {
        AddMultiThanhPhanThuTucCommand addMultiThanhPhanThuTuc = new AddMultiThanhPhanThuTucCommand();
        foreach (var item in request.dataAdd)
        {
            var thanhPhanThuTuc = ThanhPhanThuTuc.Create(item.TenGiayTo, item.MaGiayTo, request.ThuTucId, request.TruongHopId, item.MaGiayToKhoQuocGia, item.TenMauDon, false, item.SoBanChinh, item.SoBanSao, null);
            addMultiThanhPhanThuTuc.data.Add(thanhPhanThuTuc);
        }
        await _mediator.Send(addMultiThanhPhanThuTuc);
        return (Result)Result.Success();
    }

}
