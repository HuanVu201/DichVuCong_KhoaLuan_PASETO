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
import { IYeuCauThanhToan } from "../models/YeuCauThanhToan";

class YeuCauThanhToanService
  extends Service.BaseApi
  implements Service.ICrud<IYeuCauThanhToan>
{
  constructor() {
    super("yeucauthanhtoans");
  }
  Search(
    _params: IPickSearch<IYeuCauThanhToan, "maHoSo">
  ): AxiosResponseWrapper<IPaginationResponse<IYeuCauThanhToan[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
  Get(_id: string): AxiosResponseWrapper<IResult<IYeuCauThanhToan>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  Create(
    _data: Partial<Omit<IYeuCauThanhToan, keyof IBaseExt<string>>>
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
  Update(_params: IOmitUpdate<IYeuCauThanhToan>): AxiosResponseWrapper {
    return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data);
  }
}

export const yeuCauThanhToanApi = new YeuCauThanhToanService();
