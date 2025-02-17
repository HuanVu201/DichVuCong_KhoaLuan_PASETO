using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Serilog;
using TD.DichVuCongApi.Application;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.SyncLocalDataToDVCQG;
using TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.KetNoi.SLD;
using TD.DichVuCongApi.Application.Common.LTQVLB;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Host.Configurations;
using TD.DichVuCongApi.Host.Controllers;
using TD.DichVuCongApi.Infrastructure;
using TD.DichVuCongApi.Infrastructure.BackgroundJobs;
using TD.DichVuCongApi.Infrastructure.Common;
using TD.DichVuCongApi.Infrastructure.KetNoi.BGTVT;
using TD.DichVuCongApi.Infrastructure.KetNoi.DVC.SyncLocalDataToDVCQG;
using TD.DichVuCongApi.Infrastructure.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Infrastructure.KetNoi.LLTP;
using TD.DichVuCongApi.Infrastructure.KetNoi.SLD;
using TD.DichVuCongApi.Infrastructure.Logging.Serilog;
using TD.DichVuCongApi.Infrastructure.LTQLVB;
using TD.DichVuCongApi.Infrastructure.Zalo;
using static TD.DichVuCongApi.Application.Catalog.ThuTucApp.Service;
using static TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoHienTaiJob.TaskSoLieuBaoCaoHienTaiService;
using static TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob.TaskSoLieuBaoCaoTheoKyService;

[assembly: ApiConventionType(typeof(TDApiConventions))]

StaticLogger.EnsureInitialized();
Log.Information("Server Booting Up...");
try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.AddConfigurations().RegisterSerilog();
    builder.Services.AddControllersWithViews();
    builder.Services.AddInfrastructure(builder.Configuration);
    builder.Services.AddApplication();

    builder.Services.AddSpaStaticFiles(c =>
    {
        c.RootPath = "ClientApp";
    });

    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromFile(Path.Combine(Directory.GetCurrentDirectory(), "Configurations", "firebase_admin_sdk.json"))
    });

    var app = builder.Build();

    await app.Services.InitializeDatabasesAsync();

    app.UseInfrastructure(builder.Configuration);
    app.UseStaticFiles();
    app.UseSpaStaticFiles();

    app.UseSpa(spa =>
    {
        spa.Options.SourcePath = "ClientApp";
    });

    app.MapEndpoints();

    var settings = builder.Configuration.GetSection(nameof(HangfireSettings)).Get<HangfireSettings>();
    var settingZalo = builder.Configuration.GetSection(nameof(ZaloSetting)).Get<ZaloSetting>();
    var settingLTQLVB = builder.Configuration.GetSection(nameof(LTQLVBSettings)).Get<LTQLVBSettings>();
    var settingGPLX = builder.Configuration.GetSection(nameof(GPLXSetting)).Get<GPLXSetting>();
    var settingKetNoiBGTVT = builder.Configuration.GetSection(nameof(KetNoiBGTVTSettings)).Get<KetNoiBGTVTSettings>();
    var settingKhaiSinhKhaiTu = builder.Configuration.GetSection(nameof(KhaiSinhKhaiTuSettings)).Get<KhaiSinhKhaiTuSettings>();
    var settingSyncSLD = builder.Configuration.GetSection(nameof(SyncSLDSettings)).Get<SyncSLDSettings>();
    var settingLLTPService = builder.Configuration.GetSection(nameof(LLTPServiceSettings)).Get<LLTPServiceSettings>();
    var settingSyncLocalDataToDVCQG = builder.Configuration.GetSection(nameof(SyncLocalDataToDVCQGSetting)).Get<SyncLocalDataToDVCQGSetting>();


    
    if (settings.Enable is true)
    {
        var hangfireService = new HangfireService();
        if (settings.EnableJobsDefault is true)
        {
            if (settingZalo.enableRefreshToken == true)
            {
                hangfireService.Recurring<IZaloService>("refresh_token", x => x.RefreshTokenZalo(), "0 0 * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("refresh_token");
            }
            hangfireService.Recurring<IDanhGiaCoQuanService>("Add_Danh_Gia_Co_Quan", x => x.AddDanhGiaCoQuan(), "0 0 1 1,4,7,10 *"); // mỗi đầu quý
            hangfireService.Recurring<IDanhGiaCoQuanService>("Tinh_Diem_Trung_Binh_DGHL_Don_Vi", x => x.TinhTrungBinhDGHLDonVi(), "0 19 * * *");// 2h sáng
            hangfireService.Recurring<IDanhGiaCoQuanService>("Tinh_Tong_So_Phieu_Don_Vi", x => x.TinhTongSoPhieuVaMucDoHLDonVi(), "0 20 * * *"); // 3h sáng



            // hangfireService.Recurring<IThongKeJobService>("du-lieu-thong-ke", x => x.AddOrUpdate(), "0 6 * * *"); //mỗi 6h sáng
            if (!string.IsNullOrEmpty(settingLTQLVB.urlLienThongQLVB))
            {
                hangfireService.Recurring<ISyncLTQLVBService>("root-sync-data-from-hsqlvb", x => x.SyncDataFromLTQLVB(), "*/3 * * * *"); // mỗi 3p
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("root-sync-data-from-hsqlvb");
            }

            hangfireService.Recurring<TaskGiaoDichThanhToanServices>("check-status-payment-platform", x => x.TaskCheckConfirmGiaoDichTTTT(), "*/33 * * * *");

            // hangfireService.Recurring<ISyncBGTVTService>("sync-data-from-bgtvt", x => x.SyncData(), "0 6 * * *");
            if (settingGPLX.Enable == true)
            {
                hangfireService.Recurring<IGPLXService>("sync-gplx", x => x.SyncGPLX(), "0 */2 * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("sync-gplx");
            }
            if (settingKetNoiBGTVT.Enable)
            {
                hangfireService.Recurring<ISyncBGTVTService>("sync-gplx-bgtvt", x => x.SyncData(), "0 */1 * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("sync-gplx-bgtvt");
            }
            if (settingKhaiSinhKhaiTu.EnableGetData)
            {
                hangfireService.Recurring<IKhaiSinhKhaiTuService>("sync_kskt", x => x.GetDataAsync(), "*/10 * * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("sync_kskt");
            }
            if (settingKhaiSinhKhaiTu.EnableScan)
            {
                hangfireService.Recurring<IKhaiSinhKhaiTuService>("scan_result_ltks", x => x.ScanResultLTKS(), "*/15 * * * *");
                hangfireService.Recurring<IKhaiSinhKhaiTuService>("scan_result_ltkt", x => x.ScanResultLTKT(), "*/16 * * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("scan_result_ltks");
                hangfireService.RecurringRemoveIfExists("scan_result_ltkt");
            }
            if (settingKhaiSinhKhaiTu.EnableUpdateStatus)
            {
                hangfireService.Recurring<IKhaiSinhKhaiTuService>("update_status_dvclt_kskt", x => x.CapNhatTrangThaiDVCLT(), "*/7 * * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("update_status_dvclt_kskt");
            }
            if (settingSyncSLD.EnablePull)
            {
                hangfireService.Recurring<ISyncSLDService>("pull_data_sld", x => x.PullData(), "0 17,23,5,11 * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("pull_data_sld");
            }
            if (settingSyncSLD.EnablePush)
            {
                hangfireService.Recurring<ISyncSLDService>("push_data_sld", x => x.PushData(), "0 */1 * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("push_data_sld");
            }
            if (settingLLTPService.EnableUpdateStatus)
            {
                hangfireService.Recurring<ILLTPService>("update_status_vneid_lltp", x => x.CapNhatTrangThaiVNeID(), "*/7 * * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("update_status_vneid_lltp");
            }
            if (settingLLTPService.EnableScan)
            {
                hangfireService.Recurring<ILLTPService>("scan_vneid_lltp", x => x.ScanResultLLTP(), "*/15 * * * *");
                hangfireService.Recurring<ILLTPService>("scan_vneid_lltp_mcdt", x => x.ScanResultLLTPMCDT(), "*/41 * * * *");
            }
            else
            {
                hangfireService.RecurringRemoveIfExists("scan_vneid_lltp");
            }

            hangfireService.Recurring<ImportThuTucServiceCommandHandler>("dong-bo-thu-tuc-hanh-chinh", x => x.Handle(new ImportThuTucServiceCommand() { message = "string" }, CancellationToken.None), "0 1 * * *");

            hangfireService.Recurring<TaskSoLieuBaoCaoHienTaiHandler>("so-lieu-thong-ke-hien-tai", x => x.Handle(new TaskSoLieuThongKeHienTai(), CancellationToken.None), "0 19 * * *");
            hangfireService.Recurring<TaskSoLieuThongKeTheoKyHandler>("so-lieu-thong-ke-theo-ky", x => x.Handle(new TaskSoLieuThongKeTheoKy(), CancellationToken.None), "30 19 * * *");

            //#region Xử lý đồng bộ dvcqg
            //var dongBoTuNgayDVCQG = builder.Configuration.GetSection(nameof(SyncLocalDataToDVCQGSetting)).Get<SyncLocalDataToDVCQGSetting>();
            //DateTime parsedDate;

            //if (DateTime.TryParse(dongBoTuNgayDVCQG.DongBoTuNgay, out parsedDate))
            //{
            //    DateTime currentDate = DateTime.Now;
            //    TimeSpan difference = currentDate - parsedDate;
            //    string formatDate = "yyyy-MM-dd HH:mm:ss";
            //    int chunk = 1;
            //    if (difference.TotalDays > 0)
            //    {
            //        double period = difference.TotalDays / chunk;
            //        for (int i = 0; i < chunk; i++)
            //        {
            //            string timeOffset = (17 + i).ToString();
            //            DateTime start = parsedDate.AddDays(i * period);
            //            DateTime end = parsedDate.AddDays((i + 1) * period);
            //            if (settingSyncLocalDataToDVCQG.Enable)
            //            {
            //                hangfireService.Recurring<ISyncLocalDataToDVCQGService>("push_dvcqg_" + i, x => x.SyncData(start.ToString(formatDate), end.ToString(formatDate)), $"0 {timeOffset} * * *");
            //            }
            //            else
            //            {
            //                hangfireService.RecurringRemoveIfExists("push_dvcqg_" + i);
            //            }
            //        }
            //    }
            //}
            //#endregion
        }
    }

    app.Run();
}
catch (Exception ex) when (!ex.GetType().Name.Equals("HostAbortedException", StringComparison.Ordinal))
{
    StaticLogger.EnsureInitialized();
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    StaticLogger.EnsureInitialized();
    Log.Information("Server Shutting down...");
    Log.CloseAndFlush();
}