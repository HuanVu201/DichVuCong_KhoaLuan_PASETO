import { Service } from "@/services";
import {
  IThongKeHoSoTrucTuyenCapTinhParams,
  IThongKeHoSoTrucTuyenCacSoBanNganhParams,
  IThongKeHoSoTrucTuyenCapHuyenParams,
  IThongKeHoSoTrucTuyenCapXaParams,
  IThongKeHoSoTrangChuParams,
  IThongKeHoSoDaCoKetQuaParams,
  IThongKeHoSoTheoKyParams,
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

class TiepNhanHoSoTrucTuyenServices extends Service.BaseApi {
  constructor() {
    super("thongkehosotructuyens");
  }
  ThongKeCapTinh(
    _params: IThongKeHoSoTrucTuyenCapTinhParams
  ): AxiosResponseWrapper<ITiepNhanHoSoTrucTuyenResponse> {
    return axiosInstance.post(this._urlSuffix + "/captinh", _params);
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
  NhacViec(): AxiosResponseWrapper<IResult<NhacViecResponse>> {
    return axiosInstance.get(this._urlSuffix + "/nhacviec", { params: {} });
  }
  ThongKeHoSoQuaHan(
    _params: ISearchThongKeParams
  ): AxiosResponseWrapper<IThongKeHoSoQuaHanResponse> {
    return axiosInstance.post(this._urlSuffix + "/hosoquahan", _params);
  }
}
export const tiepNhanHoSoTrucTuyenApi = new TiepNhanHoSoTrucTuyenServices();
