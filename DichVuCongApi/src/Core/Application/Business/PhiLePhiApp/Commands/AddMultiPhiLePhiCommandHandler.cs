using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Commands;
public class AddMultiPhiLePhiCommandHandler : ICommandHandler<AddMultiPhiLePhiCommand>
{
    private readonly string tableName = "[Business].[PhiLePhis]";
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<PhiLePhi> _repositoryWithEvents;
    private IMediator _mediator;

    public AddMultiPhiLePhiCommandHandler(IDapperRepository dapperRepository, IRepository<PhiLePhi> repositoryWithEvents, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }
    public async Task<Result> Handle(AddMultiPhiLePhiCommand request, CancellationToken cancellationToken)
    {
        //List<AddPhiLePhiCommand> addPhiLePHi = new List<AddPhiLePhiCommand>();
        foreach (var item in request.dataAdd)
        {
            AddPhiLePhiCommand addPhiLePHi = new AddPhiLePhiCommand()
            {
                DinhKem = item.DINHKEM,
                Ten = item.TEN,
                Loai = item.LOAI,
                Ma = item.MA,
                SoTien = item.SOTIEN,
                ThuTucId = request.ThuTucId,
                MoTa = item.MOTA,
            };
            await _mediator.Send(addPhiLePHi);
        }


        return (Result)Result.Success();
    }
}
