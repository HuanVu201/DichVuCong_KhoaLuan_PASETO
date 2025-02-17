import { IBaseExt, IBasePagination, IPickSearch } from "@/models";

export interface IHoSoPortal extends IBaseExt {
  ma: string;
  ten: string;
  //   linhVucChinh: string;
  //   maHoSoChinh: string;
}

export interface ISearchHoSoPortal
  extends IBasePagination,
    IPickSearch<IHoSoPortal> {}
