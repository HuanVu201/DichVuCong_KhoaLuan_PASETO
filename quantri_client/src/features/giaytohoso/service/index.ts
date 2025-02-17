import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
// import { IGiayToHoSo, ISearchGiayToHoSo } from "../models";
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models";
import { IGiayToHoSo, IGiayToHoSoParams, ISearchGiayToHoSo } from "../models";

export type AddGiayToHoSoParams = Partial<Omit<IGiayToHoSo , keyof IBaseExt<string>>>

export type GetGiayToHoSoParams = {id?: string; fileUrl?: string; soDinhDanh?:string}

class GiayToHoSoService extends Service.BaseApi implements Omit<Service.ICrud<IGiayToHoSo>,"Get">{
    constructor(){
        super("giaytohosos")
    }
    Search(_params: ISearchGiayToHoSo): AxiosResponseWrapper<IPaginationResponse<IGiayToHoSo[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    UpdateGTHSWithMaGiayTo(_params: IGiayToHoSoParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + '/updatewithmagiayto', _params)
    }
    Get(maGiayTo: string): AxiosResponseWrapper<IResult<IGiayToHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/" + maGiayTo);
    }
    Create(data: AddGiayToHoSoParams): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IGiayToHoSo>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const giayToHoSoApi = new GiayToHoSoService()
