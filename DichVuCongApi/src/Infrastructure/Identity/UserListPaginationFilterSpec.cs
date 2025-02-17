using Ardalis.Specification;
using TD.DichVuCongApi.Application.Common.Specification;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Infrastructure.Identity;

public class UserListPaginationFilterSpec : EntitiesByPaginationFilterSpec<ApplicationUser>
{
    public UserListPaginationFilterSpec(UserListFilter request)
        : base(request)
    {
        Query.Where(x => x.GroupCode == request.GroupCode, !string.IsNullOrEmpty(request.GroupCode))
        .Where(x => x.OfficeCode == request.OfficeCode, !string.IsNullOrEmpty(request.OfficeCode))
        .Where(p => p.PositionName == request.PositionName, !string.IsNullOrEmpty(request.PositionName))
        .Where(p => p.OfficeName == request.OfficeName, !string.IsNullOrEmpty(request.OfficeName))
        .Where(p => p.MaDinhDanhOfficeCode == request.MaDinhDanhOfficeCode, !string.IsNullOrEmpty(request.MaDinhDanhOfficeCode))
        .Where(p => p.UserName.Contains(request.UserName), !string.IsNullOrEmpty(request.UserName))
        .Where(p => p.FullName.Contains(request.FullName), !string.IsNullOrEmpty(request.FullName))
        .Where(p => p.ChucDanh.Contains(request.ChucDanh), !string.IsNullOrEmpty(request.ChucDanh))
        .Where(p => p.IsActive == request.IsActive, request.IsActive.HasValue)
        .Where(p => p.TypeUser == request.TypeUser, !string.IsNullOrEmpty(request.TypeUser))
        .Where(p => p.LaCanBoTiepNhan == request.LaCanBoTiepNhan, request.LaCanBoTiepNhan != null);
    }

    public static DateTime GetDateZeroTime(DateTime date)
    {
        return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
    }
}