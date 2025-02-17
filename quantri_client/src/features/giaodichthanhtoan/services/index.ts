import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IConfirmDvcPaymentResponse, IGiaoDichThanhToan, ISearchGiaoDichThanhToan } from "../models";

class GiaoDichThanhToanService extends Service.BaseApi implements Service.ICrud<IGiaoDichThanhToan> {
    constructor() {
        super("giaodichthanhtoans")
    }
    Search(_params: IPickSearch<IGiaoDichThanhToan>): AxiosResponseWrapper<IPaginationResponse<IGiaoDichThanhToan[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IGiaoDichThanhToan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Checkconfirm(_id: string): AxiosResponseWrapper<IResult<IConfirmDvcPaymentResponse>> {
        return axiosInstance.get(this._urlSuffix + "/CheckConfirmPayment/" + _id);
    }
    Create(_data: Partial<Omit<IGiaoDichThanhToan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IGiaoDichThanhToan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchGiaoDichThanhToan): AxiosResponseWrapper<IPaginationResponse<IGiaoDichThanhToan[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
    GetByMaThamChieu(ma: string): AxiosResponseWrapper {
        return axiosInstance.get(this._urlSuffix + "/GetByMaThamChieu/" + ma);
    }
}

export const giaoDichThanhToanApi = new GiaoDichThanhToanService()