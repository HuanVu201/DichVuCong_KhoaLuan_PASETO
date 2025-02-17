import { Service } from "@/services";
import { ILoaiNhomGiayToCaNhan } from "../models";
import { IBaseExt, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import axiosInstance from "@/lib/axios";

class LoaiNhomGiayToCaNhanService extends Service.BaseApi {
    constructor() {
        super("loainhomgiaytocanhans")
    }
    Search(_params: IPickSearch<ILoaiNhomGiayToCaNhan>): AxiosResponseWrapper<IPaginationResponse<ILoaiNhomGiayToCaNhan[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ILoaiNhomGiayToCaNhan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ILoaiNhomGiayToCaNhan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ILoaiNhomGiayToCaNhan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const LoaiNhomGiayToCaNhanApi = new LoaiNhomGiayToCaNhanService()