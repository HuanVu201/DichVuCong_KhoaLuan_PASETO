import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IDuplicateQuyTrinhXuLy, IQuyTrinhXuLy } from "../models";

class QuyTrinhXuLyService extends Service.BaseApi implements Service.ICrud<IQuyTrinhXuLy>{
    constructor(){
        super("quytrinhxulys")
    }
    Search(_params: IPickSearch<IQuyTrinhXuLy>): AxiosResponseWrapper<IPaginationResponse<IQuyTrinhXuLy[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IQuyTrinhXuLy>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IQuyTrinhXuLy, keyof IBaseExt<string>>>): AxiosResponseWrapper<IResult<string>> {
        throw new Error("Method not implemented.");
    }
    CreateRange(data: {quyTrinhs: Partial<Omit<IQuyTrinhXuLy, keyof IBaseExt<string>>>[]}): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IQuyTrinhXuLy>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    Duplicate(_params: IDuplicateQuyTrinhXuLy): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/duplicate" , _params)
    }
}

export const quyTrinhXuLyApi = new QuyTrinhXuLyService()