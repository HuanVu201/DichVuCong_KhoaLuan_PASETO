import { Service } from "@/services";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import axiosInstance from "@/lib/axios";
import { IExportThongKeParams, IQuanLyTaiKhoanDinhDanh, ISearchQuanLyTaiKhoanDinhDanhParams, ISearchThongKeTaiKhoanDinhDanhParams } from "../models/QuanLyTaiKhoanModel";
import { IPaginationResponse } from "@/models";
import { Stream } from "stream";

class QuanLyDinhDanhCongDanServices extends Service.BaseApi {
  constructor() {
    super("dinhdanhcongdans");
  }
  SearchDanhSachTaiKhoan(
    _params: ISearchQuanLyTaiKhoanDinhDanhParams
  ): AxiosResponseWrapper<IPaginationResponse<IQuanLyTaiKhoanDinhDanh[]>> {
    return axiosInstance.get(this._urlSuffix + "/danhsachtaikhoan", { params: _params });
  }

  GetThongTinTaiKhoan(
    _params: { id: string }
  ): AxiosResponseWrapper<IQuanLyTaiKhoanDinhDanh> {
    return axiosInstance.get(this._urlSuffix + "/detailtaikhoancongdan", { params: _params });
  }
  GetDataChartDinhDanhCongDan(
    _params: { doTuoi?: string }
  ): AxiosResponseWrapper<IQuanLyTaiKhoanDinhDanh> {
    return axiosInstance.get(this._urlSuffix + "/datachartdinhdanhcongdan", { params: _params });
  }

  ThongKeTrenCongDVCTinh(
    _params: ISearchThongKeTaiKhoanDinhDanhParams
  ): AxiosResponseWrapper<IPaginationResponse<IQuanLyTaiKhoanDinhDanh[]>> {
    return axiosInstance.post(this._urlSuffix + "/thongketrencongdvctinh", { params: _params });
  }

  DeleteDinhDanhUser(_params: { id: string }): AxiosResponseWrapper {
    return axiosInstance.patch(this._urlSuffix + "/DeleteSoDinhDanh" + _params.id,);

  }
  ToggleLockoutUser(_params: { id: string }): AxiosResponseWrapper {
    return axiosInstance.patch(this._urlSuffix + "/ToggleLockoutUser" + _params.id,)
  }
  ExportExcelThongKeDinhDanh(_params: IExportThongKeParams): AxiosResponseWrapper<string> {
    return axiosInstance.get(this._urlSuffix + '/ExportExcelThongKeDinhDanh', { params: _params })
  }
}
export const quanLyDinhDanhCongDanApi = new QuanLyDinhDanhCongDanServices();
