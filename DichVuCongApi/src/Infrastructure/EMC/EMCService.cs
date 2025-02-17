using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Infrastructure.SMS;
using static TD.DichVuCongApi.Domain.Business.HoSo;
namespace TD.DichVuCongApi.Infrastructure.EMC;
public class EMCService : IEMCService
{
    private readonly EMCSettings _settings;
    private readonly IServiceLogger _serviceLogger;
    private readonly IDapperRepository _dapperRepository;
    private readonly YeuCauThanhToanConstants trangThaiThanhToan = new YeuCauThanhToanConstants();
    public EMCService(IOptions<EMCSettings> options, IServiceLogger serviceLogger, IDapperRepository dapperRepository)
    {
        _settings = options.Value;
        _serviceLogger = serviceLogger;
        _dapperRepository = dapperRepository;
    }
    public class YeuCauThanhToanResponse
    {
        public string HinhThucThanhToan { get; set; }
    }
    private string GetIsFromDVCQG(string loaiDuLieuKetNoi)
    {
        if(loaiDuLieuKetNoi == LoaiDuLieuKetNoiData.TBKMBS || loaiDuLieuKetNoi == LoaiDuLieuKetNoiData.TBKM)
        {
            return ((int)IsFromDVCQGEnum.FromDVCQG).ToString();
        }
        return ((int)IsFromDVCQGEnum.NotFromDVCQG).ToString();
    }
    private string GetIsDVCBC(string isDVCBC)
    {
        if (string.IsNullOrEmpty(isDVCBC))
        {
            return ((int)IsDVCBCEnum.TrucTiepQuaNhan).ToString();
        }
        return ((int)IsDVCBCEnum.VnPost).ToString();
    }
    public async Task SendAction(EMCRequestBody requestBody)
    {
        if (_settings.SiteId == null) // trường hợp muốn tắt emc
        {
            return;
        }
        var daThanhToan = await _dapperRepository.QueryFirstOrDefaultAsync<YeuCauThanhToanResponse>($"SELECT Top 1 HinhThucThanhToan FROM {SchemaNames.Business}.{TableNames.YeuCauThanhToans} WHERE TrangThai = N'{trangThaiThanhToan.TRANG_THAI.DA_THANH_TOAN}' AND MaHoSo = @MaHoSo and DeletedOn is null", new
        {
            MaHoSo = requestBody.MaHoSo
        });

        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            requestBody.SiteId = _settings.SiteId;
            if(requestBody.FormsReception == "1")
            {
                requestBody.FormsReception = ((int)HinhThucEnum.TrucTiep).ToString();
            } else if(requestBody.FormsReception == "2" || requestBody.FormsReception == "3")
            {
                requestBody.FormsReception = ((int)HinhThucEnum.TrucTuyen).ToString();
            }
            if (daThanhToan == null)
            {
                requestBody.FormsPayments = ((int)HinhThucThanhToanEnum.KhongThanhToan).ToString();
            }
            //else if(requestBody.FormsReception == "2"){
            //    requestBody.FormsPayments = ((int)HinhThucThanhToanEnum.Online).ToString();
            //}
            else
            {
                if (daThanhToan != null && (daThanhToan.HinhThucThanhToan == "tien-mat" || daThanhToan.HinhThucThanhToan == "chuyen-khoan"))
                {
                    requestBody.FormsPayments = ((int)HinhThucThanhToanEnum.TrucTiep).ToString();
                }
                else if (daThanhToan != null && daThanhToan.HinhThucThanhToan == "truc-tuyen")
                {
                    requestBody.FormsPayments = ((int)HinhThucThanhToanEnum.Online).ToString();
                }
            }

            if (requestBody.Level == "3")
            {
                requestBody.Level = ((int)LevelEnum.DVCTrucTuyenToanTrinh).ToString();
            }
            else if (requestBody.Level == "4")
            {
                requestBody.Level = ((int)LevelEnum.DVCTrucTuyenToanTrinh).ToString();
            }
            else
            {
                requestBody.Level = ((int)LevelEnum.DVCTrucTuyenMotPhan).ToString();
            }


            if (requestBody.Status == "2" || requestBody.Status == "1")
            {
                requestBody.Status = ((int)StatusEnum.TiepNhan).ToString();
            }
            else if (requestBody.Status == "4")
            {
                requestBody.Status = ((int)StatusEnum.DangXuLy).ToString();
            }
            else if(requestBody.Status == "9" || requestBody.Status == "10")
            {
                requestBody.Status = ((int)StatusEnum.TraKetQua).ToString();
            }
            else
            {
                requestBody.Status = ((int)StatusEnum.Khac).ToString();
            }
            requestBody.IsFromDVCQG = GetIsFromDVCQG(requestBody.IsFromDVCQG);
            requestBody.IsDVCBC = GetIsDVCBC(requestBody.IsDVCBC);
            requestBody.User = JsonConvert.SerializeObject(new
            {
                ID_local = requestBody.User,
                ID_QG = requestBody.User,
                TYPE = requestBody.User.Length == 10 ? "1" : "2",
                LOCATION = _settings.MaTinh
            });
            var res = await httpClient.PostAsJsonAsync<EMCRequestBody>(_settings.ApiUrl ?? "https://f-emc.ngsp.gov.vn/TrackingMCDT", requestBody);
            await _serviceLogger.LogAsync<EMCService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = requestBody.MaHoSo,
                isSucceed = res.IsSuccessStatusCode,
                Receiver = null,
                Sender = null,
                Request = JsonConvert.SerializeObject(requestBody),
                Response = res.IsSuccessStatusCode ? "Success" : JsonConvert.SerializeObject(res),
                Service = ServiceLoggerServiceType.EMC,
            });
        }
    }
}
