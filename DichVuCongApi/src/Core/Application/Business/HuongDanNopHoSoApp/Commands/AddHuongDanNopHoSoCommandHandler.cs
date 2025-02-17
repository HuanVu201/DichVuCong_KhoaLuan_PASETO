using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Classes;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Commands;
public class AddHuongDanNopHoSoCommandHandler : RemoveFileWithJobHandler, ICommandHandler<AddHuongDanNopHoSoCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<HuongDanNopHoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> _repositoryThanhPhanHuongDanNopHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IJobService _jobService;
    private readonly IHoSoServices _hoSoServices;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly IMediator _mediator;
    private readonly IEventPublisher _publisher;
  
    public AddHuongDanNopHoSoCommandHandler(IRepositoryWithEvents<HuongDanNopHoSo> repositoryHoSo,
        IInjectConfiguration iInjectConfiguration,
        ICurrentUser user,
        IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> repositoryThanhPhanHuongDanNopHoSo,
        IDapperRepository dapperRepository,
        IHoSoServices hoSoServices,
        IMediator mediator,
        IEventPublisher publisher,
        IJobService jobService
     
        )
    {
        _publisher = publisher;
        _iInjectConfiguration = iInjectConfiguration;
        _repositoryHoSo = repositoryHoSo;
        _user = user;
        _repositoryThanhPhanHuongDanNopHoSo = repositoryThanhPhanHuongDanNopHoSo;
        _dapperRepository = dapperRepository;
        _hoSoServices = hoSoServices;
        _mediator = mediator;
        _jobService = jobService;
      
    }

    public async Task<Result<DefaultIdType>> Handle(AddHuongDanNopHoSoCommand request, CancellationToken cancellationToken)
    {
        var userId = _user.GetUserId();
        var userOfficeCode = _user.GetUserOfficeCode();
        string sqlGetUserInfo = @"SELECT u.Id, g.MaDinhDanh, u.FullName, u.OfficeCode, g.GroupName, g.DiaChi as DiaChiDonVi from [Identity].[Users] u INNER JOIN Catalog.Groups g ON u.OfficeCode = g.GroupCode where u.Id = @Id";
        var userInfo = await _dapperRepository.QueryFirstOrDefaultAsync<UserInfo>(sqlGetUserInfo, new
        {
            Id = userId
        });
        if (userInfo == null)
        {
            throw new NotFoundException($"Không tìm thấy người dùng: {userId}");
        }
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);


        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>("SELECT Top 1 KhongCoNgayHenTra, ThoiGianThucHien, LoaiThoiGianThucHien,  NodeQuyTrinh, EdgeQuyTrinh FROM [Business].[TruongHopThuTucs] where Ma = @MaTruongHop and ThuTucId = @ThuTucId", new
        {
            request.MaTruongHop,
            ThuTucId = request.MaTTHC
        });
        var id = Guid.NewGuid();
        var huongDanNopHoSo = HuongDanNopHoSo.Create(id, request.ChuHoSo, request.SoDienThoaiChuHoSo,request.DiaChiChuHoSo, request.SoGiayToChuHoSo,request.EmailChuHoSo,
            request.MaTTHC, request.TenTTHC,request.MaLinhVuc,request.TenLinhVuc,request.TruongHopId,request.TenTruongHop, request.TrichYeuHoSo,request.LyDoBoSung, request.LyDoTuChoi,
            userId.ToString(), userOfficeCode, currentTime);
        await _repositoryHoSo.AddAsync(huongDanNopHoSo, cancellationToken);
        if (request.ThanhPhanHoSos != null && request.ThanhPhanHoSos.Count > 0)
        {
            var thanhPhanHoSos = new List<ThanhPhanHuongDanNopHoSo>();
            request.ThanhPhanHoSos.ForEach(item =>
            {
                var thanhPhanHoSo = new ThanhPhanHuongDanNopHoSo(item.Ten, id.ToString(), item.SoBanChinh,
                    item.SoBanSao, item.GhiChu);
                thanhPhanHoSos.Add(thanhPhanHoSo);
            });

            await _repositoryThanhPhanHuongDanNopHoSo.AddRangeAsync(thanhPhanHoSos);
        }

        return Result<DefaultIdType>.Success(id);
        throw new NotImplementedException();
    }
}
