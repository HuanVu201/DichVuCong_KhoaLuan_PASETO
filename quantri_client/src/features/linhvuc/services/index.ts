import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { ILinhVuc, ISearchLinhVuc } from "../models";

class LinhVucService extends Service.BaseApi implements Service.ICrud<ILinhVuc> {
    constructor() {
        super("linhvucs")
    }
    Search(_params: IPickSearch<ILinhVuc, "ten" | "ma" | "maNganh">): AxiosResponseWrapper<IPaginationResponse<ILinhVuc[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ILinhVuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ILinhVuc, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ILinhVuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchLinhVuc): AxiosResponseWrapper<IPaginationResponse<ILinhVuc[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const linhVucApi = new LinhVucService()