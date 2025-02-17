import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGetLogAuthenParams, ILogAuthen, ISearchLogAuthenParams } from "../model";

class LogAuthenService extends Service.BaseApi {
    constructor() {
        super("logauthens")
    }
    SearchLogAuthen(_params: ISearchLogAuthenParams): AxiosResponseWrapper<IPaginationResponse<ILogAuthen[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    GetLogAuthenDetail(_params: IPickSearch<IGetLogAuthenParams, "id">): AxiosResponseWrapper<ILogAuthen> {
        return axiosInstance.get(this._urlSuffix + "/detail", { params: _params })
    }
    CountAccessPortal(): AxiosResponseWrapper<any> {
        return axiosInstance.get(this._urlSuffix + "/countaccessportal")
    }
}

export const LogAuthenApi = new LogAuthenService()