using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;

public class UpdateDonViThuTucCommandHandler : ICommandHandler<UpdateDonViThuTucCommand>
{
    private readonly IRepositoryWithEvents<DonViThuTuc> _repositoryWithEvents;
    private readonly IMediator _mediator;
    private readonly ILogger<DonViThuTuc> _logger;
    public UpdateDonViThuTucCommandHandler(IRepositoryWithEvents<DonViThuTuc> repositoryWithEvents, IMediator mediator, ILogger<DonViThuTuc> logger)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
        _logger = logger;
    }

    public async Task<Result> Handle(UpdateDonViThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst.MucDo != request.MucDo)
        {
            AddThayDoiThuTucCommand addThayDoiMucDoThuTuc = new AddThayDoiThuTucCommand();
            addThayDoiMucDoThuTuc.MucDoCu = itemExitst.MucDo;
            addThayDoiMucDoThuTuc.MucDoMoi = request.MucDo;
            addThayDoiMucDoThuTuc.ThuTuc = request.MaTTHC;
            addThayDoiMucDoThuTuc.DonVi = request.DonViId;
            

        }
        if (itemExitst == null)
            throw new NotFoundException($"DonViThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedDonViThuTuc = itemExitst.Update(request.MaTTHC, request.DonViId, request.NguoiTiepNhanId, request.MucDo, request.UrlRedirect, request.MaSoThue, request.DonViMaSoThue, request.TaiKhoanThuHuongId);
        await _repositoryWithEvents.UpdateAsync(updatedDonViThuTuc, cancellationToken);
        try
        {
            if (!string.IsNullOrEmpty(request.MucDo))
            {

                UpdateMucDoMultiThuTuc updateMucDo = new UpdateMucDoMultiThuTuc();
                updateMucDo.MucDo = request.MucDo;
                updateMucDo.MaTTHCs = new List<string>() { itemExitst.MaTTHC };
                var resUpdate = await _mediator.Send(updateMucDo);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("UpdateDonViThuTuc_UpdateMucDo", ex.Message);
        }

        return (Result)Result.Success();
    }
}
