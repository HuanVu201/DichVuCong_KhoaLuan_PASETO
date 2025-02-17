import { Service } from "@/services";
import { NEACGetCertificateRequest, NEACGetCertificateResponse, NEACSignFileRequest, NEACSignFileResponse } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import axiosInstance from "@/lib/axios";

class NeacService extends Service.BaseApi {
    constructor(){
        super("neac")
    }
    GetCertificates(params: NEACGetCertificateRequest) : AxiosResponseWrapper<NEACGetCertificateResponse>{
        return axiosInstance.post(this._urlSuffix + "/getcertificates", params)
    }
    SignFile(params: NEACSignFileRequest) : AxiosResponseWrapper<NEACSignFileResponse> {
        return axiosInstance.post(this._urlSuffix + "/signfile", params)
    }
}

export const neacService = new NeacService()