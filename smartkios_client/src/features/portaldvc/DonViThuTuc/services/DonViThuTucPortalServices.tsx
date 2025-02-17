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
  IDonViThuTucPortal,
  ISearchDonViThuTucPortal,
} from "../models/DonViThuTucPortal";
export class DonViThuTucPortalService
  extends Service.BaseApi
  implements Service.ICrud<IDonViThuTucPortal>
{
  constructor() {
    super("donvithutucs");
  }
  Get(_id: string): AxiosResponseWrapper<IResult<IDonViThuTucPortal>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<IDonViThuTucPortal, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<IDonViThuTucPortal>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Search(
    _params: ISearchDonViThuTucPortal
  ): AxiosResponseWrapper<IPaginationResponse<IDonViThuTucPortal[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
}
