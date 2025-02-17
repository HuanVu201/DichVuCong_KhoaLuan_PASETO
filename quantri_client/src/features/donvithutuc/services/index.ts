import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IAddMultiDonViThuTuc, IDeleteMultiDonViThuTuc, IDonViThuTuc, IUpdateMultiDonViThuTuc } from "../models";
import { DonViThuTucGroup } from "@/features/portaldvc/DvcTrucTuyen/context/DvcTrucTuyenPortalContext";

class DonViThuTucService extends Service.BaseApi implements Service.ICrud<IDonViThuTuc>{
    constructor() {
        super("donvithutucs")
    }
    Search(_params: IPickSearch<IDonViThuTuc, "maTTHC" | "donViId">): AxiosResponseWrapper<IPaginationResponse<IDonViThuTuc[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    SearchPublic(_params: IPickSearch<IDonViThuTuc, "maTTHC" | "donViId" | "catalog" > & {ofGroupCode?: string}): AxiosResponseWrapper<IPaginationResponse<DonViThuTucGroup[]>> {
        return axiosInstance.get(this._urlSuffix + "/public", { params: _params })
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
    AddMulti(data: IAddMultiDonViThuTuc) : AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/AddMulti", data)
    }
    UpdateMulti(_params: IUpdateMultiDonViThuTuc) : AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateMulti", _params);
    }
    DelMulti(data: IDeleteMultiDonViThuTuc) : AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/DelMulti", data)
    }
}

export const donViThuTucApi = new DonViThuTucService()