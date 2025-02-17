import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "../models";
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models";

export type AddGiayToSoHoaParams = Partial<Omit<IGiayToSoHoa , keyof IBaseExt<string>> & {thanhPhanHoSoId: string; hoSoId: string; trichYeuKetQua?: string;}>;

export type GetGiayToSoHoaParams = {id?: string; fileUrl?: string; soDinhDanh?:string}

class GiayToSoHoaService extends Service.BaseApi implements Omit<Service.ICrud<IGiayToSoHoa>,"Get">{
    constructor(){
        super("giaytosohoas")
    }
    Search(_params: ISearchGiayToSoHoa): AxiosResponseWrapper<IPaginationResponse<IGiayToSoHoa[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(params: GetGiayToSoHoaParams): AxiosResponseWrapper<IResult<IGiayToSoHoa>> {
        return axiosInstance.post(this._urlSuffix + "/detail",{fileUrl: params.fileUrl, soDinhDanh: params.soDinhDanh, id: params.id});
    }
    Create(data: AddGiayToSoHoaParams): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IGiayToSoHoa>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const giayToSoHoaApi = new GiayToSoHoaService()