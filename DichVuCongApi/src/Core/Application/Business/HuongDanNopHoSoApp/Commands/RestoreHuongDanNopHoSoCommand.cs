using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Commands;
public sealed record RestoreHuongDanNopHoSoCommand(DefaultIdType Id) : ICommand;
