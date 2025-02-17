using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchThongTinHoSoGuiVnPost;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.VnPost;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class YeuCauBuuDienLayKetQuaNhieuHoSoHandler : ICommandHandler<YeuCauBuuDienLayKetQuaNhieuHoSo, List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string maVanDonTableName = "[Catalog].[MaVanDonBuuDiens]";
    private readonly IMediator _mediator;
    private readonly IUserService _userService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IVNPostServices _vnPostServices;
    private readonly IRepositoryWithEvents<MaVanDonBuuDien> _repositoryWithEvents;
    private readonly IRepositoryWithEvents<HoSo> _repositoryWithEventsHoSo;
    private readonly ILogger<YeuCauBuuDienLayKetQuaNhieuHoSo> _logger;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    public YeuCauBuuDienLayKetQuaNhieuHoSoHandler(IMediator mediator, IUserService userService, IDapperRepository dapperRepository, IRepositoryWithEvents<MaVanDonBuuDien> repositoryWithEvents,
        IVNPostServices vnPostServices, ILogger<YeuCauBuuDienLayKetQuaNhieuHoSo> logger, IRepositoryWithEvents<HoSo> repositoryWithEventsHoSo, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo)
    {
        _mediator = mediator;
        _userService = userService;
        _dapperRepository = dapperRepository;
        _vnPostServices = vnPostServices;
        _repositoryWithEvents = repositoryWithEvents;
        _logger = logger;
        _repositoryWithEventsHoSo = repositoryWithEventsHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
    }

    public async Task<Result<List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>> Handle(YeuCauBuuDienLayKetQuaNhieuHoSo request, CancellationToken cancellationToken)
    {
        try
        {
            List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse> res = new List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>();
            var quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
            List<HoSo> updateHoSos = new List<HoSo>();
            if (request?.Ids == null) throw new ArgumentNullException(nameof(request.Ids));
            if (request.Ids.Count <= 0) throw new ArgumentNullException(nameof(request.Ids));
            var vNPostSettings = _vnPostServices.Get();
            if (vNPostSettings != null && vNPostSettings.maximumRequest != null && vNPostSettings.maximumRequest.Value > 0)
            {
                if (request.Ids.Count > vNPostSettings.maximumRequest.Value) throw new Exception($"Không thể trả kết quả quá {vNPostSettings.maximumRequest.Value} hồ sơ");
            }
            var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);
            var userOfficeCode = currentUser.OfficeCode;
            var userId = currentUser.Id.ToString();
            var userFullName = currentUser.FullName;
            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
            SearchThongTinGuiVnPostRequest reqThongTinGuiVnPost = new SearchThongTinGuiVnPostRequest(request.Ids);
            var thongTinGuiBuuDiens = await _mediator.Send(reqThongTinGuiVnPost, cancellationToken);
            foreach (var item in thongTinGuiBuuDiens)
            {
                if (string.IsNullOrEmpty(item.CauHinhBuuDien))
                {
                    YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpRes = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, "404", "Không có cấu hình bưu điện");
                    res.Add(tmpRes);
                    break;
                }

                if (string.IsNullOrEmpty(item.DangKyNhanHoSoQuaBCCIData))
                {
                    YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpRes = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, "404", "Không có thông tin người nhận qua BCCI");
                    res.Add(tmpRes);
                    break;
                }
                else
                {
                    var maVanDon = await _mediator.Send(new GetMaVanDonBuuDienByMaHoSo(item.MaHoSo));
                    if (maVanDon != null && maVanDon.Data != null)
                    {
                        YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpResItemcode = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, "404", $"Hồ sơ {item.MaHoSo} đã được đăng ký với mã vận đơn bưu điện: {maVanDon.Data.Ma}");
                        res.Add(tmpResItemcode);
                        break;
                    }

                    // Lấy order code vnpost chưa được sử dụng
                    SearchMaVanDonBuuDienQuery searchMaVanDonBuuDienQuery = new SearchMaVanDonBuuDienQuery();
                    searchMaVanDonBuuDienQuery.DaSuDung = false;
                    var maVanDons = await _mediator.Send(searchMaVanDonBuuDienQuery);
                    if (maVanDons.Data == null)
                    {
                        YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpResItemcode = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, "404", $"Hết dải mã vận đơn bưu điện/ không tìm thấy mã vận đơn bưu điện chưa sử dụng");
                        res.Add(tmpResItemcode);
                        break;
                    }

                    var maVanDonChuaSuDung = maVanDons.Data.FirstOrDefault();
                    var thongTinNguoiNhan = JsonConvert.DeserializeObject<VNPostReceiverInformation>(item.DangKyNhanHoSoQuaBCCIData);
                    var sender = JsonConvert.DeserializeObject<OrderLGSPWithItemCode>(item.CauHinhBuuDien);
                    sender.ItemCode = maVanDonChuaSuDung.Ma;
                    sender.SenderTel = item.SoDienThoai;
                    sender.OrderNumber = item.MaHoSo;
                    sender.ReceiverName = thongTinNguoiNhan.hoVaTen;
                    sender.ReceiverEmail = thongTinNguoiNhan.email;
                    sender.ReceiverAddress = thongTinNguoiNhan.diaChi;
                    sender.ReceiverProvince = vNPostSettings.ReceiverProvince.HasValue ? vNPostSettings.ReceiverProvince.Value : 0;
                    sender.ReceiverTel = thongTinNguoiNhan.soDienThoai;
                    var result = await _vnPostServices.Create(sender);
                    YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpRes = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, result.Status, result.Message);
                    res.Add(tmpRes);
                    if (result != null && (result.Status == "100" || result.Status == "101"))
                    {
                        var sqlUpdateHoSo = $"UPDATE {hoSoTableName} SET {hoSoTableName}.NgayTraBuuDien = '{currentTime}', {hoSoTableName}.TrangThaiTraBuuDien = '1', {hoSoTableName}.LastModifiedOn = '{currentTime}', {hoSoTableName}.LastModifiedBy = '{userId.ToString()}' WHERE {hoSoTableName}.Id = '{item.Id}'";
                        await _dapperRepository.ExcuteAsync(sqlUpdateHoSo, cancellationToken);
                        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: "Chuyển thông tin nhận kết quả sang hệ thống VNPost với mã vận đơn: " + maVanDonChuaSuDung.Ma);
                        quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);
                        var sqlUpdateMaVanDonBuuDien = $"UPDATE {maVanDonTableName} SET {maVanDonTableName}.HoSo = '{item.MaHoSo}',{maVanDonTableName}.TrangThai = N'Đã yêu cầu bưu điện',{maVanDonTableName}.NgayYeuCau ='{currentTime}' , {maVanDonTableName}.LastModifiedOn = '{currentTime}', {maVanDonTableName}.LastModifiedBy = '{userId.ToString()}' WHERE {maVanDonTableName}.Id = '{maVanDonChuaSuDung.Id}'";
                        await _dapperRepository.ExcuteAsync(sqlUpdateMaVanDonBuuDien, cancellationToken);
                    }else
                    {
                        var sqlUpdateMaVanDonBuuDien = $"UPDATE {maVanDonTableName} SET {maVanDonTableName}.HoSo = '1',{maVanDonTableName}.TrangThai = N'Đã yêu cầu bưu điện',{maVanDonTableName}.NgayYeuCau ='{currentTime}' , {maVanDonTableName}.LastModifiedOn = '{currentTime}', {maVanDonTableName}.LastModifiedBy = '{userId.ToString()}' WHERE {maVanDonTableName}.Id = '{maVanDonChuaSuDung.Id}'";
                        await _dapperRepository.ExcuteAsync(sqlUpdateMaVanDonBuuDien, cancellationToken);
                    }
                }
            }

            await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(quaTrinhXuLyHoSos, cancellationToken);
            return Result<List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>.Success(res);

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw ex;
        }
    }
}
