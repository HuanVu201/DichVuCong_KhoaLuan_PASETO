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
import { IYeuCauThanhToan } from "../../thuphilephi/models/YeuCauThanhToan";
import { IGetBienLaiThanhToan } from "../models/IBienLaiThanhToan";

class BienLaiThanhToanService
  extends Service.BaseApi
  implements Service.ICrud<IYeuCauThanhToan>
{
  constructor() {
    super("yeucauthanhtoans");
  }
  Search(
    _params: IPickSearch<IYeuCauThanhToan>
  ): AxiosResponseWrapper<IPaginationResponse<IYeuCauThanhToan[]>> {
    throw new Error("Method not implemented.");
  }
  Get(_id: string): AxiosResponseWrapper<IResult<IYeuCauThanhToan>> {
    throw new Error("Method not implemented.");
  }
  Create(
    _data: Partial<Omit<IYeuCauThanhToan, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<IYeuCauThanhToan>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  GetBienLai(_data: IGetBienLaiThanhToan): AxiosResponseWrapper {
    return axiosInstance.post(this._urlSuffix + "/getbienlai", _data);
  }
}

export const bienLaiThanhToanApi = new BienLaiThanhToanService();
