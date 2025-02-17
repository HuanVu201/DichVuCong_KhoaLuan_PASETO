import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IHoSo } from "../models";


import { AddHoSoTrucTiep, ChuyenTiepBuocXuLy, DeleteHoSo, GetHoSo, SearchHoSo, UpdateHoSo, ThayDoiTruongHopThuTuc, TraKetQuaHoSo, ChuyenNoiBo, CapNhatKetQuaHoSo, KetThucHoSo, ThuHoiHoSo, TraLaiHoSo, YeuCauMotCuaBoSungHoSo, MotCuaCapNhatBoSung, MotCuaGuiBoSung, AddHoSoTrucTuyen, TiepNhanHoSoTrucTuyen, YeuCauThuPhi, YeuCauCongDanBoSung, ThongKeHoSoNguoiDung, TuChoiTiepNhanHoSoTrucTuyen, GetHoSoByMa, CongDanGuiBoSung, CongDanCapNhatBoSung, KhongTiepNhanHoSoBoSungQuaHan, SearchHoSoTheoTrangThaiXuLy, SearchHoSoTheoTrangThaiThuPhi, XacNhanKetQua, ThuHoiChuyenTraKq, TiepNhanHoSoChungThuc, ThemHoSoChungThucTrucTiep, KySoHoSoChungThuc, CapSoVaDongDauHoSoChungThuc, ChuyenPhiDiaGioi, XacNhanKetQuaVaYeuCauThuPhi, GetHoSoDanhGiaHaiLong, XacNhanVaYeuCauBCCILayKetQua, YeuCauBCCILayKetQua, DangKyNhanKqQuaBCCI } from "./action";
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { ID_SEPARATE } from "@/data";
import { IHoSoTheoTrangThaiXuLy } from "../models/searchHoSoTheoTrangThaiXuLy";

export interface IHoSoState extends ExtendedState<IHoSo, {hoSoNguoiDung: {
    tongSoHoSoDangXuLy: number;
    tongSoHoSoDaHoanThanh: number;
}}, "hoSoNguoiDung">{
    hoSoTheoTrangThais:  IHoSoTheoTrangThaiXuLy[]
} 

const initialState : IHoSoState = {
    loading: false,
    hoSoTheoTrangThais: []
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
    },
    extraReducers:(builder) => {
        builder
            .addCase(SearchHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoSoTheoTrangThaiXuLy.fulfilled, (state, action) => {
                state.loading = false
                state.hoSoTheoTrangThais = action.payload.data
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
            .addCase(ThemHoSoChungThucTrucTiep.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(XacNhanKetQua.fulfilled, (state,action) => {
                state.loading = false
                toast.success("Xác nhận thành công thành công")
            })
            .addCase(XacNhanKetQuaVaYeuCauThuPhi.fulfilled, (state,action) => {
                state.loading = false
                toast.success("Xác nhận thành công thành công")
            })
            .addCase(ThuHoiChuyenTraKq.fulfilled, (state,action) => {
                state.loading = false
                toast.success("Xác nhận thành công thành công")
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
            .addCase(KySoHoSoChungThuc.fulfilled, (state) => {
                state.loading = false
                toast.success("Ký số chứng thực và chuyển hồ sơ thành công")
            })
            .addCase(CapSoVaDongDauHoSoChungThuc.fulfilled, (state) => {
                state.loading = false
                toast.success("Cấp số và đóng dấu thành công")
            })
            .addCase(ThayDoiTruongHopThuTuc.fulfilled, (state) => {
                toast.success("Thay đổi trường hợp thủ tục thành công")
            })
            .addCase(TraKetQuaHoSo.fulfilled, (state) => {
                toast.success("Trả kết quả thành công")
            })
            .addCase(ChuyenNoiBo.fulfilled, (state) => {
                toast.success("Chuyển thành công")
            })
            .addCase(CapNhatKetQuaHoSo.fulfilled, () =>{
                toast.success("Cập nhật thành công")
            })
            .addCase(KetThucHoSo.fulfilled, () =>{
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
            .addCase(XacNhanVaYeuCauBCCILayKetQua.fulfilled, () => {
                toast.success("Tạo yêu cầu thành công")
            })
            .addCase(YeuCauBCCILayKetQua.fulfilled, () => {
                toast.success("Tạo yêu cầu thành công")
            })
            .addCase(DangKyNhanKqQuaBCCI.fulfilled, () => {
                toast.success("Tạo yêu cầu thành công")
            })
            
            .addMatcher(isPending(SearchHoSo, XacNhanKetQua, SearchHoSoTheoTrangThaiXuLy, SearchHoSoTheoTrangThaiThuPhi, GetHoSo, AddHoSoTrucTuyen, AddHoSoTrucTiep, ThemHoSoChungThucTrucTiep, UpdateHoSo, DeleteHoSo, ChuyenTiepBuocXuLy, CapSoVaDongDauHoSoChungThuc, ThayDoiTruongHopThuTuc, TraKetQuaHoSo, ChuyenPhiDiaGioi, XacNhanKetQuaVaYeuCauThuPhi, XacNhanVaYeuCauBCCILayKetQua, YeuCauBCCILayKetQua,DangKyNhanKqQuaBCCI), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchHoSo, XacNhanKetQua,ThuHoiChuyenTraKq,SearchHoSoTheoTrangThaiXuLy,SearchHoSoTheoTrangThaiThuPhi,GetHoSo, AddHoSoTrucTiep, ThemHoSoChungThucTrucTiep, UpdateHoSo, DeleteHoSo,XacNhanVaYeuCauBCCILayKetQua,YeuCauBCCILayKetQua), (state, action) => {
                // toast.error("Thao tác thất bại")
                state.loading = false
            })
            .addMatcher(isRejectedWithValue(ChuyenTiepBuocXuLy, CapSoVaDongDauHoSoChungThuc, KySoHoSoChungThuc, AddHoSoTrucTuyen, ThayDoiTruongHopThuTuc, TraKetQuaHoSo, ChuyenNoiBo, CapNhatKetQuaHoSo, KetThucHoSo, TiepNhanHoSoTrucTuyen, TiepNhanHoSoChungThuc, ThuHoiHoSo, TraLaiHoSo, YeuCauMotCuaBoSungHoSo, MotCuaCapNhatBoSung, CongDanCapNhatBoSung, MotCuaGuiBoSung, CongDanGuiBoSung, YeuCauCongDanBoSung, TuChoiTiepNhanHoSoTrucTuyen, KhongTiepNhanHoSoBoSungQuaHan, ChuyenPhiDiaGioi, XacNhanKetQuaVaYeuCauThuPhi, XacNhanVaYeuCauBCCILayKetQua, YeuCauBCCILayKetQua,DangKyNhanKqQuaBCCI), (state, action:any) => {
                state.loading = false
                toast.error(action.payload.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer