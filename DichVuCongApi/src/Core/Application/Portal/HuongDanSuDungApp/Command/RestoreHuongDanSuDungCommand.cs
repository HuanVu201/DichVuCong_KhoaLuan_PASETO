using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Commands;
public sealed record RestoreHuongDanSuDungCommand(DefaultIdType Id) : ICommand;
