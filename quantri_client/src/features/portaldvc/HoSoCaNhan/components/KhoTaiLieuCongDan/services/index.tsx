import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDataChartTaiLieuCongDan, ISearchThongKeNguoiSuDungKho, ITaiLieuLuuTruCongDan, IThongKeNguoiSuDungKho } from "../models";

export type SearchDanhSachTaiLieuCongDan = IPickSearch<ITaiLieuLuuTruCongDan, "khoLuuTruId" | "nguon">
export type AdminAddTaiLieuVaoKho = {
    tenGiayTo: string;
    duongDan: string;
    nguon?: string;
    loaiGiayToId?: string;
    soGiayToChuHoSo: string;
}


class KhoTaiLieuCongDanService extends Service.BaseApi {
    constructor() {
        super("tailieucongdans")
    }
    // Kho lưu trữ===========================================================================================
    CheckExistedKho(_data: Partial<Omit<ITaiLieuLuuTruCongDan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/CheckExistedKho", _data)
    }

    UpdateKhoLuuTru(_params: IOmitUpdate<ITaiLieuLuuTruCongDan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateKhoLuuTru", _params.data)
    }

    // Tài liệu cá nhân ===========================================================================================
    AddTaiLieuVaoKho(_data: Partial<Omit<ITaiLieuLuuTruCongDan, keyof IBaseExt<string>>>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/AddTaiLieuVaoKho", _data)
    }
    AdminAddTaiLieuVaoKho(_data: AdminAddTaiLieuVaoKho): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/Admin/AddTaiLieuVaoKho", _data)
    }


    DeleteTaiLieu(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/DeleteTaiLieu/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    AdminDeleteTaiLieu(_params: ISoftDelete & {khoLuuTruId: string}): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/Admin/DeleteTaiLieu/" + _params.id, { data: { forceDelete: _params.forceDelete, khoLuuTruId: _params.khoLuuTruId } })
    }

    UpdateTaiLieu(_params: IOmitUpdate<ITaiLieuLuuTruCongDan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateTaiLieu/" + _params.id, _params.data)
    }

    GetTaiLieu(_id: string): AxiosResponseWrapper<IResult<ITaiLieuLuuTruCongDan>> {
        return axiosInstance.get(this._urlSuffix + "/GetTaiLieu/" + _id);
    }

    SearchTaiLieuTrongKho(_params: IPickSearch<ITaiLieuLuuTruCongDan>): AxiosResponseWrapper<IPaginationResponse<ITaiLieuLuuTruCongDan[]>> {
        return axiosInstance.get(this._urlSuffix + '/SearchTaiLieuTrongKho', { params: _params })
    }

    GetDataChartTaiLieuCongDan(_params: IPickSearch<ITaiLieuLuuTruCongDan>): AxiosResponseWrapper<IResult<IDataChartTaiLieuCongDan>> {
        return axiosInstance.get(this._urlSuffix + '/GetDataChartTaiLieuCongDan', { params: _params })
    }
    DanhSachTaiLieuCongDan(_params: SearchDanhSachTaiLieuCongDan): AxiosResponseWrapper<IPaginationResponse<ITaiLieuLuuTruCongDan[]>> {
        return axiosInstance.get(this._urlSuffix + '/DanhSachTaiLieuCongDan', { params: _params })
    }

    //Tài liệu được chia sẻ===========================================================================================
    AddChiaSeTaiLieu(_data: Partial<Omit<ITaiLieuLuuTruCongDan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/ChiaSeTaiLieu", _data)
    }

    DeleteTaiLieuChiaSe(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/DeleteTaiLieuChiaSe/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    DeleteKhoLuuTru(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/DeleteKhoLuuTru/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }

    SearchTaiLieuDuocChiaSe(_params: IPickSearch<ITaiLieuLuuTruCongDan>): AxiosResponseWrapper<IPaginationResponse<ITaiLieuLuuTruCongDan[]>> {
        return axiosInstance.get(this._urlSuffix + '/SearchTaiLieuDuocChiaSe', { params: _params })
    }

    // Thống kê ==========================================================================================================
    TinhHinhSuDungTaiLieuCaNhan(): AxiosResponseWrapper<any> {
        return axiosInstance.get(this._urlSuffix + "/TinhHinhSuDungTaiLieuCaNhan", { params: null });
    }

    DungLuongTheoNguonTaiLen(
        _params: { soDinhDanh?: string, fullName?: string }
    ): AxiosResponseWrapper<any> {
        return axiosInstance.get(this._urlSuffix + "/DungLuongTheoNguonTaiLen", { params: _params });
    }

    DanhSachSuDungKhoTaiLieu(_params: ISearchThongKeNguoiSuDungKho): AxiosResponseWrapper<IPaginationResponse<IThongKeNguoiSuDungKho[]>> {
        return axiosInstance.get(this._urlSuffix + '/DanhSachSuDungKhoTaiLieu', { params: _params })
    }


}

export const khoTaiLieuCongDanApi = new KhoTaiLieuCongDanService()