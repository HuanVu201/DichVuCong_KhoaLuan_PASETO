using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
public sealed record RestoreTruongHopThuTucCommand(DefaultIdType Id) : ICommand;
