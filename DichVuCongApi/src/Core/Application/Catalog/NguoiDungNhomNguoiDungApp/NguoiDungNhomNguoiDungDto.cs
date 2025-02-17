

using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Business.ActionApp;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp;


public class NguoiDungNhomNguoiDungDto : IDto
{
    public DefaultIdType Id { get; set; }
    public DefaultIdType NhomNguoiDungId { get; set; }
    public string UserId { get; set; }
    public string MaNhom { get; set; }
    public string TenNhom { get; set; }
    public string FullName { get; set; }
    public string GroupCode { get; set; }
    public string UserOrder { get; set; }
    public string GroupName { get; set; }
    public string OfficeCode { get; set; }
    public string OfficeName { get; set; }
    public string UserName { get; set; }
    public string PositionName { get; set; }

    [JsonIgnore] 
    public int TotalCount { get; set; }
}

public class UserNotInNhomDto : IDto
{
    public string Id { get; set; }
    public string FullName { get; set; }
    public string GroupCode { get; set; }
    public string GroupName { get; set; }
    public string UserName { get; set; }
    public string ChucDanh { get; set; }
    public string OfficeCode { get; set; }
    public string OfficeName{ get; set; }
    public string PositionName { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
