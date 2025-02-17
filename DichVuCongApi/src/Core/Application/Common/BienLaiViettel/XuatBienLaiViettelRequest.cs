namespace TD.DichVuCongApi.Application.Common.BienLaiViettel;
public class XuatBienLaiViettelRequest
{
    public GeneralInvoiceInfo generalInvoiceInfo { get; set; } = new GeneralInvoiceInfo();
    public BuyerInfo buyerInfo { get; set; }
    public SellerInfo sellerInfo { get; set; } = new SellerInfo();
    public List<Payments> payments { get; set; } = new List<Payments>();
    public List<ItemInfo> itemInfo { get; set; } = new List<ItemInfo>();
    public List<TaxBreakdowns> taxBreakdowns { get; set; }
    public SummarizeInfo summarizeInfo { get; set; }
}

public class GeneralInvoiceInfo
{
    public GeneralInvoiceInfo()
    {
        currencyCode = "VND";
        adjustmentType = "1";
        paymentStatus = true;
        cusGetInvoiceRight = true;
        exchangeRate = 1;
        adjustAmount20 = 0;
        validation = 0;
    }

    public GeneralInvoiceInfo(string serial, string pattern, double invoiceIssuedDate)
    {
        invoiceSeries = serial;
        templateCode = pattern;
        currencyCode = "VND";
        adjustmentType = "1";
        paymentStatus = true;
        cusGetInvoiceRight = true;
        exchangeRate = 1;
        adjustAmount20 = 0;
        validation = 0;
        this.invoiceIssuedDate = invoiceIssuedDate;
    }

    public string invoiceType { get; set; } = string.Empty;
    public string templateCode { get; set; } = string.Empty;
    public string invoiceSeries { get; set; } = string.Empty;
    public double invoiceIssuedDate { get; set; }
    public string currencyCode { get; set; } = "VND";
    public string adjustmentType { get; set; } = "1";
    public string adjustedNote { get; set; }
    public string adjustmentInvoiceType { get; set; }
    public string originalInvoiceId { get; set; }
    public DateTime? originalInvoiceIssueDate { get; set; }
    public string additionalReferenceDesc { get; set; }
    public string additionalReferenceDate { get; set; }
    public bool? paymentStatus { get; set; } = true;
    public bool? cusGetInvoiceRight { get; set; } = true;
    public decimal exchangeRate { get; set; } = 1;
    public string transactionUuid { get; set; }
    public string certificateSerial { get; set; }
    public string originalInvoiceType { get; set; }
    public string originalTemplateCode { get; set; }
    public string reservationCode { get; set; }
    public int adjustAmount20 { get; set; } = 0;
    public string invoiceNote { get; set; }
    public int validation { get; set; } = 0;
}

public class BuyerInfo
{
    public BuyerInfo(string tenNguoiNopTienBienLai, string maSoThue, string diaChiNguoiNopTienBienLai, string soDienThoai, string cccd)
    {
        buyerName = !string.IsNullOrEmpty(tenNguoiNopTienBienLai) && tenNguoiNopTienBienLai.Length <= 800 ? tenNguoiNopTienBienLai : tenNguoiNopTienBienLai.Substring(0, 799);
        buyerLegalName = !string.IsNullOrEmpty(tenNguoiNopTienBienLai) && tenNguoiNopTienBienLai.Length <= 800 ? tenNguoiNopTienBienLai : tenNguoiNopTienBienLai.Substring(0, 799);
        buyerTaxCode = !string.IsNullOrEmpty(maSoThue) && maSoThue.Length <= 20 ? maSoThue : null;
        buyerAddressLine = !string.IsNullOrEmpty(diaChiNguoiNopTienBienLai) && diaChiNguoiNopTienBienLai.Length <= 800 ? diaChiNguoiNopTienBienLai : diaChiNguoiNopTienBienLai.Substring(0, 799);
        buyerPhoneNumber = !string.IsNullOrEmpty(soDienThoai) && soDienThoai.Length <= 15 ? soDienThoai : soDienThoai.Substring(0, 15);
        buyerIdType = "1";
        buyerIdNo = !string.IsNullOrEmpty(cccd) && cccd.Length <= 20 ? cccd : cccd.Substring(0, 20);
    }

    public string buyerName { get; set; }
    public string buyerCode { get; set; }
    public string buyerLegalName { get; set; }
    public string buyerTaxCode { get; set; }
    public string buyerAddressLine { get; set; }
    public string buyerPhoneNumber { get; set; }
    public string buyerFaxNumber { get; set; }
    public string buyerEmail { get; set; }
    public string buyerBankName { get; set; }
    public string buyerBankAccount { get; set; }
    public string buyerDistrictName { get; set; }
    public string buyerCityName { get; set; }
    public string buyerCountryCode { get; set; }
    public string buyerIdType { get; set; } = "1";
    public string buyerIdNo { get; set; }
    public string buyerBirthDay { get; set; }
    public string buyerNotGetInvoice { get; set; }
}
public class SellerInfo
{
    public string sellerLegalName { get; set; }
    public string sellerTaxCode { get; set; }
    public string sellerAddressLine { get; set; }
    public string sellerPhoneNumber { get; set; }
    public string sellerFaxNumber { get; set; }
    public string sellerEmail { get; set; }
    public string sellerBankName { get; set; }
    public string sellerBankAccount { get; set; }
    public string sellerDistrictName { get; set; }
    public string sellerCityName { get; set; }
    public string sellerCountryCode { get; set; }
    public string sellerWebsite { get; set; }
    public string merchantCode { get; set; }
    public string merchantName { get; set; }
    public string merchantCity { get; set; }
}
public class Payments
{
    public Payments()
    {
        paymentMethod = "6";
        paymentMethodName = "Tiền mặt";
    }

    public Payments(string hinhThucThanhToan)
    {
        if (hinhThucThanhToan == "Tiền mặt" | string.IsNullOrEmpty(hinhThucThanhToan))
        {
            paymentMethod = "6";
            paymentMethodName = "Tiền mặt";
        }
        else
        {
            paymentMethod = "7";
            paymentMethodName = "Chuyển khoản";
        }
    }

    public string paymentMethod { get; set; } = "6";
    public string paymentMethodName { get; set; } = "Tiền mặt";
}

public class ItemInfo
{

    public ItemInfo(string tenPhiLePhi, int soTien)
    {
        unitName = !string.IsNullOrEmpty(tenPhiLePhi) && tenPhiLePhi.Length <= 300 ? tenPhiLePhi : tenPhiLePhi.Substring(0, 300);

        itemName = !string.IsNullOrEmpty(tenPhiLePhi) && tenPhiLePhi.Length <= 500 ? tenPhiLePhi : tenPhiLePhi.Substring(0, 500);
        taxPercentage = -2;
        itemTotalAmountWithoutTax = soTien;
        adjustRatio = 1;
        unitPrice = soTien;
        itemTotalAmountAfterDiscount = soTien;
        itemTotalAmountWithTax = soTien;
    }

    public int lineNumber { get; set; }
    public int selection { get; set; } = 1;
    public string itemCode { get; set; }
    public string itemName { get; set; }
    public string unitCode { get; set; } = "P";
    public string unitName { get; set; }
    public decimal? unitPrice { get; set; }
    public decimal? quantity { get; set; } = 1;
    public decimal? itemTotalAmountWithoutTax { get; set; }
    public decimal? taxPercentage { get; set; }
    public decimal? taxAmount { get; set; }
    public bool? isIncreaseItem { get; set; }
    public string itemNote { get; set; }
    public string batchNo { get; set; }
    public string expDate { get; set; }
    public decimal? discount { get; set; }
    public decimal? discount2 { get; set; }
    public decimal? itemDiscount { get; set; }
    public decimal? itemTotalAmountAfterDiscount { get; set; }
    public decimal? itemTotalAmountWithTax { get; set; }
    public int adjustRatio { get; set; } = 1;
}

public class TaxBreakdowns
{
    public TaxBreakdowns(int soTien)
    {
        taxableAmount = soTien;
        taxPercentage = -2;
        taxAmount = 0;

    }

    public decimal? taxPercentage { get; set; }
    public decimal? taxableAmount { get; set; }
    public decimal? taxAmount { get; set; }
    public bool? taxableAmountPos { get; set; }
    public bool? taxAmountPos { get; set; }
    public string taxExemptionReason { get; set; }
}

public class SummarizeInfo
{
    public SummarizeInfo(int soTien)
    {
        sumOfTotalLineAmountWithoutTax = soTien;
        totalAmountWithoutTax = soTien;
        totalTaxAmount = 0;
        totalAmountWithTax = soTien;
        totalAmountWithTaxFrn = soTien;

    }
    public decimal? sumOfTotalLineAmountWithoutTax { get; set; }
    public decimal? totalAmountWithoutTax { get; set; }
    public decimal? totalTaxAmount { get; set; }
    public decimal? totalAmountWithTax { get; set; }
    public decimal? totalAmountWithTaxFrn { get; set; }
    public string totalAmountWithTaxInWords { get; set; }
    public bool? isTotalAmountPos { get; set; }
    public bool? isTotalTaxAmountPos { get; set; }
    public bool? isTotalAmtWithoutTaxPos { get; set; }
    public decimal? discountAmount { get; set; }
    public decimal? settlementDiscountAmount { get; set; }
    public bool? isDiscountAmtPos { get; set; }
}

public class MeterReading
{
    public string meterName { get; set; }
    public string previousIndex { get; set; }
    public string currentIndex { get; set; }
    public string factor { get; set; }
    public string amount { get; set; }
}

public class Metadata
{
    public string keyTag { get; set; }
    public string valueType { get; set; }
    public string stringValue { get; set; }
    public DateTime? dateValue { get; set; }
    public int numberValue { get; set; }
    public string keyLabel { get; set; }
    public bool? isRequired { get; set; }
    public bool? isSeller { get; set; }
    public string economicContractNo { get; set; }
    public string transformer { get; set; }
    public string vehicle { get; set; }
    public string contractNo { get; set; }
    public string HVTNXHang { get; set; }
    public string commandDate { get; set; }
    public string KPTQuan { get; set; }

}

public class KetQuaPhatHanhBienLai
{
    public string errorCode { get; set; }
    public string description { get; set; }
    public string expiredDate { get; set; }
    public ResultInvoice result { get; set; }
}

public class ResultInvoice
{
    public string supplierTaxCode { get; set; }
    public string invoiceNo { get; set; }
    public string transactionID { get; set; }
    public string reservationCode { get; set; }
    public string codeOfTax { get; set; }
}