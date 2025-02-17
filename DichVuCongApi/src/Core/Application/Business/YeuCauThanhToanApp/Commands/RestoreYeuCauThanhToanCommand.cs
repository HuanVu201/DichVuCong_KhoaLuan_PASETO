using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public sealed record RestoreYeuCauThanhToanCommand(DefaultIdType Id) : ICommand;
