import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IYeuCauThanhToan } from "../models";
import { AddYeuCauThanhToan, DeleteYeuCauThanhToan, GetYeuCauThanhToan, PayYeuCauThanhToan, SearchYeuCauThanhToan, UpdateYeuCauThanhToan } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IYeuCauThanhToanState extends ExtendedState<IYeuCauThanhToan>{

}

const initialState : IYeuCauThanhToanState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "YeuCauThanhToan",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchYeuCauThanhToan.fulfilled, (state, YeuCauThanhToan) => {
                state.loading = false
                state.datas = YeuCauThanhToan.payload.data
                state.count = YeuCauThanhToan.payload.totalCount
            })
            .addCase(GetYeuCauThanhToan.fulfilled, (state, YeuCauThanhToan) => {
                state.loading = false
                state.data = YeuCauThanhToan.payload.data
            })
            .addCase(AddYeuCauThanhToan.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateYeuCauThanhToan.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(PayYeuCauThanhToan.fulfilled, () => {
                toast.success("Thành công")
            })
            .addCase(DeleteYeuCauThanhToan.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchYeuCauThanhToan, GetYeuCauThanhToan, AddYeuCauThanhToan, UpdateYeuCauThanhToan, DeleteYeuCauThanhToan), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchYeuCauThanhToan, GetYeuCauThanhToan, AddYeuCauThanhToan, UpdateYeuCauThanhToan, DeleteYeuCauThanhToan,PayYeuCauThanhToan), (state, YeuCauThanhToan) => {
             
                toast.error((YeuCauThanhToan.payload as any)?.response?.data)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer