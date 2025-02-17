using Newtonsoft.Json;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
public class DuplicateQuyTrinhXuLyHandler : ICommandHandler<DuplicateQuyTrinhXuLy>
{
    private readonly IMediator _mediator;
    private readonly IDapperRepository _dapperRepository;
    public DuplicateQuyTrinhXuLyHandler(IMediator mediator, IDapperRepository dapperRepository)
    {
        _mediator = mediator;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(DuplicateQuyTrinhXuLy request, CancellationToken cancellationToken)
    {
        try
        {
            if (request.Id == null) throw new ArgumentNullException(nameof(request.Id));

            if (string.IsNullOrEmpty(request.MaTruongHop)) throw new ArgumentNullException(nameof(request.MaTruongHop));

            Result<TruongHopThuTuc> currentTruongHopThuTuc = await _mediator.Send(new GetTruongHopThuTucQuery(request.Id), cancellationToken);
            if (currentTruongHopThuTuc.Data.Ma == request.MaTruongHop)
            {
                return (Result)Result.Success();
            }
            var resultDel = await _mediator.Send(new DeleteQuyTrinhXuLyByTruongHopId(request.Id, true), cancellationToken);
            var duplicateTruongHopThuTuc = await _mediator.Send(new GetTruongHopThuTucByMaTruongHop(request.MaTruongHop), cancellationToken);
            string duplicateNodeQuyTrinh = duplicateTruongHopThuTuc.Data.NodeQuyTrinh;
            string duplicateEdgeQuyTrinh = duplicateTruongHopThuTuc.Data.EdgeQuyTrinh;
            SearchHoSoQuery searchHoSoQuery = new SearchHoSoQuery();
            searchHoSoQuery.MaTruongHop = currentTruongHopThuTuc.Data.Ma;
            var hoSos = await _mediator.Send(searchHoSoQuery);
            if (hoSos != null && hoSos.Data != null && hoSos.Data.Count > 1) throw new Exception($"Đã tồn tại hồ sơ thuộc trường hợp thủ tục: {currentTruongHopThuTuc.Data.Ma}");
            SearchQuyTrinhXuLyQuery searchQuyTrinhXuLy = new SearchQuyTrinhXuLyQuery();
            searchQuyTrinhXuLy.TruongHopId = duplicateTruongHopThuTuc.Data.Id;
            searchQuyTrinhXuLy.PageNumber = 1;
            searchQuyTrinhXuLy.PageSize = 100;
            var quyTrinhXuLyDetails = await _mediator.Send(searchQuyTrinhXuLy);

            if (quyTrinhXuLyDetails.Data != null && quyTrinhXuLyDetails.Data.Count > 0)
            {
                AddQuyTrinhXuLyCommand addQuyTrinhXuLyCommand = new AddQuyTrinhXuLyCommand();
                addQuyTrinhXuLyCommand.QuyTrinhs = new List<QuyTrinhParams>();
                foreach (var item in quyTrinhXuLyDetails.Data)
                {
                    var newId = Guid.NewGuid();
                    QuyTrinhParams quyTrinhParams = new QuyTrinhParams(newId, request.Id, item.TenBuocXuLy, item.ThoiGianXuLy, item.LoaiThoiGian,
                        item.LoaiBuoc, item.TenNhomNguoiDung, item.TenTrangThaiHoSo, item.NhomNguoiDungId, item.MaTrangThaiHoSo, item.YeuCauCoKetQuaBuocTruoc, item.ChoPhepChuyenLaiBuocTruoc,
                        item.GuiLienThongQLVB, item.GuiEmail, item.BieuMauEmail, item.GuiSMS, item.BieuMauSMS, item.ThoiGianThucHienTrucTuyen);
                    addQuyTrinhXuLyCommand.QuyTrinhs.Add(quyTrinhParams);
                    duplicateEdgeQuyTrinh = Regex.Replace(duplicateEdgeQuyTrinh, item.Id.ToString(), newId.ToString());
                    duplicateNodeQuyTrinh = Regex.Replace(duplicateNodeQuyTrinh, item.Id.ToString(), newId.ToString());
                }
                UpdateTruongHopThuTucCommand updateTHTT = new UpdateTruongHopThuTucCommand();
                updateTHTT.Id = currentTruongHopThuTuc.Data.Id;
                updateTHTT.NodeQuyTrinh = duplicateNodeQuyTrinh;
                updateTHTT.EdgeQuyTrinh = duplicateEdgeQuyTrinh;
                var resultUpdateTHTT = await _mediator.Send(updateTHTT);
                var result = await _mediator.Send(addQuyTrinhXuLyCommand);
                return result;
            }
            else
            {
                throw new Exception($"Không tồn tại quy trình thuộc mã: {currentTruongHopThuTuc.Data.Ma}");
            }

        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(JsonConvert.SerializeObject(ex));

        }
    }
}
