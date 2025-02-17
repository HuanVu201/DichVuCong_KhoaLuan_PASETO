import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import {Service} from '../../../../../services'
import { IMenuPortal } from "../Models/KenhTin";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
export class MenuPortalService extends Service.BaseApi implements Service.ICrud<IMenuPortal>{
    constructor(){
        super("kenhtins");
    }
    Search(_params: IPickSearch<IMenuPortal>): AxiosResponseWrapper<IPaginationResponse<IMenuPortal[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IMenuPortal>> {
        throw new Error("Method not implemented.");
    }
    Create(_data: Partial<Omit<IMenuPortal, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Delete(_id: ISoftDelete): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IMenuPortal>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
}