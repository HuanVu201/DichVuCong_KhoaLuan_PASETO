
import { Service } from "@/services";
import { ICoCauToChuc, IDeleteCoCauToChuc, ISearchCoCauToChuc } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance, { parseParams } from "@/lib/axios";

class CoCauToChucService extends Service.BaseApi implements Service.ICrud<ICoCauToChuc> {
    constructor() {
        super("cocautochucs")
    }
    Search(_params: ISearchCoCauToChuc): AxiosResponseWrapper<IPaginationResponse<ICoCauToChuc[]>> {
        return axiosInstance.get(this._urlSuffix, {
            params: _params, paramsSerializer: p => {
                return parseParams(p);
            }
        });
    }
    PortalSearch(_params: ISearchCoCauToChuc): AxiosResponseWrapper<IPaginationResponse<ICoCauToChuc[]>> {
        return axiosInstance.get(this._urlSuffix + "/portalsearch", {
            params: _params, paramsSerializer: p => {
                return parseParams(p);
            }
        });
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ICoCauToChuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    GetByGroupCode(_id: string): AxiosResponseWrapper<IResult<ICoCauToChuc>> {
        return axiosInstance.get(this._urlSuffix + "/ByGroupCode/" + _id)
    }
    Create(_data: Partial<Omit<ICoCauToChuc, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)

    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ICoCauToChuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    DeleteChildGroups(_params: IDeleteCoCauToChuc): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/DelGroupsChild", { data: _params })
    }
}

export const coCauToChucService = new CoCauToChucService()