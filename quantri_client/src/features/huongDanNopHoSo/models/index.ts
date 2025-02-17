import { IThemHoSo } from "@/features/hoso/components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal";
import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";

export interface IHuongDanNopHoSo extends IBaseExt,IThemHoSo {
  // lyDoTuChoi?: string;
  // lyDoBoSung?: string;
  thanhPhanHuongDanNopHoSos?: IThanhPhanThuTuc[]
}

export interface ISearchHuongDanNopHoSo extends IBasePagination, IBaseSearch, IPickSearch<IHuongDanNopHoSo> {

}