using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public sealed record RestoreThanhPhanThuTucCommand(DefaultIdType Id) : ICommand;
