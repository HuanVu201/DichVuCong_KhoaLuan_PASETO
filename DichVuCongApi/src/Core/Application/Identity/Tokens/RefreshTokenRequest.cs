namespace TD.DichVuCongApi.Application.Identity.Tokens;

public record RefreshTokenRequest(string Token, string RefreshToken);