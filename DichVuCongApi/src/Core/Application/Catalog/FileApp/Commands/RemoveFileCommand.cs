using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.FileApp.Commands;
public class RemoveFileCommand : ICommand
{
    public string Path { get; set; }
}

