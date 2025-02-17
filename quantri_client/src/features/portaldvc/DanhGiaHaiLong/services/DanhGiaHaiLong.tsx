import { IDanhGiaHaiLongCongDan } from "../models";
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
class DanhGiaHaiLongServices extends Service.BaseApi {
  constructor() {
    super("danhgiahailongs");
  }
  Create(_data: Partial<Omit<IDanhGiaHaiLongCongDan, keyof IBaseExt<string>>>): AxiosResponseWrapper<IResult<any>> {
    return axiosInstance.post(this._urlSuffix, _data)
  }
  Get(_id: string): AxiosResponseWrapper<IResult<IDanhGiaHaiLongCongDan>> {
    return axiosInstance.get(this._urlSuffix + "/" + _id);
  }
  CheckDGHL(_id: string): AxiosResponseWrapper<IResult<IDanhGiaHaiLongCongDan>> {
    return axiosInstance.get(this._urlSuffix + "/CheckDGHL/" + _id);
  }
  Delete(_id: ISoftDelete): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Update(_params: IOmitUpdate<IDanhGiaHaiLongCongDan>): AxiosResponseWrapper {
    throw new Error("Method not implemented.");
  }
  Search(
    _params: IDanhGiaHaiLongCongDan
  ): AxiosResponseWrapper<IPaginationResponse<IDanhGiaHaiLongCongDan[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params });
  }
  DanhGiaHaiLongHCC(_data: { danhGia: string }): AxiosResponseWrapper<IResult<any>> {
    return axiosInstance.post(this._urlSuffix + '/DanhGiaHaiLongHCC', _data)
  }
}
export const danhGiaHaiLongServices = new DanhGiaHaiLongServices()