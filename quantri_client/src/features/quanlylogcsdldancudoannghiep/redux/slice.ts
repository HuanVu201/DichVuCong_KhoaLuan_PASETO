import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ILogCSDLDanCuDoanhNghiep } from "../models";
import { AddLogCSDLDanCuDoanhNghiep, DeleteLogCSDLDanCuDoanhNghiep, GetLogCSDLDanCuDoanhNghiep, SearchLogCSDLDanCuDoanhNghiep, UpdateLogCSDLDanCuDoanhNghiep } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ILogCSDLDanCuDoanhNghiepState extends ExtendedState<ILogCSDLDanCuDoanhNghiep>{

}

const initialState : ILogCSDLDanCuDoanhNghiepState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "LogCSDLDanCuDoanhNghiep",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchLogCSDLDanCuDoanhNghiep.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetLogCSDLDanCuDoanhNghiep.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddLogCSDLDanCuDoanhNghiep.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateLogCSDLDanCuDoanhNghiep.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteLogCSDLDanCuDoanhNghiep.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchLogCSDLDanCuDoanhNghiep, GetLogCSDLDanCuDoanhNghiep, AddLogCSDLDanCuDoanhNghiep, UpdateLogCSDLDanCuDoanhNghiep, DeleteLogCSDLDanCuDoanhNghiep), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchLogCSDLDanCuDoanhNghiep, GetLogCSDLDanCuDoanhNghiep, AddLogCSDLDanCuDoanhNghiep, UpdateLogCSDLDanCuDoanhNghiep, DeleteLogCSDLDanCuDoanhNghiep), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer