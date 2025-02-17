using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using static TD.DichVuCongApi.Application.Catalog.LinhVucApp.Service;
using TD.DichVuCongApi.Domain.Catalog;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http.Json;
using TD.DichVuCongApi.Domain.Business;
using System.Xml;
using System.Collections;
using System.Data.SqlTypes;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.LienThongNVTCDVCQG;
using System.Globalization;
using Microsoft.AspNetCore.Http;
using TD.DichVuCongApi.Application.Common.Minio;
using System.IO;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;

namespace TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ThongBaoThueApp;
public class ImportThongBaoThueService
{
    public class ImportThongBaoThueServiceCommand : ICommand<string>, ITransientService
    {
        public string SecurityKey { get; set; } = string.Empty;
        public string Service { get; set; } = string.Empty;
        public string Ngay { get; set; } = string.Empty;
        public string IsUpdating { get; set; } = string.Empty;
        public ImportThongBaoThueData Data { get; set; } = new ImportThongBaoThueData();
    }

    public class ImportThongBaoThueData
    {
        public string FileThongBaoThue { get; set; } = string.Empty;
    }
    public class ImportThongBaoThueServiceCommandHandler : ICommandHandler<ImportThongBaoThueServiceCommand, string>
    {
        private readonly IRepositoryWithEvents<ThongBaoThue> _repositoryWithEvents;
        private readonly IDapperRepository _dapperRepository;
        private readonly IMediator _mediator;
        private readonly IMinioService _minioService;
        private readonly IReadRepository<Config> _readRepositoryConfig;
        private static string securitycode = "security-code-lien-thong-thue-dvc-quoc-gia";
        public ImportThongBaoThueServiceCommandHandler(IRepositoryWithEvents<ThongBaoThue> repositoryWithEvents, IDapperRepository dapperRepository, IMediator mediator, IMinioService minioService, IReadRepository<Config> readRepositoryConfig)
        {
            _repositoryWithEvents = repositoryWithEvents;
            _dapperRepository = dapperRepository;
            _mediator = mediator;
            _minioService = minioService;
            _readRepositoryConfig = readRepositoryConfig;
        }

        public async Task<Result<string>> Handle(ImportThongBaoThueServiceCommand request, CancellationToken cancellationToken)
        {

            try
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(securitycode), cancellationToken);
                if (string.IsNullOrEmpty(request.SecurityKey) || request.SecurityKey != config.Content)
                    return Result<string>.Fail("401 Unauthorized - Error Security Code");

                List<string> maHoSoArr = new List<string>();
                string fileThongBao = request.Data.FileThongBaoThue;
                byte[] bytes = Convert.FromBase64String(fileThongBao);
                string xmlString = Encoding.UTF8.GetString(bytes);
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(xmlString);

                XmlNode bodyNode = xmlDoc.DocumentElement.SelectSingleNode("/DATA/BODY");

                if (bodyNode != null)
                {
                    // Lặp qua tất cả các phần tử ROW_LIST trong BODY
                    XmlNodeList rowListNodes = bodyNode.SelectNodes("ROW_LIST");

                    var thongBaoThues = new List<ThongBaoThue>();

                    foreach (XmlNode rowListNode in rowListNodes)
                    {
                        // Lấy phần tử MA_HSO trong từng ROW_LIST
                        string maHoSo = rowListNode.SelectSingleNode("MA_HSO")?.InnerText ?? string.Empty;
                        DefaultIdType? hoSoId = null;
                        if (!string.IsNullOrEmpty(maHoSo))
                        {
                            string sqlCheckInvalidHoSo = @"SELECT TOP (1) ID, ChuHoSo
                                                FROM [Business].[HoSos]
                                                WHERE MaHoSo = @MaHoSo AND DeletedOn is null";
                            var resHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlCheckInvalidHoSo, new
                            {
                                MaHoSo = maHoSo
                            });
                            if (resHoSo == null)
                            {
                                return Result<string>.Fail("Lỗi đồng bộ thông báo thuế, không tồn tại mã hồ sơ: " + maHoSo);
                            }
                            else
                            {
                                maHoSoArr.Add(maHoSo);
                                hoSoId = resHoSo.Id;
                                string fileRes = await _minioService.UploadStringToMinioAsync(JsonConvert.SerializeObject(request), "dichvucong", "LienThongNVTCDVCQuocGia");
                                if (string.IsNullOrEmpty(fileRes))
                                    return Result<string>.Fail("Lỗi lưu file LienThongNVTCDVCQuocGia");

                                var resImportLienThongId = await _mediator.Send(new AddLienThongNVTCDVCQuocGiaCommand()
                                {
                                    File = fileRes ?? string.Empty,
                                    TrangThai = "Đồng bộ thành công",
                                    Loai = "ThongBaoThue"
                                });
                            }
                        }

                        // Lấy danh sách các phần tử LIST trong ROW_LIST
                        XmlNodeList listNodes = rowListNode.SelectNodes("LIST");
                        foreach (XmlNode listNode in listNodes)
                        {
                            string maSoThue = listNode.SelectSingleNode("MA_SO_THUE")?.InnerText ?? string.Empty;
                            string soQuyetDinh = listNode.SelectSingleNode("SO_QUYET_DINH")?.InnerText ?? string.Empty;
                            string ngayQuyetDinhStr = listNode.SelectSingleNode("NGAY_QUYET_DINH")?.InnerText ?? string.Empty;
                            string tenTieuMuc = listNode.SelectSingleNode("TEN_TIEUMUC")?.InnerText ?? string.Empty;
                            string soTienStr = listNode.SelectSingleNode("SO_TIEN")?.InnerText ?? string.Empty;

                            double soTien;
                            if (!double.TryParse(soTienStr, NumberStyles.Any, CultureInfo.InvariantCulture, out soTien))
                            {
                                soTien = 0;
                            }

                            DateTime ngayQuyetDinh;
                            if (!DateTime.TryParseExact(ngayQuyetDinhStr, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out ngayQuyetDinh))
                            {
                                ngayQuyetDinh = DateTime.MinValue;
                            }

                            if (hoSoId != null)
                            {
                                var thongBaoThue = new ThongBaoThue((Guid)hoSoId, "Tổng cục thuế", maSoThue, soQuyetDinh, ngayQuyetDinh, tenTieuMuc, soTien);
                                thongBaoThues.Add(thongBaoThue);
                            }
                        }
                    }

                    if (thongBaoThues.Count > 0)
                    {
                        await _repositoryWithEvents.AddRangeAsync(thongBaoThues, cancellationToken);
                    }
                }

                return Result<string>.Success("Import 'Thông báo thuế' từ cổng DVC Quốc gia thành công với mã hồ sơ: " + string.Join(", ", maHoSoArr));
            }
            catch (Exception ex)
            {
                return Result<string>.Fail("Lỗi import Thông báo thuế từ cổng DVC Quốc gia: " + ex);
            }
        }
    }
}
