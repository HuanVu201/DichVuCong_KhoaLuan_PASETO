using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.BienLaiVNPT;
public interface IBienLaiVNPTService : ITransientService
{
    Task<string> PhatHanhBienLai(InitBienLaiDienTuVnptRequest yeuCauThanhToan);
    Task<string> GetBienLaiDienTu(GetBienLaiDienTuVnptRequest request);
    Task<string> HuyBienLaiDienTu(HuyBienLaiDienTuVNPTRequest request);
    Task<string> SuaBienLaiDienTu(InitBienLaiDienTuVnptRequest request);
}
