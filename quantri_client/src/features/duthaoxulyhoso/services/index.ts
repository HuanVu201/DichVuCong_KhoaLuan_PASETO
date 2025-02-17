import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSoResponse } from "../models";

export type CreateDuThaoXuLyHoSo = Pick<IDuThaoXuLyHoSo, "loai" | "trichYeu" | "fileDinhKem" | "ngayHenTraMoi"> & {
    nguoiXuLy: string;
    tenNguoiXuLy: string;
    id: string,
    maDinhDanhOfficeCode: string;
    lanhDaoThongQua: string;
}
export type TraLaiXinRutKhongKyDuyetParams = {
    id: string;
    data: {
        fileDinhKem: string;
        trichYeu?: string;
    }
}

class DuThaoXuLyHoSoService extends Service.BaseApi implements Omit<Service.ICrud<IDuThaoXuLyHoSo>, "Search" | "Create"> {
    constructor() {
        super("duthaoxulyhosos")
    }
    Search(_params: ISearchDuThaoXuLyHoSo): AxiosResponseWrapper<IPaginationResponse<ISearchDuThaoXuLyHoSoResponse[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDuThaoXuLyHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: CreateDuThaoXuLyHoSo): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    DuyetThongQua(_params: { id: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/DuyetThongQua/" + _params.id, _params)
    }
    TuChoiDuThao(_params: { id: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/TuChoiDuThao/" + _params.id, _params)
    }
    TraLaiXinRutKhongKyDuyet(_params: TraLaiXinRutKhongKyDuyetParams): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.put(this._urlSuffix + "/TraLaiXinRutKhongKyDuyet/" + _params.id, _params.data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDuThaoXuLyHoSo>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const duThaoXuLyHoSoApi = new DuThaoXuLyHoSoService()