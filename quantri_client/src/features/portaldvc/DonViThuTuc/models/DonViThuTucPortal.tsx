import { IBaseExt, IBasePagination } from "@/models";

export interface IDonViThuTucPortal extends IBaseExt {
  maTTHC?: string;
  donViId?: string;
  groupName?: string;
}
export interface ISearchDonViThuTucPortal extends IBasePagination {
  maTTHC?: string;
}
