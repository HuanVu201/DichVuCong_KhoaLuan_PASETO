using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoHienTaiJob;
public class TaskSoLieuBaoCaoHienTaiService
{

    public class TaskSoLieuThongKeHienTai : IRequest<Result<string>>, ITransientService
    {
    }

    public class TaskSoLieuBaoCaoHienTaiHandler : IRequestHandler<TaskSoLieuThongKeHienTai, Result<string>>, ITransientService
    {
        private readonly IMediator _mediator;
        private readonly IDapperRepository _dapperRepository;
        private readonly ILogger<SoLieuBaoCaoHienTai> _logger;

        public TaskSoLieuBaoCaoHienTaiHandler(IMediator mediator, IDapperRepository dapperRepository, ILogger<SoLieuBaoCaoHienTai> logger)
        {
            _mediator = mediator;
            _dapperRepository = dapperRepository;
            _logger = logger;
        }

        public async Task<Result<string>> Handle(TaskSoLieuThongKeHienTai request, CancellationToken cancellationToken)
        {
            try
            {
                var groups = GetGroups().Result;
                TiepNhanHoSoTrucTuyenConstants groupConstants = new TiepNhanHoSoTrucTuyenConstants();
                DateTime timeRequest = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd"));

                #region Loại thống: Toàn tỉnh

                var resThongKeToanTinh = await _mediator.Send(new SoLieuThongKeHienTaiTheoDonViRequest()
                {
                    TuNgay = timeRequest,
                    DenNgay = timeRequest,
                });

                string soLieuJsonToanTinh = System.Text.Json.JsonSerializer.Serialize(resThongKeToanTinh.Data);
                string sqlExcuteToanTinh = GetQueryInsertOrUpdateSQL("ToanTinh", null, soLieuJsonToanTinh);
                await _dapperRepository.ExcuteAsync(sqlExcuteToanTinh);

                _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke hien tai - Toan_tinh");

                #endregion

                #region Loại thống kê đơn vị
                foreach (var group in groups)
                {
                    if (string.IsNullOrEmpty(group.MaDinhDanh))
                        continue;

                    var resThongKeDonVi = await _mediator.Send(new SoLieuThongKeHienTaiTheoDonViRequest()
                    {
                        MaDinhDanh = group.MaDinhDanh,
                        TuNgay = timeRequest,
                        DenNgay = timeRequest,
                    });

                    string soLieuJsonDonVi = System.Text.Json.JsonSerializer.Serialize(resThongKeDonVi.Data);
                    string sqlExcuteDonVi = GetQueryInsertOrUpdateSQL("DonVi", group.MaDinhDanh, soLieuJsonDonVi);
                    await _dapperRepository.ExcuteAsync(sqlExcuteDonVi);

                    _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke hien tai - Don vi {group.MaDinhDanh}");

                }
                #endregion

                #region Loại thống kê Sở-ban-ngành

                var resThongKeSoBanNganh = await _mediator.Send(new SoLieuThongKeHienTaiTheoDonViRequest()
                {
                    Catalogs = [groupConstants.CATALOG.SO_BAN_NGANH],
                    TuNgay = timeRequest,
                    DenNgay = timeRequest,
                });

                string soLieuJsonSoBanNganh = System.Text.Json.JsonSerializer.Serialize(resThongKeSoBanNganh.Data);
                string sqlExcuteSoBanNganh = GetQueryInsertOrUpdateSQL("SoBanNganh", null, soLieuJsonSoBanNganh);
                await _dapperRepository.ExcuteAsync(sqlExcuteSoBanNganh);

                _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke hien tai - So_ban-nganh");

                #endregion

                #region Loại thống kê Quận-huyện

                var resThongKeQuanHuyen = await _mediator.Send(new SoLieuThongKeHienTaiTheoDonViRequest()
                {
                    Catalogs = [groupConstants.CATALOG.QUAN_HUYEN],
                    TuNgay = timeRequest,
                    DenNgay = timeRequest,
                });

                string soLieuJsonQuanHuyen = System.Text.Json.JsonSerializer.Serialize(resThongKeQuanHuyen.Data);
                string sqlExcuteQuanHuyen = GetQueryInsertOrUpdateSQL("QuanHuyen", null, soLieuJsonQuanHuyen);
                await _dapperRepository.ExcuteAsync(sqlExcuteQuanHuyen);

                _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke hien tai - Quan_huyen");

                #endregion

                #region Loại thống kê Xã-phường
                var resThongKeXaPhuong = await _mediator.Send(new SoLieuThongKeHienTaiTheoDonViRequest()
                {
                    Catalogs = [groupConstants.CATALOG.XA_PHUONG],
                    TuNgay = timeRequest,
                    DenNgay = timeRequest,
                });

                string soLieuJsonXaPhuong = System.Text.Json.JsonSerializer.Serialize(resThongKeXaPhuong.Data);
                string sqlExcuteXaPhuong = GetQueryInsertOrUpdateSQL("XaPhuong", null, soLieuJsonXaPhuong);
                await _dapperRepository.ExcuteAsync(sqlExcuteXaPhuong);

                _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke hien tai - Xa_phuong");

                #endregion

                #region Loại thống kê Chi nhành VPDKDD

                var resThongKeCNVPDKDD = await _mediator.Send(new SoLieuThongKeHienTaiTheoDonViRequest()
                {
                    Catalogs = [groupConstants.CATALOG.CNVPDK],
                    TuNgay = timeRequest,
                    DenNgay = timeRequest,
                });

                string soLieuJsonCNVPDKDD = System.Text.Json.JsonSerializer.Serialize(resThongKeCNVPDKDD.Data);
                string sqlExcuteCNVPDKDD = GetQueryInsertOrUpdateSQL("ChiNhanhVPDK", null, soLieuJsonCNVPDKDD);
                await _dapperRepository.ExcuteAsync(sqlExcuteCNVPDKDD);

                _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke hien tai - ChiNhanhVPDKDD");

                #endregion

                #region Tính tổng tất cả các xã của từng huyện
                var huyenGroups = groups.Where(x => x.Catalog == "quan-huyen");
                foreach (var group in huyenGroups)
                {
                    if (string.IsNullOrEmpty(group.MaDinhDanh))
                        continue;

                    var resThongKeTongDonViCon = await _mediator.Send(new SoLieuThongKeHienTaiTheoDonViRequest()
                    {
                        Catalogs = [groupConstants.CATALOG.XA_PHUONG],
                        MaDinhDanhCha = group.MaDinhDanh,
                        ChiBaoGomDonViCon = true,
                        TuNgay = timeRequest,
                        DenNgay = timeRequest,
                    });

                    string soLieuJsonTongDonViCon = System.Text.Json.JsonSerializer.Serialize(resThongKeTongDonViCon.Data);
                    string sqlExcuteTongDonViCon = GetQueryInsertOrUpdateSQL("TongDonViCon", group.MaDinhDanh, soLieuJsonTongDonViCon);
                    await _dapperRepository.ExcuteAsync(sqlExcuteTongDonViCon);

                    _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke hien tai - TongDonViCon {group.MaDinhDanh}");

                }
                #endregion

                return Result<string>.Success(message: "Cập nhật số liệu thành công");
            }
            catch (Exception ex)
            {
                _logger.LogInformation("TaskSoLieuBaoCaoHienTai: " + ex.Message);
                throw;
            }
        }

        private static string GetQueryInsertOrUpdateSQL(string loaiThongKe, string? maDinhDanh, string soLieu)
        {
            Guid id = Guid.NewGuid();
            string tableName = "[Portal].[SoLieuBaoCaoHienTais]";
            string whereString = $" WHERE LoaiThongKe = '{loaiThongKe}' ";

            if (!string.IsNullOrEmpty(maDinhDanh))
                whereString += $" AND MaDinhDanh = '{maDinhDanh}'";
            DateTime current = DateTime.Now;

            return
                $"IF EXISTS (SELECT Id FROM {tableName} {whereString}) " +
                    $"BEGIN UPDATE {tableName} " +
                    $"SET Id = '{id}', LoaiThongKe = '{loaiThongKe}', " +
                        $"MaDinhDanh = N'{maDinhDanh}', SoLieu = N'{soLieu}', " +
                        $"LastModifiedOn = '{current}'" +
                    $"{whereString} " +
                    $"END " +
                $"ELSE " +
                    $"BEGIN " +
                    $"INSERT INTO {tableName} " +
                        $"([Id], [LoaiThongKe], [MaDinhDanh], [SoLieu], [CreatedOn]) " +
                    $"VALUES " +
                        $"('{id}', '{loaiThongKe}', '{maDinhDanh}', N'{soLieu}', '{current}'); " +
                    $"END; ";
        }

        public async Task<List<GroupDto>> GetGroups()
        {
            SearchGroupQuery queryGroups = new SearchGroupQuery();
            queryGroups.Type = "don-vi";
            queryGroups.HasMaDinhDanh = true;
            queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
            queryGroups.PageNumber = 1;
            queryGroups.PageSize = 10000;
            var groupsDto = await _mediator.Send(queryGroups);
            if (groupsDto.Data == null)
                throw new Exception("Groups not found or is empty.");
            List<GroupDto> groups = groupsDto.Data;
            return groups;
        }
    }

    public class DateTimeRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class ThoiGianThongKeElement
    {
        public string LoaiThoiGian { get; set; } = string.Empty;
        public int Ky { get; set; }
        public int Nam { get; set; }
    }
}
