import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IProcOfThisType_Mgr, ISearchProcOfThisType_Mgr } from "../models";

class ProcOfThisType_MgrService extends Service.BaseApi implements Service.ICrud<IProcOfThisType_Mgr> {
    constructor() {
        super("procofthistype_mgrs")
    }
    Search(_params: IPickSearch<IProcOfThisType_Mgr, "id">): AxiosResponseWrapper<IPaginationResponse<IProcOfThisType_Mgr[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IProcOfThisType_Mgr>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IProcOfThisType_Mgr, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IProcOfThisType_Mgr>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchProcOfThisType_Mgr): AxiosResponseWrapper<IPaginationResponse<IProcOfThisType_Mgr[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const procOfThisType_MgrApi = new ProcOfThisType_MgrService()