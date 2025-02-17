import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import {Service} from '../../../../../services'
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import { IFooterPortal } from "../Models/Footer";
export class FooterService extends Service.BaseApi implements Service.ICrud<IFooterPortal>{
    constructor(){
        super("footers");
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IFooterPortal>> {
        throw new Error("Method not implemented.");
    }
    Create(_data: Partial<Omit<IFooterPortal, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Delete(_id: ISoftDelete): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IFooterPortal>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Search(_params: IPickSearch<IFooterPortal>): AxiosResponseWrapper<IPaginationResponse<IFooterPortal[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
   
}