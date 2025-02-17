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
import {
  IUserPortal, ISearchUserPortal
} from "../models/UserPortal";
export class UserPortalService
  extends Service.BaseApi
  implements Omit<Service.ICrud<IUserPortal>, "Get">
{
  constructor() {
    super("users","api/");
  }
  Get(_id: string): AxiosResponseWrapper<IUserPortal> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<IUserPortal, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<IUserPortal>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Search(
    _params: ISearchUserPortal
  ): AxiosResponseWrapper<IPaginationResponse<IUserPortal[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
}
