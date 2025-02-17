using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;
public sealed record RestoreDanhGiaHaiLongCommand(DefaultIdType Id) : ICommand;
