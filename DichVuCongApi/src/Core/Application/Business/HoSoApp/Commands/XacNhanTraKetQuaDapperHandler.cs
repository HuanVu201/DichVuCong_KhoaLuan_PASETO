using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class XacNhanTraKetQuaDapperHandler : ICommandHandler<XacNhanTraKetQuaDapper, Dictionary<string, string>>
{
    private readonly string BO_SUNG = "5";
    private readonly string hoSoTableName = "[Business].[HoSos]";
    private readonly string ycttTableName = "[Business].[YeuCauThanhToans]";
    private readonly IMediator _mediator;
    private readonly IUserService _user;
    private readonly IJobService _jobService;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly IEventPublisher _eventPublisher;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    private YeuCauThanhToanConstants _yeuCauThanhToanContants;
    private readonly IMinioService _minioService;
    private readonly ICommonServices _commonServices;
    public XacNhanTraKetQuaDapperHandler(IMinioService minioService, IEventPublisher eventPublisher, IJobService jobService, IMediator mediator, ICurrentUser currentUser, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo
        , IUserService user, IDapperRepository dapperRepository, ICommonServices commonServices)
    {
        _mediator = mediator;
        _user = user;
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _dapperRepository = dapperRepository;
        _yeuCauThanhToanContants = new YeuCauThanhToanConstants();
        _jobService = jobService;
        _eventPublisher = eventPublisher;
        _minioService = minioService;
        _commonServices = commonServices;
    }
    public async Task<Result<Dictionary<string, string>>> Handle(XacNhanTraKetQuaDapper request, CancellationToken cancellationToken)
    {
        if (request.Ids == null) throw new ArgumentNullException(nameof(request.Ids));
        //string sql = $"SELECT * FROM {hoSoTableName} WHERE {hoSoTableName}.Id IN @Id ";
        //var itemsExitst = await _dapperRepository.QueryAsync<HoSo>(sql, new { Id = request.Ids }, null, cancellationToken);

        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var itemsExitst = await _dapperRepository.QueryAsync<HoSoQLVB>(hoSoSelect.GetHoSos, new
        {
            request.Ids
        });

        if (itemsExitst == null) throw new NotFoundException($"Hồ sơ {request.Ids} chưa được thêm vào hệ thống");
        List<HoSoQLVB> UpdateHoSo = new List<HoSoQLVB>();
        var quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
        var _currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        var userId = _currentUser.Id.ToString();
        var userOfficeCode = _currentUser.OfficeCode;
        var userFullName = _currentUser.FullName;
        var sqlTruongHopThuTuc = "SELECT Top 1 BatBuocKySoKetQua, BatBuocDinhKemKetQua FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";


        List<CreateFirebaseNotificationCommand> notificationCommands = new List<CreateFirebaseNotificationCommand>();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var listErrors = new Dictionary<string, string>();
        foreach (var item in itemsExitst)
        {
            var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
            {
                item.MaTruongHop
            }, cancellationToken: cancellationToken);
            bool checkKySo = true;
            if (item.TrangThaiHoSoId == "9")
            {
                if (truongHopThuTuc.BatBuocDinhKemKetQua == true)
                {
                    var filePaths = item.DinhKemKetQua;
                    if (string.IsNullOrEmpty(filePaths))
                    {
                        checkKySo = false;

                    }
                }
                if (truongHopThuTuc.BatBuocKySoKetQua == true)
                {
                    var filePaths = item.DinhKemKetQua;
                    if (string.IsNullOrEmpty(filePaths))
                    {
                        checkKySo = false;

                    }
                    else
                    {
                        var filePathList = filePaths.Split("##").ToList();
                        var verifyPdfSignatureResponse = await _minioService.VerifyPdfSignatureITextSharp(filePathList, true);
                        if (!verifyPdfSignatureResponse.HasDigitalSinature)
                        {
                            checkKySo = false;
                        }
                    }

                }
                if (checkKySo == false)
                {
                    listErrors.Add(item.Id.ToString(), "Vui lòng đính kèm ít nhất một tệp đã ký số vào kết quả chính.");
                }
            }
            if (checkKySo)
            {

                var thaoTac = request.ThaoTac ?? "Xác nhận kết quả";
                //if (!string.IsNullOrEmpty(request.TrangThaiTraKq))
                //{
                //    item.XacNhanKetQua(request.TrangThaiTraKq, null, null, currentTime);
                //}
                //else
                //{
                SearchYeuCauThanhToanQuery searchYeuCauThanhToanQuery = new SearchYeuCauThanhToanQuery();
                searchYeuCauThanhToanQuery.MaHoSo = item.MaHoSo;
                searchYeuCauThanhToanQuery.Removed = false;
                var yeuCauThanhToans = await _mediator.Send(searchYeuCauThanhToanQuery);
                bool check = false;
                if (yeuCauThanhToans.Data == null && item.TrangThaiPhiLePhi == true && item.LoaiKetQua != DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut)
                {
                    var settings = _commonServices.Get();
                    if (settings != null && settings.XuLyHoSo != null && settings.XuLyHoSo.MaTTHCKhongThuPhi != null)
                    {
                        if (settings.XuLyHoSo.MaTTHCKhongThuPhi.IndexOf(item.MaTTHC) == -1)
                        {
                            listErrors.Add(item.Id.ToString(), "Thủ tục có phí,lệ phí.Vui lòng thanh toán hồ sơ trước khi xác nhận kết quả.");
                            check = true;
                        }
                    }
                    else
                    {
                        listErrors.Add(item.Id.ToString(), "Thủ tục có phí,lệ phí.Vui lòng thanh toán hồ sơ trước khi xác nhận kết quả.");
                        check = true;
                    }

                }
                if (yeuCauThanhToans.Data != null)
                {
                    foreach (var yeuCauThanhToan in yeuCauThanhToans.Data)
                    {
                        // Đối vời trường hợp xin rút/trả lại hủy yêu cầu thanh toán
                        if (item.LoaiKetQua == DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut)
                        {
                            if ((yeuCauThanhToan.TrangThai == _yeuCauThanhToanContants.TRANG_THAI.CHUA_THANH_TOAN || yeuCauThanhToan.TrangThai == _yeuCauThanhToanContants.TRANG_THAI.CHO_THANH_TOAN))
                            {
                                string sqlUpdateYctt = $"UPDATE {ycttTableName} SET TrangThai = N'{_yeuCauThanhToanContants.TRANG_THAI.HUY}', " +
                                    $"LastModifiedBy = '{userId.ToString()}', LastModifiedOn = '{currentTime}' WHERE Id = '{yeuCauThanhToan.Id}' ";
                                await _dapperRepository.ExcuteAsync(sqlUpdateYctt);
                            }
                        }
                        else
                        if (yeuCauThanhToan.TrangThai == _yeuCauThanhToanContants.TRANG_THAI.CHUA_THANH_TOAN && yeuCauThanhToan.HinhThucThu == _yeuCauThanhToanContants.HINH_THUC_THU.THU_SAU)
                        {
                            if (request.Phi.HasValue || request.LePhi.HasValue)
                            {
                                var phi = request.Phi != null ? request.Phi.Value : 0;
                                var lePhi = request.LePhi != null ? request.LePhi.Value : 0;
                                var tong = phi + lePhi;
                                AddThuSauYeuCauThanhToan addThuSauYeuCauThanhToan = new AddThuSauYeuCauThanhToan() { Id = yeuCauThanhToan.Id, Phi = request.Phi, LePhi = request.LePhi, SoTien = tong, TrangThai = _yeuCauThanhToanContants.TRANG_THAI.CHO_THANH_TOAN, ChiTiet = request.ChiTiet, HoSoId = item.Id };
                                await _mediator.Send(addThuSauYeuCauThanhToan);
                            }
                            else
                            {
                                listErrors.Add(item.Id.ToString(), "Vui lòng thanh toán hồ sơ trước khi xác nhận kết quả.");
                                check = true;
                                break;
                            }
                        }
                        else if (yeuCauThanhToan.TrangThai == _yeuCauThanhToanContants.TRANG_THAI.CHO_THANH_TOAN)
                        {
                            listErrors.Add(item.Id.ToString(), "Vui lòng thanh toán hồ sơ trước khi xác nhận kết quả.");
                            check = true;
                            break;
                        }
                    }
                }
                if (!check)
                {
                    item.XacNhanKetQua(_trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ, null, null, currentTime);
                    if (request.YeuCauBCCILayKetQua == true)
                    {
                        await _mediator.Send(new YeuCauBuuDienLayKetQua(item.Id));
                        thaoTac = "Xác nhận và yêu cầu BCCI lấy kết quả";
                    }
                    if (item.TrangThaiHoSoId == BO_SUNG) thaoTac = "Xác nhận kết quả yêu cầu bổ sung";
                    UpdateHoSo.Add(item);
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: !string.IsNullOrEmpty(request.ThaoTac) ? request.ThaoTac : thaoTac);
                    quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);
                    if (item.TrangThaiHoSoId != BO_SUNG)
                    {
                        CreateFirebaseNotificationCommand notificationCommand = new CreateFirebaseNotificationCommand()
                        {
                            HoSoId = item.Id,
                            Content = $"Ông/bà vui lòng đến {HoSoEventUtils.GetTenDonViTraKetQua(item.Catalog, item.TenDonVi)} để nhận kết quả",
                            CreatedOn = DateTime.Now,
                            Description = "",
                            IsRead = false,
                            MaHoSo = item.MaHoSo,
                            Title = "Hồ sơ đã có kết quả ",
                            Topic = item.UyQuyen == true ? item.NguoiUyQuyen : item.ChuHoSo,
                            LoaiThongBao = NotificationLoaiThongBao.CongDan,
                            Type = NotificationType.DaTraKetQua
                        };
                        notificationCommands.Add(notificationCommand);
                    }


                }


                //}
                //else
                //{
                //    var thaoTac = request.ThaoTac;
                //    if (!string.IsNullOrEmpty(request.TrangThaiTraKq))
                //    {
                //        item.XacNhanKetQua(request.TrangThaiTraKq, null, null, currentTime);
                //    }
                //    else
                //    {
                //        item.XacNhanKetQua(_trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ, null, null, currentTime);
                //    }
                //    UpdateHoSo.Add(item);
                //    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: !string.IsNullOrEmpty(request.ThaoTac) ? request.ThaoTac : thaoTac);
                //    quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);
                //}

            }
        }
        if (UpdateHoSo.Count > 0)
        {
            //await _repositoryHoSo.UpdateRangeAsync(UpdateHoSo, cancellationToken);
            var sqlUpdateHoSo = $"UPDATE {hoSoTableName} SET TrangThaiTraKq = @TrangThaiTraKq, NgayXacNhanKetQua = @NgayXacNhanKetQua, TrangThaiDongBoDVC = '{HoSo_TrangThaiDongBoDVC.ChuaDongBo}', " +
                $"LastModifiedBy = '{userId.ToString()}', LastModifiedOn = '{currentTime}' WHERE Id = @Id ";
            await _dapperRepository.ExcuteAsync(sqlUpdateHoSo, UpdateHoSo);
            for (int i = 0; i < UpdateHoSo.Count; i++)
            {
                var hoSo = UpdateHoSo[i];
                await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi, hoSo.Catalog));
            }
        }
        if (notificationCommands.Count > 0)
        {
            try
            {
                _jobService.Enqueue<IFirebaseNotification>(x => x.HandleMultiMessage(notificationCommands, CancellationToken.None));
            }
            catch (Exception)
            {

            }
        }
        if (quaTrinhXuLyHoSos.Count > 0)
        {
            await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(quaTrinhXuLyHoSos);
        }

        return Result<Dictionary<string, string>>.Success(listErrors);
    }
}
