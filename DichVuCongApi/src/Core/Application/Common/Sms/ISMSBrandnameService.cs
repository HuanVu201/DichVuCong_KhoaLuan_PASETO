using TD.DichVuCongApi.Application.Common.ServiceLogger;

namespace TD.DichVuCongApi.Application.Common.Sms;
public interface ISMSBrandnameService : ITransientService, IEnableServiceLogger
{
    /// <summary>
    /// Gửi tin nhắn Vina.
    /// </summary>
    /// <param name="sdt">Số điện thoại</param>
    /// <param name="noiDungthamSo"></param>
    /// <param name="gioGui"></param>
    /// <param name="lstCH"></param>
    /// <param name="idMauTin">Nếu không truyền vào mặc định lấy templateID theo cấu hình.</param>
    /// <returns>"0" - Thành công.</returns>
    Task<string> SendSMSItemVina(string sdt, string noiDungthamSo, string gioGui, OutPutCauHinhSMSVina lstCH, string maHoSo);

    /// <summary>
    /// Gửi tin nhắn Viettel.
    /// </summary>
    /// <param name="soDTGui">Số điện thoại</param>
    /// <param name="noiDung"></param>
    /// <param name="lstCH"></param>
    /// <param name="loaiNoiDung"> "0": không dấu | "1": có dấu.</param>
    /// <returns>"1" - Thành công.</returns>
    Task<string> SendSMSItemViettel(string soDTGui, string noiDung, OutPutCauHinhSMSViettel lstCH, string maHoSo, string loaiNoiDung = "");
    Task<string?> SendSMS(string sdt, string noiDungthamSo, string gioGui, string donVi, string maHoSo, string loaiNoiDung = "");
}
