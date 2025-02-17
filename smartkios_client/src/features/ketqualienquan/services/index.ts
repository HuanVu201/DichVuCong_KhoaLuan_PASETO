import { Service } from "@/services";
import { IKetQuaLienQuan, ISearchKetQuaLienQuan } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance from "@/lib/axios";

class KetQuaLienQuanService extends Service.BaseApi{
    constructor() {
        super("ketqualienquans")
    }

    Search(params: ISearchKetQuaLienQuan): AxiosResponseWrapper<IPaginationResponse<IKetQuaLienQuan[]>> {
        return axiosInstance.get(this._urlSuffix, {params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IKetQuaLienQuan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<IKetQuaLienQuan, "id">>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.delete(this._urlSuffix + "/" + _id, {data: {}})
    }
    Update(_params: IOmitUpdate<IKetQuaLienQuan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }

}

export const ketQuaLienQuanService = new KetQuaLienQuanService()