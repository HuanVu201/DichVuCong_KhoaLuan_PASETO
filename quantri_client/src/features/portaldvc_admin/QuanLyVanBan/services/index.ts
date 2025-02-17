import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../../models";
import { Service } from "../../../../services";
import { IQuanLyVanBan } from "../models";

export class QuanLyVanBanService extends Service.BaseApi implements Service.ICrud<IQuanLyVanBan>{
    constructor() {
        super("quanlyvanbans")
    }
    Search(_params: IPickSearch<IQuanLyVanBan, "maLinhVuc" | "congKhai" | "trichYeu" | "loaiVanBan">): AxiosResponseWrapper<IPaginationResponse<IQuanLyVanBan[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    GetList(_id: string): AxiosResponseWrapper<IPaginationResponse<IQuanLyVanBan[]>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IQuanLyVanBan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IQuanLyVanBan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IQuanLyVanBan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const QuanLyVanBanApi = new QuanLyVanBanService()