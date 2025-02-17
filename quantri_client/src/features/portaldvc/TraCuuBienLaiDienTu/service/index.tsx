import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IBienLaiDienTuPortal, ISearchBienLaiDienTuPortal, SearchBienLaiPortalParams } from "../model";

class BienLaiDienTuPortalService extends Service.BaseApi {
    constructor() {
        super("yeucauthanhtoans")
    }
    SearchBienLai(_params: SearchBienLaiPortalParams): AxiosResponseWrapper<IResult<IBienLaiDienTuPortal>> {
        return axiosInstance.get(this._urlSuffix + "/thanhtoanportal", { params: _params })
    
    }

}

export const BienLaiDienTuPortalApi = new BienLaiDienTuPortalService()