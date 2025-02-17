import { Service } from "@/services";
import { ITaiLieuGiayToCaNhan } from "../models";
import { IBaseExt, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import axiosInstance from "@/lib/axios";

class TaiLieuGiayToCaNhanService extends Service.BaseApi {
    constructor() {
        super("tailieugiaytocanhans")
    }
    Search(_params: IPickSearch<ITaiLieuGiayToCaNhan>): AxiosResponseWrapper<IPaginationResponse<ITaiLieuGiayToCaNhan[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITaiLieuGiayToCaNhan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ITaiLieuGiayToCaNhan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITaiLieuGiayToCaNhan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    GetDataChartTaiLieuCaNhan(
        _params: { type: string }
    ): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.get(this._urlSuffix + "/GetDataChartTaiLieuCaNhan", { params: _params });
    }
}

export const TaiLieuGiayToCaNhanApi = new TaiLieuGiayToCaNhanService()