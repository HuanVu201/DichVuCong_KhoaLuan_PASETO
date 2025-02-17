using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.BienLaiViettel;
public class CancelBienLaiViettelRequest
{
    public CancelBienLaiViettelRequest(string taxCode, string iNo, string patternCode, string? strIssueDate, string? additionalReferenceDesc, string? additionalReferenceDate)
    {
        supplierTaxCode = taxCode;
        invoiceNo = iNo;
        templateCode = patternCode;
        this.strIssueDate = strIssueDate;
        this.additionalReferenceDesc = additionalReferenceDesc;
        this.additionalReferenceDate = additionalReferenceDate;
    }

    public string? supplierTaxCode { get; set; }
    public string? invoiceNo { get; set; }
    public string? templateCode { get; set; }
    public string? strIssueDate { get; set; }
    public string? additionalReferenceDesc { get; set; }
    public string? additionalReferenceDate { get; set; }
}
