import { IBaseExt, IBasePagination, IPickSearch } from "../../../../models";
import { IKieuNoiDung } from "../../kieunoidung/models";
export interface IKenhTin extends IBaseExt {
    tenKenhTin ? : string,
    maKenhTinCha ?: string | null,
    tomTat ?: string,
    thuTu ? : number,
    imageUrl ? : string,
    kieuNoiDung ?: IKieuNoiDung,
    hienThiMenuChinh ?: boolean,
    hienThiMenuDoc ?: boolean,
    hienThiMenuPhu ?: boolean,
    noiDung ?: string,
    loaiMoLienKet ?: string,
    lienKetNgoai ?: string
}

export interface ISearchKenhTin extends IBasePagination, IPickSearch<IKenhTin, "tenKenhTin"> {

}