import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IHoSo, ITheoDoiHoSoKhongDuocTiepNhan, IThongKeHoSoTrongNgay, IThongKeHSLT, IThongKeTheoDoiTrangThaiXuLyHS } from "../models";


import { AddHoSoTrucTiep, ChuyenTiepBuocXuLy, DeleteHoSo, GetHoSo, SearchHoSo, UpdateHoSo, ThayDoiTruongHopThuTuc, TraKetQuaHoSo, ChuyenNoiBo, CapNhatKetQuaHoSo, CapNhatKetQuaNhieuHoSo, KetThucHoSo, ThuHoiHoSo, TraLaiHoSo, YeuCauMotCuaBoSungHoSo, MotCuaCapNhatBoSung, MotCuaGuiBoSung, AddHoSoTrucTuyen, TiepNhanHoSoTrucTuyen, YeuCauThuPhi, YeuCauCongDanBoSung, ThongKeHoSoNguoiDung, TuChoiTiepNhanHoSoTrucTuyen, GetHoSoByMa, CongDanGuiBoSung, CongDanCapNhatBoSung, KhongTiepNhanHoSoBoSungQuaHan, SearchHoSoTheoTrangThaiXuLy, SearchHoSoTheoTrangThaiThuPhi, XacNhanKetQua, ThuHoiChuyenTraKq, TiepNhanHoSoChungThuc, ThemHoSoChungThucTrucTiep, KySoHoSoChungThuc, CapSoVaDongDauHoSoChungThuc, ChuyenPhiDiaGioi, XacNhanKetQuaVaYeuCauThuPhi, GetHoSoDanhGiaHaiLong, XacNhanVaYeuCauBCCILayKetQua, YeuCauBCCILayKetQua, DangKyNhanKqQuaBCCI, TraKetQuaChungThuc, SearchHoSoTheoBaoCaoTongHop, SearchHoSoTheoTiepNhanTrucTuyen, SearchHoSoTheoTienDoGiaiQuyet, SearchHoSoTheoChiTieuSoHoa, SearchHoSoTheoChiTieuDvcTrucTuyen, ChuyenDuLieuTaiKhoan, SearchHoSoTiepNhanQuaHan, UpdateTrangThaiHoSo, SearchTheoDoiHoSoChungThuc, KetThucHoSoTBKM, SearchHoSoTraLaiXinRut, ThuHoiMaVanDonBuuDien, YeuCauBCCILayKetQuaWithoutItemCode, ThuHoiDangKyNhanKqQuaBCCI, SearchHoSoPortal, CanBoBCCISearch, YeuCauBCCILayKetQuaNhieuHoSoItemCode, SearchHoSoLienThong, SearchThongKeHSLT, ThongKeTheoDoiTrangThaiHSAction, SearchSoTheoDoiHoSoAction, ThongKeHoSoTrongNgayAction, TheoDoiHoSoKhongDuocTiepNhanAction, SearchHoSoQuaHanAction, SearchHoSoTheoBaoCaoTongHopDonVi, AddHoSoPhiDiaGioi, SearchThongKeHoSoPhiDiaGioiAction, SearchScanHoSoDienTu, SearchNguoiDaXuLy, SearchNguoiDangXuLy, SearchNguoiNhanHoSo, SearchHoSoByNguoiGui } from "./action";
import { PayloadAction, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { ID_SEPARATE } from "@/data";
import { IHoSoTheoTrangThaiXuLy } from "../models/searchHoSoTheoTrangThaiXuLy";
import { AnyARecord } from "dns";
import { IHoSoTiepNhanQuaHan } from "@/features/thongKe/thongKeQD766/models/ThongKeHoSoTiepNhanQuaHan";
import { count } from "console";

export interface IHoSoState extends ExtendedState<IHoSo, {
    hoSoNguoiDung: {
        tongSoHoSoDangXuLy: number;
        tongSoHoSoDaHoanThanh: number;

    }, maHoSo?: string;
    theoDoiHoSoChungThucs: IHoSo[]
}, "hoSoNguoiDung" | "maHoSo" | "theoDoiHoSoChungThucs"> {
    hoSoTheoTrangThais: IHoSoTheoTrangThaiXuLy[]
    hoSoQuaHans: IHoSoTheoTrangThaiXuLy[]
    hoSoTiepNhanQuaHans: IHoSoTiepNhanQuaHan[]
    hoSoLienThongs: IThongKeHSLT[];
    countHoSoLienThongs: number;
    countThongKeTrongNgays: number;
    countHoSoKhongDuocTiepNhan: number;
    thoiGianTraCuuBTP?: string;
    thongKeTheoDoiTrangThaiHS: IThongKeTheoDoiTrangThaiXuLyHS[]
    thongKeHoSotrongNgay: IThongKeHoSoTrongNgay[]
    theoDoiHoSoKhongDuocTiepNhan: ITheoDoiHoSoKhongDuocTiepNhan[]
}

const initialState: IHoSoState = {
    loading: false,
    hoSoTheoTrangThais: [],
    hoSoTiepNhanQuaHans: [],
    hoSoQuaHans: [],
    hoSoLienThongs: [],
    countHoSoLienThongs: 0,
    countThongKeTrongNgays: 0,
    countHoSoKhongDuocTiepNhan: 0,
    maHoSo: undefined,
    thoiGianTraCuuBTP: undefined,
    thongKeTheoDoiTrangThaiHS: [],
    thongKeHoSotrongNgay: [],
    theoDoiHoSoKhongDuocTiepNhan: []
}


const Slice = createGenericSlice({
    name: "HoSo",
    initialState,
    reducers: {
        // setDinhKemSoHoa: (state, action) => {
        //     const prevData = state.data as any
        //     state.data = {
        //         ...prevData, 
        //         dinhKemSoHoa: (prevData.dinhKemSoHoa as string)?.includes(action.payload) ? prevData.dinhKemSoHoa : prevData.dinhKemSoHoa ? prevData.dinhKemSoHoa + ID_SEPARATE + action.payload : , 
        //         dinhKemKetQua: (prevData.dinhKemKetQua as string)?.includes(action.payload) ? prevData.dinhKemKetQua : prevData.dinhKemKetQua + ID_SEPARATE + action.payload
        //     }
        // } 

        setMaHoSoTheoDonViQuery: (state, action: PayloadAction<string | undefined>) => {
            state.maHoSo = action.payload
        },
        setThoiGianTraCuuBTP: (state, action: PayloadAction<string>) => {
            state.thoiGianTraCuuBTP = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            
            .addCase(SearchScanHoSoDienTu.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(SearchThongKeHSLT.fulfilled, (state, action) => {
                state.loading = false
                state.hoSoLienThongs = action.payload.data
                state.countHoSoLienThongs = action.payload.totalCount
            })
            .addCase(ThongKeTheoDoiTrangThaiHSAction.fulfilled, (state, action) => {
                state.loading = false
                state.thongKeTheoDoiTrangThaiHS = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(TheoDoiHoSoKhongDuocTiepNhanAction.fulfilled, (state, action) => {
                state.loading = false
                state.theoDoiHoSoKhongDuocTiepNhan = action.payload.data
                state.countHoSoKhongDuocTiepNhan = action.payload.totalCount
            })
            .addCase(ThongKeHoSoTrongNgayAction.fulfilled, (state, action) => {
                state.loading = false
                state.thongKeHoSotrongNgay = action.payload.data
                state.countThongKeTrongNgays = action.payload.totalCount
            })
            .addCase(SearchHoSoLienThong.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(CanBoBCCISearch.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(SearchHoSoPortal.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTheoDoiHoSoChungThuc.pending, (state, action) => {

                state.loading = true
                state.theoDoiHoSoChungThucs = undefined
            })
            .addCase(SearchTheoDoiHoSoChungThuc.fulfilled, (state, action) => {

                state.loading = false
                state.theoDoiHoSoChungThucs = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTheoTrangThaiXuLy.fulfilled, (state, action) => {
                state.loading = false
                state.hoSoTheoTrangThais = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoQuaHanAction.fulfilled, (state, action) => {
                state.loading = false
                state.hoSoQuaHans = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTheoTrangThaiThuPhi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetHoSoByMa.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetHoSoDanhGiaHaiLong.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddHoSoTrucTiep.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddHoSoPhiDiaGioi.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(ThemHoSoChungThucTrucTiep.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(XacNhanKetQua.fulfilled, (state, action) => {
                state.loading = false
                toast.success("Thao tác thành công")
            })
            .addCase(XacNhanKetQuaVaYeuCauThuPhi.fulfilled, (state, action) => {
                state.loading = false
                toast.success("Thao tác thành công")
            })
            .addCase(ThuHoiChuyenTraKq.fulfilled, (state, action) => {
                state.loading = false
                toast.success("Thao tác thành công")
            })
            // .addCase(AddHoSoTrucTuyen.fulfilled, () => {
            //     toast.success("Gửi thành công")
            // })
            .addCase(UpdateHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteHoSo.fulfilled, () => {
                toast.success("Xóa hồ sơ thành công")
            })
            .addCase(ChuyenTiepBuocXuLy.fulfilled, (state) => {
                state.loading = false
                toast.success("Chuyển bước xử lý thành công")
            })
            .addCase(ChuyenDuLieuTaiKhoan.fulfilled, (state) => {
                state.loading = false
                toast.success("Chuyển dữ liệu tài khoản thành công")
            })
            .addCase(UpdateTrangThaiHoSo.fulfilled, (state) => {
                state.loading = false
                toast.success("Cập nhật thành công")
            })
            .addCase(KetThucHoSoTBKM.fulfilled, (state) => {
                state.loading = false
                toast.success("Cập nhật thành công")
            })
            .addCase(KySoHoSoChungThuc.fulfilled, (state) => {
                state.loading = false
                toast.success("Ký số chứng thực và chuyển hồ sơ thành công")
            })
            .addCase(CapSoVaDongDauHoSoChungThuc.fulfilled, (state) => {
                state.loading = false
                toast.success("Đóng dấu và chuyển hồ sơ thành công")
            })
            .addCase(ThayDoiTruongHopThuTuc.fulfilled, (state) => {
                toast.success("Thay đổi trường hợp thủ tục thành công")
            })
            .addCase(TraKetQuaHoSo.fulfilled, (state) => {
                toast.success("Trả kết quả thành công")
            })
            .addCase(TraKetQuaChungThuc.fulfilled, (state) => {
                toast.success("Trả kết quả thành công")
            })
            .addCase(ChuyenNoiBo.fulfilled, (state) => {
                toast.success("Chuyển thành công")
            })
            .addCase(CapNhatKetQuaHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(CapNhatKetQuaNhieuHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(KetThucHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(TiepNhanHoSoTrucTuyen.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(TiepNhanHoSoChungThuc.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(YeuCauThuPhi.fulfilled, () => {
                toast.success("Tạo yêu cầu thành công")
            })
            .addCase(YeuCauCongDanBoSung.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(ThongKeHoSoNguoiDung.fulfilled, (state, action) => {
                state.hoSoNguoiDung = action.payload.data
            })
            .addCase(TuChoiTiepNhanHoSoTrucTuyen.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(KhongTiepNhanHoSoBoSungQuaHan.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(ChuyenPhiDiaGioi.fulfilled, (state, action) => {
                state.loading = false
                toast.success("Chuyển thành công")
            })
            .addCase(ThuHoiMaVanDonBuuDien.fulfilled, (state, action) => {
                state.loading = false
                toast.success("Thành công")
            })
            .addCase(ThuHoiDangKyNhanKqQuaBCCI.fulfilled, (state, action) => {
                state.loading = false
                toast.success("Thành công")
            })
            .addCase(XacNhanVaYeuCauBCCILayKetQua.fulfilled, (state, action) => {
                toast.success("Tạo yêu cầu thành công")
                state.loading = false
            })
            .addCase(YeuCauBCCILayKetQua.fulfilled, (state, action) => {

                if (action.payload.succeeded) {

                    toast.success("Tạo yêu cầu thành công")
                } else toast.warning(action.payload.message)
                state.loading = false
            })
            .addCase(YeuCauBCCILayKetQuaWithoutItemCode.fulfilled, (state, action) => {

                if (action.payload.succeeded) {

                    toast.success("Tạo yêu cầu thành công")
                } else toast.warning(action.payload.message)
                state.loading = false
            })
            .addCase(YeuCauBCCILayKetQuaNhieuHoSoItemCode.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(DangKyNhanKqQuaBCCI.fulfilled, (state, action) => {
                toast.success("Tạo yêu cầu thành công")
                state.loading = false
            })
            .addCase(TraLaiHoSo.fulfilled, (state, action) => {
                toast.success("Thao tác thành công")
                state.loading = false
            })
            .addCase(SearchHoSoTheoBaoCaoTongHop.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTheoBaoCaoTongHopDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTheoTiepNhanTrucTuyen.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTheoTienDoGiaiQuyet.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTheoChiTieuSoHoa.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTheoChiTieuDvcTrucTuyen.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTiepNhanQuaHan.fulfilled, (state, action) => {
                state.loading = false
                state.hoSoTiepNhanQuaHans = action.payload

            })
            .addCase(SearchSoTheoDoiHoSoAction.fulfilled, (state, action) => {
                state.loading = false
                state.hoSoTiepNhanQuaHans = action.payload.data,
                    state.count = action.payload.totalCount

            })
            .addCase(SearchThongKeHoSoPhiDiaGioiAction.fulfilled, (state, action) => {
                state.loading = false
                state.hoSoTiepNhanQuaHans = action.payload.data,
                    state.count = action.payload.totalCount

            })
            .addCase(SearchScanHoSoDienTu.pending, (state, action) => {
                state.loading = true
                state.datas = undefined
                state.count = undefined
            })
            .addCase(GetHoSo.pending, (state) => {
                state.data = undefined
            })
            .addCase(GetHoSo.rejected, (state) => {
                state.data = undefined
            })
            .addMatcher(isFulfilled(SearchHoSo, SearchNguoiDaXuLy, SearchNguoiDangXuLy, SearchNguoiNhanHoSo, SearchHoSoByNguoiGui), (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addMatcher(isPending(SearchHoSo, SearchNguoiDaXuLy, SearchNguoiDangXuLy, SearchNguoiNhanHoSo, SearchHoSoByNguoiGui), (state) => {
                state.loading = true
                state.datas = undefined
                state.count = undefined
            })
            .addMatcher(isPending(AddHoSoPhiDiaGioi, SearchHoSoPortal, ThongKeTheoDoiTrangThaiHSAction, SearchThongKeHSLT, XacNhanKetQua, SearchHoSoTheoTrangThaiXuLy, SearchHoSoTheoTrangThaiThuPhi, AddHoSoTrucTuyen, AddHoSoTrucTiep, ThemHoSoChungThucTrucTiep, UpdateHoSo, DeleteHoSo, ChuyenTiepBuocXuLy, CapSoVaDongDauHoSoChungThuc, ThayDoiTruongHopThuTuc, TraKetQuaHoSo, TraKetQuaChungThuc, ChuyenPhiDiaGioi, XacNhanKetQuaVaYeuCauThuPhi, XacNhanVaYeuCauBCCILayKetQua, YeuCauBCCILayKetQua, DangKyNhanKqQuaBCCI
                , SearchHoSoTheoBaoCaoTongHop, SearchHoSoTheoBaoCaoTongHopDonVi, SearchHoSoTheoTiepNhanTrucTuyen, SearchHoSoTheoTienDoGiaiQuyet, SearchHoSoTheoChiTieuSoHoa, SearchHoSoTheoChiTieuDvcTrucTuyen, SearchHoSoTiepNhanQuaHan
                , ThuHoiMaVanDonBuuDien, YeuCauBCCILayKetQuaWithoutItemCode, YeuCauBCCILayKetQuaNhieuHoSoItemCode, ThuHoiDangKyNhanKqQuaBCCI, CanBoBCCISearch, SearchSoTheoDoiHoSoAction, SearchHoSoQuaHanAction
            ), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchScanHoSoDienTu,SearchHoSo, SearchHoSoPortal, XacNhanKetQua, ThuHoiChuyenTraKq, SearchHoSoTheoTrangThaiXuLy, SearchHoSoTheoTrangThaiThuPhi, DeleteHoSo, XacNhanVaYeuCauBCCILayKetQua, YeuCauBCCILayKetQua, SearchHoSoTiepNhanQuaHan, ThuHoiMaVanDonBuuDien
                , YeuCauBCCILayKetQuaWithoutItemCode, ThuHoiDangKyNhanKqQuaBCCI, SearchThongKeHSLT, ThongKeTheoDoiTrangThaiHSAction, SearchHoSoQuaHanAction, SearchHoSoTheoBaoCaoTongHopDonVi, SearchThongKeHoSoPhiDiaGioiAction
            ), (state, action) => {
                // toast.error("Thao tác thất bại")
                state.loading = false
                state.datas = undefined
                state.hoSoTiepNhanQuaHans = undefined
                state.hoSoLienThongs = undefined
                state.thongKeHoSotrongNgay = undefined
                state.hoSoQuaHans = undefined
                state.hoSoTheoTrangThais = undefined
                state.count = undefined
            })
            .addMatcher(isRejectedWithValue(AddHoSoPhiDiaGioi, YeuCauThuPhi, AddHoSoTrucTiep, ChuyenTiepBuocXuLy, CapSoVaDongDauHoSoChungThuc, KySoHoSoChungThuc, ThemHoSoChungThucTrucTiep, UpdateHoSo, AddHoSoTrucTuyen, ThayDoiTruongHopThuTuc, TraKetQuaHoSo, TraKetQuaChungThuc, ChuyenNoiBo, CapNhatKetQuaHoSo, CapNhatKetQuaNhieuHoSo, KetThucHoSo, TiepNhanHoSoTrucTuyen, TiepNhanHoSoChungThuc, ThuHoiHoSo, TraLaiHoSo, YeuCauMotCuaBoSungHoSo, MotCuaCapNhatBoSung, CongDanCapNhatBoSung, MotCuaGuiBoSung, CongDanGuiBoSung, YeuCauCongDanBoSung, TuChoiTiepNhanHoSoTrucTuyen, KhongTiepNhanHoSoBoSungQuaHan, ChuyenPhiDiaGioi, XacNhanKetQuaVaYeuCauThuPhi, XacNhanVaYeuCauBCCILayKetQua, YeuCauBCCILayKetQua, DangKyNhanKqQuaBCCI
                , SearchHoSoTheoBaoCaoTongHop, SearchHoSoTheoTiepNhanTrucTuyen, SearchHoSoTheoTienDoGiaiQuyet, SearchHoSoTheoChiTieuSoHoa, SearchHoSoTheoChiTieuDvcTrucTuyen, CanBoBCCISearch, YeuCauBCCILayKetQuaNhieuHoSoItemCode), (state, action: any) => {
                    state.loading = false
                    toast.error(action.payload.message)
                })
    }
})

export const { resetData, resetDatas, setMaHoSoTheoDonViQuery, setThoiGianTraCuuBTP } = Slice.actions

export default Slice.reducer