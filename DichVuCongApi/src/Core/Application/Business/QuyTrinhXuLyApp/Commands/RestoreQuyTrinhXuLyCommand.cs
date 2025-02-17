using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
public sealed record RestoreQuyTrinhXuLyCommand(DefaultIdType Id) : ICommand;
