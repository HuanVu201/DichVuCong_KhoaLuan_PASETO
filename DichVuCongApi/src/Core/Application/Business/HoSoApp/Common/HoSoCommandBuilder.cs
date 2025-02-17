using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Common;
public static class HoSoCommandBuilder
{

    public static string GetQuaTrinhXuLyHoSoQLVB()
    {
        string updateValues = string.Empty;
        updateValues += "MaHoSo = @MaHoSo,";
        updateValues += "NodeQuyTrinh = @NodeQuyTrinh,";
        updateValues += "ThoiHanBuocXuLy = @ThoiHanBuocXuLy,";
        updateValues += "LoaiThoiHanBuocXuLy = @LoaiThoiHanBuocXuLy,";
        updateValues += "ThaoTac = @ThaoTac,";
        updateValues += "TrangThai = @TrangThai,";
        updateValues += "NgayHetHanBuocXuLy = @NgayHetHanBuocXuLy,";
        updateValues += "NguoiGui = @NguoiGui,";
        updateValues += "TenNguoiGui = @TenNguoiGui,";
        updateValues += "NguoiNhan = @NguoiNhan,";
        updateValues += "TenNguoiNhan = @TenNguoiNhan,";
        updateValues += "ThoiGian = @ThoiGian,";
        updateValues += "NoiDung = @NoiDung,";
        updateValues += "DinhKem = @DinhKem,";
        if (updateValues.EndsWith(","))
        {
            updateValues = updateValues.Substring(0, updateValues.LastIndexOf(","));
        }
        string insertSQl = $@"INSERT INTO Business.QuaTrinhXuLyHoSos (Id, MaHoSo,NodeQuyTrinh,ThoiHanBuocXuLy,LoaiThoiHanBuocXuLy,
            ThaoTac,TrangThai,NgayHetHanBuocXuLy,NguoiGui,TenNguoiGui,NguoiNhan,TenNguoiNhan,ThoiGian,NoiDung,DinhKem) VALUES
            (NEWID(), @MaHoSo,@NodeQuyTrinh,@ThoiHanBuocXuLy,@LoaiThoiHanBuocXuLy,
            @ThaoTac,@TrangThai,@NgayHetHanBuocXuLy,@NguoiGui,@TenNguoiGui,@NguoiNhan,@TenNguoiNhan,@ThoiGian,@NoiDung,@DinhKem)";
        return insertSQl;
    }
    public static string GetChuyenBuocXuLyHoSoQLVB(string? tenBuocHienTai, string? buocHienTai
        , string? nguoiDangXuLy, string? trichYeuKetQua, string? dinhKemKetQua, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, string? trangThaiHoSoId, DateTime? ngayTiepNhanCaNhan,
        DateTime? ngayHenTraCaNhan, DateTime? ngayYeuCauBoSung, DateTime? ngayHenTra, DateTime? ngayTraKetQua, string? trangThaiTraKq, string? donViTraKq, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? nguoiDaXuLy,
        string? loaiVanBanKetQua, string? soKyHieuKetQua, string? nguoiKyKetQua, string? coQuanBanHanhKetQua, DateTime? ngayBanHanhKetQua, DateTime? ngayKyKetQua, DateTime? ngayKetThucXuLy)
    {
        string updateValues = $" ChuyenNoiBo = 0, ChoBanHanh = 0, BuocXuLyTiep = '', NguoiXuLyTiep = '', TrangThaiDongBoDVC = '{HoSo_TrangThaiDongBoDVC.ChuaDongBo}',";

        if (!string.IsNullOrEmpty(loaiVanBanKetQua))
            updateValues += "LoaiVanBanKetQua = @LoaiVanBanKetQua,";
        if (!string.IsNullOrEmpty(soKyHieuKetQua))
            updateValues += "SoKyHieuKetQua = @SoKyHieuKetQua,";
        if (!string.IsNullOrEmpty(nguoiKyKetQua))
            updateValues += "NguoiKyKetQua = @NguoiKyKetQua,";
        if (coQuanBanHanhKetQua != null)
            updateValues += "CoQuanBanHanhKetQua = @CoQuanBanHanhKetQua,";
        if (ngayBanHanhKetQua.HasValue && ngayBanHanhKetQua != DateTime.MinValue)
            updateValues += "NgayBanHanhKetQua = @NgayBanHanhKetQua,";
        if (ngayKetThucXuLy.HasValue && ngayKetThucXuLy != DateTime.MinValue)
            updateValues += "NgayKetThucXuLy = @NgayKetThucXuLy,";
        if (ngayKyKetQua.HasValue && ngayKyKetQua != DateTime.MinValue)
            updateValues += "NgayKyKetQua = @NgayKyKetQua,";

        if (!string.IsNullOrEmpty(tenBuocHienTai))
            updateValues += "TenBuocHienTai = @TenBuocHienTai,";
        if (!string.IsNullOrEmpty(buocHienTai))
            updateValues += "BuocHienTai = @BuocHienTai,";
        //if (!string.IsNullOrEmpty(nguoiXuLyTiep))
        //    updateValues += "NguoiXuLyTiep = @NguoiXuLyTiep,";
        //if (!string.IsNullOrEmpty(buocXuLyTiep))
        //    updateValues += "BuocXuLyTiep = @BuocXuLyTiep,";
        if (!string.IsNullOrEmpty(trichYeuKetQua))
            updateValues += "TrichYeuKetQua = @TrichYeuKetQua,";
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            updateValues += "NguoiXuLyTruoc = @NguoiXuLyTruoc,";
        if (!string.IsNullOrEmpty(buocXuLyTruoc))
            updateValues += "BuocXuLyTruoc = @BuocXuLyTruoc,";
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            updateValues += "TrangThaiHoSoId = @TrangThaiHoSoId,";
        if (!string.IsNullOrEmpty(yKienNguoiChuyenXuLy))
            updateValues += "YKienNguoiChuyenXuLy = @YKienNguoiChuyenXuLy,";
        if (!string.IsNullOrEmpty(dinhKemKetQua))
        {
            updateValues += "DinhKemKetQua = @DinhKemKetQua,";
        }
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy))
            updateValues += "DinhKemYKienNguoiChuyenXuLy = @DinhKemYKienNguoiChuyenXuLy,";
        if (ngayTiepNhanCaNhan.HasValue && ngayTiepNhanCaNhan != DateTime.MinValue)
            updateValues += "NgayTiepNhanCaNhan = @NgayTiepNhanCaNhan,";
        if (ngayHenTraCaNhan.HasValue && ngayHenTraCaNhan != DateTime.MinValue)
            updateValues += "NgayHenTraCaNhan = @NgayHenTraCaNhan,";
        if (ngayYeuCauBoSung.HasValue && ngayYeuCauBoSung != DateTime.MinValue)
            updateValues += "NgayYeuCauBoSung = @NgayYeuCauBoSung,";
        if (ngayHenTra.HasValue && ngayHenTra != DateTime.MinValue)
            updateValues += "NgayHenTra = @NgayHenTra,";
        if (ngayTraKetQua.HasValue && ngayTraKetQua != DateTime.MinValue)
            updateValues += "NgayTra = @NgayTra,";
        if (!string.IsNullOrEmpty(nguoiDaXuLy)) // phải cho cái này trước NguoiDangXuLy ở dưới
        {
            updateValues += "NguoiDaXuLy =  @NguoiDaXuLy,";
        }
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            updateValues += "NguoiDangXuLy = @NguoiDangXuLy,";
        if (trangThaiTraKq != null)
            updateValues += "TrangThaiTraKq = @TrangThaiTraKq,";
        if (!string.IsNullOrEmpty(donViTraKq))
            updateValues += "DonViTraKq = @DonViTraKq,";
        if (updateValues.EndsWith(","))
        {
            updateValues = updateValues.Substring(0, updateValues.LastIndexOf(","));
        }
        string updateQuery = $"UPDATE Business.HoSos SET {updateValues} WHERE Id = @Id";
        return updateQuery;
    }
    public static string GetUpdateKetQua04(string? trichYeuKetQua, string? dinhKemKetQua)
    {
        string updateValues = " ChoBanHanh = 1, ";
        if (!string.IsNullOrEmpty(trichYeuKetQua))
            updateValues += "TrichYeuKetQua = @TrichYeuKetQua,";
        if (!string.IsNullOrEmpty(dinhKemKetQua))
        {
            updateValues += "DinhKemKetQua = @DinhKemKetQua,";
        }
        if (updateValues.EndsWith(","))
        {
            updateValues = updateValues.Substring(0, updateValues.LastIndexOf(","));
        }
        string updateQuery = $"UPDATE Business.HoSos SET {updateValues} WHERE Id = @Id";
        return updateQuery;
    }
    public static string GetTraLaiHoSoSql(string? nguoiDangXuLy, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? trangThaiHoSoId, string? buocHienTai, string? tenBuocHienTai, DateTime? ngayTiepNhanCaNhan)
    {
        string updateValues = $" ChoBanHanh = 0, YKienNguoiChuyenXuLy = N'Trả lại', TrangThaiDongBoDVC = '{HoSo_TrangThaiDongBoDVC.ChuaDongBo}', ";
        //NgayHenTraCaNhan = null;   
        if (buocXuLyTruoc != null) // nhận ""
            updateValues += "BuocXuLyTruoc = @BuocXuLyTruoc,";
        if (ngayTiepNhanCaNhan.HasValue && ngayTiepNhanCaNhan != default)
            updateValues += "NgayTiepNhanCaNhan = @NgayTiepNhanCaNhan,";
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            updateValues += "NguoiDangXuLy = @NguoiDangXuLy,";
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            updateValues += "NguoiXuLyTruoc = @NguoiXuLyTruoc,";
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            updateValues += "TrangThaiHoSoId = @TrangThaiHoSoId,";
        else
            updateValues += "TrangThaiHoSoId = '2',";
        if (!string.IsNullOrEmpty(buocHienTai))
            updateValues += "BuocHienTai = @BuocHienTai,";
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            updateValues += "TenBuocHienTai = @TenBuocHienTai,";
        if (updateValues.EndsWith(","))
        {
            updateValues = updateValues.Substring(0, updateValues.LastIndexOf(","));
        }
        string updateQuery = $"UPDATE Business.HoSos SET {updateValues} WHERE Id = @Id";
        return updateQuery;
    }

    public static string GetYeuCauMotCuaBoSungSql(string? trangThaiTruoc, string? trangThaiHoSoId, DateTime? ngayYeuCauBoSung, string? lyDoBoSung, string? dinhKemBoSung,
        string? thanhPhanBoSung, string? nguoiXuLyTruoc, string? trangThaiBoSung, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy,
        string? nguoiDangXuLy, string? nguoiDaXuLy, int? thoiHanBoSung, string? noiDungBoSung)
    {
        string updateValues = $" ChoBanHanh = 0, TrangThaiDongBoDVC = '{HoSo_TrangThaiDongBoDVC.ChuaDongBo}', ";
        if (!string.IsNullOrEmpty(trangThaiTruoc))
            updateValues += "TrangThaiTruoc = @TrangThaiTruoc,";
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            updateValues += "TrangThaiHoSoId = @TrangThaiHoSoId,";
        if (!string.IsNullOrEmpty(lyDoBoSung))
            updateValues += "LyDoBoSung = @LyDoBoSung,";
        if (!string.IsNullOrEmpty(dinhKemBoSung))
            updateValues += "DinhKemBoSung = @DinhKemBoSung,";
        if (!string.IsNullOrEmpty(thanhPhanBoSung))
            updateValues += "ThanhPhanBoSung = @ThanhPhanBoSung,";
        if (ngayYeuCauBoSung.HasValue && ngayYeuCauBoSung != default)
            updateValues += "NgayYeuCauBoSung = @NgayYeuCauBoSung,";
        if (noiDungBoSung != null)
            updateValues += "NoiDungBoSung = @NoiDungBoSung,";
        if (thoiHanBoSung != null)
            updateValues += "ThoiHanBoSung = @ThoiHanBoSung,";
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            updateValues += "NguoiXuLyTruoc = @NguoiXuLyTruoc,";
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
        {
            updateValues += "NguoiDaXuLy = @NguoiDaXuLy,";
        }
        if (!string.IsNullOrEmpty(trangThaiBoSung))
            updateValues += "TrangThaiBoSung = @TrangThaiBoSung,";
        if (!string.IsNullOrEmpty(yKienNguoiChuyenXuLy))
            updateValues += "YKienNguoiChuyenXuLy = @YKienNguoiChuyenXuLy,";
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy))
            updateValues += "DinhKemYKienNguoiChuyenXuLy = @DinhKemYKienNguoiChuyenXuLy,";
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            updateValues += "NguoiDangXuLy = @NguoiDangXuLy,";
        if (updateValues.EndsWith(","))
        {
            updateValues = updateValues.Substring(0, updateValues.LastIndexOf(","));
        }
        string updateQuery = $"UPDATE Business.HoSos SET {updateValues} WHERE Id = @Id";
        return updateQuery;
    }

    public static string GetAddHoSoBoSungSql()
    {
        string updateValues = string.Empty;
        updateValues += "MaHoSo = @MaHoSo,";
        updateValues += "NoiDungBoSung = @NoiDungBoSung,";
        updateValues += "DinhKemNoiDungBoSung = @DinhKemNoiDungBoSung,";
        updateValues += "NgayBoSung = @NgayBoSung,";
        updateValues += "NguoiYeuCauBoSung = @NguoiYeuCauBoSung,";
        updateValues += "NgayHenTraTruoc = @NgayHenTraTruoc,";
        updateValues += "TrangThaiBoSung = @TrangThaiBoSung,";
        updateValues += "ThanhPhanBoSung = @ThanhPhanBoSung,";
        if (updateValues.EndsWith(","))
        {
            updateValues = updateValues.Substring(0, updateValues.LastIndexOf(","));
        }
        string insertSQl = $@"INSERT INTO Business.QuaTrinhXuLyHoSos (Id, MaHoSo, NoiDungBoSung, DinhKemNoiDungBoSung, NgayBoSung, NguoiYeuCauBoSung, NgayHenTraTruoc, TrangThaiBoSung, ThanhPhanBoSung) VALUES
            (NEWID(), @MaHoSo, @NoiDungBoSung, @DinhKemNoiDungBoSung, @NgayBoSung, @NguoiYeuCauBoSung, @NgayHenTraTruoc, @TrangThaiBoSung, @ThanhPhanBoSung )";
        return insertSQl;
    }
}
