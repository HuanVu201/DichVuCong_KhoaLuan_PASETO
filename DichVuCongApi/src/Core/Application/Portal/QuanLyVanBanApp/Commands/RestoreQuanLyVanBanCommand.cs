using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Commands;
public sealed record RestoreQuanLyVanBanCommand(DefaultIdType Id) : ICommand;
