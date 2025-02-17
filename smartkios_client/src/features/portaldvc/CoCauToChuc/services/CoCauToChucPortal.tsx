import { Service } from "@/services";
import {
  ICoCauToChucPortal,
  ISearchCoCauToChucPortal,
} from "../models/CoCauToChucPortal";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import {
  IPickSearch,
  IPaginationResponse,
  IResult,
  IBaseExt,
  ISoftDelete,
  IOmitUpdate,
} from "@/models";
import axiosInstance, { parseParams } from "@/lib/axios";

export class CoCauToChucPortalService
  extends Service.BaseApi
  implements Service.ICrud<ICoCauToChucPortal>
{
  constructor() {
    super("cocautochucs");
  }
  Search(
    _params: ISearchCoCauToChucPortal
  ): AxiosResponseWrapper<IPaginationResponse<ICoCauToChucPortal[]>> {
    return axiosInstance.get(this._urlSuffix, {
      params: _params,
      paramsSerializer: (p) => {
        return parseParams(p);
      },
    });
  }
  Get(_id: string): AxiosResponseWrapper<IResult<ICoCauToChucPortal>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<ICoCauToChucPortal, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    return axiosInstance.post(this._urlSuffix, _data);
  }
  Delete(_params: ISoftDelete): AxiosResponseWrapper {
    return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {
      data: { forceDelete: _params.forceDelete },
    });
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<ICoCauToChucPortal>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
}
