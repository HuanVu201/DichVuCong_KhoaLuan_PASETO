import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../../models";
import { Service } from "../../../../services";
import { ICauHoiPhoBien } from "../models";

class CauHoiPhoBienService extends Service.BaseApi implements Service.ICrud<ICauHoiPhoBien>{
    constructor() {
        super("cauhoiphobiens")
    }
    Search(_params: IPickSearch<ICauHoiPhoBien, "type" | "noiDungCauHoi">): AxiosResponseWrapper<IPaginationResponse<ICauHoiPhoBien[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ICauHoiPhoBien>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ICauHoiPhoBien, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ICauHoiPhoBien>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const CauHoiPhoBienApi = new CauHoiPhoBienService()