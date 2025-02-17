using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Interfaces;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;

public class TraKetQuaChungThucThanhPhanHoSoSpec : Specification<ThanhPhanHoSo>
{
    public TraKetQuaChungThucThanhPhanHoSoSpec(string maHoSo)
    {
        Query.Where(x => x.HoSo == maHoSo).Where(x => x.DeletedOn == null);
    }
}

public class TraKetQuaChungThucCommandHandler : ICommandHandler<TraKetQuaChungThucCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<GiayToSoHoa> _repositoryGiayToSoHoa;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IEMCService _eMCService;
    private readonly IEventPublisher _eventPublisher;
    private readonly IMinioService _minioService;
    private readonly IGiayToSoHoaService _giayToSoHoaService;
    public TraKetQuaChungThucCommandHandler(IGiayToSoHoaService giayToSoHoaService, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo, IRepository<GiayToSoHoa> repositoryGiayToSoHoa, IMinioService minioService, ICurrentUser user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<HoSo> repositoryHoSo, IDapperRepository dapperRepository, IEMCService eMCService, IEventPublisher eventPublisher)
    {
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _eMCService = eMCService;
        _minioService = minioService;
        _repositoryGiayToSoHoa = repositoryGiayToSoHoa;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _eventPublisher = eventPublisher;
        _giayToSoHoaService = giayToSoHoaService;
    }
    private async Task<bool> DaThuHetPhi(string maHoSo)
    {
        var trangThaiThanhToan = new YeuCauThanhToanConstants();
        string getYeuCauChuaThuPhi = $"SELECT Top 1 TrangThai FROM Business.YeuCauThanhToans WHERE (TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN}' or TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN}') and MaHoSo = @MaHoSo and DeletedOn is null";
        var res = await _dapperRepository.QueryFirstOrDefaultAsync<TraKetQuaHoSo_CheckDaThuPhi>(getYeuCauChuaThuPhi, new
        {
            MaHoSo = maHoSo
        });
        if (res == null)
        {
            return true;
        }
        return false;
    }
    private async Task AddGiayToSoHoa(List<ThanhPhanHoSo> thanhPhanHoSos, HoSoQLVB hoSo, string userId, DateTime currentTime, CancellationToken cancellationToken)
    {
        //var giayToSoHoas = new List<GiayToSoHoa>();
        var soKyHieu = "STP-SCT";
        foreach (var thanhPhanHoSo in thanhPhanHoSos)
        {
            var maPrefix = hoSo.SoGiayToChuHoSo + "." + thanhPhanHoSo.MaGiayTo + "." + "STP-SCT";
            var ma = await _giayToSoHoaService.GetMaSuffix(maPrefix);
            var giayToSoHoa = new GiayToSoHoa(thanhPhanHoSo.Ten, ma, null, hoSo.SoGiayToChuHoSo, thanhPhanHoSo.MaGiayTo, _user.GetUserMaDinhDanh(),
                userId, currentTime, currentTime.AddMonths(6), currentTime, null, "", null, thanhPhanHoSo.NguoiKyChungThuc.ToString(), "1", thanhPhanHoSo.DinhKem,
                soKyHieu, null, null, hoSo.MaHoSo, false);
            await _repositoryGiayToSoHoa.AddAsync(giayToSoHoa, cancellationToken);
            //giayToSoHoas.Add(giayToSoHoa);
        }
        //_repositoryGiayToSoHoa.AddRangeAsync(giayToSoHoas, cancellationToken);
    }

    public async Task<Result> Handle(TraKetQuaChungThucCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id
        }, cancellationToken: cancellationToken);
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        bool daThuPhi = await DaThuHetPhi(hoSo.MaHoSo);
        if (!daThuPhi)
        {
            return (Result)Result.Fail("Yêu cầu thanh toán phí lệ phí trước khi trả kết quả");
        }
        var thanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new TraKetQuaChungThucThanhPhanHoSoSpec(hoSo.MaHoSo), cancellationToken);
        var dinhKemKetQuaDienTu = string.Empty;
        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
            try
            {
                if (hoSo.TrangThaiHoSoId == "9")
                {
                    string thaoTac = "Đã trả kết quả";
                    bool checkDinhKemKetQua = true;
                    bool checkKySoKetQua = true;
                    
                    var dinhKemKetQua = string.Join("##", thanhPhanHoSos.Select(x => x.DinhKem));
                    dinhKemKetQuaDienTu = string.Join("##", thanhPhanHoSos.Where(x => x.KyDienTuBanGiay == true).Select(x => x.DinhKem));
                    var updatedHoSo = hoSo.TraKetQua(null, dinhKemKetQua, currentTime);
                    await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                    var thanhPhanDienTus = thanhPhanHoSos.Where(x => x.KyDienTuBanGiay == true).ToList();
                    await AddGiayToSoHoa(thanhPhanDienTus, hoSo, userId.ToString(), currentTime, cancellationToken);
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, "", "", thaoTac, updatedHoSo.TrangThaiHoSoId);
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
                    
                    //transactionScope.Complete();
                    
                }
                else
                {
                    return (Result)Result.Fail(" Hồ sơ không ở trạng thái chờ trả");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        //}
        if (!string.IsNullOrEmpty(dinhKemKetQuaDienTu))
        {
            await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaChungThucEvent(hoSo, hoSo.TenDonVi, hoSo.Catalog, dinhKemKetQuaDienTu));
        }
        await _eMCService.SendAction(new EMCRequestBody()
        {
            CodeProfile = hoSo.MaHoSo,
            CodeTTHC = hoSo.MaTTHC,
            NameTTHC = hoSo.TenTTHC,
            Status = hoSo.TrangThaiHoSoId,
            FormsReception = hoSo.KenhThucHien,
            Level = hoSo.MucDo,
            MaHoSo = hoSo.MaHoSo,
            IsFromDVCQG = hoSo.LoaiDuLieuKetNoi,
            IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSo.SoGiayToChuHoSo
        });
        return (Result)Result.Success();
    }
}
