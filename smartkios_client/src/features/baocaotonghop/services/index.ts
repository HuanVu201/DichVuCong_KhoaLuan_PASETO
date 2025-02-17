import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IBaoCaoDonVi, ISearchBaoCaoDonVi } from "../model";

class BaoCaoTongHopService extends Service.BaseApi {
    constructor(){
        super("baocaotonghops")
    }
    BaoCaoTongHopDonVi(data: ISearchBaoCaoDonVi): AxiosResponseWrapper<{data: IBaoCaoDonVi[]}> {
        return axiosInstance.post(this._urlSuffix + "/donvi", data)
    }
}

export const baoCaoTongHopApi = new BaoCaoTongHopService()