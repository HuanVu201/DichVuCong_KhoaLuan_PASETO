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
import { ITinTucPortal } from "../models/TinTuc";
export class TinTucPortalService
  extends Service.BaseApi
  implements Service.ICrud<ITinTucPortal>
{
  constructor() {
    super("kenhtins");
  }
  Get(_id: string): AxiosResponseWrapper<IResult<ITinTucPortal>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<ITinTucPortal, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<ITinTucPortal>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Search(
    _params: IPickSearch<ITinTucPortal>
  ): AxiosResponseWrapper<IPaginationResponse<ITinTucPortal[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
}
