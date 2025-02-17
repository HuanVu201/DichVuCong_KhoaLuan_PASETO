import { IBaseExt, IBasePagination, IPickSearch } from "@/models";

export interface ITinTucPortal extends IBaseExt {
  tieuDe: string;
  ngayBanHanh: string;
  trichYeu: string;
  tenTrangThai: string;
  anhDaiDien: string;
  noiDung: string;
}
export interface ISearchTinTucPortal
  extends IBasePagination,
    IPickSearch<ITinTucPortal> {}
