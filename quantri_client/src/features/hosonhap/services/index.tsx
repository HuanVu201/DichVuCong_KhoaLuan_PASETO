import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete, IDeleteFiles } from "../../../models";
import { Service } from "../../../services";
import { IHoSoNhap } from "../models";
import { IThemHoSo } from "@/features/hoso/components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal";

export type GetHoSoNhapDetailParams = {
    view?: string,
    returnNodeQuyTrinh?: boolean
    id: string
}

export type DeleteHoSoNhapParams = {
    forceDelete: boolean,
    lyDoXoa: string
    ids: string[]
}

class HoSoNhapService extends Service.BaseApi implements Omit<Service.ICrud<IHoSoNhap>, "Delete"> {
    constructor() {
        super("hosonhaps")
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IHoSoNhap>> {
        throw new Error("Method not implemented.");
    }
    Search(_params: IPickSearch<IHoSoNhap, "soDinhDanh" | "maDinhDanh">): AxiosResponseWrapper<IPaginationResponse<IHoSoNhap[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    GetDetail(_params: GetHoSoNhapDetailParams): AxiosResponseWrapper<IResult<IHoSoNhap>> {
        return axiosInstance.get(this._urlSuffix + "/" + _params.id, { params: _params });
    }
    Create(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: DeleteHoSoNhapParams): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix, { data: { forceDelete: _params.forceDelete, lyDoXoa: _params.lyDoXoa, ids: _params.ids } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IHoSoNhap>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const hoSoNhapApi = new HoSoNhapService()