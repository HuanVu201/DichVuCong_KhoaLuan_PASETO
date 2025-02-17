import axiosInstance from "@/lib/axios";
import { IPhieuKhaoSat, ISearchPhieuKhaoSat } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { Service } from "@/services";
import { IBaseExt, IOmitUpdate, IOmitUpdateDanhGiaHaiLong, IPaginationResponse, IResult, ISoftDelete } from "@/models";

class PhieuKhaoSatService extends Service.BaseApi implements Service.ICrud<IPhieuKhaoSat>{
    constructor() {
        super("phieukhaosats")
    }
    Search(_params: ISearchPhieuKhaoSat): AxiosResponseWrapper<IPaginationResponse<IPhieuKhaoSat[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    SearchBaoCao01(_params: ISearchPhieuKhaoSat): AxiosResponseWrapper<IPaginationResponse<IPhieuKhaoSat[]>> {
        return axiosInstance.get(this._urlSuffix + '/baocao01', { params: _params })
    }
    Get(ma: string): AxiosResponseWrapper<IResult<IPhieuKhaoSat>> {
        return axiosInstance.get(this._urlSuffix + "/" + ma);
    }
    GetBaoCao1(ma: string): AxiosResponseWrapper<IResult<IPhieuKhaoSat>> {
        return axiosInstance.get(this._urlSuffix + "/chitietbaocao1/" + ma);
    }
    GetByMHS(maHS: string): AxiosResponseWrapper<IResult<IPhieuKhaoSat>> {
        return axiosInstance.get(this._urlSuffix + "/" + maHS);
    }
    Create(_data: Partial<Omit<IPhieuKhaoSat, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdateDanhGiaHaiLong<IPhieuKhaoSat>): AxiosResponseWrapper {
        return axiosInstance.put(`${this._urlSuffix}?maHoSo=${_params.maHoSo}`, _params.data)
    }
    SearchPublicModule(): AxiosResponseWrapper<IPaginationResponse<IPhieuKhaoSat[]>> {
        return axiosInstance.get(this._urlSuffix + "/" + "publicmodule", { params: {} })
    }
}

export const PhieuKhaoSatApi = new PhieuKhaoSatService()