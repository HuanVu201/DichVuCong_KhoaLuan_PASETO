import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { ITrangThaiHoSo } from "../models";

class TrangThaiHoSoService extends Service.BaseApi implements Service.ICrud<ITrangThaiHoSo>{
    constructor(){
        super("trangthaihosos")
    }
    Search(_params: IPickSearch<ITrangThaiHoSo, "ten" | "laTrangThaiQuyTrinh">): AxiosResponseWrapper<IPaginationResponse<ITrangThaiHoSo[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITrangThaiHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ITrangThaiHoSo, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITrangThaiHoSo>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const trangThaiHoSoApi = new TrangThaiHoSoService()