using MediatR;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp.Commands;

public class AddTinBaiCommandValidator : CustomValidator<AddTinBaiCommand>
{
    public AddTinBaiCommandValidator(IReadRepository<KenhTin> _repositoryKenhTin, IReadRepository<TrangThai> _repositoryTrangThai)
    {
        //.NotEmpty() check với kiểu mặc định của Type eg: string.Empty, Guid.Empty
        RuleFor(x => x.KenhTin).NotEmpty().MustAsync(async (id, ct) => await _repositoryKenhTin.GetByIdAsync(id, ct) is not null)
            .WithMessage(x => $"Kênh tin với mã: {x.KenhTin } chưa được thêm vào hệ thống");
        RuleFor(x => x.TrangThai).NotEmpty().MustAsync(async (id, ct) => await _repositoryTrangThai.GetByIdAsync(id, ct) is not null)
            .WithMessage(x => $"Trạng thái với mã: {x.TrangThai} chưa được thêm vào hệ thống");
    }
}

public class AddTinBaiCommandHandler : ICommandHandler<AddTinBaiCommand, Guid>
{
    private readonly IRepositoryWithEvents<TinBai> _repositoryTinBai;
    public AddTinBaiCommandHandler(IRepositoryWithEvents<TinBai> repositoryTinBai)
        => _repositoryTinBai = repositoryTinBai;

    public async Task<Result<Guid>> Handle(AddTinBaiCommand request, CancellationToken cancellationToken)
    {
        var tinBai = TinBai.Create(request.TieuDe, request.NgayBanHanh, request.NgayKetThuc, request.TrichYeu, request.NoiDung, request.NguonTin,
            request.KenhTin, request.TrangThai, request.AnhDaiDien, request.FileDinhKem, request.Tacgia, request.ChoPhepBinhLuan, request.HienThiLenTrangChu,
            request.TinNoiBat);
        await _repositoryTinBai.AddAsync(tinBai, cancellationToken);
        return Result<Guid>.Success(tinBai.Id);
    }
}
