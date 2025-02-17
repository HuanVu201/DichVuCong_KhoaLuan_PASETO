using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.OCR;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;


public class GetDuLieuOCRQueryHandler : IQueryHandler<GetDuLieuOCRQuery, DuLieuOCRDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IOCRService _oCRService;
    public GetDuLieuOCRQueryHandler(IDapperRepository dapperRepository, IOCRService oCRService)
    {
        _dapperRepository = dapperRepository;
        _oCRService = oCRService;
    }
    public async Task<Result<DuLieuOCRDto>> Handle(GetDuLieuOCRQuery request, CancellationToken cancellationToken)
    {
        string sql = @"SELECT EformKetQua, MaNhanDienOCR
                       FROM Business.KetQuaThuTucs WHERE Id = @Id";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTucOCR>(sql, request);
        if (data == null)
        {
            throw new NotFoundException($"Kết quả thủ tục với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        var ocrResponse = await _oCRService.GetData(data.MaNhanDienOCR, request.fileUrl);
        var response = new DuLieuOCRDto()
        {
            EFormKetQuaData = JsonConvert.SerializeObject(new {data = ocrResponse.results[0] }),
            EFormKetQua = data.EformKetQua
        };

        return Result<DuLieuOCRDto>.Success(response);
    }
}
