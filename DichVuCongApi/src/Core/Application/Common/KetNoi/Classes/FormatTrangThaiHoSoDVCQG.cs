namespace TD.DichVuCongApi.Application.Common.KetNoi.Classes;
public static class FormatTrangThaiHoSoDVCQG
{
    public static string GetTrangThaiHoSo(string trangThaiHoSoDVCQG)
    {
        var res = trangThaiHoSoDVCQG switch
        {
            "processing" => "4",
            "releasing" => "9",
            "done" => "10",
            "denied" => "3",
            "unresolved" => "8",
            "cancelled" => "7",
            "waiting" => "5",
            "interoperating" => "0",
            "new" => "2",
            "paying" => "6",
            "posting" => "0", // chưa biết là gì
            "receiving" => "1",
            _ => throw new Exception($"Mã trạng thái hồ sơ không hợp lệ")
        };
        return res;
    }
}
