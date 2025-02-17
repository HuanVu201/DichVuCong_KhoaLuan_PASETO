using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public sealed record ChuyenBuocNhanhCommand(List<Guid> Ids): ICommand;
