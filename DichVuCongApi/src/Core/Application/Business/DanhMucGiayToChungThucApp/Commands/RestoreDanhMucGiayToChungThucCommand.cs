using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Commands;
public sealed record RestoreDanhMucGiayToChungThucCommand(DefaultIdType Id) : ICommand;
