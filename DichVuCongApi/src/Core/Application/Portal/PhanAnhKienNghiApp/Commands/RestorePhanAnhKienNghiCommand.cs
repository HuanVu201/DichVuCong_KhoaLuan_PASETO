using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
public sealed record RestorePhanAnhKienNghiCommand(DefaultIdType Id) : ICommand;
