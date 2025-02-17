import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import {
  IPickSearch,
  IPaginationResponse,
  IResult,
  IBaseExt,
  ISoftDelete,
  IOmitUpdate,
} from "@/models";

import { Service } from "@/services";
import { ISearchDanhMucThuTucPortal } from "../models/DanhMucThuTucPortal";
import { IThuTuc } from "@/features/thutuc/models";
import { IFilterThuTuc } from "../components/SidebarTTHC";
export class DanhMucThuTucPortalService
  extends Service.BaseApi
  implements Service.ICrud<IThuTuc>
{
  constructor() {
    super("thutucs");
  }
  Get(_id: string): AxiosResponseWrapper<IResult<IThuTuc>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<IThuTuc, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<IThuTuc>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Search(
    _params: ISearchDanhMucThuTucPortal
  ): AxiosResponseWrapper<IPaginationResponse<IThuTuc[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
  SearchSideBar(
    _params: ISearchDanhMucThuTucPortal
  ): AxiosResponseWrapper<IPaginationResponse<IFilterThuTuc[]>> {
    return axiosInstance.get("/api/filterthutuc", { params: _params });
  }
}
