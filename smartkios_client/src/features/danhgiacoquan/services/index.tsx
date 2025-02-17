import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IDanhGiaCoQuan, ISearchDanhGiaCoQuan } from "../models";

class DanhGiaCoQuanService extends Service.BaseApi implements Service.ICrud<IDanhGiaCoQuan>{
    constructor(){
        super("danhgiacoquans")
    }
    Search(_params: ISearchDanhGiaCoQuan): AxiosResponseWrapper<IPaginationResponse<IDanhGiaCoQuan[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    SearchBaoCao02(_params: ISearchDanhGiaCoQuan): AxiosResponseWrapper<IPaginationResponse<IDanhGiaCoQuan[]>> {
        return axiosInstance.get(this._urlSuffix + '/searchbaocao02', {params: _params})
    }
    Get(ma: string): AxiosResponseWrapper<IResult<IDanhGiaCoQuan>> {
        return axiosInstance.get(this._urlSuffix + "/" + ma);
    }
    Create(_data: Partial<Omit<IDanhGiaCoQuan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhGiaCoQuan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchPublicModule(): AxiosResponseWrapper<IPaginationResponse<IDanhGiaCoQuan[]>> {
        return axiosInstance.get(this._urlSuffix + "/" + "publicmodule", {params: {}})
    }
}

export const DanhGiaCoQuanApi = new DanhGiaCoQuanService()