import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { ITraCuuThongTinDoanhNghiep, ISearchTraCuuThongTinDoanhNghiep } from "../models";

class TraCuuThongTinDoanhNghiepService extends Service.BaseApi implements Service.ICrud<ITraCuuThongTinDoanhNghiep> {
    constructor() {
        super("tracuuthongtindoanhnghieps")
    }
    Search(_params: IPickSearch<ITraCuuThongTinDoanhNghiep, "maSoDoanhNghiep">): AxiosResponseWrapper<IPaginationResponse<ITraCuuThongTinDoanhNghiep[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITraCuuThongTinDoanhNghiep>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ITraCuuThongTinDoanhNghiep, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITraCuuThongTinDoanhNghiep>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchTraCuuThongTinDoanhNghiep): AxiosResponseWrapper<IPaginationResponse<ITraCuuThongTinDoanhNghiep[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const traCuuThongTinDoanhNghiepApi = new TraCuuThongTinDoanhNghiepService()