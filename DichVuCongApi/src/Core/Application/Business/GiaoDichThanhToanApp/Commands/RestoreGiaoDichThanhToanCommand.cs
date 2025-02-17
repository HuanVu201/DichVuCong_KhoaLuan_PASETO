using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
public sealed record RestoreGiaoDichThanhToanCommand(DefaultIdType Id) : ICommand;
