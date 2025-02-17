import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IProcGroup_Mgr, ISearchProcGroup_Mgr } from "../models";

class ProcGroup_MgrService extends Service.BaseApi implements Service.ICrud<IProcGroup_Mgr> {
    constructor() {
        super("procgroup_mgrs")
    }
    Search(_params: IPickSearch<IProcGroup_Mgr, "ten">): AxiosResponseWrapper<IPaginationResponse<IProcGroup_Mgr[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IProcGroup_Mgr>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IProcGroup_Mgr, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IProcGroup_Mgr>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchProcGroup_Mgr): AxiosResponseWrapper<IPaginationResponse<IProcGroup_Mgr[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const procGroup_MgrApi = new ProcGroup_MgrService()