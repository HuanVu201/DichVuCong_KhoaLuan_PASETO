import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IDonViThuTuc, IUpdateMultiDonViThuTuc } from "../models";

class DonViThuTucService extends Service.BaseApi implements Service.ICrud<IDonViThuTuc>{
    constructor() {
        super("donvithutucs")
    }
    Search(_params: IPickSearch<IDonViThuTuc, "maTTHC" | "donViId">): AxiosResponseWrapper<IPaginationResponse<IDonViThuTuc[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDonViThuTuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDonViThuTuc, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDonViThuTuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    UpdateMulti(_params: IUpdateMultiDonViThuTuc) : AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateMulti", _params);
    }
}

export const donViThuTucApi = new DonViThuTucService()