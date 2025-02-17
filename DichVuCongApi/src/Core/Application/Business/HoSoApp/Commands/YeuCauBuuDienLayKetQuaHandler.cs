using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.VnPost;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class YeuCauBuuDienLayKetQuaHandler : ICommandHandler<YeuCauBuuDienLayKetQua>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string maVanDonTableName = "[Catalog].[MaVanDonBuuDiens]";
    private readonly IMediator _mediator;
    private readonly IUserService _userService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IVNPostServices _vnPostServices;
    private readonly IRepositoryWithEvents<MaVanDonBuuDien> _repositoryWithEvents;
    private readonly ILogger<YeuCauBuuDienLayKetQua> _logger;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    public YeuCauBuuDienLayKetQuaHandler(IMediator mediator, IUserService userService, IDapperRepository dapperRepository, IRepositoryWithEvents<MaVanDonBuuDien> repositoryWithEvents,
        IVNPostServices vnPostServices, ILogger<YeuCauBuuDienLayKetQua> logger, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo)
    {
        _mediator = mediator;
        _userService = userService;
        _dapperRepository = dapperRepository;
        _vnPostServices = vnPostServices;
        _repositoryWithEvents = repositoryWithEvents;
        _logger = logger;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
    }
    public async Task<Result> Handle(YeuCauBuuDienLayKetQua request, CancellationToken cancellationToken)
    {
        try
        {
            if (request.Id == null) throw new ArgumentNullException(nameof(request.Id));
            var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);
            var userOfficeCode = currentUser.OfficeCode;
            var userId = currentUser.Id.ToString();
            var vNPostSettings = _vnPostServices.Get();
            var userFullName = currentUser.FullName;
            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
            string sql = $"SELECT {hoSoTableName}.Id, {hoSoTableName}.MaHoSo,{hoSoTableName}.DangKyNhanHoSoQuaBCCIData, {maVanDonTableName}.Ma AS MaVanDonBuuDien, {hoSoTableName}.DonViId, {maVanDonTableName}.DeletedOn FROM {hoSoTableName} " +
                $" LEFT JOIN {maVanDonTableName} " +
                $" ON {maVanDonTableName}.HoSo = {hoSoTableName}.MaHoSo " +
                $"WHERE {hoSoTableName}.Id = @Id ";
            var itemsExitst = await _dapperRepository.QueryAsync<HoSoDetailDto>(sql, new { Id = request.Id }, null, cancellationToken);
            if (itemsExitst == null) throw new NotFoundException($"Hồ sơ {request.Id} chưa được thêm vào hệ thống");

            var checkitem = itemsExitst.Where(x => x.DeletedOn == null).FirstOrDefault();
            if (checkitem != null && !string.IsNullOrEmpty(checkitem.MaVanDonBuuDien)) throw new Exception($"Hồ sơ đã được yêu cầu đến BCCI với mã vận đơn: {checkitem.MaVanDonBuuDien}");
            var item = itemsExitst.FirstOrDefault();
            if (item == null) throw new NotFoundException($"Hồ sơ {request.Id} chưa được thêm vào hệ thống");
            if (string.IsNullOrEmpty(item.DangKyNhanHoSoQuaBCCIData)) throw new NotFoundException("Không có thông tin người nhận qua BCCI");
            var thongTinNguoiNhan = JsonConvert.DeserializeObject<VNPostReceiverInformation>(item.DangKyNhanHoSoQuaBCCIData);
            GetByGroupCodeQuery getByGroupCodeQuery = new GetByGroupCodeQuery(item.DonViId);
            var group = await _mediator.Send(getByGroupCodeQuery);
            if (group.Data == null) throw new NotFoundException("Không có thông tin đơn vị gửi");
            if (string.IsNullOrEmpty(group.Data.CauHinhBuuDien)) throw new NotFoundException("Không có thông tin đơn vị gửi");
            var sender = JsonConvert.DeserializeObject<OrderLGSPWithItemCode>(group.Data.CauHinhBuuDien);
            sender.SenderTel = group.Data.SoDienThoai;
            // Lấy order code vnpost chưa được sử dụng
            SearchMaVanDonBuuDienQuery searchMaVanDonBuuDienQuery = new SearchMaVanDonBuuDienQuery();
            searchMaVanDonBuuDienQuery.DaSuDung = false;
            var maVanDons = await _mediator.Send(searchMaVanDonBuuDienQuery);
            if (maVanDons.Data == null) throw new NotFoundException("Không có thông tin mã vận đơn");
            var maVanDon = maVanDons.Data.FirstOrDefault();
            sender.ItemCode = maVanDon.Ma;
            sender.OrderNumber = item.MaHoSo;
            sender.ReceiverName = thongTinNguoiNhan.hoVaTen;
            sender.ReceiverEmail = thongTinNguoiNhan.email;
            sender.ReceiverAddress = thongTinNguoiNhan.diaChi;
            sender.ReceiverProvince = vNPostSettings.ReceiverProvince.HasValue ? vNPostSettings.ReceiverProvince.Value : 0;
            sender.ReceiverTel = thongTinNguoiNhan.soDienThoai;
            sender.ReceiverTel = thongTinNguoiNhan.soDienThoai;
            var result = await _vnPostServices.Create(sender);

            if (result != null && result.Status == "100")
            {
                var tmpMaVanDon = await _repositoryWithEvents.GetByIdAsync(maVanDon.Id, cancellationToken);
                if (tmpMaVanDon != null)
                    tmpMaVanDon.Update(null, "Đã yêu cầu bưu điện", item.MaHoSo, DateTime.UtcNow);
                await _repositoryWithEvents.UpdateAsync(tmpMaVanDon);
                var sqlUpdateHoSo = $"UPDATE {hoSoTableName} SET {hoSoTableName}.NgayTraBuuDien = '{currentTime}', {hoSoTableName}.TrangThaiTraBuuDien = '1', {hoSoTableName}.LastModifiedOn = '{currentTime}', {hoSoTableName}.LastModifiedBy = '{userId.ToString()}' WHERE {hoSoTableName}.Id = '{item.Id}'";
                await _dapperRepository.ExcuteAsync(sqlUpdateHoSo);
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: "Chuyển thông tin nhận kết quả sang hệ thống VNPost với mã vận đơn: " + maVanDon.Ma);
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
                return (Result)Result.Success();
            }
            else if (result != null && result.Status == "101")
            {
                var sqlUpdateHoSo = $"UPDATE {hoSoTableName} SET {hoSoTableName}.NgayTraBuuDien = '{currentTime}', {hoSoTableName}.TrangThaiTraBuuDien = '1', {hoSoTableName}.LastModifiedOn = '{currentTime}', {hoSoTableName}.LastModifiedBy = '{userId.ToString()}' WHERE {hoSoTableName}.Id = '{item.Id}'";
                await _dapperRepository.ExcuteAsync(sqlUpdateHoSo);
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: "Chuyển thông tin nhận kết quả sang hệ thống VNPost.");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            }
            return (Result)Result<string>.Fail(result.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw ex;
        }

    }
}
