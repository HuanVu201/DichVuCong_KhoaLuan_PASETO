import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import {
  IPickSearch,
  IBaseExt,
  IOmitUpdate,
  IPaginationResponse,
  IResult,
  ISoftDelete,
} from "@/models";
import { Service } from "@/services";
import { IGiaoDichThanhToanDetailPortal } from "../models/GiaoDichThanhToan";

class GiaoDichThanhToanPortalService
  extends Service.BaseApi
  implements Service.ICrud<IGiaoDichThanhToanDetailPortal>
{
  constructor() {
    super("giaodichthanhtoans");
  }
  Search(
    _params: IPickSearch<IGiaoDichThanhToanDetailPortal>
  ): AxiosResponseWrapper<
    IPaginationResponse<IGiaoDichThanhToanDetailPortal[]>
  > {
    throw new Error("Method not implemented.");
  }
  Get(
    _id: string
  ): AxiosResponseWrapper<IResult<IGiaoDichThanhToanDetailPortal>> {
    throw new Error("Method not implemented.");
  }
  Create(
    _data: Partial<Omit<IGiaoDichThanhToanDetailPortal, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(
    _params: IOmitUpdate<IGiaoDichThanhToanDetailPortal>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  GetByMaThamChieu(ma: string): AxiosResponseWrapper {
    return axiosInstance.get(this._urlSuffix + "/GetByMaThamChieu/" + ma);
  }
}

export const giaoDichThanhToanApi = new GiaoDichThanhToanPortalService();
