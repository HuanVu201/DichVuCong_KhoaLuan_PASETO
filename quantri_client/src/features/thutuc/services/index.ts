import axiosInstance, { parseParams } from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { INguoiTiepNhanThuTuc, ISearchNguoiTiepNhanThuTuc, ISearchThuTuc, ISearchThuTucTheoBaoCaoTongHop, IThuTuc, IimportThuTuc } from "../models";

export class ThuTucService extends Service.BaseApi implements Service.ICrud<IThuTuc> {
    constructor() {
        super("thutucs")
    }
    ImportThuTucs(_data: IimportThuTuc): AxiosResponseWrapper {
        return axiosInstance.post('/api/importthutucs', _data)
    }
    Search(_params: ISearchThuTuc): AxiosResponseWrapper<IPaginationResponse<IThuTuc[]>> {
        return axiosInstance.get(this._urlSuffix, {
            params: _params, paramsSerializer: p => {
                return parseParams(p) + `${_params.laThuTucChungThuc == false ? `&laThuTucChungThuc=${_params.laThuTucChungThuc}` : ""}`;
            }
        })
    }
    SearchDVCNoiBat(_params: ISearchThuTuc): AxiosResponseWrapper<IThuTuc[]> {
        return axiosInstance.get(this._urlSuffix + "/PortalGetDVCNoiBat", {
            params: _params, paramsSerializer: p => {
                return parseParams(p);
            }
        })
    }
    SearchTheoBaoCaoTongHop(_params: ISearchThuTucTheoBaoCaoTongHop): AxiosResponseWrapper<IPaginationResponse<IThuTuc[]>> {
        return axiosInstance.get(this._urlSuffix + "/search/theobaocaotonghop", {
            params: _params, paramsSerializer: p => {
                return parseParams(p);
            }
        })
    }
    SearchNguoiTiepNhanThuTucs(params: IPickSearch<INguoiTiepNhanThuTuc, "maTTHC" | "tenTTHC">): AxiosResponseWrapper<IPaginationResponse<INguoiTiepNhanThuTuc[]>> {
        return axiosInstance.get('/api/v1/searchnguoitiepnhanthutucs', { params: params })
    }
    PortalSearch(_params: ISearchThuTuc): AxiosResponseWrapper<IPaginationResponse<IThuTuc[]>> {
        return axiosInstance.get(this._urlSuffix + "/portalsearch", {
            params: _params, paramsSerializer: p => {
                return parseParams(p);
            }
        })
    }
    SearchDanhMucTTHC(_params: ISearchThuTuc): AxiosResponseWrapper<IPaginationResponse<IThuTuc[]>> {
        return axiosInstance.get('/api/v1/linhvucs/api/filterlinhvuc', { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IThuTuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    GetByMa(maTTHC: string): AxiosResponseWrapper<IResult<IThuTuc>> {
        return axiosInstance.get(this._urlSuffix + "/maTTHC/" + maTTHC);
    }
    Create(_data: Partial<Omit<IThuTuc, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IThuTuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const thuTucApi = new ThuTucService()