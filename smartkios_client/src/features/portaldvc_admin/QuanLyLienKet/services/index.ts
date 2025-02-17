import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../../models";
import { Service } from "../../../../services";
import { IQuanLyLienKet } from "../models";

export class QuanLyLienKetService extends Service.BaseApi implements Service.ICrud<IQuanLyLienKet>{
    constructor(){
        super("quanlylienkets")
    }
    Search(_params: IPickSearch<IQuanLyLienKet, "ten" | "suDung" | "ma">): AxiosResponseWrapper<IPaginationResponse<IQuanLyLienKet[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    GetList(_id: string): AxiosResponseWrapper<IPaginationResponse<IQuanLyLienKet[]>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IQuanLyLienKet>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IQuanLyLienKet, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IQuanLyLienKet>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const QuanLyLienKetApi = new QuanLyLienKetService()