using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Commands;
public sealed record RestoreQuanLyLienKetCommand(DefaultIdType Id) : ICommand;
