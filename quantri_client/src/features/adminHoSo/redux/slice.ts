import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";



import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { IHoSo } from "@/features/hoso/models";
import { DatLaiNgayHenTra, DatLaiQuyTrinhXuLy, AdminUpdateHoSo, AdminGetHoSo, AdminGetYeuCauThanhToan, AdminUpdateYeuCauThanhToan, AdminKetThucXuLyNhieuHoSo } from "./action";
import { IAdminHoSo } from "../models/AdminHoSoDto";
import { IAdminYeuCauThanhToan } from "../models/AdminYeuCauThanhToanDto";

export interface IHoSoState extends ExtendedState<IAdminHoSo, {
    hoSoNguoiDung: {
        tongSoHoSoDangXuLy: number;
        tongSoHoSoDaHoanThanh: number;

    }
}, "hoSoNguoiDung"> {
    yeuCauThanhToans?: IAdminYeuCauThanhToan
}

const initialState: IHoSoState = {
    loading: false,

}

const Slice = createGenericSlice({
    name: "AdminHoSo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AdminGetHoSo.fulfilled, (state, payload) => {
                state.loading = false;
                state.data = payload.payload.data;
            })
            .addCase(AdminGetYeuCauThanhToan.fulfilled, (state, payload) => {
                state.loading = false;
                state.yeuCauThanhToans = payload.payload.data;
            })
            .addCase(DatLaiNgayHenTra.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(DatLaiQuyTrinhXuLy.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(AdminUpdateHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(AdminUpdateYeuCauThanhToan.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(AdminKetThucXuLyNhieuHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addMatcher(isPending(DatLaiNgayHenTra, DatLaiQuyTrinhXuLy, AdminUpdateHoSo, AdminGetHoSo, AdminGetYeuCauThanhToan, AdminUpdateYeuCauThanhToan), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(AdminGetHoSo, AdminGetYeuCauThanhToan), (state, action) => {
                state.loading = false
                toast.error("Lấy thông tin thất bại")
            })
            .addMatcher(isRejectedWithValue(AdminKetThucXuLyNhieuHoSo), (state, action) => {
                state.loading = false
                toast.error(action.payload as any)
            })
            .addMatcher(isRejectedWithValue(DatLaiNgayHenTra, DatLaiQuyTrinhXuLy, AdminUpdateHoSo, AdminUpdateYeuCauThanhToan), (state, action) => {
                state.loading = false
                toast.error(action.payload.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer