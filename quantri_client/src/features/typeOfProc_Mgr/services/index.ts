import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { ITypeOfProc_Mgr, ISearchTypeOfProc_Mgr } from "../models";

class TypeOfProc_MgrService extends Service.BaseApi implements Service.ICrud<ITypeOfProc_Mgr> {
    constructor() {
        super("typeofproc_mgrs")
    }
    Search(_params: IPickSearch<ITypeOfProc_Mgr, "ten">): AxiosResponseWrapper<IPaginationResponse<ITypeOfProc_Mgr[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITypeOfProc_Mgr>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ITypeOfProc_Mgr, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITypeOfProc_Mgr>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchTypeOfProc_Mgr): AxiosResponseWrapper<IPaginationResponse<ITypeOfProc_Mgr[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const typeOfProc_MgrApi = new TypeOfProc_MgrService()