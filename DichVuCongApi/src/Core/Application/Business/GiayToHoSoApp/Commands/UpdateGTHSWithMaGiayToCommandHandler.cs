using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Queries;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Commands;
public class UpdateGTHSWithMaGiayToCommandHandler : ICommandHandler<UpdateGTHSWithMaGiayToCommand>
{
    private readonly IRepository<GiayToHoSo> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;

    public UpdateGTHSWithMaGiayToCommandHandler(IRepository<GiayToHoSo> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(UpdateGTHSWithMaGiayToCommand request, CancellationToken cancellationToken)
    {

        string sqlGiayToHoSo = $@"SELECT Id, PDFPhieu, MaGiayTo FROM Business.GiayToHoSos Where MaGiayTo=@MaGiayTo And SuDung = '1'";
        var gths = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToHoSoDto>(sqlGiayToHoSo, new { MaGiayTo = request.MaGiayTo });

        var itemExitst = await _repositoryWithEvents.GetByIdAsync(gths.Id, cancellationToken);

        if (itemExitst == null)
            throw new NotFoundException($"GiayToHoSo với mã giấy tờ: {request.MaGiayTo} chưa được thêm vào hệ thống hoặc không được sử dụng!");

        var updatedGiayToHoSo = itemExitst.Update(request.SuDung, request.PDFPhieu, request.DocxPhieu, request.HinhAnhChuKyCongDan, request.NgayKySo, request.NguoiKySo, request.NgayGuiCongDan, request.TrangThaiGuiCongDan, request.NguoiGuiCongDan);
        await _repositoryWithEvents.UpdateAsync(updatedGiayToHoSo, cancellationToken);
        return (Result)Result.Success();
    }
}