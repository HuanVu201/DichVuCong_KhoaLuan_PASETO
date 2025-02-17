using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.KhoSoHoaDVCQG;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Infrastructure.KetNoi.BGTVT;
using TD.DichVuCongApi.Infrastructure.KetNoi.DVC.KhoSoHoaDVCQG;
using TD.DichVuCongApi.Infrastructure.KetNoi.DVC.SyncLocalDataToDVCQG;
using TD.DichVuCongApi.Infrastructure.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Infrastructure.KetNoi.LienThongILIS;
using TD.DichVuCongApi.Infrastructure.KetNoi.LLTP;
using TD.DichVuCongApi.Infrastructure.KetNoi.SLD;

namespace TD.DichVuCongApi.Infrastructure.KetNoi;
internal static class StartUp
{
    internal static IServiceCollection AddKetNoiConfig(this IServiceCollection services, IConfiguration configuration)
    {
        var registerConfig = services
            .Configure<GPLXSetting>(configuration.GetSection(nameof(GPLXSetting)))
            .Configure<DongBoTaoMoiHoSoSettings>(configuration.GetSection(nameof(DongBoTaoMoiHoSoSettings)))
            .Configure<KhaiSinhKhaiTuSettings>(configuration.GetSection(nameof(KhaiSinhKhaiTuSettings)))
            .Configure<KetNoiBGTVTSettings>(configuration.GetSection(nameof(KetNoiBGTVTSettings)))
            .Configure<TBKM_Config>(configuration.GetSection(nameof(TBKM_Config)))
            .Configure<LLTPServiceSettings>(configuration.GetSection(nameof(LLTPServiceSettings)))
            .Configure<SyncLocalDataToDVCQGSetting>(configuration.GetSection(nameof(SyncLocalDataToDVCQGSetting)))
            .Configure<KhoSoHoaDVCQGSettings>(configuration.GetSection(nameof(KhoSoHoaDVCQGSettings)))
            .Configure<SyncSLDSettings>(configuration.GetSection(nameof(SyncSLDSettings)))
            .Configure<LienThongILISSettings>(configuration.GetSection(nameof(LienThongILISSettings)));
        return registerConfig;
    }
}