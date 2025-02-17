import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IDanhMucDiaBan, ISearchDanhMucDiaBan } from "../models";

class DanhMucDiaBanService extends Service.BaseApi implements Service.ICrud<IDanhMucDiaBan>{
    constructor(){
        super("diabans")
    }
    Search(_params: ISearchDanhMucDiaBan): AxiosResponseWrapper<IPaginationResponse<IDanhMucDiaBan[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMucDiaBan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    GetByMa(params: {maDiaBan: string[]}): AxiosResponseWrapper<IResult<IDanhMucDiaBan>> {
        return axiosInstance.get(this._urlSuffix + "/search", {params});
    }
    Create(_data: Partial<Omit<IDanhMucDiaBan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMucDiaBan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const danhMucDiaBanApi = new DanhMucDiaBanService()