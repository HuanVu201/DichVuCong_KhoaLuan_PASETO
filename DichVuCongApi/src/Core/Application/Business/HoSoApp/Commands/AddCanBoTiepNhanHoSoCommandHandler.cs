using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class AddCanBoTiepNhanHoSoCommandHandler : ICommandHandler<AddCanBoTiepNhanHoSoCommand>
{
    private readonly IRepository<HoSo> _repositoryWithEvents;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoRepo;

    public AddCanBoTiepNhanHoSoCommandHandler(IRepository<HoSo> repositoryWithEvents,
        INguoiXuLyHoSoService nguoiXuLyHoSoRepo)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _nguoiXuLyHoSoRepo = nguoiXuLyHoSoRepo;
    }

    public async Task<Result> Handle(AddCanBoTiepNhanHoSoCommand request, CancellationToken cancellationToken)
    {
        string errHoSos = string.Empty;
        List<HoSo> updateListHoSos = new List<HoSo>();
        List<NguoiXuLyHoSo> nguoiXuLyHoSos = new List<NguoiXuLyHoSo>();
        foreach (Guid hoSoId in request.HoSoIds)
        {
            var itemExitst = await _repositoryWithEvents.GetByIdAsync(hoSoId, cancellationToken);
            if (itemExitst == null)
            {
                errHoSos += $"{hoSoId}##";
            }
            else
            {
                if (!string.IsNullOrEmpty(itemExitst.NguoiDangXuLy))
                {
                    var nguoiDangXuLyCurrent = itemExitst.NguoiDangXuLy.ToLower().Split(new[] { "##" }, StringSplitOptions.None);
                    var combinedParts = nguoiDangXuLyCurrent.Concat(request.CanBoIds.Select(x => x.ToString()).Distinct()).ToList();
                    combinedParts.ForEach(nguoiXuLy =>
                    {
                        nguoiXuLyHoSos.Add(new NguoiXuLyHoSo(Guid.Parse(nguoiXuLy), hoSoId));
                    });
                    string nguoiDangXuLyNew = string.Join("##", combinedParts);
                    var updateNguoiDangXuLy = itemExitst.UpdateNguoiDangXuLy(nguoiDangXuLyNew.ToUpper());
                    updateListHoSos.Add(updateNguoiDangXuLy);
                }
                else
                {
                    string nguoiDangXuLyNew = string.Join("##", request.CanBoIds);
                    request.CanBoIds.ForEach(nguoiXuLy =>
                    {
                        nguoiXuLyHoSos.Add(new NguoiXuLyHoSo(nguoiXuLy, hoSoId));
                    });
                    var updateNguoiDangXuLy = itemExitst.UpdateNguoiDangXuLy(nguoiDangXuLyNew.ToUpper());
                    updateListHoSos.Add(updateNguoiDangXuLy);
                }
            }
        }

        await _repositoryWithEvents.UpdateRangeAsync(updateListHoSos, cancellationToken);
        await _nguoiXuLyHoSoRepo.AddNguoiXuLyHoSos(nguoiXuLyHoSos);

        if (!string.IsNullOrEmpty(errHoSos))
        {
            if (errHoSos.TrimStart().EndsWith("##"))
                errHoSos = errHoSos.TrimEnd().Substring("##".Length);
            return (Result)Result.Fail($"Hồ sơ với Id: ${errHoSos} chưa được thêm vào hệ thống hoặc đã bị xóa");
        }

        return (Result)Result.Success();
    }
}