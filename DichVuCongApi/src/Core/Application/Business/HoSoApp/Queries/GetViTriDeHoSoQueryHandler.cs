using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.QrCodeServive;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class DataViTriDeHoSo
{
    public Guid? Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? ViTriDeHoSo { get; set; }
}

public class GetViTriDeHoSoQueryHandler : IQueryHandler<GetViTriDeHoSoQuery, object>
{
    private readonly IDapperRepository _dapperRepository;
    public GetViTriDeHoSoQueryHandler(IDapperRepository dapperRepository, IQrCodeService qrCodeService, IMediator mediator, IMinioService minioService)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<object>> Handle(GetViTriDeHoSoQuery request, CancellationToken cancellationToken)
    {
        var dataViTriDeHoSo = new DataViTriDeHoSo();
        string sqlQueryHoSo = $@"SELECT ID, MaHoSo, ViTriDeHoSo FROM Business.HoSos Where Id=@Id";
        var hoSoQuery = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sqlQueryHoSo, new { Id = request.Id }, null, cancellationToken);
        if(hoSoQuery != null)
        {
            dataViTriDeHoSo.Id = request.Id;
            dataViTriDeHoSo.MaHoSo = hoSoQuery.MaHoSo;
            dataViTriDeHoSo.ViTriDeHoSo = hoSoQuery.ViTriDeHoSo;
        }

        if (dataViTriDeHoSo is not null)
            return Result<object>.Success(dataViTriDeHoSo);
        throw new NotFoundException($"Hồ sơ với id: {request.Id} chưa được thêm trên hệ thống hoặc đã bị xóa");
    }

}