import { IThuTuc } from "@/features/thutuc/models";
import { IBaseExt, IBasePagination, IPickSearch } from "@/models";

export interface IDanhMucThuTucPortal extends IBaseExt {
  maTTHC: string;
  tenTTHC: string;
}

export interface ISearchDanhMucThuTucPortal
  extends IBasePagination {
  doiTuongThucHien?: string;
  capThucHien?: string;
  maLinhVucChinh?: string;
  maTTHC?: string;
  donVi?: string;
  donViCapHuyen?: string;
  maTinh?: string;
  maHuyen?: string;
  maXa?: string;
  tuKhoa?: string;
  mucDo?:string;
}
