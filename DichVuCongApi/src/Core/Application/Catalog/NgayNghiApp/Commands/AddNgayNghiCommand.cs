using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Commands;
public class AddNgayNghiCommand : ICommand<Guid>
{
    public string Description { get; set; }
    public DateTimeOffset Date { get;  set; }
}
