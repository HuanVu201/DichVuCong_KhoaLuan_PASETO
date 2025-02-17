import { IBaseExt, IBasePagination, IPickSearch } from "@/models";
export interface IMenuPortal extends IBaseExt{
    maKenhTinCha?: string,
    tenKenhTinCha?: string,
    kieuNoiDung?: string,
    tenNoiDung?: string,
    lienKetNgoai?: string,
    tenKenhTin: string,
    hienThiMenuChinh?: boolean,
    hienThiMenuDoc?: boolean,
    hienThiMenuPhu?: boolean,
    imageUrl?: string,
    imageUrlKenhTinCha?: string,
    loaiMoLienKet?: string,
    thuTu?: string,
    tomTat?: string,

    
}

export interface ISearchMenuPortal extends IBasePagination, IPickSearch<IMenuPortal>{
    
}