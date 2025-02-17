import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IQuaTrinhXuLyHoSo, ISearchQuaTrinhXuLyHoSo } from "../models";

class QuaTrinhXuLyHoSoService extends Service.BaseApi implements Service.ICrud<IQuaTrinhXuLyHoSo>{
    constructor(){
        super("quatrinhxulyhosos")
    }
    Search(_params: ISearchQuaTrinhXuLyHoSo): AxiosResponseWrapper<IPaginationResponse<IQuaTrinhXuLyHoSo[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IQuaTrinhXuLyHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IQuaTrinhXuLyHoSo, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IQuaTrinhXuLyHoSo>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const quaTrinhXuLyHoSoApi = new QuaTrinhXuLyHoSoService()