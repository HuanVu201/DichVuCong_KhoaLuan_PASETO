import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IPhiLePhi } from "../models";

class PhiLePhiService extends Service.BaseApi implements Service.ICrud<IPhiLePhi>{
    constructor(){
        super("philephis")
    }
    Search(_params: IPickSearch<IPhiLePhi, "thuTucId" | "loai" | "donVi">): AxiosResponseWrapper<IPaginationResponse<IPhiLePhi[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IPhiLePhi>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IPhiLePhi, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IPhiLePhi>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const phiLePhiApi = new PhiLePhiService()