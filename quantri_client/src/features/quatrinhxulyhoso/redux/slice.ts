import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IQuaTrinhXuLyHoSo } from "../models";
import { AddQuaTrinhXuLyHoSo, DeleteQuaTrinhXuLyHoSo, GetQuaTrinhXuLyHoSo, SearchQuaTrinhXuLyHoSo, UpdateQuaTrinhXuLyHoSo } from "./action";
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IQuaTrinhXuLyHoSoState extends ExtendedState<IQuaTrinhXuLyHoSo>{

}

const initialState : IQuaTrinhXuLyHoSoState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "QuaTrinhXuLyHoSo",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchQuaTrinhXuLyHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetQuaTrinhXuLyHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddQuaTrinhXuLyHoSo.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateQuaTrinhXuLyHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteQuaTrinhXuLyHoSo.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addMatcher(isPending(SearchQuaTrinhXuLyHoSo, GetQuaTrinhXuLyHoSo, AddQuaTrinhXuLyHoSo, UpdateQuaTrinhXuLyHoSo, DeleteQuaTrinhXuLyHoSo), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchQuaTrinhXuLyHoSo, GetQuaTrinhXuLyHoSo, AddQuaTrinhXuLyHoSo, UpdateQuaTrinhXuLyHoSo, DeleteQuaTrinhXuLyHoSo), (state, action) => {
                toast.error("Thao tác thất bại")
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer