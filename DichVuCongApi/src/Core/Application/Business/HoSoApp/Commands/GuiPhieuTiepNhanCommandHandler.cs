using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Classes;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class UserInfomation
{
    public string Id { get; set; }
    public string MaDinhDanh { get; set; }
    public string FullName { get; set; }
    public string OfficeCode { get; set; }
    public string OfficeName { get; set; }
    public string GroupName { get; set; }
    public string DiaChiDonVi { get; set; }
}

public class GuiPhieuTiepNhanCommandHandler : ICommandHandler<GuiPhieuTiepNhanCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IJobService _jobService;
    private readonly IHoSoServices _hoSoServices;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly IMediator _mediator;
    private readonly IEventPublisher _publisher;
    private readonly string tenTinhThanh;

    public GuiPhieuTiepNhanCommandHandler(IRepositoryWithEvents<HoSo> repositoryHoSo,
        IInjectConfiguration iInjectConfiguration,
        IRepositoryWithEvents<YeuCauThanhToan> repositoryYeuCauThanhToan,
        IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IReadRepository<NgayNghi> repositoryNgayNghi,
        ICurrentUser user,
        IRepositoryWithEvents<ThanhPhanHoSo> repositoryThanhPhanHoSo,
        IDapperRepository dapperRepository,
        IHoSoServices hoSoServices,
        IMediator mediator,
        IEventPublisher publisher,
        IJobService jobService,
        IValidateThanhPhanHoSo validateThanhPhanHoSo
        )
    {
        _publisher = publisher;
        _iInjectConfiguration = iInjectConfiguration;
        _repositoryHoSo = repositoryHoSo;
        _user = user;
        _dapperRepository = dapperRepository;
        _hoSoServices = hoSoServices;
        _mediator = mediator;
        _jobService = jobService;
        tenTinhThanh = iInjectConfiguration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh");
    }

    public async Task<Result<DefaultIdType>> Handle(GuiPhieuTiepNhanCommand request, CancellationToken cancellationToken)
    {
        var userId = _user.GetUserId();
        var userOfficeCode = _user.GetUserOfficeCode();
        var userOfficeName = _user.GetUserOfficeName();
        string catalog = string.Empty;
        string soDienThoaiDonVi = string.Empty;
        string ofGroupName = string.Empty;

        string sqlGetUserInfo = @"SELECT u.Id, g.MaDinhDanh, u.FullName, u.OfficeCode, g.GroupName, g.DiaChi as DiaChiDonVi from [Identity].[Users] u INNER JOIN Catalog.Groups g ON u.OfficeCode = g.GroupCode where u.Id = @Id";
        var userInfo = await _dapperRepository.QueryFirstOrDefaultAsync<UserInfo>(sqlGetUserInfo, new
        {
            Id = userId
        });
        if (userInfo == null)
        {
            throw new NotFoundException($"Không tìm thấy người dùng: {userId}");
        }

        string sqlHoSo = "SELECT * FROM [Business].[HoSos] WHERE Id = @id";
        var hoso = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlHoSo, new { id = request.HoSoId });
        if (hoso == null)
        {
            throw new NotFoundException($"hoso với mã: {request.HoSoId} chưa được thêm vào hệ thống");
        }

        try
        {
            GroupDto groupInfo = null;
            string donViQuanLyThuPhi = userOfficeCode;
            string donViQuanLy = userOfficeCode;
            if (!string.IsNullOrEmpty(userOfficeCode))
            {
                var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(userOfficeCode));
                if (groupsInfo != null)
                {
                    groupInfo = groupsInfo.Data;
                    catalog = groupInfo.Catalog;
                    soDienThoaiDonVi = groupInfo.SoDienThoai;
                    ofGroupName = groupInfo.OfGroupName;
                }
            }

            //await _publisher.PublishAsync(new GuiPhieuTiepNhanEvent(hoso, giayToHoSo, "Lê Thị Mỹ Linh", userOfficeName, catalog, tenTinhThanh, soDienThoaiDonVi, "ofGroupName"));
            await _publisher.PublishAsync(new GuiPhieuTiepNhanEvent(hoso, request.MaGiayToHoSo, _user.GetUserFullName(), userOfficeName, ofGroupName, catalog, ofGroupName, tenTinhThanh, soDienThoaiDonVi));

            return Result<DefaultIdType>.Success(hoso.Id);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}

