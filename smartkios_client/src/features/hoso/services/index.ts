import { Key } from 'antd/es/table/interface';
import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete, IDeleteFiles } from "../../../models";
import { Service } from "../../../services";
import { IHoSo, ISearchHoSo } from "../models";
import { IDinhKemBoSungHoSo } from "../components/actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal";
import { IPhiLePhi } from "@/features/philephi/models";
import { ITruongHopThuTuc } from "@/features/truonghopthutuc/models";
import { IThemHoSo } from "../components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal";
import { IHoSoTheoTrangThaiXuLy, ISearchHoSoTheoTrangThaiXuLy } from "../models/searchHoSoTheoTrangThaiXuLy";

export type GetHoSoDanhGiaHaiLongParam = {
    maHoSo: string
}

export type GetHoSoParam = {
    id: string;
    view?: "capNhatKetQuaXuLyHoSo" | "lienThongHeThongLLTP" | "chuyenBuocXuLy" | "kySoChungThuc";
    returnNodeQuyTrinh?: boolean;
    returnPhiLePhi?: boolean;
    returnThanhPhanThuTucs?: boolean;
    returnYeuCauThanhToan?: boolean;
}
export type ChuyenNoiBoParam = Partial<Pick<IHoSo, "yKienNguoiChuyenXuLy" | "dinhKemYKienNguoiChuyenXuLy">> & {
    chuyenToiNguoiDungIds: string
    id?: string
}
export type ChuyenPhiDiaGioiParams = { 
    Ids :  React.Key[],
    DonViId: string
}

export type DinhKemHoSoBoSung = {
    thongTinTiepNhanBoSung: string
    danhSachGiayToBoSung: DinhKemHoSoBoSung_DanhSach[]
}

export type DinhKemHoSoBoSung_DanhSach = {
    thanhPhanHoSoId: string;
    fileDinhKemCu: string;
    fileDinhKemMoi: string;
    noiDungBoSung: string;
}

export type YeuCauThuPhiParams = {
    tongTien: string;
    lePhiThu: string;
    phiThu: string;
    hinhThucThu: string;
    phiLePhi?: Pick<IPhiLePhi, "id" | "loai" | "soTien" | "ten">[]
}

export type ChuyenBuocXuLyHoSo =
    Pick<IHoSo, "buocHienTai" | "buocXuLyTiep" | "nguoiXuLyTiep" | "tenBuocHienTai" | "dinhKemKetQua" | "dinhKemYKienNguoiChuyenXuLy" | "trichYeuKetQua" | "yKienNguoiChuyenXuLy" | "maTrangThaiHoSo"> &
    {
        nodeQuyTrinh: string,
        thoiHanBuocXuLy: number,
        loaiThoiHanBuocXuLy: string
    }
export type CapSoVaDongDauHoSoChungThucParams =
    Pick<IHoSo, "buocHienTai" | "buocXuLyTiep" | "nguoiXuLyTiep" | "tenBuocHienTai" | "dinhKemKetQua" | "dinhKemYKienNguoiChuyenXuLy" | "trichYeuKetQua" | "yKienNguoiChuyenXuLy" | "maTrangThaiHoSo"> &
    {
        nodeQuyTrinh: string;
        thoiHanBuocXuLy: number;
        loaiThoiHanBuocXuLy: string;
        loaiKetQuaId: string;
        soChungThucId: string;
    }

export type TiepNhanHoSoTrucTuyenParams =
    {
        data: Pick<IHoSo, "buocHienTai" | "buocXuLyTiep" | "nguoiXuLyTiep" | "tenBuocHienTai" | "maTrangThaiHoSo" | "soGiayToChuHoSo" | "loaiDoiTuong" | "ngaySinhChuHoSo" | "chuHoSo"> &
        {
            nodeQuyTrinh: string,
            thoiHanBuocXuLy: number,
            loaiThoiHanBuocXuLy: string
        }, id: string
    }
export type TiepNhanHoSoChungThucParams = {
    data: Pick<IHoSo, "buocHienTai" | "buocXuLyTiep" | "nguoiXuLyTiep" | "tenBuocHienTai" | "maTrangThaiHoSo" | "soGiayToChuHoSo" | "loaiDoiTuong" | "ngaySinhChuHoSo" | "chuHoSo"> &
    {
        nodeQuyTrinh: string,
        thoiHanBuocXuLy: number,
        loaiThoiHanBuocXuLy: string,
        dinhKemKetQua: string,
    }, id: string
}

export type TuChoiTiepNhanHoSoTrucTuyenParams = {
    data: Pick<IHoSo, "lyDoTuChoi" | "dinhKemTuChoi">;
    id: string
}
export type KhongTiepNhanHoSoBoSungQuaHanParams = {
    data: Pick<IHoSo, "lyDoTuChoi" | "dinhKemTuChoi">;
    id: string
}

export type SearchHoSoTraCuuParams = {
    MaHoSo: string;
    MaCaptCha: string;
    SoDinhDanh: string;
}

export type LienThongHeThongLLTPParams = {
    idHoSo: string;
    eformBase64Data: string;
}
export type YeuCauThuPhiChungThucParams = {
    maHoSo: string;
    tongTien: number;
}
export type XacNhanKetQuaParams = { ids: string[], TrangThaiTraKq?: string, ThaoTac?: string, YeuCauBCCILayKetQua?: boolean }
export type XacNhanKetQuaVaYeuCauThuPhiParams ={id: string, TrangThaiTraKq?: string, ThaoTac?: string,soTien: number, phi: number, lePhi:number, chiTiet?:string}
export type DeleteHoSoParam = { lyDoXoa: string, forceDelete: boolean, ids: string[] } 

export type OCRData = Pick<IHoSo, "eFormKetQuaData"> & Pick<ITruongHopThuTuc, "eFormKetQua">

class HoSoService extends Service.BaseApi implements Omit<Service.ICrud<IHoSo>, "Delete">{
    constructor() {
        super("hosos")
    }
    Search(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix, {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }

    GetHoSo(params: GetHoSoParam): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/detail", { params });
    }
    GetHoSoYeuCauBoSung(id: string): AxiosResponseWrapper<IResult<IHoSo & { hanBoSung?: string }>> {
        return axiosInstance.get(this._urlSuffix + "/hosoyeucaubosung/" + id, {});
    }
    GetHoSoDanhGiaHaiLong(_params: GetHoSoDanhGiaHaiLongParam): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(`${this._urlSuffix}/gethosodanhgiahailong?maHoSo=${_params.maHoSo}`);
    }
    GetPrintData(id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/printdata/" + id);
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    ThemHoSoChungThucTrucTiep(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/themhosochungthuc", _data)
    }
    NopTrucTuyen(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix + "/noptructuyen", _data)
    }
    TiepNhanHoSoTrucTuyen(_data: TiepNhanHoSoTrucTuyenParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/tiepnhanhosotructuyen/" + _data.id, _data.data)
    }
    TiepNhanHoSoChungThuc(_data: TiepNhanHoSoChungThucParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/tiepnhanhosochungthuc/" + _data.id, _data.data)
    }
    Delete(_params: DeleteHoSoParam): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.delete(this._urlSuffix, { data: { forceDelete: _params.forceDelete, lyDoXoa: _params.lyDoXoa, ids: _params.ids } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IHoSo> & { deletedThanhPhanIds?: string[] }): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
    ChuyenTiepBuocXuLy(params: { data: ChuyenBuocXuLyHoSo, id: string }): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/chuyenbuocxulyhoso/" + params.id, params.data)
    }
    KySoHoSoChungThuc(params: { data: ChuyenBuocXuLyHoSo, id: string }): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/kysohosochungthuc/" + params.id, params.data)
    }
    CapSoVaDongDauHoSoChungThuc(params: { data: CapSoVaDongDauHoSoChungThucParams, id: string }): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/capsovadongdauhosochungthuc/" + params.id, params.data)
    }
    ThayDoiTruongHopThuTuc(data: { hoSoId: string, truongHopThuTucId: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/thaydoitruonghopthutuc", data)
    }
    TraKetQuaHoSo(params: Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua"|"YeuCauBCCILayKetQua">): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/traketqua/" + params.id, { trichYeuKetQua: params.trichYeuKetQua, dinhKemKetQua: params.dinhKemKetQua, YeuCauBCCILayKetQua: params.YeuCauBCCILayKetQua })
    }
    CapNhatKetQuaHoSo(params: Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua" | "eFormKetQuaData">): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/capnhatketqua/" + params.id, { trichYeuKetQua: params.trichYeuKetQua, dinhKemKetQua: params.dinhKemKetQua, eFormKetQuaData: params.eFormKetQuaData })
    }
    KetThucHoSo(params: Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua">): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/ketthuc/" + params.id, { trichYeuKetQua: params.trichYeuKetQua, dinhKemKetQua: params.dinhKemKetQua })
    }
    ThuHoiHoSo(id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/thuhoihoso/" + id, {})
    }
    TraLaiHoSo(id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/tralaihoso/" + id, {})
    }
    ChuyenNoiBo(params: ChuyenNoiBoParam): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/chuyennoibo/" + params.id, {
            chuyenToiNguoiDungIds: params.chuyenToiNguoiDungIds,
            dinhKemYKienNguoiChuyenXuLy: params.dinhKemYKienNguoiChuyenXuLy,
            yKienNguoiChuyenXuLy: params.yKienNguoiChuyenXuLy
        } as Omit<ChuyenNoiBoParam, "id">)
    }
    YeuCauMotCuaBoSungHoSo(params: { id: string, data: IDinhKemBoSungHoSo }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/yeucaumotcuabosung/" + params.id, params.data)
    }
    YeuCauCongDanBoSungHoSo(id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/yeucaucongdanbosung/" + id, {})
    }
    MotCuaCapNhatBoSung(params: { id: string, data: DinhKemHoSoBoSung }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/motcuacapnhatbosung/" + params.id, params.data)
    }
    MotCuaGuiBoSung(params: { id: string, data: DinhKemHoSoBoSung }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/motcuaguibosung/" + params.id, params.data)
    }
    HoanThanhBoSungHoSo(id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/hoanthanhbosunghoso/" + id, {})
    }
    CongDanCapNhatBoSung(params: { id: string, data: DinhKemHoSoBoSung }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/congdancapnhatbosung/" + params.id, params.data)
    }
    CongDanGuiBoSung(params: { id: string, data: DinhKemHoSoBoSung }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/congdanguibosung/" + params.id, params.data)
    }
    ChuyenBuocNhanhHoSo(data: { ids: string[] }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/chuyenbuocnhanhhoso", data)
    }
    YeuCauThuPhi(params: { id: string, data: YeuCauThuPhiParams }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/yeucauthuphi/" + params.id, params.data)
    }
    ThongKeHoSoNguoiDung(): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.get(this._urlSuffix + "/thongkehosonguoidung/")
    }
    GetByMa(_id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/GetByMa/" + _id);
    }
    TuChoiTiepNhanHoSoTrucTuyen(params: TuChoiTiepNhanHoSoTrucTuyenParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/tuchoitiepnhanhosotructuyen/" + params.id, params.data)
    }
    KhongTiepNhanHoSoBoSungQuaHan(params: KhongTiepNhanHoSoBoSungQuaHanParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/khongtiepnhanhosobosungquahan/" + params.id, params.data)
    }
    SearchHoSoTraCuu(params: SearchHoSoTraCuuParams): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/searchhosotracuu", { params })
    }
    GetDuLieuOCR(params: { id: string; fileUrl: string; maNhanDienOCR: string }): AxiosResponseWrapper<IResult<OCRData>> {
        return axiosInstance.post(this._urlSuffix + "/getdulieuocr/" + params.id, { fileUrl: params.fileUrl, maNhanDienOCR: params.maNhanDienOCR })
    }
    SearchTheoTrangThaiXuLy(_params: ISearchHoSoTheoTrangThaiXuLy): AxiosResponseWrapper<IPaginationResponse<IHoSoTheoTrangThaiXuLy[]>> {
        return axiosInstance.post(this._urlSuffix + "/Search/TrangThaiXuLy", _params)

    }
    SearchTheoTrangThaiThuPhi(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + '/Search/TrangThaiThuPhi', {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    XacNhanKetQua(data: XacNhanKetQuaParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/xacnhanketqua", data)
    }
    XacNhanKetQuaVaYeuCauThuPhi(data: {id: string, TrangThaiTraKq?: string, ThaoTac?: string,soTien: number, phi: number, lePhi:number}): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/xacnhanketquavayeucauthuPhi", data)
    }
    ThuHoiChuyenTraKqTTHCC(data: {ids: string[]}): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/ThuHoiChuyenTraKq", data)
    }
    LienThongHeThongLLTP(data: LienThongHeThongLLTPParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/lienthonghethonglltp", data)
    }
    YeuCauThuPhiChungThuc(data: YeuCauThuPhiChungThucParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/YeuCauThuPhiChungThuc", data)
    }
    ChuyenPhiDiaGioi(data: ChuyenPhiDiaGioiParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/ChuyenPhiDiaGioi", data)
    }
    YeuCauBCCILayKetQua(_id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/YeuCauBCCILayKetQua/" + _id);
    }
    XacNhanVaYeuCauBCCILayKetQua(_id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/XacNhanVaYeuCauBCCILayKetQua/" + _id);
    }
    DangKyNhanKqQuaBCCI(params: { id: string, DangKyNhanKqQuaBCCIData : string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/DangKyNhanKqQuaBCCI/" + params.id, params)
    }
}

export const hoSoApi = new HoSoService()