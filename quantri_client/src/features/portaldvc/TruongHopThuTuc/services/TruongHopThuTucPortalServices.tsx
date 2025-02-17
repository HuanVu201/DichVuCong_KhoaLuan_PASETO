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
  ITruongHopThuTucPortal,
  ISearchTruongHopThuTucPortal,
} from "../models/TruongHopThuTucPortal";
export class TruongHopThuTucPortalService
  extends Service.BaseApi
  implements Service.ICrud<ITruongHopThuTucPortal>
{
  constructor() {
    super("truonghopthutucs");
  }
  Get(_id: string): AxiosResponseWrapper<IResult<ITruongHopThuTucPortal>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<ITruongHopThuTucPortal, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<ITruongHopThuTucPortal>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Search(
    _params: ISearchTruongHopThuTucPortal
  ): AxiosResponseWrapper<IPaginationResponse<ITruongHopThuTucPortal[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
}
