using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace TD.DichVuCongApi.Infrastructure.Auth.Jwt;

internal static class Startup
{
    internal static IServiceCollection AddJwtAuth(this IServiceCollection services)
    {
        services.AddOptions<JwtSettings>()
            .BindConfiguration($"SecuritySettings:{nameof(JwtSettings)}")
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddSingleton<IConfigureOptions<JwtBearerOptions>, ConfigureJwtBearerOptions>();

        return services
            .AddAuthentication(authentication =>
            {
                authentication.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authentication.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        // Kiểm tra nếu token có trong header 'Authorization'
                        var authorizationHeader = context.Request.Headers["Authorization"].FirstOrDefault();
                        if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                        {
                            context.Token = authorizationHeader.Substring("Bearer ".Length).Trim();
                        }
                        else
                        {
                            // Nếu không có Authorization, lấy token từ 'x-jwt-token'
                            var xJwtToken = context.Request.Headers["x-jwt-token"].FirstOrDefault();
                            if (!string.IsNullOrEmpty(xJwtToken))
                            {
                                context.Token = xJwtToken;
                            }
                        }

                        return Task.CompletedTask;
                    }
                };
            })
            //.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, null!)
            .Services;
    }
}