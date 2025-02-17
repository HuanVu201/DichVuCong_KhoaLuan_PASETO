import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IApiChiaSe, ISearchApiChiaSe } from "../models";

class ApiChiaSeService extends Service.BaseApi {
    constructor() {
        super("apichiases")
    }
    CreateApiChiaSe(_data: Partial<Omit<IApiChiaSe, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + '/addApiChiaSe', _data)
    }
    CreateLichSuApiChiaSe(_data: Partial<Omit<IApiChiaSe, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + '/addLichSuApiChiaSe', _data)
    }
    UpdateApiChiaSe(_params: IOmitUpdate<IApiChiaSe>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IApiChiaSe>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    GetApiByMa(_params: { maApi: string }): AxiosResponseWrapper<IResult<IApiChiaSe>> {
        return axiosInstance.get(this._urlSuffix + "/GetApiByMa", { params: _params })
    }
    SearchApiChiaSe(_params: ISearchApiChiaSe): AxiosResponseWrapper<IPaginationResponse<IApiChiaSe[]>> {
        return axiosInstance.get(this._urlSuffix + '/searchApiChiaSe', { params: _params })
    }
    SearchLichSuApiChiaSe(_params: ISearchApiChiaSe): AxiosResponseWrapper<IPaginationResponse<IApiChiaSe[]>> {
        return axiosInstance.get(this._urlSuffix + '/searchLichSuApiChiaSe', { params: _params })
    }

    SearchHoSoExpandApi(_params: ISearchApiChiaSe): AxiosResponseWrapper<IPaginationResponse<IApiChiaSe[]>> {
        return axiosInstance.get(this._urlSuffix + '/searchHoSoExpandApi', { params: _params })
    }
    GetHoSoExpandApi(_id: string): AxiosResponseWrapper<IResult<IApiChiaSe>> {
        return axiosInstance.get(this._urlSuffix + "/detailHoSoExpandApi/" + _id);
    }
    SearchGTSHExpandApi(_params: ISearchApiChiaSe): AxiosResponseWrapper<IPaginationResponse<IApiChiaSe[]>> {
        return axiosInstance.get(this._urlSuffix + '/searchGTSHExpandApi', { params: _params })
    }

}

export const ApiChiaSe = new ApiChiaSeService()