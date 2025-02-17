import axiosInstance from "@/lib/axios";
import { ILogThongKeDGHLCongDan, ISearchLogThongKeDGHLCongDan } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { Service } from "@/services";
import { IBaseExt, IOmitUpdate, IOmitUpdateDanhGiaHaiLong, IPaginationResponse, IResult, ISoftDelete } from "@/models";

class LogThongKeDGHLCongDanService extends Service.BaseApi implements Service.ICrud<ILogThongKeDGHLCongDan >{
    constructor() {
        super("logthongkedghlcongdans")
    }
    Search(_params: ISearchLogThongKeDGHLCongDan): AxiosResponseWrapper<IPaginationResponse<ILogThongKeDGHLCongDan[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    SearchBaoCao01(_params: ISearchLogThongKeDGHLCongDan): AxiosResponseWrapper<IPaginationResponse<ILogThongKeDGHLCongDan[]>> {
        return axiosInstance.get(this._urlSuffix + '/baocao01', { params: _params })
    }
    Get(ma: string): AxiosResponseWrapper<IResult<ILogThongKeDGHLCongDan>> {
        return axiosInstance.get(this._urlSuffix + "/" + ma);
    }
    GetBaoCao1(ma: string): AxiosResponseWrapper<IResult<ILogThongKeDGHLCongDan>> {
        return axiosInstance.get(this._urlSuffix + "/chitietbaocao1/" + ma);
    }
    GetByMHS(maHS: string): AxiosResponseWrapper<IResult<ILogThongKeDGHLCongDan>> {
        return axiosInstance.get(this._urlSuffix + "/" + maHS);
    }
    Create(_data: Partial<Omit<ILogThongKeDGHLCongDan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdateDanhGiaHaiLong<ILogThongKeDGHLCongDan>): AxiosResponseWrapper {
        return axiosInstance.put(`${this._urlSuffix}?maHoSo=${_params.maHoSo}`, _params.data)
    }
    SearchPublicModule(): AxiosResponseWrapper<IPaginationResponse<ILogThongKeDGHLCongDan[]>> {
        return axiosInstance.get(this._urlSuffix + "/" + "publicmodule", { params: {} })
    }
}

export const LogThongKeDGHLCongDanApi = new LogThongKeDGHLCongDanService()