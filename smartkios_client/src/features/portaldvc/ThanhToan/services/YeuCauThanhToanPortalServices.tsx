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
import { IYeuCauThanhToanPortal } from "../models/YeuCauThanhToanPortal";

class YeuCauThanhToanPortalService
  extends Service.BaseApi
  implements Service.ICrud<IYeuCauThanhToanPortal>
{
  constructor() {
    super("yeucauthanhtoans");
  }
  Search(
    _params: IPickSearch<IYeuCauThanhToanPortal, "maHoSo">
  ): AxiosResponseWrapper<IPaginationResponse<IYeuCauThanhToanPortal[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
  Get(_id: string): AxiosResponseWrapper<IResult<IYeuCauThanhToanPortal>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<IYeuCauThanhToanPortal, keyof IBaseExt<string>>>
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
  Update(_params: IOmitUpdate<IYeuCauThanhToanPortal>): AxiosResponseWrapper {
    return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data);
  }
  InitPayment(_params: Partial<IYeuCauThanhToanPortal>): AxiosResponseWrapper {
    return axiosInstance.post(this._urlSuffix + "/InitDvcPayment", _params);
  }
}

export const yeuCauThanhToanApi = new YeuCauThanhToanPortalService();
