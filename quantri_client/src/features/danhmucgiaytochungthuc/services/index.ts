import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IDanhMucGiayToChungThuc, ISearchDanhMucGiayToChungThuc } from "../models";

class DanhMucGiayToChungThucService extends Service.BaseApi implements Service.ICrud<IDanhMucGiayToChungThuc>{
    constructor() {
        super("danhmucgiaytochungthucs")
    }
    Search(_params: ISearchDanhMucGiayToChungThuc): AxiosResponseWrapper<IPaginationResponse<IDanhMucGiayToChungThuc[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
   
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMucGiayToChungThuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDanhMucGiayToChungThuc, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMucGiayToChungThuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const DanhMucGiayToChungThucApi = new DanhMucGiayToChungThucService()