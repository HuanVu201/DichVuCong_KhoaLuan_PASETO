import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { IHoSoNhap } from "../models";
import { AddHoSoNhap, DeleteHoSoNhap, GetHoSoNhap, SearchHoSoNhap, UpdateHoSoNhap } from "./action";

export interface IHoSoNhapState extends ExtendedState<IHoSoNhap>{

}

const initialState : IHoSoNhapState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "HoSoNhap",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchHoSoNhap.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetHoSoNhap.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            // .addCase(AddHoSoNhap.fulfilled, () => {
            //     toast.success("Lưu trữ hồ sơ thành công")
            // })
            .addCase(AddHoSoNhap.rejected, (state, action) => {
                toast.error(action.payload as any)
            })
            .addCase(UpdateHoSoNhap.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteHoSoNhap.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchHoSoNhap, GetHoSoNhap, AddHoSoNhap, UpdateHoSoNhap, DeleteHoSoNhap), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchHoSoNhap, GetHoSoNhap, UpdateHoSoNhap, DeleteHoSoNhap), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer