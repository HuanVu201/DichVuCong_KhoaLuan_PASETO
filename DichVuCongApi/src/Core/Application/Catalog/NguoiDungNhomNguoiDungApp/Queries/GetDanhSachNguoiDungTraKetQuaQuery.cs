using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp.Queries;
public class GetDanhSachNguoiDungTraKetQuaQuery : IQuery<List<GetDanhSachNguoiDungTraKetQuaDto>>
{
    public string DonViId { get; set; }
    public string MaTTHC { get; set; }
}

public class GetDanhSachNguoiDungTraKetQuaDto : IDto
{
    public string UserId { get; set; }
    public string FullName { get; set; }
    public string GroupCode { get; set; }
    public string GroupName { get; set; }
    public string OfficeCode { get; set; }
    public string OfficeName { get; set; }
    public string UserName { get; set; }
    public string PositionName { get; set; }
}