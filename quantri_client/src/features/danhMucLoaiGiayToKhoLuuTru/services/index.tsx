import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { ILoaiGiayToKhoLuuTru, ISearchLoaiGiayToKhoLuuTru } from "../models";

class LoaiGiayToKhoLuuTruService extends Service.BaseApi {
    constructor() {
        super("LoaiGiayToKhoLuuTrus")
    }
    Search(_params: ISearchLoaiGiayToKhoLuuTru): AxiosResponseWrapper<IPaginationResponse<ILoaiGiayToKhoLuuTru[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ILoaiGiayToKhoLuuTru>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ILoaiGiayToKhoLuuTru, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
 
    Update(_params: IOmitUpdate<ILoaiGiayToKhoLuuTru>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const loaiGiayToKhoLuuTruApi = new LoaiGiayToKhoLuuTruService()