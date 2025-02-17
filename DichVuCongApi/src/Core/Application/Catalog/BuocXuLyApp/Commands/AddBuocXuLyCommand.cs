using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Commands;
public class AddBuocXuLyCommand : ICommand<Guid>
{
    public string TenBuoc { get; set; }
    
}
