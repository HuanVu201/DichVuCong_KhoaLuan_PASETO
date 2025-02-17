import { Service } from "@/services";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import axiosInstance from "@/lib/axios";
import { IPaginationResponse } from "@/models";
import { Stream } from "stream";
import { ISearchThongKeParams } from "./thongKeQD766/models/ThongKeQD766Search";

class ExportThongKeServices extends Service.BaseApi {
    constructor() {
        super("exportthongkes");
    }
    ExportThongKeSoTheoDoiHoSo(_params: ISearchThongKeParams, typeExport: string): AxiosResponseWrapper<string> {
        return axiosInstance.get(this._urlSuffix + '/ExportThongKeSoTheoDoiHoSo', { params: { ..._params, typeExport }, })
    }
    Exportthutucnhieudonvisudung(_params: ISearchThongKeParams, typeExport: string): AxiosResponseWrapper<string> {
        return axiosInstance.get(this._urlSuffix + '/exportthutucnhieudonvisudung', { params: { ..._params, typeExport }, })
    }
}
export const exportThongKeApi = new ExportThongKeServices();
