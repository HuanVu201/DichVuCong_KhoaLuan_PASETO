import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from '@/models';
import { Service } from "@/services";
import { IGiayToSoHoaChiaSe } from "../models/GiayToSoHoaChiaSeModel";

class GiayToSoHoaChiaSeService extends Service.BaseApi implements Service.ICrud<IGiayToSoHoaChiaSe> {
    constructor() {
        super("giaytosohoachiases")
    }
    Search(_params: IPickSearch<IGiayToSoHoaChiaSe, "soDinhDanh" | "giayToSoHoaId" | "maDinhDanhChiaSe" >): AxiosResponseWrapper<IPaginationResponse<IGiayToSoHoaChiaSe[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IGiayToSoHoaChiaSe>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IGiayToSoHoaChiaSe, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IGiayToSoHoaChiaSe>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const GiayToSoHoaChiaSeApi = new GiayToSoHoaChiaSeService()