import { IHoSoTiepNhanQuaHan, ISearchHoSoTiepNhanQuaHan } from './../../thongKe/thongKeQD766/models/ThongKeHoSoTiepNhanQuaHan';
import { Key } from 'antd/es/table/interface';
import axiosInstance, { parseParams } from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete, IDeleteFiles, IBasePagination, IBaseSearch } from "../../../models";
import { Service } from "../../../services";
import { IHoSo, ISearchHoSo, ISearchHoSoTheoBaoCaoTongHopParams, ISearchHoSoTraLaiXinRut, ISearchTheoDoiHoSoChungThucParams, ITheoDoiHoSoKhongDuocTiepNhan, IThongKeHoSoTrongNgay, IThongKeHSLT, IThongKeTheoDoiTrangThaiXuLyHS, IXuatPhieuActionParams, IXuatPhieuHuongDanNopTrucTiepParams } from "../models";
import { IDinhKemBoSungHoSo } from "../components/actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal";
import { IPhiLePhi } from "@/features/philephi/models";
import { ITruongHopThuTuc } from "@/features/truonghopthutuc/models";
import { IThemHoSo } from "../components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal";
import { IHoSoTheoTrangThaiXuLy, ISearchHoSoTheoTrangThaiXuLy } from "../models/searchHoSoTheoTrangThaiXuLy";
import { IThanhPhanHoSo } from '@/features/thanhphanhoso/models';
import { ISearchThongKeHoSoChungThuc, IThongKeHoSoChungThucChiTiet } from '@/features/sochungthuc/models';
import { IBanGiaoKetQuaParams, IBanGiaoKetQuaResponse } from '@/pages/dvc/traketqua/chotraketquatthcc/model';
import { ITiepNhanNhieuHoSoParams, ITiepNhanNhieuHoSoResponse } from '@/pages/dvc/tiepnhanhoso/tiepNhanNhieuHoSo/model';
import axiosInstanceFile from '@/lib/axios/fileInstance';
import { toast } from 'react-toastify';

export type GetHoSoDanhGiaHaiLongParam = {
    maHoSo: string
}

export type GetHoSoParam = {
    id: string;
    view?: "capNhatKetQuaXuLyHoSo" | "lienThongHeThongLLTP" | "chuyenBuocXuLy" | "kySoChungThuc" | "tiepNhanTrucTuyen" | "yeuCauThanhToan" | "lienThongBTPDangKyKetHon";
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
    Ids: React.Key[],
    DonViId: string
}

export type ChuyenDuLieuTaiKhoanParams = {
    idUserCurr: string | undefined,
    idUserNew: string | undefined,
    maHoSo: string[]
}

export type KetThucHoSoTBKMParams = {
    trangThaiHoSoId: string | undefined,
    dinhKemKetQua?: string | undefined,
    id: string | undefined,
    ngayKetThucXuLy?: string,
    ngayTra?: string
}

export type UpdateTrangThaiHoSoParams = {
    trangThaiHoSoId: string | undefined,
    lyDoThuHoi?: string | undefined,
    id: string | undefined
}
export type DinhKemHoSoBoSung = {
    thongTinTiepNhanBoSung: string
    danhSachGiayToBoSung: DinhKemHoSoBoSung_DanhSach[]
    danhSachGiayToBoSungMoi?: DinhKemHoSoBoSung_DanhSach[]
}

export type DinhKemHoSoBoSung_DanhSach = {
    thanhPhanHoSoId: string;
    fileDinhKemCu: string;
    fileDinhKemMoi: string;
    noiDungBoSung: string;
    tenThanhPhan?: string;
    laThanhPhanMoi?: boolean;
}



export type YeuCauThuPhiParams = {
    tongTien: string;
    lePhiThu: string;
    phiThu: string;
    hinhThucThu: string;
    phiLePhi?: Pick<IPhiLePhi, "id" | "loai" | "soTien" | "ten">[]
}

export type ChuyenBuocXuLyHoSo =
    Pick<IHoSo, "buocHienTai" | "buocXuLyTiep" | "nguoiXuLyTiep" | "tenBuocHienTai" | "dinhKemKetQua" | "dinhKemYKienNguoiChuyenXuLy" | "trichYeuKetQua" | "yKienNguoiChuyenXuLy" | "maTrangThaiHoSo" | "ngayBanHanhKetQua" | "loaiVanBanKetQua" | "soKyHieuKetQua" | "nguoiKyKetQua" | "coQuanBanHanhKetQua" | "ngayKyKetQua"> &
    {
        nodeQuyTrinh: string,
        thoiHanBuocXuLy: number,
        loaiThoiHanBuocXuLy: string;
        donViNguoiTiepNhanXuLy?: string;
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

export type ChuyenBuocXuLyNhieuHoSoParams = Pick<ChuyenBuocXuLyHoSo, "nguoiXuLyTiep" | "buocHienTai" | "yKienNguoiChuyenXuLy" | "buocXuLyTiep" | "donViNguoiTiepNhanXuLy"> & { Ids: string[] }
export type KetThucNhieuHoSoTBKMParams = {
    Ids: string[],
    trangThaiHoSoId: string
}
export type DatLaiQuaHanNhieuHoSoParams = {
    Ids: string[],
}

export type TiepNhanHoSoTrucTuyenParams =
    {
        data: Pick<IHoSo, "tenBuocHienTai" | "buocHienTai" | "buocXuLyTiep" | "nguoiXuLyTiep" | "tenBuocHienTai" | "maTrangThaiHoSo" | "soGiayToChuHoSo" | "loaiDoiTuong" | "ngaySinhChuHoSo" | "chuHoSo" | "thanhPhanHoSos"> &
        {
            nodeQuyTrinh: string,
            thoiHanBuocXuLy: number,
            loaiThoiHanBuocXuLy: string,
            chuyenSoHoa?: boolean
        }, id: string
    }
export type TiepNhanNhieuHoSoTrucTuyenParams = TiepNhanHoSoTrucTuyenParams["data"] & { Ids: string[] }

export type TiepNhanHoSoChungThucParams = {
    data: Pick<IHoSo, "buocHienTai" | "buocXuLyTiep" | "nguoiXuLyTiep" | "tenBuocHienTai" | "maTrangThaiHoSo" | "soGiayToChuHoSo" | "loaiDoiTuong" | "ngaySinhChuHoSo" | "chuHoSo"> &
    {
        nodeQuyTrinh: string,
        thoiHanBuocXuLy: number,
        loaiThoiHanBuocXuLy: string,
        dinhKemKetQua: string,
    }, id: string
}
export type TiepNhanNhieuHoSoChungThucParams = TiepNhanHoSoChungThucParams["data"] & { Ids: string[] }

export type ThuHoiQuyetDinhLLTPParams = {
    lyDoThuHoi?: string;
    soQuyetDinh?: string;
    ngayQuyetDinh?: string;
    trichYeuQuyetDinh?: string;
    fileQuyetDinh: string;
    maHoSo: string;
}

export type TuChoiTiepNhanHoSoTrucTuyenParams = {
    data: Pick<IHoSo, "lyDoTuChoi" | "dinhKemTuChoi">;
    id: string
}

export type TraLaiBuocTruocParams = {
    data: { noiDungTraLai?: string; dinhKemChuyenXuLy?: string };
    id: string
}

export type KhongTiepNhanHoSoBoSungQuaHanParams = {
    data: Pick<IHoSo, "lyDoTuChoi" | "dinhKemTuChoi">;
    id: string
}

export type ThongKeHSLTParams = {
    tuNgay?: string;
    ngayNopHoSo?: string;
    ngayTiepNhan?: string;
    denNgay?: string;
    tiepNhanTuNgay?: string;
    tiepNhanDenNgay?: string;
    nopHoSoTuNgay?: string;
    nopHoSoDenNgay?: string;
    catalog?: string;
    coThongKe?: boolean;
    maDinhdanh?: string
    maDinhDanhCha?: string
    laHoSoChungThuc?: boolean
    baoGomDonViCon?: boolean
    chiBaoGomDonViCon?: boolean
    kenhThucHien?: string

} & IBasePagination & IBaseSearch



export type SearchHoSoTraCuuParams = {
    MaHoSo: string;
    MaCaptCha: string;
    SoDinhDanh?: string;
}
export type SearchTraCuuHccParams = {
    MaHoSo?: string;
    Params?: string;
}

export type StatisticHoSoChungThucParams = {
    KyDienTuBanGiay: boolean;
    DonViId: string;
    MaDinhDanh: string;
}

export type LienThongHeThongLLTPParams = {
    idHoSo: string;
    eformBase64Data: string;
}
export type YeuCauThuPhiChungThucParams = {
    maHoSo: string;
    tongTien: number;
}
export type GuiPhieuTiepNhanHoSoParams = {
    hoSoId: string;
    maGiayToHoSo?: string;
}
export type XacNhanKetQuaParams = { ids: string[], TrangThaiTraKq?: string, ThaoTac?: string, YeuCauBCCILayKetQua?: boolean }
export type XacNhanKetQuaVaYeuCauThuPhiParams = { id: string, TrangThaiTraKq?: string, ThaoTac?: string, soTien: number, phi: number, lePhi: number, chiTiet?: string, hinhThucThu?: string }
export type DeleteHoSoParam = { lyDoXoa: string, forceDelete: boolean, ids: string[], deleteSecurityCode?: string }

export type OCRData = Pick<IHoSo, "eFormKetQuaData"> & Pick<ITruongHopThuTuc, "eFormKetQua">

export type SearchHoSoChungThucParams = {
    soChungThucId?: string;
} & IBasePagination

export type HoSoChungThucResponse = {
    chuHoSo: string;
    kyDienTuBanGiay: string;
    ngayChungThuc: string;
    nguoiChungThuc: string;
    so: number;
    soBanGiay: number;
    soTien: number;
    soTienG: number;
    soTienDT: number;
    soTrang: number;
    tenGiayTo: string;
    ten: string;
}

export type StatisticHoSoChungThucResponse = {
    tongSo: string,
    donViId: string
}
export type ThuHoiMaVanDonBuuDienRequest = {
    hoSoIds: React.Key[],

}
export type yeuCauBCCILayKetQuaWithOutItemCodeParams = {
    ids: React.Key[],

}
export type CapNhatKetQuaXuLyHoSo = Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua" | "eFormKetQuaData" | "coQuanBanHanhKetQua" | "loaiVanBanKetQua" | "nguoiKyKetQua" | "soKyHieuKetQua" | "ngayBanHanhKetQua" | "ngayKyKetQua">
export type CapNhatKetQuaXuLyNhieuHoSo = Pick<IHoSo, "ids" | "trichYeuKetQua" | "dinhKemKetQua" | "eFormKetQuaData" | "coQuanBanHanhKetQua" | "loaiVanBanKetQua" | "nguoiKyKetQua" | "soKyHieuKetQua" | "ngayBanHanhKetQua" | "ngayKyKetQua">
export type UpdateViTriDeHoSo = Pick<IHoSo, "id" | "viTriDeHoSo">
export type UpdateTraKetQuaHCC = Pick<IHoSo, "ids" | "loaiNguoiNhanKetQua" | "hoTenNguoiNhanKetQua" | "banGocThuLai" | "soLuongBanGocThuLai" | "dinhKemNhanKetQua" | "chuKyNguoiNhanKetQua" | "dinhKemKetQua" | "trichYeuKetQua">
export type DuLieuTraCuuBTP = { moTa: string; trangThaiXuLy: string; thoiGianThucHien: string; noiDungChiTiet?: string; maHoSoMCDT: string; maHoSoLT: string }
export type CapNhatChamSoHoa = {
    id: string;
    saveAndForward: boolean;
    thanhPhanHoSos: Pick<IHoSo, "thanhPhanHoSos">
}


class HoSoService extends Service.BaseApi implements Omit<Service.ICrud<IHoSo>, "Delete"> {
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
    SearchNguoiDangXuLy(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix+ "/NguoiDangXuLy", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    SearchHoSoByNguoiGui(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix+ "/NguoiGui", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    
    SearchNguoiDaXuLy(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/NguoiDaXuLy", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    SearchNguoiNhanHoSo(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix+ "/NguoiNhanHoSo", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    SearchChamSoHoa(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/ChamSoHoa", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    SearchScanHoSo(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/scanhosodientu", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    ThongKeTheoDoiTrangThaiHS(_params: ThongKeHSLTParams): AxiosResponseWrapper<IPaginationResponse<IThongKeTheoDoiTrangThaiXuLyHS[]>> {
        return axiosInstance.get(this._urlSuffix + "/thongketheodoitrangthaihs", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    TheoDoiHoSoKhongDuocTiepNhan(_params: ThongKeHSLTParams): AxiosResponseWrapper<IPaginationResponse<ITheoDoiHoSoKhongDuocTiepNhan[]>> {
        return axiosInstance.get(this._urlSuffix + "/theodoihosokhongduoctiepnhan", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    ThongKeHoSoTrongNgay(_params: ThongKeHSLTParams): AxiosResponseWrapper<IPaginationResponse<IThongKeHoSoTrongNgay[]>> {
        return axiosInstance.get(this._urlSuffix + "/thongkehosotrongngay", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    ThongKeHSLT(_params: ThongKeHSLTParams): AxiosResponseWrapper<IPaginationResponse<IThongKeHSLT[]>> {
        return axiosInstance.get(this._urlSuffix + "/thongkehslienthong", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    SearchHoSoLienThong(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/HoSoLienThong", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    CanBoBCCISearch(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/CanBoBCCISearch", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }

    SearchPortal(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/portal", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }

    SearchTheoDoiHoSoChungThuc(_params: ISearchTheoDoiHoSoChungThucParams): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/theodoihosochungthuc", {
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
    XuatPhieuAction(_params: IXuatPhieuActionParams): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/xuatphieu", { params: _params });
    }
    XuatPhieuBienNhanKetQuaAction(_params: IXuatPhieuActionParams): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/XuatPhieuBienNhanKetQua", { params: _params });
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    AddPhiDiaGioi(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper | undefined {
        if (!_data.donViPhiDiaGioi) {
            toast.warn("Chưa chọn tiếp nhận phi địa giới");
            return;
        }
        return axiosInstance.post(this._urlSuffix + "/PhiDiaGioi", _data)
    }
    ThemHoSoChungThucTrucTiep(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/themhosochungthuc", _data)
    }
    ThemMoiHoSoDienTu(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/themmoihosodientu", _data)
    }
    NopTrucTuyen(_data: IThemHoSo & IDeleteFiles): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix + "/noptructuyen", _data)
    }
    TiepNhanHoSoTrucTuyen(_data: TiepNhanHoSoTrucTuyenParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/tiepnhanhosotructuyen/" + _data.id, _data.data)
    }
    TiepNhanNhieuHoSoTrucTuyen(params: TiepNhanNhieuHoSoTrucTuyenParams): AxiosResponseWrapper<IResult<Record<string, string>>> {
        return axiosInstance.put(this._urlSuffix + "/tiepnhannhieuhosotructuyen", params)
    }
    TiepNhanHoSoChungThuc(_data: TiepNhanHoSoChungThucParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/tiepnhanhosochungthuc/" + _data.id, _data.data)
    }
    TiepNhanNhieuHoSoChungThuc(params: TiepNhanNhieuHoSoChungThucParams): AxiosResponseWrapper<IResult<Record<string, string>>> {
        return axiosInstance.put(this._urlSuffix + "/tiepnhannhieuhosochungthuc", params)
    }
    Delete(_params: DeleteHoSoParam): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.delete(this._urlSuffix, { data: { forceDelete: _params.forceDelete, lyDoXoa: _params.lyDoXoa, ids: _params.ids, deleteSecurityCode: _params.deleteSecurityCode } })
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
    ChuyenDuLieuTaiKhoan(params: ChuyenDuLieuTaiKhoanParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/chuyendulieutaikhoan", params, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
    UpdateTrangThaiHoSo(params: UpdateTrangThaiHoSoParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/thaydoitrangthaihoso?" + "id=" + params.id, params, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
    KetThucHoSoTBKM(params: KetThucHoSoTBKMParams): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/ketthuchosokhuyenmai?" + "id=" + params.id, params, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
    KetThucNhieuHoSoTBKM(params: { data: KetThucNhieuHoSoTBKMParams }): AxiosResponseWrapper<IResult<Record<string, string>>> {
        return axiosInstance.put(this._urlSuffix + "/ketthucnhieuhosotbkm", params.data)
    }
    DatLaiNhieuHoSoQuaHan(params: { data: DatLaiQuaHanNhieuHoSoParams }): AxiosResponseWrapper<IResult<Record<string, string>>> {
        return axiosInstance.put(this._urlSuffix + "/datlainhieuhosoquahan", params.data)
    }
    KySoHoSoChungThuc(params: { data: ChuyenBuocXuLyHoSo, id: string }): AxiosResponseWrapper {
        return axiosInstanceFile.put(this._urlSuffix + "/kysohosochungthuc/" + params.id, params.data)
    }
    CapSoVaDongDauHoSoChungThuc(params: { data: CapSoVaDongDauHoSoChungThucParams, id: string }): AxiosResponseWrapper {
        return axiosInstanceFile.put(this._urlSuffix + "/capsovadongdauhosochungthuc/" + params.id, params.data)
    }
    ChuyenBuocXuLyNhieuHoSo(params: { data: ChuyenBuocXuLyNhieuHoSoParams }): AxiosResponseWrapper<IResult<Record<string, string>>> {
        return axiosInstanceFile.put(this._urlSuffix + "/chuyenbuocxulynhieuhoso", params.data)
    }
    ThayDoiTruongHopThuTuc(data: { hoSoId: string, truongHopThuTucId: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/thaydoitruonghopthutuc", data)
    }
    GuiEmailTheoDoiHoSoChungThuc(data: { id: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/postemailtheodoihosochungthuc", data)
    }
    TraKetQuaHoSo(params: Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua" | "YeuCauBCCILayKetQua">): AxiosResponseWrapper<IResult<any>> {
        return axiosInstanceFile.put(this._urlSuffix + "/traketqua/" + params.id, { trichYeuKetQua: params.trichYeuKetQua, dinhKemKetQua: params.dinhKemKetQua, YeuCauBCCILayKetQua: params.YeuCauBCCILayKetQua })
    }
    TraKetQuaChungThuc(params: Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua">): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/traketquachungthuc/" + params.id, { trichYeuKetQua: params.trichYeuKetQua, dinhKemKetQua: params.dinhKemKetQua })
    }
    CapNhatKetQuaHoSo(params: CapNhatKetQuaXuLyHoSo): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/capnhatketqua/" + params.id, params)
    }

    CapNhatKetQuaNhieuHoSo(params: CapNhatKetQuaXuLyNhieuHoSo): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/CapNhatKetQuaNhieuHoSo", params)
    }

    ThuHoiQuyetDinhLLTP(params: ThuHoiQuyetDinhLLTPParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/LLTP/ThuHoiQuyetDinh/" + params.maHoSo, params)
    }

    KetThucHoSo(params: Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua">): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/ketthuc/" + params.id, { trichYeuKetQua: params.trichYeuKetQua, dinhKemKetQua: params.dinhKemKetQua })
    }
    ThuHoiHoSo(id: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/thuhoihoso/" + id, {})
    }
    TraLaiHoSo(params: TraLaiBuocTruocParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/tralaihoso/" + params.id, { ...params.data })
    }
    ChuyenNoiBo(params: ChuyenNoiBoParam): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/chuyennoibo/" + params.id, {
            chuyenToiNguoiDungIds: params.chuyenToiNguoiDungIds,
            dinhKemYKienNguoiChuyenXuLy: params.dinhKemYKienNguoiChuyenXuLy,
            yKienNguoiChuyenXuLy: params.yKienNguoiChuyenXuLy
        } as Omit<ChuyenNoiBoParam, "id">)
    }
    YeuCauMotCuaBoSungHoSo(params: { id: string, data: IDinhKemBoSungHoSo }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/motcuayeucaubosung/" + params.id, params.data)
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
    LienThongBTP(maHoSo: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/LienThongBTP/" + maHoSo)
    }
    LienThongDangKyKetHon(data: { maHoSo: string; eformBase64Data: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/LienThongDangKyKetHon/", data)
    }
    GuiLienThongLLTP(maHoSo: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/LLTP/GuiLienThongBo/" + maHoSo)
    }
    ChuyenHoSoPhiDiaGioi(maHoSo: string): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/ChuyenHoSoPhiDiaGioi/", { maHoSo })
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
    GuiPhieuTiepNhanHoSo(data: GuiPhieuTiepNhanHoSoParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/GuiPhieuTiepNhanHoSo", data)
    }
    KhongTiepNhanHoSoBoSungQuaHan(params: KhongTiepNhanHoSoBoSungQuaHanParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/khongtiepnhanhosobosungquahan/" + params.id, params.data)
    }
    SearchHoSoTraCuu(params: SearchHoSoTraCuuParams): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.post(this._urlSuffix + "/searchhosotracuu", params)
    }
    SearchTraCuuHcc(_params: SearchTraCuuHccParams): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/TraCuuHccPortal", { params: _params })
    }
    GetDuLieuOCR(params: { id: string; fileUrl: string; maNhanDienOCR: string }): AxiosResponseWrapper<IResult<OCRData>> {
        return axiosInstance.post(this._urlSuffix + "/getdulieuocr/" + params.id, { fileUrl: params.fileUrl, maNhanDienOCR: params.maNhanDienOCR })
    }
    SearchTheoTrangThaiXuLy(_params: ISearchHoSoTheoTrangThaiXuLy): AxiosResponseWrapper<IPaginationResponse<IHoSoTheoTrangThaiXuLy[]>> {
        return axiosInstance.post(this._urlSuffix + "/Search/TrangThaiXuLy", _params)

    }
    SearchHoSoQuaHan(_params: ISearchHoSoTheoTrangThaiXuLy): AxiosResponseWrapper<IPaginationResponse<IHoSoTheoTrangThaiXuLy[]>> {
        return axiosInstance.post(this._urlSuffix + "/Search/HoSoQuaHan", _params)

    }
    SearchHoSoTiepNhanQuaHan(_params: ISearchHoSoTiepNhanQuaHan): AxiosResponseWrapper<IHoSoTiepNhanQuaHan[]> {
        return axiosInstance.get(this._urlSuffix + "/Search/TiepNhanQuaHan", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })


    }
    SearchSoTheoDoiHoSo(_params: ISearchHoSoTiepNhanQuaHan): AxiosResponseWrapper<IPaginationResponse<IHoSoTiepNhanQuaHan[]>> {
        return axiosInstance.get(this._urlSuffix + "/Search/SoTheoDoiHoSo", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }

    SearchThongKeHoSoPhiDiaGioi(_params: ISearchHoSoTiepNhanQuaHan): AxiosResponseWrapper<IPaginationResponse<IHoSoTiepNhanQuaHan[]>> {
        return axiosInstance.get(this._urlSuffix + "/Search/ThongKeHoSoPhiDiaGioi", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })


    }
    SearchTheoTrangThaiThuPhi(_params: ISearchHoSo): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + '/Search/TrangThaiThuPhi', {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    XacNhanKetQua(data: XacNhanKetQuaParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstanceFile.post(this._urlSuffix + "/xacnhanketqua", data)
    }
    XacNhanBoSung(data: XacNhanKetQuaParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/xacnhanbosung", data)
    }
    XacNhanTraLaiXinRut(data: XacNhanKetQuaParams): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/xacnhanxinruttralai", data)
    }
    XacNhanKetQuaVaYeuCauThuPhi(data: { id: string, TrangThaiTraKq?: string, ThaoTac?: string, soTien: number, phi: number, lePhi: number }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstanceFile.post(this._urlSuffix + "/xacnhanketquavayeucauthuPhi", data)
    }
    ThuHoiChuyenTraKqTTHCC(data: { ids: string[] }): AxiosResponseWrapper<IResult<any>> {
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
    CapNhatChamSoHoa(data: CapNhatChamSoHoa): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/ChamSoHoa/TiepNhan/" + data.id, data)
    }
    YeuCauBCCILayKetQua(_id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/YeuCauBCCILayKetQua/" + _id);
    }
    YeuCauBCCILayKetQuaWithoutItemCode(_ids: yeuCauBCCILayKetQuaWithOutItemCodeParams): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.post(this._urlSuffix + "/YeuCauBCCILayKetQuaWithoutItemCode", _ids);
    }
    YeuCauBCCILayKetQuaNhieuHoSoItemCode(_ids: yeuCauBCCILayKetQuaWithOutItemCodeParams): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.post(this._urlSuffix + "/YeuCauBCCILayKetQuaNhieuHoSo", _ids);
    }
    ThuHoiMaVanDonBuuDien(_ids: ThuHoiMaVanDonBuuDienRequest): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.post(this._urlSuffix + "/ThuHoiMaVanDonBuuDien", _ids);
    }
    ThuHoiDangKyNhanKqQuaBCCI(_ids: yeuCauBCCILayKetQuaWithOutItemCodeParams): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.post(this._urlSuffix + "/ThuHoiDangKyNhanKqQuaBCCI", _ids);
    }
    XacNhanVaYeuCauBCCILayKetQua(_id: string): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/XacNhanVaYeuCauBCCILayKetQua/" + _id);
    }
    DangKyNhanKqQuaBCCI(params: { id: string, DangKyNhanKqQuaBCCIData: string, loai?: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/DangKyNhanKqQuaBCCI/" + params.id, params)
    }
    SearchHoSoChungThuc(params: SearchHoSoChungThucParams): AxiosResponseWrapper<IPaginationResponse<HoSoChungThucResponse[]>> {
        return axiosInstance.get(this._urlSuffix + "/hosochungthucs", { params })
    }
    StatisticHoSoChungThuc(params: ISearchThongKeHoSoChungThuc): AxiosResponseWrapper<IPaginationResponse<StatisticHoSoChungThucResponse[]>> {
        return axiosInstance.get(this._urlSuffix + "/statistichosochungthucs", { params })
    }
    StatisticChiTietHoSoChungThuc(params: ISearchThongKeHoSoChungThuc): AxiosResponseWrapper<IPaginationResponse<IThongKeHoSoChungThucChiTiet[]>> {
        return axiosInstance.get(this._urlSuffix + "/statisticchitiethosochungthucs", { params })
    }
    SearchHoSoTheoBaoCaoTongHop(params: ISearchHoSoTheoBaoCaoTongHopParams): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/search/TheoBaoCaoTongHop", {
            params: params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    SearchHoSoTheoBaoCaoTongHopDonVi(params: ISearchHoSoTheoBaoCaoTongHopParams): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/search/TheoBaoCaoTongHopDonVi", {
            params: params, paramsSerializer: p => {
                return parseParams(p);
            }
        })
    }
    SearchHoSoTheoTiepNhanTrucTuyen(params: ISearchHoSoTheoBaoCaoTongHopParams): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/search/theobaocaotiepnhanhosotructuyen", {
            params: params, paramsSerializer: p => {
                return parseParams(p);
            }
        })
    }
    SearchHoSoTheoTiendoGiaiQuyet(params: ISearchHoSoTheoBaoCaoTongHopParams): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/search/theobaocaochitieutiendo", { params })
    }
    SearchHoSoTheoChiTieuSoHoa(params: ISearchHoSoTheoBaoCaoTongHopParams): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/search/TheoBaoCaoChiTieuSoHoa", { params })
    }
    SearchHoSoTheoChiTieuDvcTrucTuyen(params: ISearchHoSoTheoBaoCaoTongHopParams): AxiosResponseWrapper<IPaginationResponse<IHoSo[]>> {
        return axiosInstance.get(this._urlSuffix + "/search/theochitieudvctructuyen", { params })
    }
    GetInfoChuHoSo(_params: IPickSearch<IHoSo, "id">): AxiosResponseWrapper<IHoSo> {
        return axiosInstance.get(this._urlSuffix + "/GetInfoTraKetQua", { params: _params })
    }
    GetViTriDeHoSo(_params: { id: string }): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/getvitridehoso", { params: _params });
    }
    UpdateViTriDeHoSo(params: UpdateViTriDeHoSo): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/updatevitridehoso/" + params.id, params)
    }
    UpdateTraKetQuaHCC(params: UpdateTraKetQuaHCC): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/updatetraketquahcc", params)
    }

    BanGiaoKetQuaHoSo(
        _params: IBanGiaoKetQuaParams
    ): AxiosResponseWrapper<IBanGiaoKetQuaResponse> {
        return axiosInstance.post(this._urlSuffix + "/xuatphieubangiaoketqua", _params);
    }
    XuatPhieuTiepNhanNhieuHoSo(
        _params: ITiepNhanNhieuHoSoParams
    ): AxiosResponseWrapper<ITiepNhanNhieuHoSoResponse> {
        return axiosInstance.post(this._urlSuffix + "/xuatphieutiepnhannhieuhoso", _params);
    }
    XuatPhieuHuongDanNopTrucTiep(_params: IXuatPhieuHuongDanNopTrucTiepParams): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/XuatPhieuHuongDanNopTrucTiep", { params: _params });
    }
    GetThongTinTraKetQuaHcc(_params: { id: string }): AxiosResponseWrapper<IResult<IHoSo>> {
        return axiosInstance.get(this._urlSuffix + "/getThongTinTraKetQuaHcc", { params: _params })
    }

    ThemCanBoTiepNhanHoSo(params: { hoSoIds: string[], canBoIds: string[] }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/ThemCanBoTiepNhanHoSo", params)
    }
    SearchHoSoTraLaiXinRut(
        _params: ISearchHoSoTraLaiXinRut
    ): AxiosResponseWrapper<IHoSo> {
        return axiosInstance.post(this._urlSuffix + "/search/hosoxinruttralai", _params);
    }
    LayKetQuaBTP(maHoSos: string[]): AxiosResponseWrapper<IResult<DuLieuTraCuuBTP[]>> {
        return axiosInstance.post(this._urlSuffix + `/LayKetQuaBTP`, maHoSos, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
    FakeTuChoiBTP(maHoSo: string): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.post(this._urlSuffix + `/TuChoiBTP`, maHoSo, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
}

export const hoSoApi = new HoSoService()