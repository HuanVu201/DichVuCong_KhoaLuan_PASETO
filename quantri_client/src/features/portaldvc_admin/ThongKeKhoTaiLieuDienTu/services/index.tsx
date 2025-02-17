import { Service } from "@/services";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import axiosInstance from "@/lib/axios";
import { IPaginationResponse } from "@/models";
import { Stream } from "stream";
import { IDataChartThongKeKhoTaiLieuDienTu, IExportThongKeKhoTaiLieuParams, ISearchThongKeKhoTaiLieuDienTuParams, IThongKeKhoTaiLieuDienTu } from "../models";

class ThongKeKhoTaiLieuDienTuServices extends Service.BaseApi {
    constructor() {
        super("thongKeKhoTaiLieuDienTus");
    }

    GetDataChartKhoTaiLieuDienTu(
        _params: {}
    ): AxiosResponseWrapper<IDataChartThongKeKhoTaiLieuDienTu> {
        return axiosInstance.get(this._urlSuffix + "/DataChartKhoTaiLieuDienTu", { params: _params });
    }

    FilterThongKeKhoTaiLieu(
        _params: ISearchThongKeKhoTaiLieuDienTuParams
    ): AxiosResponseWrapper<IPaginationResponse<IThongKeKhoTaiLieuDienTu[]>> {
        return axiosInstance.get(this._urlSuffix + "/FilterThongKeKhoTaiLieu", { params: _params });
    }
    ExportExcelThongKeKhoTaiLieu(_params: IExportThongKeKhoTaiLieuParams): AxiosResponseWrapper<Stream> {
        return axiosInstance.get(this._urlSuffix + '/ExportExcelThongKeKhoTaiLieu', { params: _params, responseType: 'blob', headers: { Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" } })
    }


}
export const thongKeKhoTaiLieuApi = new ThongKeKhoTaiLieuDienTuServices();
