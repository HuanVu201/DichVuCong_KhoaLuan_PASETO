import { Service } from "@/services";
import {
  ISearchThongKeParams,
  ITheoDoiChiTieuDVCTrucTuyenParams,
  ITienDoGiaiQuyetParams,
} from "../models/ThongKeQD766Search";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IThongKeQD766Response } from "../models/ThongKeQD766";
import axiosInstance from "@/lib/axios";
import { IResult } from "@/models";
import { IThongKeChiTieuDVCResponse, IThongKeChiTieuSoHoaResponse, IThongKeTTTTResponse, IThongKeTienDoGiaiQuyetResponse } from "../models/ThongKe766Response";

class ThongKeQD766Services extends Service.BaseApi {
  constructor() {
    super("quyetdinhs");
  }
  TienDoGiaiQuyet(
    _params: ITienDoGiaiQuyetParams
  ): AxiosResponseWrapper<IThongKeQD766Response> {
    return axiosInstance.post(this._urlSuffix + "/tiendogiaiquyet", _params);
  }
  TheoDoiChiTieuDVCTrucTuyen(
    _params: ITheoDoiChiTieuDVCTrucTuyenParams
  ): AxiosResponseWrapper<IThongKeQD766Response> {
    return axiosInstance.post(this._urlSuffix + "/dvctt", _params);
  }
  ThanhToanTrucTuyen(
    _params: ITheoDoiChiTieuDVCTrucTuyenParams
  ): AxiosResponseWrapper<IThongKeQD766Response> {
    return axiosInstance.post(this._urlSuffix + "/tttt", _params);
  }
  ThanhToanTrucTuyenNew(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeTTTTResponse> {
    return axiosInstance.post(this._urlSuffix + "/ChiTieutttt", _params);
  }
  TienDoGiaiQuyetNew(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeTienDoGiaiQuyetResponse> {
    return axiosInstance.post(this._urlSuffix + "/chitieutiendo", _params);
  }
  ChiTieuDVCTrucTuyenNew(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeChiTieuDVCResponse> {
    return axiosInstance.post(this._urlSuffix + "/chitieudvctructuyen", _params);
  }
  ChiTieuSoHoaNew(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeChiTieuSoHoaResponse> {
    return axiosInstance.post(this._urlSuffix + "/chitieusohoa", _params);
  }
}
export const thongKeQD766Api = new ThongKeQD766Services();
