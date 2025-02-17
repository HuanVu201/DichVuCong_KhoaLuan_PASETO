import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { IBasePagination } from "@/models";

export interface ICoCauToChucPortal extends ICoCauToChuc {}
export interface ISearchCoCauToChucPortal extends IBasePagination {
  OrderBy?: string[];
  Catalog?: string;
  OfGroupCode?: string | null;
  Type?: "don-vi" | "nhom"
}
