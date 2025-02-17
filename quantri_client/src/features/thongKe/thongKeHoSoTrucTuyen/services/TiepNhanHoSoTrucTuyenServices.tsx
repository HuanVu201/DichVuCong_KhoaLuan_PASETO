import { Service } from "@/services";
import {
  IThongKeHoSoTrucTuyenCapTinhParams,
  IThongKeHoSoTrucTuyenCacSoBanNganhParams,
  IThongKeHoSoTrucTuyenCapHuyenParams,
  IThongKeHoSoTrucTuyenCapXaParams,
  IThongKeHoSoTrangChuParams,
  IThongKeHoSoDaCoKetQuaParams,
  IThongKeHoSoTheoKyParams,
  INhacViecPortal,
  IThongKeTyLeXuLyDungHanParams,
  IThongKeHoSoTrucTuyenTheoThuTucParams,
} from "../models/TiepNhanHoSoTrucTuyenSearch";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import {
  IDuLieuThongKeHoSo,
  IThongKeHoSoTrangChu,
  ITiepNhanHoSoTrucTuyenResponse,
  NhacViecResponse,
} from "../models/TiepNhanHoSoTrucTuyen";
import axiosInstance from "@/lib/axios";
import { IPaginationResponse, IResult } from "@/models";
import { IHoSo } from "@/features/hoso/models";
import { ISearchThongKeParams } from "../../thongKeQD766/models/ThongKeQD766Search";
import { IThongKeHoSoQuaHanResponse } from "../models/ThongKeHoSoQuaHanResponse";

export type SearchNhacViecParams = {
  Menus?: string[]
}

class TiepNhanHoSoTrucTuyenServices extends Service.BaseApi {
  constructor() {
    super("thongkehosotructuyens");
  }
  ThongKeCapTinh(
    _params: IThongKeHoSoTrucTuyenCapTinhParams
  ): AxiosResponseWrapper<ITiepNhanHoSoTrucTuyenResponse> {
    return axiosInstance.post(this._urlSuffix + "/captinh", _params);
  }
  ThongKeTheoThuTuc(
    _params: IThongKeHoSoTrucTuyenTheoThuTucParams
  ): AxiosResponseWrapper<ITiepNhanHoSoTrucTuyenResponse> {
    return axiosInstance.post(this._urlSuffix + "/theoThuTuc", _params);
  }
  ThongKeTheoMucDo34(
    _params: IThongKeHoSoTrucTuyenTheoThuTucParams
  ): AxiosResponseWrapper<ITiepNhanHoSoTrucTuyenResponse> {
    return axiosInstance.post(this._urlSuffix + "/theomucdo34", _params);
  }
  ThongKeCacSoBanNganh(
    _params: IThongKeHoSoTrucTuyenCacSoBanNganhParams
  ): AxiosResponseWrapper<ITiepNhanHoSoTrucTuyenResponse> {
    return axiosInstance.post(this._urlSuffix + "/caphuyen", _params);
  }

  ThongKeCapHuyen(
    _params: IThongKeHoSoTrucTuyenCapHuyenParams
  ): AxiosResponseWrapper<ITiepNhanHoSoTrucTuyenResponse> {
    return axiosInstance.post(this._urlSuffix + "/caphuyen", _params);
  }

  ThongKeCapXa(
    _params: IThongKeHoSoTrucTuyenCapXaParams
  ): AxiosResponseWrapper<ITiepNhanHoSoTrucTuyenResponse> {
    return axiosInstance.post(this._urlSuffix + "/capxa", _params);
  }

  ThongKeHoSoTrangChu(
    _params: IThongKeHoSoTrangChuParams
  ): AxiosResponseWrapper<IResult<IThongKeHoSoTrangChu>> {
    return axiosInstance.get(this._urlSuffix + "/hoso", { params: _params });
  }
  ThongKeTyLeXuLyDungHan(
    _params: IThongKeTyLeXuLyDungHanParams
  ): AxiosResponseWrapper<IResult<{tyLeXuLyDungHan: string, tenDonVi: string}>> {
    return axiosInstance.get(this._urlSuffix + "/ThongKeTyLeXuLyDungHan", { params: _params });
  }
  ThongKeHoSoDaCoKetQua(
    _params: IThongKeHoSoDaCoKetQuaParams
  ): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
    return axiosInstance.get(this._urlSuffix + "/datraketqua", {
      params: _params,
    });
  }
  ThongKeHoSoTheoKy(
    _params: IThongKeHoSoTheoKyParams
  ): AxiosResponseWrapper<IPaginationResponse<IDuLieuThongKeHoSo[]>> {
    return axiosInstance.get(this._urlSuffix + "/hosotheoky", {
      params: _params,
    });
  }
  NhacViec(params : SearchNhacViecParams): AxiosResponseWrapper<IResult<NhacViecResponse>> {
    return axiosInstance.get(this._urlSuffix + "/nhacviec", {params, paramsSerializer: {
      indexes: null
    }});
  }
  NhacViecPortal(_params : INhacViecPortal): AxiosResponseWrapper<IResult<NhacViecResponse>> {
    return axiosInstance.get(this._urlSuffix + "/nhacviecportal", { params: _params });
  }
  ThongKeHoSoQuaHan(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeHoSoQuaHanResponse> {
    return axiosInstance.post(this._urlSuffix + "/hosoquahan", _params);
  }
}
export const tiepNhanHoSoTrucTuyenApi = new TiepNhanHoSoTrucTuyenServices();
