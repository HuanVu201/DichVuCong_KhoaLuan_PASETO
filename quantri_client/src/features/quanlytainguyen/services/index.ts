import { Service } from "@/services";
import { IQuanLyTaiNguyen, ISearchQuanLyTaiNguyen } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance from "@/lib/axios";

class QuanLyTaiNguyenService extends Service.BaseApi{
    constructor() {
        super("quanlytainguyens")
    }

    Search(params: ISearchQuanLyTaiNguyen): AxiosResponseWrapper<IPaginationResponse<IQuanLyTaiNguyen[]>> {
        return axiosInstance.get(this._urlSuffix, {params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IQuanLyTaiNguyen>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<IQuanLyTaiNguyen, "id">>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.delete(this._urlSuffix + "/" + _id, {data: {}})
    }
    Update(_params: IOmitUpdate<IQuanLyTaiNguyen>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }

}

export const quanLyTaiNguyenService = new QuanLyTaiNguyenService()