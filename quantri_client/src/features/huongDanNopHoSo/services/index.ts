import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IHuongDanNopHoSo } from "../models";
import { IXuatPhieuActionParams } from "@/features/hoso/models";

class HuongDanNopHoSoService extends Service.BaseApi implements Service.ICrud<IHuongDanNopHoSo>{
    constructor(){
        super("huongdannophosos")
    }
    Search(_params: IPickSearch<IHuongDanNopHoSo>): AxiosResponseWrapper<IPaginationResponse<IHuongDanNopHoSo[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IHuongDanNopHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/detail",{params: {id:_id}});
    }
    XuatPhieuAction(_params: IXuatPhieuActionParams): AxiosResponseWrapper<IResult<IHuongDanNopHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/xuatphieu", { params: _params });
    }
    Create(_data: Partial<Omit<IHuongDanNopHoSo, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IHuongDanNopHoSo>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const huongDanNopHoSoApi = new HuongDanNopHoSoService()