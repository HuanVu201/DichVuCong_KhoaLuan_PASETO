import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IBaseExt, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IMenuKetQuaThuTuc, ISearchMenuKetQuaThuTuc } from "../models";
import { IMenu } from "@/features/danhmucmenu/models";

export type MenuKetQuaThuTucSearchResponse = {
    navMenu: IMenu[]; 
    menuKetQuaThuTucs: IPaginationResponse<IMenuKetQuaThuTuc[]>;
}

class MenuKetQuaThuTucService extends Service.BaseApi implements Omit<Service.ICrud<IMenuKetQuaThuTuc>, "Search">{
   constructor(){
    super("menuketquathutucs");
   }
    Search(_params: ISearchMenuKetQuaThuTuc): AxiosResponseWrapper<MenuKetQuaThuTucSearchResponse> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IMenuKetQuaThuTuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<IMenuKetQuaThuTuc, keyof IBaseExt<string>>>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix,_data)
        
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IMenuKetQuaThuTuc>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
   
}

export const menuKetQuaThuTucApi = new MenuKetQuaThuTucService()