namespace TD.DichVuCongApi.Application.Identity.Tokens;

public record TokenResponse(string Token, string RefreshToken, DateTime RefreshTokenExpiryTime);
public record PasetoPublicKeyResponse(string PublicKey, dynamic protocol);