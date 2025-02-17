import axiosInstance, { parseParams } from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IBienLaiDienTuDto, ISearchYeuCauThanhToan, IYeuCauThanhToan } from "../models";
import { IConfirmDvcPaymentResponse } from "@/features/giaodichthanhtoan/models";

class YeuCauThanhToanService extends Service.BaseApi implements Service.ICrud<IYeuCauThanhToan> {
    constructor() {
        super("yeucauthanhtoans")
    }
    Search(_params: ISearchYeuCauThanhToan): AxiosResponseWrapper<IPaginationResponse<IYeuCauThanhToan[]>> {
        return axiosInstance.get(this._urlSuffix, {
            params: _params, paramsSerializer: p => {
                return parseParams(p);
            }
        })
    }
    SearchThongKeThuPhiLePhi(_params: ISearchYeuCauThanhToan): AxiosResponseWrapper<IPaginationResponse<IYeuCauThanhToan[]>> {
        return axiosInstance.get(this._urlSuffix + '/SearchThongKeThuPhiLePhi', {
            params: _params, paramsSerializer: p => {
                return parseParams(p);
            }
        })
    }
    SearchTheoBaoCaoTTTT(_params: ISearchYeuCauThanhToan): AxiosResponseWrapper<IPaginationResponse<IYeuCauThanhToan[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoBaoCaoTTTT", { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IYeuCauThanhToan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IYeuCauThanhToan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IYeuCauThanhToan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/edit/" + _params.id, _params.data)
    }
    Pay(_params: IOmitUpdate<IYeuCauThanhToan>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/pay", _params.data)
    }
    InitBienLai(_params: IOmitUpdate<IBienLaiDienTuDto>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/InitBienLai", _params.data)
    }
    YeuCauThanhToanLai(_params: IOmitUpdate<IYeuCauThanhToan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/yeucaulai", _params.data)
    }
    UpdateBienLai(_params: IOmitUpdate<IYeuCauThanhToan>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/UpdateBienLai", _params.data)
    }
}

export const yeuCauThanhToanApi = new YeuCauThanhToanService()