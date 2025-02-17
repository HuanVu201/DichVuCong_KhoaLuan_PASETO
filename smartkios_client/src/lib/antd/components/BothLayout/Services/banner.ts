import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import {Service} from '../../../../../services'
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import { IBannerPortal } from "../Models/Banner";
export class BannerService extends Service.BaseApi implements Service.ICrud<IBannerPortal>{
    constructor(){
        super("banners");
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IBannerPortal>> {
        throw new Error("Method not implemented.");
    }
    Create(_data: Partial<Omit<IBannerPortal, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Delete(_id: ISoftDelete): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IBannerPortal>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Search(_params: IPickSearch<IBannerPortal>): AxiosResponseWrapper<IPaginationResponse<IBannerPortal[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
   
}