

import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IHoSo } from "@/features/hoso/models";
import { IAdminHoSo } from "../models/AdminHoSoDto";
import { AdminUpdateYeuCauThanhToanParams, IAdminYeuCauThanhToan } from "../models/AdminYeuCauThanhToanDto";

export type DatLaiNgayHenTraParams = {
    id: string;
    NgayHenTra: string;
}

export type DatLaiQuyTrinhXuLyParams = {
    HoSoId: string;
    NodeQuyTrinhId?: string;
    NguoiXuLys: string[]
}
export type AdminUpdateHoSoParams = IOmitUpdate<IHoSo& {deletedThanhPhanIds?: string[]}> ;
class AdminHoSoService extends Service.BaseApi implements Omit<Service.ICrud<IHoSo>, "Delete">{
    constructor() {
        super("adminhosos")
    }
    Search(_params: IPickSearch<IHoSo>): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        throw new Error("Method not implemented.");
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        throw new Error("Method not implemented.");
       
    }
    AdminGetHoSo(_id:string): AxiosResponseWrapper<IResult<IAdminHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/"+ _id);
    }
    AdminGetYeuCauThanhToan(_id:string): AxiosResponseWrapper<IResult<IAdminYeuCauThanhToan>> {
        return axiosInstance.get(this._urlSuffix + "/YeuCauThanhToan/"+ _id);
    }
    AdminUpdateYeuCauThanhToanService(_params: AdminUpdateYeuCauThanhToanParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/YeuCauThanhToan/Update/" + _params.id, _params.data, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
    Create(_data: Partial<Omit<IHoSo, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IHoSo>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    
    DatLaiNgayHenTra(params:DatLaiNgayHenTraParams) : AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/datlaingayhentra/" + params.id, params)
    }
    DatLaiQuyTrinhXuLy(params:DatLaiQuyTrinhXuLyParams) : AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/datlaiquytrinhxuly/" + params.HoSoId, params)
    }
    AdminUpdateHoSo(_params: AdminUpdateHoSoParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/Update/" + _params.id, _params.data, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
}

export const adminHoSoApi = new AdminHoSoService()