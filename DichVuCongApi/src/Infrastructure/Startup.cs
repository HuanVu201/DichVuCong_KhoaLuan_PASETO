using System.Reflection;
using System.Runtime.CompilerServices;
using TD.DichVuCongApi.Infrastructure.Auth;
using TD.DichVuCongApi.Infrastructure.BackgroundJobs;
using TD.DichVuCongApi.Infrastructure.Caching;
using TD.DichVuCongApi.Infrastructure.Common;
using TD.DichVuCongApi.Infrastructure.Cors;
using TD.DichVuCongApi.Infrastructure.FileStorage;
using TD.DichVuCongApi.Infrastructure.Localization;
using TD.DichVuCongApi.Infrastructure.Mailing;
using TD.DichVuCongApi.Infrastructure.Mapping;
using TD.DichVuCongApi.Infrastructure.Middleware;
using TD.DichVuCongApi.Infrastructure.Multitenancy;
using TD.DichVuCongApi.Infrastructure.Notifications;
using TD.DichVuCongApi.Infrastructure.OpenApi;
using TD.DichVuCongApi.Infrastructure.Persistence;
using TD.DichVuCongApi.Infrastructure.Persistence.Initialization;
using TD.DichVuCongApi.Infrastructure.SecurityHeaders;
using TD.DichVuCongApi.Infrastructure.Validations;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TD.DichVuCongApi.Infrastructure.Minio;
using TD.DichVuCongApi.Infrastructure.Ldap;
using TD.DichVuCongApi.Infrastructure.SMS;
using TD.DichVuCongApi.Infrastructure.Zalo;
using TD.DichVuCongApi.Infrastructure.DvcPayment;
using Asp.Versioning;
using TD.DichVuCongApi.Infrastructure.LTQLVB;
using TD.DichVuCongApi.Infrastructure.EMC;
using TD.DichVuCongApi.Infrastructure.OCR;
using TD.DichVuCongApi.Infrastructure.NEAC;
using TD.DichVuCongApi.Infrastructure.CoQuanThucHienThuTuc;
using TD.DichVuCongApi.Infrastructure.KetNoi;
using TD.DichVuCongApi.Infrastructure.VnPost;
using TD.DichVuCongApi.Infrastructure.BienLaiViettel;
using TD.DichVuCongApi.Infrastructure.VBDLIS;
using TD.DichVuCongApi.Infrastructure.ILIS;

[assembly: InternalsVisibleTo("Infrastructure.Test")]

namespace TD.DichVuCongApi.Infrastructure;

public static class Startup
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Mgo+DSMBMAY9C3t2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5bd0xhW31bcHJXRmBV");
        var applicationAssembly = typeof(TD.DichVuCongApi.Application.Startup).GetTypeInfo().Assembly;
        MapsterSettings.Configure();
        return services
            .AddApiVersioning()
            .AddAuth(config)
            .AddBackgroundJobs(config)
            .AddCaching(config)
            .AddCorsPolicy(config)
            .AddExceptionMiddleware()
            .AddBehaviours(applicationAssembly)
            .AddHealthCheck()
            .AddPOLocalization(config)
            .AddMailing(config)
            .AddSMS(config)
            .AddEMC(config)
            .AddOCR(config)
            .AddNEAC(config)
            .AddKetNoiConfig(config)
            .AddZalo(config)
            .AddLTQLVB(config)
            .AddSyncfusionReport(config)
            .AddMinio(config)
            .AddLdap(config)
            .AddMediatR(Assembly.GetExecutingAssembly())
            .AddMultitenancy()
            .AddNotifications(config)
            .AddOpenApiDocumentation(config)
            .AddPersistence()
            .AddRequestLogging(config)
            .AddDvcPayment(config)
            .AddCommon(config)
            .AddCoQuanThucHienConfigs(config)
            .AddVNPostConfigs(config)
            .AddViettelInvoiceConfigs(config)
            .AddVBDLISConfigs(config)
            .AddILISConfigs(config)
            .AddRouting(options => options.LowercaseUrls = true)
            .AddHttpClient()
            .AddServices();
    }

    private static IServiceCollection AddApiVersioning(this IServiceCollection services) =>
        services.AddApiVersioning(config =>
        {
            config.DefaultApiVersion = new ApiVersion(1, 0);
            config.AssumeDefaultVersionWhenUnspecified = true;
            config.ReportApiVersions = true;
        }).Services;

    private static IServiceCollection AddHealthCheck(this IServiceCollection services) =>
        services.AddHealthChecks().AddCheck<TenantHealthCheck>("Tenant").Services;

    public static async Task InitializeDatabasesAsync(this IServiceProvider services, CancellationToken cancellationToken = default)
    {
        // Create a new scope to retrieve scoped services
        using var scope = services.CreateScope();

        await scope.ServiceProvider.GetRequiredService<IDatabaseInitializer>()
            .InitializeDatabasesAsync(cancellationToken);
    }

    public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder builder, IConfiguration config) =>
        builder
            .UseRequestLocalization()
            .UseStaticFiles()
            .UseSecurityHeaders(config)
            .UseFileStorage()
            .UseExceptionMiddleware()
            .UseRouting()
            .UseCorsPolicy()
            .UseAuthentication()
            .UseCurrentUser()
            .UseMultiTenancy()
            .UseAuthorization()
            .UseRequestLogging(config)
            .UseHangfireDashboard(config)
            .UseOpenApiDocumentation(config);

    public static IEndpointRouteBuilder MapEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapControllers().RequireAuthorization();
        builder.MapHealthCheck();
        builder.MapNotifications();
        builder.MapServerStatus();
        return builder;
    }

    private static IEndpointConventionBuilder MapHealthCheck(this IEndpointRouteBuilder endpoints) =>
        endpoints.MapHealthChecks("/api/health");
}