using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
public class AdminAddTaiLieuKhoLuuTruCongDanCommandHandler : ICommandHandler<AdminAddTaiLieuKhoLuuTruCongDanCommand>
{
    private readonly IRepository<TaiLieuKhoLuuTruCongDan> _repositoryWithEvents;
    private readonly IRepository<KhoLuuTruCongDan> _khoLuuTruRepo;
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;

    public AdminAddTaiLieuKhoLuuTruCongDanCommandHandler(IRepository<KhoLuuTruCongDan> khoLuuTruRepo, IMinioService minioService, IRepository<TaiLieuKhoLuuTruCongDan> repositoryWithEvents, ICurrentUser currentUser, IDapperRepository dapperRepository, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _minioService = minioService;
        _khoLuuTruRepo = khoLuuTruRepo;
    }
    private class UserSelect
    {
        public DefaultIdType Id { get; set; }
    }
    public async Task<Result> Handle(AdminAddTaiLieuKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {

        string getKhoLuuTruSql = $@"
            SELECT Top 1 {nameof(KhoLuuTruCongDan.Id)} FROM {SchemaNames.Business}.{TableNames.KhoLuuTruCongDans}
            WHERE {nameof(KhoLuuTruCongDan.SoDinhDanh)} = @SoGiayToChuHoSo AND {nameof(KhoLuuTruCongDan.DeletedOn)} is null
        ";

        var khoLuuTru = await _dapperRepository.QueryFirstOrDefaultAsync<KhoLuuTruCongDan>(getKhoLuuTruSql, new
        {
            request.SoGiayToChuHoSo
        }, cancellationToken: cancellationToken);
        if(khoLuuTru == null)
        {
            var userExistSQL = $"SELECT Top 1 Id FROM {SchemaNames.Identity}.{TableNames.Users} WHERE SoDinhDanh = @SoGiayToChuHoSo AND DeletedOn is null";
            var userExists = await _dapperRepository.QueryFirstOrDefaultAsync<UserSelect>(userExistSQL, new
            {
                request.SoGiayToChuHoSo
            }, cancellationToken: cancellationToken);
            if(userExists == null)
            {
                throw new NotFoundException("Số giấy tờ chủ hồ sơ không tồn tại trên hệ thống");
            }
            try
            {
                khoLuuTru = new KhoLuuTruCongDan(request.SoGiayToChuHoSo, 0, 0);
                await _khoLuuTruRepo.AddAsync(khoLuuTru, cancellationToken);
            } catch (Exception ex)
            {
                throw new Exception("Thêm mới kho lưu trữ công dân thất bại, vui lòng thử lại sau");
            }

        }

        var file = await _minioService.GetFileByKey2Async(string.Empty, request.DuongDan);
        double dungLuong = (double)file.ByteRes.Length / 1024.0 / 1024.0;
        var res = await _mediator.Send(new UpdateKhoLuuTruCongDanCommand()
        {
            DungLuong = dungLuong,
            SoLuong = 1,
            KhoLuuTruId = khoLuuTru.Id
        });

        if (res.Succeeded && !string.IsNullOrEmpty(res.Data.ToString()))
        {
            var taiLieuKhoLuuTruCongDan = TaiLieuKhoLuuTruCongDan.Create(res.Data, request.TenGiayTo, request.DuongDan, dungLuong, request.Nguon ?? string.Empty, 0, request.LoaiGiayToId, null, null, null, null);
            await _repositoryWithEvents.AddAsync(taiLieuKhoLuuTruCongDan, cancellationToken);
            return Result<Guid>.Success(message: "Đã thêm tài liệu vào kho!", data: taiLieuKhoLuuTruCongDan.Id);
        }
        else
        {
            return Result<Guid>.Fail(message: res.Message);
        }
    }
}
