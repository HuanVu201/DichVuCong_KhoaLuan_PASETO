import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IQuyTrinhXuLy } from "../models";
import { AddQuyTrinhXuLy, AddQuyTrinhXuLys, DeleteQuyTrinhXuLy, DuplicateQuyTrinhXuLy, GetQuyTrinhXuLy, SearchQuyTrinhXuLy, UpdateQuyTrinhXuLy, UpdateQuyTrinhXuLyWithoutSearch } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IQuyTrinhXuLyState extends ExtendedState<IQuyTrinhXuLy>{

}

const initialState : IQuyTrinhXuLyState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "QuyTrinhXuLy",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchQuyTrinhXuLy.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetQuyTrinhXuLy.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddQuyTrinhXuLy.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateQuyTrinhXuLy.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateQuyTrinhXuLyWithoutSearch.fulfilled, () => {
                
            })
            .addCase(DeleteQuyTrinhXuLy.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(DuplicateQuyTrinhXuLy.fulfilled, () => {
                toast.success("Nhân bản thành công")
            })
            .addCase(AddQuyTrinhXuLys.fulfilled, () => {
                
            })
            .addMatcher(isPending(SearchQuyTrinhXuLy, GetQuyTrinhXuLy, AddQuyTrinhXuLy, UpdateQuyTrinhXuLy, DeleteQuyTrinhXuLy,DuplicateQuyTrinhXuLy), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchQuyTrinhXuLy, AddQuyTrinhXuLy, UpdateQuyTrinhXuLy, DeleteQuyTrinhXuLy,DuplicateQuyTrinhXuLy), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer