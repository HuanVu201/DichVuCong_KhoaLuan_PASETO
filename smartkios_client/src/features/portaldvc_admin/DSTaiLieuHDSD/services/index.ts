import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../../models";
import { Service } from "../../../../services";
import { IDSTaiLieuHDSD } from "../models";

class DSTaiLieuHDSDService extends Service.BaseApi implements Service.ICrud<IDSTaiLieuHDSD>{
    constructor() {
        super("dstailieuhdsds")
    }
    Search(_params: IPickSearch<IDSTaiLieuHDSD, "tenTaiLieu">): AxiosResponseWrapper<IPaginationResponse<IDSTaiLieuHDSD[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDSTaiLieuHDSD>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDSTaiLieuHDSD, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDSTaiLieuHDSD>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const DSTaiLieuHDSDApi = new DSTaiLieuHDSDService()