using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Commands;
public class UpdateDanhGiaCoQuanCommandHandler : ICommandHandler<UpdateDanhGiaCoQuanCommand>
{
    private readonly IRepository<DanhGiaCoQuan> _repositoryWithEvents;

    public UpdateDanhGiaCoQuanCommandHandler(IRepository<DanhGiaCoQuan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDanhGiaCoQuanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGiaCoQuan với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedDanhGiaCoQuan =  itemExitst.Update(request.DonVi, request.DonViText, request.MaNhomCha, request.MaNhomChaText, request.DongBo, request.Quy, request.Nam, request.TraLoi1,
                               request.TraLoi2, request.TraLoi3, request.TraLoi4, request.TraLoi5, request.TraLoi6, request.TraLoi7, request.TraLoi8, request.TraLoi9,
                               request.SoPhieu, request.TongDiem, request.PhongBan, request.LyDoTruDiem, request.MaHoSo, request.HinhThucDanhGia, request.MucDoRHL, request.MucDoHL,
                               request.MucDoBT, request.MucDoKHL, request.MucDoRKHL, request.ThamDinhTraLoi1, request.ThamDinhTraLoi2, request.ThamDinhTraLoi3, request.ThamDinhTraLoi4,
                               request.ThamDinhTraLoi5, request.ThamDinhTraLoi6, request.ThamDinhTraLoi7, request.ThamDinhTraLoi8, request.ThamDinhTraLoi9, request.XepLoai, request.XepHang, request.TongDonViCon,
                               request.TraLoi10,request.TraLoi11,request.ThamDinhTraLoi10,request.ThamDinhTraLoi11);
        await _repositoryWithEvents.UpdateAsync(updatedDanhGiaCoQuan, cancellationToken);
        return (Result)Result.Success();
    }
}
