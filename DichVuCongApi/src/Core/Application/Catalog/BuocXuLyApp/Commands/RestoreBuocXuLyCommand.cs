
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Commands;
public sealed record RestoreBuocXuLyCommand(Guid Id) : ICommand;
