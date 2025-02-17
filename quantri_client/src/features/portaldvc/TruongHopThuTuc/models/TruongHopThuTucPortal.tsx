import { IBaseExt, IBasePagination } from "@/models";

export interface ITruongHopThuTucPortal extends IBaseExt {
  ten?: string;
  ma?: string;
}
export interface ISearchTruongHopThuTucPortal extends IBasePagination {
  ThuTucId?: string;
}
