using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Commands;

//public class NguoiDungNhomNguoiDungValidator : CustomValidator<AddNguoiDungNhomNguoiDungCommand>
//{
//    public NguoiDungNhomNguoiDungValidator()
//    {
//        RuleFor(x => x.Tai).NotEmpty().WithMessage("ScreenId không hợp lệ");
//        RuleFor(x => x.ActionId).NotEmpty().WithMessage("ActionId không hợp lệ");
//    }
//}
//public class AddNguoiDungNhomNguoiDungCommandValidator: CustomValidator<AddNguoiDungNhomNguoiDungCommand>
//{
//    public AddNguoiDungNhomNguoiDungCommandValidator()
//    {
//        RuleForEach(x => x.NguoiDungNhomNguoiDungs).SetValidator(new NguoiDungNhomNguoiDungValidator());
//    }
//}

public class AddNguoiDungNhomNguoiDungCommandHandler : ICommandHandler<AddNguoiDungNhomNguoiDungCommand>
{
    private readonly IRepositoryWithEvents<NguoiDungNhomNguoiDung> _repositoryWithEvents;
    public AddNguoiDungNhomNguoiDungCommandHandler(IRepositoryWithEvents<NguoiDungNhomNguoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(AddNguoiDungNhomNguoiDungCommand request, CancellationToken cancellationToken)
    {
        await _repositoryWithEvents.AddAsync(new NguoiDungNhomNguoiDung(request.TaiKhoan, request.NhomNguoiDungId), cancellationToken);
        return (Result)Result.Success();
    }
}
