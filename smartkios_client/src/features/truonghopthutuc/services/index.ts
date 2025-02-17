import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGetDuLieuThemHoSo, ISearchTruongHopThuTuc, ITruongHopThuTuc, TruongHopThuTucQuyTrinhResponse } from "../models";

export type DuLieuThemHoSoParams = {
    truongHopId: string;
    thuTucId: string;
    returnUserInfo?: boolean;
    returnPhiLePhi?: boolean;
    userId?: string;
    donViId?: string;
    returnDonVi?: boolean;
    returnThuTuc?: boolean;
}

export class TruongHopThuTucService extends Service.BaseApi implements Service.ICrud<ITruongHopThuTuc>{
    constructor() {
        super("truonghopthutucs")
    }
    Search(_params: ISearchTruongHopThuTuc): AxiosResponseWrapper<IPaginationResponse<ITruongHopThuTuc[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITruongHopThuTuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }

    Create(_data: Partial<Omit<ITruongHopThuTuc, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    NhanBanTruongHopThuTuc(id: any): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/duplicate", id)
    }
    NhanBanThanhPhanThuTuc(_params: IOmitUpdate<ITruongHopThuTuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITruongHopThuTuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    GetDuLieuThemHoSo(data: DuLieuThemHoSoParams): AxiosResponseWrapper<IResult<IGetDuLieuThemHoSo>> {
        return axiosInstance.post(this._urlSuffix + "/dulieuthemhoso", data);
    }
    GetByHoSoId(hoSoId: string): AxiosResponseWrapper<IResult<TruongHopThuTucQuyTrinhResponse>> {
        return axiosInstance.get(this._urlSuffix + "/hoso/" + hoSoId);
    }
}

export const truongHopThuTucApi = new TruongHopThuTucService()