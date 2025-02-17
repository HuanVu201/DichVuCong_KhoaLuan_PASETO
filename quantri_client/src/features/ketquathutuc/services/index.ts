import { Service } from "@/services";
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance from "@/lib/axios";

class KetQuaThuTucService extends Service.BaseApi{
    constructor() {
        super("ketquathutucs")
    }

    Search(params: ISearchKetQuaThuTuc): AxiosResponseWrapper<IPaginationResponse<IKetQuaThuTuc[]>> {
        return axiosInstance.get(this._urlSuffix, {params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IKetQuaThuTuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<IKetQuaThuTuc, "id">>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.delete(this._urlSuffix + "/" + _id, {data: {}})
    }
    Update(_params: IOmitUpdate<IKetQuaThuTuc>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }

}

export const ketQuaThuTucService = new KetQuaThuTucService()