using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Commands;
public sealed record RestoreTrangThaiHoSoCommand(DefaultIdType Id) : ICommand;
