import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IAssor_Proc_Mgr } from "../model";

class Assor_Proc_Mgr_Service extends Service.BaseApi implements Service.ICrud<IAssor_Proc_Mgr> {
    constructor() {
        super("assor_proc_mgrs")
    }
    Search(_params: IPickSearch<IAssor_Proc_Mgr, "thuTucId" | "thuTucLienQuanId">): AxiosResponseWrapper<IPaginationResponse<IAssor_Proc_Mgr[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Assor_Proc_MgrPortal(_params: IPickSearch<IAssor_Proc_Mgr>): AxiosResponseWrapper<IPaginationResponse<IAssor_Proc_Mgr[]>> {
        return axiosInstance.get(this._urlSuffix + "/Assor_Proc_MgrPortal", { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IAssor_Proc_Mgr>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IAssor_Proc_Mgr, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IAssor_Proc_Mgr>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const assor_Proc_Mgr_Api = new Assor_Proc_Mgr_Service()