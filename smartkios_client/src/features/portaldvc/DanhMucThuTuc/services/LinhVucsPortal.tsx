import { ILinhVuc, ISearchLinhVuc } from "@/features/linhvuc/models";
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
export class LinhVucPortalService
  extends Service.BaseApi
  implements Service.ICrud<ILinhVuc>
{
  constructor() {
    super("linhvucs");
  }
  Get(_id: string): AxiosResponseWrapper<IResult<ILinhVuc>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<ILinhVuc, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<ILinhVuc>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Search(
    _params: ISearchLinhVuc
  ): AxiosResponseWrapper<IPaginationResponse<ILinhVuc[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
}
