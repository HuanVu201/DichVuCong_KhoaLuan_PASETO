import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IGiaoDichThanhToan } from "../models";
import { AddGiaoDichThanhToan, CheckConfirmGiaoDichThanhToan, DeleteGiaoDichThanhToan, GetGiaoDichThanhToan, SearchGiaoDichThanhToan, SearchGiaoDichThanhToanTheoDonVi, UpdateGiaoDichThanhToan } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IGiaoDichThanhToanState extends ExtendedState<IGiaoDichThanhToan> {

}

const initialState: IGiaoDichThanhToanState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "GiaoDichThanhToan",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchGiaoDichThanhToan.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchGiaoDichThanhToanTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(CheckConfirmGiaoDichThanhToan.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(GetGiaoDichThanhToan.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddGiaoDichThanhToan.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateGiaoDichThanhToan.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteGiaoDichThanhToan.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchGiaoDichThanhToan, GetGiaoDichThanhToan, AddGiaoDichThanhToan, UpdateGiaoDichThanhToan, DeleteGiaoDichThanhToan, SearchGiaoDichThanhToanTheoDonVi, CheckConfirmGiaoDichThanhToan), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchGiaoDichThanhToan, GetGiaoDichThanhToan, AddGiaoDichThanhToan, UpdateGiaoDichThanhToan, DeleteGiaoDichThanhToan, SearchGiaoDichThanhToanTheoDonVi, CheckConfirmGiaoDichThanhToan), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer