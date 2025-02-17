import { Service } from "@/services";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import axiosInstance from "@/lib/axios";
import { IResult } from "@/models";
import { ISearchThongKeParams, IThongKeChiTieuDVCResponse, IThongKeChiTieuSoHoaResponse, IThongKeTTTTResponse, IThongKeTienDoGiaiQuyetResponse } from "../models/ThongKe766Response";

class ThongKeServices extends Service.BaseApi {
  constructor() {
    super("quyetdinhs");
  }
  ThanhToanTrucTuyenPortal(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeTTTTResponse> {
    return axiosInstance.post(this._urlSuffix + "/ChiTieutttt", _params);
  }
  TienDoGiaiQuyetPortal(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeTienDoGiaiQuyetResponse> {
    return axiosInstance.post(this._urlSuffix + "/chitieutiendo", _params);
  }
  ChiTieuDVCTrucTuyenPortal(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeChiTieuDVCResponse> {
    return axiosInstance.post(this._urlSuffix + "/chitieudvctructuyen", _params);
  }
  ChiTieuSoHoaPortal(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeChiTieuSoHoaResponse> {
    return axiosInstance.post(this._urlSuffix + "/chitieusohoa", _params);
  }
}
export const thongKePortalApi = new ThongKeServices();
