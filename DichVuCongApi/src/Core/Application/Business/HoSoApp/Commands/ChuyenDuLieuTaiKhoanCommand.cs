using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenDuLieuTaiKhoanCommand : ICommand<int>
{
    public string idUserCurr { get; set; }
    public string idUserNew { get; set; }
    //public string namDuLieu { get; set; }
    public List<string> MaHoSo {  get; set; }   

}
