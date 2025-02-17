using System.Security.Claims;

namespace TD.DichVuCongApi.Application.Common.Interfaces;

public interface ICurrentUser
{
    string? Name { get; }

    Guid GetUserId();
    string? GetUserOfficeCode();
    string? GetUserGroupCode();
    string? GetUserFullName();
    string? GetUserGroupName();
    string? GetUserOfficeName();
    string? GetUserEmail();
    string? GetUserName();
    string? GetUserMaDinhDanh();
    string? GetUserPositionName();
    string? GetTypeUser();

    string? GetTenant();

    bool IsAuthenticated();

    bool IsInRole(string role);

    IEnumerable<Claim>? GetUserClaims();
}