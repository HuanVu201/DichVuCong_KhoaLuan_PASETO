using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Extensions;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.QuaTrinhTraoDoi;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Commands;
public class AddQuaTrinhTraoDoiCongDanCommandHandler : ICommandHandler<AddQuaTrinhTraoDoiCongDanCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<QuaTrinhTraoDoiCongDan> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IJobService _jobService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IEventPublisher _eventPublisher;
    public AddQuaTrinhTraoDoiCongDanCommandHandler(IEventPublisher eventPublisher, IRepositoryWithEvents<QuaTrinhTraoDoiCongDan> repositoryWithEvents, ICurrentUser currentUser, IJobService jobService, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _jobService = jobService;
        _dapperRepository = dapperRepository;
        _eventPublisher = eventPublisher;
    }

    public async Task<Result<DefaultIdType>> Handle(AddQuaTrinhTraoDoiCongDanCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUser.GetUserId().ToString();
        var userFullName = _currentUser.GetUserFullName();
        var userGroupName = _currentUser.GetUserGroupName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var getHoSoSql = "SELECT TOP 1 UyQuyen, SoDienThoaiChuHoSo, EmailChuHoSo, SoDienThoaiNguoiUyQuyen, EmailNguoiUyQuyen, TrichYeuHoSo, ChuHoSo, NguoiUyQuyen FROM Business.HoSos WHERE MaHoSo = @MaHoSo and DeletedOn is null";
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(getHoSoSql, new
        {
            request.MaHoSo
        });
        if(hoSo == null)
        {
            return Result<DefaultIdType>.Fail($"Hồ sơ với mã {request.MaHoSo} không tồn tại");
        }
        var QuaTrinhTraoDoiCongDan = new QuaTrinhTraoDoiCongDan(request.MaHoSo, userId, currentTime, request.NoiDungTraoDoi, request.Email, request.SMS, request.Zalo);
        await _repositoryWithEvents.AddAsync(QuaTrinhTraoDoiCongDan, cancellationToken);

        //var soDienThoai = hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo;
        //var email = hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo;
        //if (request.Email == true && !string.IsNullOrEmpty(email))
        //{
        //    MailRequest mailRequest = new MailRequest(new List<string>() { email }, hoSo.TrichYeuHoSo, request.MaHoSo, $"<span>{request.NoiDungTraoDoi}</span>");
        //    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
        //}
        //if (request.SMS == true && !string.IsNullOrEmpty(soDienThoai))
        //{
        //    SMSRequest sMSRequest = new SMSRequest(soDienThoai, request.NoiDungTraoDoi.RemoveDiacritics(), request.MaHoSo);
        //    _jobService.Enqueue<ISMSService>(x => x.SendAsync(sMSRequest, cancellationToken));
        //}
        //if (request.Zalo == true && !string.IsNullOrEmpty(soDienThoai))
        //{
        //    //SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(null, request.SoDienThoaiChuHoSo, request.TrichYeuHoSo, request.ChuHoSo,
        //    //maHoSo, "Tiếp nhận hồ sơ", request.TrichYeuHoSo, $"Hồ sơ {maHoSo} vừa tạo", "ctaLink", "ctaIcon", "ctaText");
        //    //_jobService.Enqueue<IZaloService>(x => x.SendTemplateAsync(sendTemplateZalo, cancellationToken));
        //    ZaloRequest zaloRequest = new ZaloRequest(soDienThoai, request.NoiDungTraoDoi, hoSo.MaHoSo);
        //    _jobService.Enqueue<IZaloService>(x => x.SendTextAsync(zaloRequest, cancellationToken));
        //}
        await _eventPublisher.PublishAsync(new QuaTrinhTraoDoiCongDanCreatedEvent(QuaTrinhTraoDoiCongDan, hoSo, request.Email, request.SMS, request.Zalo, request.MaHoSo, request.NoiDungTraoDoi, userFullName, userGroupName));
        return Result<DefaultIdType>.Success(QuaTrinhTraoDoiCongDan.Id);
    }
}
