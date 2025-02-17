using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public sealed record HoanThanhBoSungHoSoCommand(Guid Id) : ICommand;
