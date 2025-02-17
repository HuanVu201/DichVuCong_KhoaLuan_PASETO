import { Service } from "@/services";
import { IKySoNEAC, NEACGetCertificateRequest, NEACGetCertificateResponse, NEACSignFileRequest, NEACSignFileResponse } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import axiosInstance from "@/lib/axios";
import { IBasePagination, IPaginationResponse, IResult } from "@/models";

class NeacService extends Service.BaseApi {
    constructor() {
        super("neacs")
    }
    GetCertificates(params: NEACGetCertificateRequest): AxiosResponseWrapper<NEACGetCertificateResponse> {
        return axiosInstance.post(this._urlSuffix + "/GetCertificates", params)
    }
    SignFile(params: NEACSignFileRequest): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix + "/SignFile", params)
    }
    GetDatas(params: IBasePagination): AxiosResponseWrapper<IPaginationResponse<IKySoNEAC[]>> {
        return axiosInstance.post(this._urlSuffix + "/GetDatas", params)
    }
}

export const neacService = new NeacService()