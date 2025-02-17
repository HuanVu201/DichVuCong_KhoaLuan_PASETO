using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
public sealed record RestoreThanhPhanHuongDanNopHoSoCommand(DefaultIdType Id) : ICommand;
