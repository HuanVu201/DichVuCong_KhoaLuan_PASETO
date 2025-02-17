import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IThanhPhanThuTuc } from "../models";

export type DeleteMultiThanhPhanHoSoParams = {
    ids: string[]
}

export type AddMultiThanhPhanHoSoParams = {
    truongHopId: string,
    thuTucId: string,
    dataAdd: IThanhPhanThuTuc[]
}

class ThanhPhanThuTucService extends Service.BaseApi implements Service.ICrud<IThanhPhanThuTuc> {
    constructor() {
        super("thanhphanthutucs")
    }
    Search(_params: IPickSearch<IThanhPhanThuTuc>): AxiosResponseWrapper<IPaginationResponse<IThanhPhanThuTuc[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IThanhPhanThuTuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(data: Partial<Omit<IThanhPhanThuTuc, keyof IBaseExt<string>>>): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix, data)
    }
    UpdateThanhPhanThuTucCSDLTTHC(_params: AddMultiThanhPhanHoSoParams): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix + "/updatethanhphanthutuccsdltthc", { dataAdd: _params.dataAdd, truongHopId: _params.truongHopId, thuTucId: _params.thuTucId })
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    DeleteMultiThanhPhanThuTuc(_params: DeleteMultiThanhPhanHoSoParams): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/deletemultithanhphanthutuc", { ids: _params.ids })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IThanhPhanThuTuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const thanhPhanThuTucApi = new ThanhPhanThuTucService()