using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;

public class GuiMailTheoDoiHoSoChungThucSpec : Specification<ThanhPhanHoSo>
{
    public GuiMailTheoDoiHoSoChungThucSpec(string maHoSo)
    {
        Query.Where(x => x.HoSo == maHoSo).Where(x => x.DeletedOn == null);
    }
}
public class GuiMailTheoDoiHoSoChungThucCommandHandler : ICommandHandler<GuiMailTheoHoSoChungThucCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<GiayToSoHoa> _repositoryGiayToSoHoa;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IEMCService _eMCService;
    private readonly IEventPublisher _eventPublisher;
    private readonly IMinioService _minioService;
    public GuiMailTheoDoiHoSoChungThucCommandHandler(IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo, IRepositoryWithEvents<GiayToSoHoa> repositoryGiayToSoHoa, IMinioService minioService, ICurrentUser user, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<HoSo> repositoryHoSo, IDapperRepository dapperRepository, IEMCService eMCService, IEventPublisher eventPublisher)
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
    }
    public async Task<Result> Handle(GuiMailTheoHoSoChungThucCommand request, CancellationToken cancellationToken)
    {
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
        var thanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new GuiMailTheoDoiHoSoChungThucSpec(hoSo.MaHoSo), cancellationToken);
        var dinhKemKetQua = string.Join("##", thanhPhanHoSos.Select(x => x.DinhKem));
        await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaChungThucEvent(hoSo, hoSo.TenDonVi, hoSo.Catalog, dinhKemKetQua));
        return (Result)Result.Success();
    }

}
