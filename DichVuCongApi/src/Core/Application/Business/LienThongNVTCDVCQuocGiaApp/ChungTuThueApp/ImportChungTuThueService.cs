using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.LienThongNVTCDVCQG;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ChungTuThueApp;
public class ImportChungTuThueService
{
    public class ImportChungTuThueServiceCommand : ICommand<string>, ITransientService
    {
        public string SecurityKey { get; set; } = string.Empty;
        public string Service { get; set; } = string.Empty;
        public string IsUpdating { get; set; } = string.Empty;
        public ImportChungTuThueData Data { get; set; } = new ImportChungTuThueData();
    }

    public class ImportChungTuThueData
    {
        public string XaNguoiNopTien { get; set; } = string.Empty;
        public string SoCMTNguoiNopTien { get; set; } = string.Empty;
        public ThongTinThanhToanElement ThongTinThanhToan { get; set; } = new ThongTinThanhToanElement();
        public string UrlFileChungTu { get; set; } = string.Empty;
        public string TinhNguoiNopTien { get; set; } = string.Empty;
        public string MaHoSo { get; set; } = string.Empty;
        public string MaSoThue { get; set; } = string.Empty;
        public string DiaChiNguoiNopTien { get; set; } = string.Empty;
        public string HoTenNguoiNopTien { get; set; } = string.Empty;
        public string HuyenNguoiNopTien { get; set; } = string.Empty;
    }

    public class ThongTinThanhToanElement
    {
        public string NoiDungThanhToan { get; set; } = string.Empty;
        public string ThoiGianThanhToan { get; set; } = string.Empty;
        public string MaThongBaoThue { get; set; } = string.Empty;
        public int TrangThaiThanhToan { get; set; }
        public double SoTien { get; set; }
    }

    public class ImportChungTuThueServiceCommandHandler : ICommandHandler<ImportChungTuThueServiceCommand, string>
    {
        private readonly IRepositoryWithEvents<ChungTuThue> _repositoryWithEvents;
        private readonly IDapperRepository _dapperRepository;
        private readonly IMediator _mediator;
        private readonly IMinioService _minioService;
        private readonly IReadRepository<Config> _readRepositoryConfig;
        private static string securitycode = "security-code-lien-thong-thue-dvc-quoc-gia";
        public ImportChungTuThueServiceCommandHandler(IRepositoryWithEvents<ChungTuThue> repositoryWithEvents, IDapperRepository dapperRepository, IMediator mediator, IMinioService minioService, IReadRepository<Config> readRepositoryConfig)
        {
            _repositoryWithEvents = repositoryWithEvents;
            _dapperRepository = dapperRepository;
            _mediator = mediator;
            _minioService = minioService;
            _readRepositoryConfig = readRepositoryConfig;
        }

        public async Task<Result<string>> Handle(ImportChungTuThueServiceCommand request, CancellationToken cancellationToken)
        {

            try
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(securitycode), cancellationToken);
                if (string.IsNullOrEmpty(request.SecurityKey) || request.SecurityKey != config.Content)
                    return Result<string>.Fail("401 Unauthorized - Error Security Code");

                DefaultIdType? hoSoId = null;

                if (!string.IsNullOrEmpty(request.Data.MaHoSo))
                {
                    string sqlCheckInvalidHoSo = @"SELECT TOP (1) ID, ChuHoSo
                                                FROM [Business].[HoSos]
                                                WHERE MaHoSo = @MaHoSo AND DeletedOn is null";
                    var resHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlCheckInvalidHoSo, new
                    {
                        MaHoSo = request.Data.MaHoSo
                    });
                    if (resHoSo == null)
                    {
                        return Result<string>.Fail("Lỗi đồng bộ Chứng từ thuế, không tồn tại mã hồ sơ: " + request.Data.MaHoSo);
                    }
                    else
                    {
                        string fileRes = await _minioService.UploadStringToMinioAsync(JsonConvert.SerializeObject(request), "dichvucong", "LienThongNVTCDVCQuocGia");
                        if (string.IsNullOrEmpty(fileRes))
                            return Result<string>.Fail("Lỗi lưu file LienThongNVTCDVCQuocGia");

                        var resImportLienThongId = await _mediator.Send(new AddLienThongNVTCDVCQuocGiaCommand()
                        {
                            File = fileRes ?? string.Empty,
                            TrangThai = "Đồng bộ thành công",
                            Loai = "ChungTuThue"
                        });

                        DateTime thoiGianThanhToan;
                        if (!DateTime.TryParseExact(request.Data.ThongTinThanhToan.ThoiGianThanhToan, "yyyyMMddHHmmss", CultureInfo.InvariantCulture, DateTimeStyles.None, out thoiGianThanhToan))
                        {
                            // Nếu không chuyển đổi thành công, gán thoiGianThanhToan bằng DateTime.MinValue
                            thoiGianThanhToan = DateTime.MinValue;
                        }

                        var resImportChungTuThue = await _mediator.Send(new AddChungTuThueCommand()
                        {
                            HoSoId = resHoSo.Id,
                            Nguon = "Tổng cục thuế",
                            MaSoThue = request.Data.MaSoThue,
                            SoTien = request.Data.ThongTinThanhToan.SoTien,
                            NoiDungThanhToan = request.Data.ThongTinThanhToan.NoiDungThanhToan,
                            ThoiGianThanhToan = thoiGianThanhToan,
                            MaThongBaoThue = request.Data.ThongTinThanhToan.MaThongBaoThue,
                            TrangThaiThanhToan = request.Data.ThongTinThanhToan.TrangThaiThanhToan == 1 ? true : false,
                            BienLai = request.Data.UrlFileChungTu,
                            SoCMTNguoiNopTien = request.Data.SoCMTNguoiNopTien,
                            HoTenNguoiNopTien = request.Data.HoTenNguoiNopTien,
                            TinhNguoiNopTien = request.Data.TinhNguoiNopTien,
                            HuyenNguoiNopTien = request.Data.HuyenNguoiNopTien,
                            XaNguoiNopTien = request.Data.XaNguoiNopTien,
                            DiaChiNguoiNopTien = request.Data.DiaChiNguoiNopTien,
                        });
                    }

                    return Result<string>.Success("Import 'Chứng từ thuế' từ cổng DVC Quốc gia thành công với mã hồ sơ: " + request.Data.MaHoSo);
                }
                else
                {
                    return Result<string>.Fail("Import 'Chứng từ thuế' từ cổng DVC Quốc gia thất bại");
                }

            }
            catch (Exception ex)
            {
                return Result<string>.Fail("Lỗi Import Chứng từ thuế từ cổng DVC Quốc gia: " + ex);
            }
        }
    }
}
