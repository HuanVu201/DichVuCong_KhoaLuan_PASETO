using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Commands;
public class AddLoaiGiayToKhoLuuTruCommandHandler : ICommandHandler<AddLoaiGiayToKhoLuuTruCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<LoaiGiayToKhoLuuTru> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public AddLoaiGiayToKhoLuuTruCommandHandler(IRepositoryWithEvents<LoaiGiayToKhoLuuTru> repositoryWithEvents, ICurrentUser currentUser, IDapperRepository dapperRepository, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }

    public async Task<Result<DefaultIdType>> Handle(AddLoaiGiayToKhoLuuTruCommand request, CancellationToken cancellationToken)
    {
        var loai = LoaiGiayToKhoLuuTru.Create(request.Ma, request.Ten, request.Eform, request.SuDung);
        await _repositoryWithEvents.AddAsync(loai, cancellationToken);
        return Result<DefaultIdType>.Success(loai.Id);
    }
}