using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.VnPost;
public class VNPostSettings
{
    public string urlVNPostAPI { get; set; }
    public string urlVNPostAPIWithoutItemCode { get; set; }
    public string urlVNPostGetUserAPI { get; set; }
    public string urlVNPostGetToken { get; set; }
    public string access_Token { get; set; }
    public string access_RefreshToken { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public int? ReceiverProvince { get; set; }
    public int? maximumRequest { get; set; }
}
