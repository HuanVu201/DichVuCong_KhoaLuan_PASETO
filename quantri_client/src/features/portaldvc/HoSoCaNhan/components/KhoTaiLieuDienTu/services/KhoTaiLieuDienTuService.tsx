import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from '@/models';
import { Service } from "@/services";
import { IKhoTaiLieuDienTu } from "../models/KhoTaiLieuDienTuModel";

class KhoTaiLieuDienTuService extends Service.BaseApi implements Service.ICrud<IKhoTaiLieuDienTu> {
    constructor() {
        super("khotailieudientus")
    }
    Search(_params: IPickSearch<IKhoTaiLieuDienTu, "soDinhDanh" | "tenKhoTaiLieu" | "moTa" >): AxiosResponseWrapper<IPaginationResponse<IKhoTaiLieuDienTu[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IKhoTaiLieuDienTu>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IKhoTaiLieuDienTu, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IKhoTaiLieuDienTu>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const KhoTaiLieuDienTuApi = new KhoTaiLieuDienTuService()