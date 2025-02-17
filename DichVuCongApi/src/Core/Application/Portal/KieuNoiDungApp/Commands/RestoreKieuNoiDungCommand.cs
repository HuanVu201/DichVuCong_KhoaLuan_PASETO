using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApiation.Portal.KieuNoiDungApp.Commands;
public sealed record RestoreKieuNoiDungCommand(Guid Id) : ICommand;
