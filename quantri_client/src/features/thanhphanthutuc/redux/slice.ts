import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IThanhPhanThuTuc } from "../models";
import { AddThanhPhanThuTuc, DeleteThanhPhanThuTuc, GetThanhPhanThuTuc, SearchThanhPhanThuTuc, UpdateThanhPhanThuTuc } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IThanhPhanThuTucState extends ExtendedState<IThanhPhanThuTuc>{

}

const initialState : IThanhPhanThuTucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ThanhPhanThuTuc",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchThanhPhanThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetThanhPhanThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddThanhPhanThuTuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateThanhPhanThuTuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteThanhPhanThuTuc.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchThanhPhanThuTuc, GetThanhPhanThuTuc, AddThanhPhanThuTuc, UpdateThanhPhanThuTuc, DeleteThanhPhanThuTuc), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchThanhPhanThuTuc, GetThanhPhanThuTuc, AddThanhPhanThuTuc, UpdateThanhPhanThuTuc, DeleteThanhPhanThuTuc), (state, action) => {
                toast.error("Thao tác thất bại")
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer