import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models";
import { KetQuaThuTucChungThuc } from "../../themMoiHoSoChungThuc/ThanhPhanHoSo";
const getTongTienTheoSoTrang = (soTrang: number) =>
{
    let tongTien = 0;
    if (soTrang <= 2)
    {
        tongTien = soTrang * import.meta.env.VITE_CHUNGTHUC_SOTIEN2TRANGDAU;
    }
    else if (soTrang > 2)
    {
        const soTrangConLai = soTrang - 2;
        const tongSoTienSoTrangConLai = soTrangConLai * import.meta.env.VITE_CHUNGTHUC_SOTIENTRANG2TRODI;
        const tongSoTien2TrangDau = 2 * import.meta.env.VITE_CHUNGTHUC_SOTIEN2TRANGDAU;
        tongTien = tongSoTienSoTrangConLai + tongSoTien2TrangDau;
    }
    return tongTien;
}
export const tinhTongTien = (thanhPhanHoSos: KetQuaThuTucChungThuc[]) => {
    let total = 0;
    if(!thanhPhanHoSos){
        return 0;
    }
    thanhPhanHoSos.forEach((thanhPhanHoSo, index) => {
        let tongTien = 0;
        let tongTienG = 0;
        let tongTienDT = 0;
        
        if (thanhPhanHoSo.soBanGiay != null && thanhPhanHoSo.soTrang != null)
        {
            const soTrangThanhPhanHoSo = thanhPhanHoSo.soTrang == 0 ? 1: thanhPhanHoSo.soTrang;
            const soBanGiayThanhPhanHoSo = thanhPhanHoSo.soBanGiay;
            const tongTienGiayTren1Ban = getTongTienTheoSoTrang(soTrangThanhPhanHoSo);
            const newTongTienGiay = tongTienGiayTren1Ban > import.meta.env.VITE_CHUNGTHUC_SOTIENMAX ? import.meta.env.VITE_CHUNGTHUC_SOTIENMAX : tongTienGiayTren1Ban;
            tongTienDT = thanhPhanHoSo.kyDienTuBanGiay == false ? 0 : getTongTienTheoSoTrang(soTrangThanhPhanHoSo);
            for (let i = 0; i < soBanGiayThanhPhanHoSo; i++)
            {
                tongTienG += newTongTienGiay;    
            }
        }
        tongTien = tongTienDT + tongTienG;
        total += tongTien;
    })
    return total;
}