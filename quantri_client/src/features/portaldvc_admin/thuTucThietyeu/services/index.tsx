import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IThuTucThietYeu } from "../model";

class ThuTucThietYeuService extends Service.BaseApi implements Service.ICrud<IThuTucThietYeu> {
    constructor() {
        super("thutucthietyeus")
    }
    Search(_params: IPickSearch<IThuTucThietYeu, "maTTHC" | "tenTTHC">): AxiosResponseWrapper<IPaginationResponse<IThuTucThietYeu[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    ThuTucThietYeuPortal(_params: IPickSearch<IThuTucThietYeu>): AxiosResponseWrapper<IPaginationResponse<IThuTucThietYeu[]>> {
        return axiosInstance.get(this._urlSuffix + "/ThuTucThietYeuPortal", { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IThuTucThietYeu>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IThuTucThietYeu, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IThuTucThietYeu>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const thuTucThietYeuApi = new ThuTucThietYeuService()