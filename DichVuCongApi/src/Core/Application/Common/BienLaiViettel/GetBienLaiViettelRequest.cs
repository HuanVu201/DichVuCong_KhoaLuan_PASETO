using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.BienLaiViettel;
public class GetBienLaiViettelRequest
{
    public GetBienLaiViettelRequest(string taxCode, string iNo, string patternCode) {
        supplierTaxCode = taxCode;
        invoiceNo = iNo;
        templateCode = patternCode;
    }

    public string? supplierTaxCode { get; set; }
    public string? invoiceNo { get; set; }
    public string? templateCode { get; set; }
}
