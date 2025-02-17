using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class UpdateViTriDeHoSoCommandHandler : ICommandHandler<UpdateViTriDeHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly ICurrentUser _user;


    public UpdateViTriDeHoSoCommandHandler(IRepositoryWithEvents<HoSo> repositoryWithEvents, IDapperRepository dapperRepository, ICurrentUser user)
    {
        _repositoryHoSo = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _user = user;
    }
    public async Task<Result> Handle(UpdateViTriDeHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var itemExitst = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        if (itemExitst == null)
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedHoSo = itemExitst.UpdateViTriDeHoSo(request.ViTriDeHoSo, currentTime, userFullName);
        await _repositoryHoSo.UpdateAsync(updatedHoSo);
        return (Result)Result.Success();
    }
}