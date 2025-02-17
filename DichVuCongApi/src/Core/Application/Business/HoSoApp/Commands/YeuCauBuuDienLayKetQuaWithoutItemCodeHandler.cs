using Mapster;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.VnPost;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class YeuCauBuuDienLayKetQuaWithoutItemCodeHandler : ICommandHandler<YeuCauBuuDienLayKetQuaWithoutItemCode, List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string maVanDonTableName = "[Catalog].[MaVanDonBuuDiens]";
    private readonly IMediator _mediator;
    private readonly IUserService _userService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IVNPostServices _vnPostServices;
    private readonly IRepositoryWithEvents<MaVanDonBuuDien> _repositoryWithEvents;
    private readonly IRepositoryWithEvents<HoSo> _repositoryWithEventsHoSo;
    private readonly ILogger<YeuCauBuuDienLayKetQuaWithoutItemCode> _logger;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    public YeuCauBuuDienLayKetQuaWithoutItemCodeHandler(IMediator mediator, IUserService userService, IDapperRepository dapperRepository,
    IRepositoryWithEvents<MaVanDonBuuDien> repositoryWithEvents, IVNPostServices vnPostServices, ILogger<YeuCauBuuDienLayKetQuaWithoutItemCode> logger,
    IRepositoryWithEvents<HoSo> repositoryWithEventsHoSo, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IReadRepository<Config> readRepositoryConfig)
    {
        _mediator = mediator;
        _userService = userService;
        _dapperRepository = dapperRepository;
        _vnPostServices = vnPostServices;
        _repositoryWithEvents = repositoryWithEvents;
        _logger = logger;
        _repositoryWithEventsHoSo = repositoryWithEventsHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _readRepositoryConfig = readRepositoryConfig;
    }

    public async Task<Result<List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>> Handle(YeuCauBuuDienLayKetQuaWithoutItemCode request, CancellationToken cancellationToken)
    {
        try
        {
            bool coKetNoiVnpost = true;
            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec("ma-tinh"), cancellationToken);
            if (config != null && config.Content == "38") { coKetNoiVnpost = false; }
            List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse> res = new List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>();
            var quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
            List<HoSo> updateHoSos = new List<HoSo>();
            if (request?.Ids == null) throw new ArgumentNullException(nameof(request.Ids));
            if(request.Ids.Count <= 0 ) throw new ArgumentNullException(nameof(request.Ids));
            var vNPostSettings = _vnPostServices.Get();
            if (vNPostSettings != null && vNPostSettings.maximumRequest != null && vNPostSettings.maximumRequest.Value > 0)
            {
                if (request.Ids.Count > vNPostSettings.maximumRequest.Value) throw new Exception($"Không thể trả kết quả quá {vNPostSettings.maximumRequest.Value} hồ sơ");
            }

            var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);
            string userOfficeCode = currentUser.OfficeCode;
            string userId = currentUser.Id.ToString();
            string userFullName = currentUser.FullName;
            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
            foreach (string id in request.Ids)
            {
                Guid guid;
                bool checkPaser = Guid.TryParse(id, out guid);
                if (!checkPaser)
                {
                    YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpRes = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(guid, string.Empty, "500", "Không thể paser guid: " + id);
                    res.Add(tmpRes);
                    break;
                }

                var item = await _repositoryWithEventsHoSo.GetByIdAsync(guid, cancellationToken);
                GetByGroupCodeQuery getByGroupCodeQuery = new GetByGroupCodeQuery(item.DonViId);
                var group = await _mediator.Send(getByGroupCodeQuery);

                if (string.IsNullOrEmpty(item.DangKyNhanHoSoQuaBCCIData))
                {
                    YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpRes = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, "404", "Không có thông tin người nhận qua BCCI");
                    res.Add(tmpRes);
                    break;
                }
                else
                {
                    if(coKetNoiVnpost)
                    {
                        if (group.Data == null)
                        {
                            YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpResErr = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, "404", "Không có thông tin đơn vị gửi");
                            res.Add(tmpResErr);
                            break;

                        }

                        if (group.Data != null && string.IsNullOrEmpty(group.Data.CauHinhBuuDien))
                        {
                            YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpResErr = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, "404", "Không có cấu hình bưu điện");
                            res.Add(tmpResErr);
                            break;

                        }

                        var thongTinNguoiNhan = JsonConvert.DeserializeObject<VNPostReceiverInformation>(item.DangKyNhanHoSoQuaBCCIData);
                        var sender = JsonConvert.DeserializeObject<OrderLGSPWithItemCode>(group.Data.CauHinhBuuDien);
                        sender.SenderTel = group.Data.SoDienThoai;
                        sender.OrderNumber = item.MaHoSo;
                        sender.ReceiverName = thongTinNguoiNhan.hoVaTen;
                        sender.ReceiverEmail = thongTinNguoiNhan.email;
                        sender.ReceiverAddress = thongTinNguoiNhan.diaChi;
                        sender.ReceiverProvince = vNPostSettings.ReceiverProvince.HasValue ? vNPostSettings.ReceiverProvince.Value : 0;

                        sender.ReceiverTel = thongTinNguoiNhan.soDienThoai;
                        var result = await _vnPostServices.CreateWithoutItemCode(sender);
                        YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpRes = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, result.Status, result.Message);
                        res.Add(tmpRes);
                        if (result != null && (result.Status == "100" || result.Status == "101"))
                        {

                            var updateHoSo = item.BCCITraKq(currentTime);
                            updateHoSos.Add(updateHoSo);
                            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, string.Empty, string.Empty, currentTime, trangThai: "9", thaoTac: result.Status == "100" ? "Chuyển thông tin nhận kết quả sang hệ thống VNPost" : "Chuyển thông tin nhận kết quả sang hệ thống VNPost.");
                            quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);
                        }
                    }
                    else
                    {
                        var updateHoSo = item.BCCITraKq(currentTime);
                        updateHoSos.Add(updateHoSo);
                        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, string.Empty, string.Empty, currentTime, trangThai: "9", thaoTac: "Chuyển thông tin nhận kết quả sang hệ thống VNPost");
                        quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);
                    }
                }
            }
            await _repositoryWithEventsHoSo.UpdateRangeAsync(updateHoSos, cancellationToken);
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
