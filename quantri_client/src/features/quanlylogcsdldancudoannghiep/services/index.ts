import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGetUrlPhoi, ILogCSDLDanCuDoanhNghiep } from "../models";

class LogCSDLDanCuDoanhNghiepService extends Service.BaseApi implements Service.ICrud<ILogCSDLDanCuDoanhNghiep> {
    constructor() {
        super("logtaikhoancsdldancudoanhnghieps")
    }
    Search(_params: IPickSearch<ILogCSDLDanCuDoanhNghiep>): AxiosResponseWrapper<IPaginationResponse<ILogCSDLDanCuDoanhNghiep[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    GetUrlPhoi(_params: IPickSearch<IGetUrlPhoi, "loaiPhoi" | "maDonVi" | "maLinhVuc" | "maThuTuc">): AxiosResponseWrapper<string> {
        return axiosInstance.get(this._urlSuffix + "/urllogcsdldancudoanhnghiep", { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ILogCSDLDanCuDoanhNghiep>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ILogCSDLDanCuDoanhNghiep, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ILogCSDLDanCuDoanhNghiep>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const LogCSDLDanCuDoanhNghiepApi = new LogCSDLDanCuDoanhNghiepService()