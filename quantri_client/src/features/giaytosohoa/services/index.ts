import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "../models";
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models";

export type AddGiayToSoHoaParams = Partial<Omit<IGiayToSoHoa , keyof IBaseExt<string>> & {thanhPhanHoSoId: string; hoSoId: string; trichYeuKetQua?: string;}>;
export type CapNhatTrangThaiSoHoaReq = Pick<IGiayToSoHoa, "trangThaiSoHoa" | "id">

export type GetGiayToSoHoaParams = {id?: string; fileUrl?: string; soDinhDanh?:string}

export type GetDanhSachKetQuaCanBoRequest = {
    SoDinhDanhChuSoHuu: string;
    MaThuTuc: string;
    DanhSachDanhMucKetQua: {
        MaKetQua: string;
        SoKyHieu: string;
    }[]
}
export type GetDanhSachKetQuaCaNhanWithoutDanhMucRequest = Pick<GetDanhSachKetQuaCaNhanRequest, "MaThuTuc">
export type GetDanhSachKetQuaCanBoWithoutDanhMucRequest = Pick<GetDanhSachKetQuaCanBoRequest, "MaThuTuc" | "SoDinhDanhChuSoHuu">

export type GetDanhSachKetQuaCaNhanRequest = {
    MaThuTuc: string;
    DanhSachDanhMucKetQua: {
        MaKetQua: string;
        SoKyHieu: string;
    }[]
}

export type GetDanhSachKetQuaResponse = {
    maKetQua : string;
    tenGiayTo  : string;
    soKyHieu  : string;
    coQuanChuQuan  : string;
    danhSachTepDinhKem  : {
        tenTep : string;
        duongDan : string;
    }[]
}

export type GetKetQuaByURLRequest = {
    CoQuanChuQuan: string;
    DanhSachTepDinhKem: {
        tenTep : string;
        duongDan : string;
    }[];
}
export type GetListKetQuaByUrlRequest = {
    DanhSachKetQuas: (GetKetQuaByURLRequest & {SoKyHieu: string, TenGiayTo: string})[],
    SoGiayToChuHoSo: string;
    Nguon: string;
}
export type UploadFileResult = {
    fileName: string;
    path: string;
    isSucceed: string;
    error: string;
    soKyHieu: string;
    coQuanChuQuan: string;
}

class GiayToSoHoaService extends Service.BaseApi implements Omit<Service.ICrud<IGiayToSoHoa>,"Get">{
    constructor(){
        super("giaytosohoas")
    }
    Search(_params: ISearchGiayToSoHoa): AxiosResponseWrapper<IPaginationResponse<IGiayToSoHoa[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    SearchGTSHOutsideKhoTaiLieu(_params: ISearchGiayToSoHoa): AxiosResponseWrapper<IPaginationResponse<IGiayToSoHoa[]>> {
        return axiosInstance.get(this._urlSuffix + "/GTSHOutsideKhoTaiLieu", {params: _params})
    }
    Get(params: GetGiayToSoHoaParams): AxiosResponseWrapper<IResult<IGiayToSoHoa>> {
        return axiosInstance.post(this._urlSuffix + "/detail",{fileUrl: params.fileUrl, soDinhDanh: params.soDinhDanh, id: params.id});
    }
    Create(data: AddGiayToSoHoaParams): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    CapNhatTrangThaiSoHoa(data: CapNhatTrangThaiSoHoaReq): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.put(this._urlSuffix + "/CapNhatTrangThaiSoHoa/" + data.id, data)
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IGiayToSoHoa>): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    UpdateGTSHKhoTaiLieu(_params: IOmitUpdate<IGiayToSoHoa>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateGTSHKhoTaiLieu/" + _params.id, _params.data)
    }
    DanhSachGiayToKhoQuocGiaCanBo(_params: GetDanhSachKetQuaCanBoRequest): AxiosResponseWrapper<IResult<GetDanhSachKetQuaResponse[]>> {
        return axiosInstance.post(this._urlSuffix + "/DanhSachGiayToKhoQuocGiaCanBo/", _params)
    }
    KhoLuuTruDanhSachGiayToKhoQuocGiaCongDan(_params: GetDanhSachKetQuaCaNhanWithoutDanhMucRequest): AxiosResponseWrapper<IResult<GetDanhSachKetQuaResponse[]>> {
        return axiosInstance.post(this._urlSuffix + "/KhoLuuTru/DanhSachGiayToKhoQuocGiaCongDan", _params)
    }
    KhoLuuTruDanhSachGiayToKhoQuocGiaCanBo(_params: GetDanhSachKetQuaCanBoWithoutDanhMucRequest): AxiosResponseWrapper<IResult<GetDanhSachKetQuaResponse[]>> {
        return axiosInstance.post(this._urlSuffix + "/KhoLuuTru/DanhSachGiayToKhoQuocGiaCanBo", _params)
    }
    
    DanhSachGiayToKhoQuocGiaCaNhan(_params: GetDanhSachKetQuaCaNhanRequest): AxiosResponseWrapper<IResult<GetDanhSachKetQuaResponse[]>> {
        return axiosInstance.post(this._urlSuffix + "/DanhSachGiayToKhoQuocGiaCaNhan/", _params)
    }
    GiayToKhoQuocGia(_params: GetKetQuaByURLRequest): AxiosResponseWrapper<IResult<string[]>> {
        return axiosInstance.post(this._urlSuffix + "/GiayToKhoQuocGia",  _params)
    }
    DongBoHoSoSoHoaDVCQG(_params: GetListKetQuaByUrlRequest): AxiosResponseWrapper<IResult<UploadFileResult[]>> {
        return axiosInstance.post(this._urlSuffix + "/DongBoHoSoSoHoaDVCQG",  _params)
    }
}

export const giayToSoHoaApi = new GiayToSoHoaService()