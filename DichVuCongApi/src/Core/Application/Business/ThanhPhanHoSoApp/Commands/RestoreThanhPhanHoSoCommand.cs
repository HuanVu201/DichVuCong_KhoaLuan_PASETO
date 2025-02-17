using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
public sealed record RestoreThanhPhanHoSoCommand(DefaultIdType Id) : ICommand;
