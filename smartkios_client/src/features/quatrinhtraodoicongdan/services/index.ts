import { Service } from "@/services";
import { IQuaTrinhTraoDoiCongDan, ISearchQuaTrinhTraoDoiCongDan } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance from "@/lib/axios";

class QuaTrinhTraoDoiCongDanService extends Service.BaseApi{
    constructor() {
        super("quatrinhtraodoicongdans")
    }

    Search(params: ISearchQuaTrinhTraoDoiCongDan): AxiosResponseWrapper<IPaginationResponse<IQuaTrinhTraoDoiCongDan[]>> {
        return axiosInstance.get(this._urlSuffix, {params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IQuaTrinhTraoDoiCongDan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<IQuaTrinhTraoDoiCongDan, "id">>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.delete(this._urlSuffix + "/" + _id, {data: {}})
    }
    Update(_params: IOmitUpdate<IQuaTrinhTraoDoiCongDan>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const quaTrinhTraoDoiCongDanService = new QuaTrinhTraoDoiCongDanService()