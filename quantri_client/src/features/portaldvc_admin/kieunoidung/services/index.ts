import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../../models";
import { Service } from "../../../../services";
import { IKieuNoiDung } from "../models";

class KieuNoiDungService extends Service.BaseApi implements Service.ICrud<IKieuNoiDung>{
    constructor() {
        super("kieunoidungs")
    }
    Search(_params: IPickSearch<IKieuNoiDung, "tenNoiDung">): AxiosResponseWrapper<IPaginationResponse<IKieuNoiDung[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IKieuNoiDung>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IKieuNoiDung, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IKieuNoiDung>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const kieuNoiDungApi = new KieuNoiDungService()