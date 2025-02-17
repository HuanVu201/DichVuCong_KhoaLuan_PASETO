import { IBaseExt, IBasePagination, IPickSearch } from "@/models";

export interface ITinBaiPortal extends IBaseExt {
  tieuDe: string;
  ngayBanHanh: string;
  trichYeu: string;
  tenTrangThai: string;
  anhDaiDien: string;
  noiDung: string;
}
export interface ISearchTinBaiPortal
  extends IBasePagination,
    IPickSearch<ITinBaiPortal> {}
