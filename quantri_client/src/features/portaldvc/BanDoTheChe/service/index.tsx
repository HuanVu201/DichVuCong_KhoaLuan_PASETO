import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { ICoordinates, ISearchCoordinates, ISearchSoLieuBaoCao, ISoLieuBaoCao } from "../models";

class SoLieuBaoCaoService extends Service.BaseApi {
    constructor() {
        super("soLieuBaoCaos")
    }
    SearchSoLieuBaoCaoTheoKy(_params: ISearchSoLieuBaoCao): AxiosResponseWrapper<IPaginationResponse<ISoLieuBaoCao[]>> {
        return axiosInstance.get(this._urlSuffix + '/SearchSoLieuBaoCaoTheoKy', { params: _params })
    }
    SearchSoLieuBaoCaoHienTai(_params: ISearchSoLieuBaoCao): AxiosResponseWrapper<IPaginationResponse<ISoLieuBaoCao[]>> {
        return axiosInstance.get(this._urlSuffix + '/SearchSoLieuBaoCaoHienTai', { params: _params })
    }
    GetCoordinates(_params: ISearchCoordinates): AxiosResponseWrapper<IPaginationResponse<ICoordinates[]>> {
        return axiosInstance.get(this._urlSuffix + '/GetCoordinates', { params: _params })
    }
}

export const SoLieuBaoCaoApi = new SoLieuBaoCaoService()