using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
public sealed record RestoreMauPhoiCommand(Guid Id) : ICommand;
