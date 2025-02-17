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
import { ITinBaiPortal } from "../models/TinBai";
export class TinBaiPortalService
  extends Service.BaseApi
  implements Service.ICrud<ITinBaiPortal>
{
  constructor() {
    super("tinbais");
  }
  Get(_id: string): AxiosResponseWrapper<IResult<ITinBaiPortal>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<ITinBaiPortal, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<ITinBaiPortal>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Search(
    _params: IPickSearch<ITinBaiPortal>
  ): AxiosResponseWrapper<IPaginationResponse<ITinBaiPortal[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
}
