using DocumentFormat.OpenXml.Office.CustomUI;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;

using TD.DichVuCongApi.Infrastructure.BienLaiVNPT;
using TD.DichVuCongApi.Infrastructure.Common.Extensions;
using TD.DichVuCongApi.Application.Common.BienLaiVNPT;
using VnptPublishService;
using TD.DichVuCongApi.Domain.Business;
using VnptPortalService;
using VnptBusinessService;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Common.Business;
using Microsoft.Extensions.Logging;



namespace TD.DichVuCongApi.Infrastructure.HoaDonVNPT;
public class BienLaiVNPTServices : IBienLaiVNPTService
{
    private IMediator _mediator;
    private CurrencyExtension _currencyExtension;
    private PublishServiceSoap _publishServiceSoap;
    private PortalServiceSoap _portalServiceSoap;
    private BusinessServiceSoap _businessServiceSoap;
    private readonly ILogger<InitBienLaiDienTuVnptRequest> _logger;
    public BienLaiVNPTServices(IMediator mediator, ILogger<InitBienLaiDienTuVnptRequest> logger)
    {
        _mediator = mediator;
        _currencyExtension = new CurrencyExtension();
        _logger = logger;

    }


    public async Task<string> PhatHanhBienLai(InitBienLaiDienTuVnptRequest yeuCauThanhToan)
    {
        for(int i = 0; i <= 3; i++)
        {
            try
            {
                var loaiPhiText = yeuCauThanhToan.LoaiPhiText.Length > 500 ? yeuCauThanhToan.LoaiPhiText.Substring(0, 450) + "..." : yeuCauThanhToan.LoaiPhiText;
                DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
                ServicePointManager.SecurityProtocol = (SecurityProtocolType)768 | (SecurityProtocolType)3072;
                // PaymentMethod TM: tiền mặt, CK : Chuyển khoản, TTO : Thanh toán trực tuyến
                string xmlInvData = @"<Invoices>
                         <Inv>
                          <key>" + yeuCauThanhToan.Ma + @"</key>
                          <Invoice>
                            <Extra1>" + yeuCauThanhToan.MaHoSo + @"</Extra1>
                            <CusCode>" + yeuCauThanhToan.MaHoSo + @"</CusCode>
                           <ArisingDate>" + currentTime.ToString("dd/MM/yyyy") + @"</ArisingDate>
                           <CusName>" + yeuCauThanhToan.ChuHoSo.Replace("&", "và") + @"</CusName>";
                if (!string.IsNullOrEmpty(yeuCauThanhToan.MaSoThueBienLai))
                    xmlInvData += $"<CusTaxCode>{yeuCauThanhToan.MaSoThueBienLai}</CusTaxCode>";
                xmlInvData += @"<Total>" + yeuCauThanhToan.ThanhTien + @"</Total>
                           <Amount>" + yeuCauThanhToan.ThanhTien + @"</Amount>
                           <AmountInWords>" + _currencyExtension.CurrencyToWords(yeuCauThanhToan.ThanhTien) + @"</AmountInWords>
                           <VATAmount>0</VATAmount>
                           <VATRate>0</VATRate>
                           
                            <ComTaxCode>" + yeuCauThanhToan.MaSoThueBienLai + @"</ComTaxCode>
                           <CusAddress>" + yeuCauThanhToan.DiaChiChuHoSo.Replace("&", "và") + @"</CusAddress>
                             <Email>" + yeuCauThanhToan.EmailNguoiNopTienBienLai + @"</Email>
                           <PaymentMethod>" + yeuCauThanhToan.HinhThucThanhToan + @"</PaymentMethod>  
                                    <PaymentStatus>1</PaymentStatus>                                        
                           <Extra>" + loaiPhiText + @$"</Extra>
                           <Products>
                            <Product>
                                                            <FEEID>2300</FEEID>
                                                    	<Extra1>{loaiPhiText}</Extra1>";
                if (yeuCauThanhToan.LoaiPhi == "phi")
                    xmlInvData += "<Extra2>0</Extra2>";
                else xmlInvData += "<Extra2>1</Extra2>";
                xmlInvData += "<Code>" + yeuCauThanhToan.MaTTHC + @$"</Code>
                             <ProdName>{loaiPhiText}</ProdName>
                             <ProdUnit>Lần</ProdUnit>
                             <ProdQuantity>1</ProdQuantity>
                             <ProdPrice>" + yeuCauThanhToan.ThanhTien + @"</ProdPrice>
                                            <VATRate>0</VATRate>
                             <Total>" + yeuCauThanhToan.ThanhTien + @"</Total>
                             <Amount>" + yeuCauThanhToan.ThanhTien + @"</Amount>					                                
                            </Product>
                           </Products>
                          </Invoice>
                         </Inv>
                        </Invoices>";

                if (string.IsNullOrEmpty(yeuCauThanhToan.CauHinhBienLaiDienTu)) throw new Exception("BienLaiVNPTConfig not found");
                var configVnpt = JsonConvert.DeserializeObject<ConfigBienLaiVNPT>(yeuCauThanhToan.CauHinhBienLaiDienTu);
                _publishServiceSoap = new PublishServiceSoapClient(PublishServiceSoapClient.EndpointConfiguration.PublishServiceSoap, configVnpt.PUBLISHSERVICE);
                var importAndPublishInvRequestBody = new ImportAndPublishInvRequestBody(configVnpt.ADMINACCOUNT, configVnpt.ADMINPASS, xmlInvData, configVnpt.SERVICEACCOUNT, configVnpt.SERVICEPASS
                    , (!string.IsNullOrEmpty(configVnpt.PATTERN) && !string.IsNullOrEmpty(configVnpt.SERIAL)) ? configVnpt.PATTERN : "", (!string.IsNullOrEmpty(configVnpt.PATTERN) && !string.IsNullOrEmpty(configVnpt.SERIAL)) ? configVnpt.SERIAL : "", 0);
                var importAndPublishInvRequest = new ImportAndPublishInvRequest(importAndPublishInvRequestBody);

                var importAndPublishInvResponse = await _publishServiceSoap.ImportAndPublishInvAsync(importAndPublishInvRequest);
                if (i >= 3) {
                    if (importAndPublishInvResponse.Body.ImportAndPublishInvResult.IndexOf("OK:") == -1)
                    {
                        _logger.LogDebug("PhatHanhBienLai", $"PhatHanhBienLai_{xmlInvData}");
                    }
                    return importAndPublishInvResponse.Body.ImportAndPublishInvResult; }
                if (importAndPublishInvResponse.Body.ImportAndPublishInvResult.IndexOf("OK:") != -1) 
                    return importAndPublishInvResponse.Body.ImportAndPublishInvResult;
            }
            catch (Exception ex)
            {
                _logger.LogDebug("PhatHanhBienLai", $"PhatHanhBienLai_{yeuCauThanhToan.LoaiPhi}_{yeuCauThanhToan.Ma}: {ex.Message}");
             if(i>=3) throw ex;
            }

        }
        
        return string.Empty;
    }
    public async Task<string> SuaBienLaiDienTu(InitBienLaiDienTuVnptRequest yeuCauThanhToan)
    {
        var loaiPhiText = yeuCauThanhToan.LoaiPhiText.Length > 500 ? yeuCauThanhToan.LoaiPhiText.Substring(0, 450) + "..." : yeuCauThanhToan.LoaiPhiText;
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        ServicePointManager.SecurityProtocol = (SecurityProtocolType)768 | (SecurityProtocolType)3072;
        string xmlInvData = @"<AdjustInv>
                        
                          <key>" + yeuCauThanhToan.Ma + @"</key>
                         	 <Extra1>"" + yeuCauThanhToan.MaHoSo + @""</Extra1>                  
                            <CusCode>" + yeuCauThanhToan.MaHoSo + @"</CusCode>
                           <ArisingDate>" + currentTime.ToString("dd/MM/yyyy") + @"</ArisingDate>
                           <CusName>" + yeuCauThanhToan.ChuHoSo.Replace("&", "và") + @"</CusName>";
        if (!string.IsNullOrEmpty(yeuCauThanhToan.MaSoThueBienLai)) xmlInvData += $"<CusTaxCode>{yeuCauThanhToan.MaSoThueBienLai}</CusTaxCode>";
        xmlInvData += @"<Total>" + yeuCauThanhToan.ThanhTien + @"</Total>
                           <Amount>" + yeuCauThanhToan.ThanhTien + @"</Amount>
                           <AmountInWords>" + _currencyExtension.CurrencyToWords(yeuCauThanhToan.ThanhTien) + @"</AmountInWords>
                           <VATAmount>0</VATAmount>
                           <VATRate>0</VATRate>
                            <CusTaxCode>" + yeuCauThanhToan.MaSoThueBienLai + @"</CusTaxCode>
                            <ComTaxCode>" + yeuCauThanhToan.MaSoThueBienLai + @"</ComTaxCode>
                           <CusAddress>" + yeuCauThanhToan.DiaChiChuHoSo.Replace("&", "và") + @"</CusAddress>
                            <Email>" + yeuCauThanhToan.EmailNguoiNopTienBienLai + @"</Email>
                           <PaymentMethod>" + yeuCauThanhToan.HinhThucThanhToan + @"</PaymentMethod>  
                                    <PaymentStatus>1</PaymentStatus>                                        
                           <Extra>" + loaiPhiText + @"</Extra>
                           <Products>
                            <Product>
                                                          
                                                    	<Extra1>" + loaiPhiText + @"</Extra1>";
        if (yeuCauThanhToan.LoaiPhi == "phi")
            xmlInvData += "<Extra2>0</Extra2>";
        else xmlInvData += "<Extra2>1</Extra2>";
        xmlInvData += "<Code>" + yeuCauThanhToan.MaTTHC + @$"</Code>
                             <ProdName>{loaiPhiText}</ProdName>
                             <ProdUnit>Lần</ProdUnit>
                             <ProdQuantity>1</ProdQuantity>
                             <ProdPrice>" + yeuCauThanhToan.ThanhTien + @"</ProdPrice>
                            <VATRate>0</VATRate>
                            <VATAmount>0</VATAmount>
                            
                             <Total>" + yeuCauThanhToan.ThanhTien + @"</Total>
                             <Amount>" + yeuCauThanhToan.ThanhTien + @"</Amount>					                                
                            </Product>
                           </Products>
                         <Type>4</Type>
                         
                        </AdjustInv>";
        if (string.IsNullOrEmpty(yeuCauThanhToan.CauHinhBienLaiDienTu)) throw new Exception("BienLaiVNPTConfig not found");
        var configVnpt = JsonConvert.DeserializeObject<ConfigBienLaiVNPT>(yeuCauThanhToan.CauHinhBienLaiDienTu);
        _businessServiceSoap = new BusinessServiceSoapClient(BusinessServiceSoapClient.EndpointConfiguration.BusinessServiceSoap, configVnpt.BUSINESSSERVICE);
        AdjustInvoiceRequestBody adRequestBody = new AdjustInvoiceRequestBody(configVnpt.ADMINACCOUNT, configVnpt.ADMINPASS, xmlInvData, configVnpt.SERVICEACCOUNT, configVnpt.SERVICEPASS, yeuCauThanhToan.Ma, null, null);
        var importAndPublishInvRequest = new AdjustInvoiceRequest(adRequestBody);
        var importAndPublishInvResponse = await _businessServiceSoap.AdjustInvoiceAsync(importAndPublishInvRequest);
        return importAndPublishInvResponse.Body.AdjustInvoiceResult;
    }
    public async Task<string> GetBienLaiDienTu(GetBienLaiDienTuVnptRequest request)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        if (string.IsNullOrEmpty(request.CauHinhBienLaiThanhToan)) throw new Exception("BienLaiVNPTConfig not found");
        var configVnpt = JsonConvert.DeserializeObject<ConfigBienLaiVNPT>(request.CauHinhBienLaiThanhToan);
        _portalServiceSoap = new PortalServiceSoapClient(PortalServiceSoapClient.EndpointConfiguration.PortalServiceSoap, configVnpt.PORTALSERVICE);
        getInvViewFkeyRequestBody getInvViewFkeyRequestBody = new getInvViewFkeyRequestBody(request.Ma, configVnpt.SERVICEACCOUNT, configVnpt.SERVICEPASS);
        getInvViewFkeyRequest getInvViewFkeyRequest = new getInvViewFkeyRequest(getInvViewFkeyRequestBody);
        var getInvViewFkeyResponse = await _portalServiceSoap.getInvViewFkeyAsync(getInvViewFkeyRequest);
        return getInvViewFkeyResponse.Body.getInvViewFkeyResult;
    }
    public async Task<string> HuyBienLaiDienTu(HuyBienLaiDienTuVNPTRequest request)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        if (string.IsNullOrEmpty(request.CauHinhBienLaiThanhToan)) throw new Exception("BienLaiVNPTConfig not found");
        var configVnpt = JsonConvert.DeserializeObject<ConfigBienLaiVNPT>(request.CauHinhBienLaiThanhToan);
        _businessServiceSoap = new BusinessServiceSoapClient(BusinessServiceSoapClient.EndpointConfiguration.BusinessServiceSoap, configVnpt.BUSINESSSERVICE);
        UnConfirmPaymentFkeyRequestBody unConfirmPaymentFkeyRequestBody = new UnConfirmPaymentFkeyRequestBody(request.Ma, configVnpt.SERVICEACCOUNT, configVnpt.SERVICEPASS);
        UnConfirmPaymentFkeyRequest unConfirmPaymentRequest = new UnConfirmPaymentFkeyRequest(unConfirmPaymentFkeyRequestBody);
        var unConfirm = await _businessServiceSoap.UnConfirmPaymentFkeyAsync(unConfirmPaymentRequest);
        if (unConfirm.Body.UnConfirmPaymentFkeyResult.IndexOf("OK:") != -1)
        {
            cancelInvRequestBody getInvViewFkeyRequestBody = new cancelInvRequestBody(configVnpt.ADMINACCOUNT, configVnpt.ADMINPASS, request.Ma, configVnpt.SERVICEACCOUNT, configVnpt.SERVICEPASS);
            cancelInvRequest getInvViewFkeyRequest = new cancelInvRequest(getInvViewFkeyRequestBody);
            var getInvViewFkeyResponse = await _businessServiceSoap.cancelInvAsync(getInvViewFkeyRequest);
            return getInvViewFkeyResponse.Body.cancelInvResult;
        }
        return " UnConfirmPaymentFkey_" + unConfirm.Body.UnConfirmPaymentFkeyResult + "_" + request.Ma;
    }

}
