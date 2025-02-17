import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IThanhPhanHoSo } from "../models";
import { AddThanhPhanHoSo, DeleteThanhPhanHoSo, GetThanhPhanHoSo, SearchThanhPhanHoSo, UpdateThanhPhanHoSo } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IThanhPhanHoSoState extends ExtendedState<IThanhPhanHoSo>{

}

const initialState : IThanhPhanHoSoState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ThanhPhanHoSo",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchThanhPhanHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetThanhPhanHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddThanhPhanHoSo.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateThanhPhanHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteThanhPhanHoSo.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchThanhPhanHoSo, GetThanhPhanHoSo, AddThanhPhanHoSo, UpdateThanhPhanHoSo, DeleteThanhPhanHoSo), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchThanhPhanHoSo, GetThanhPhanHoSo, AddThanhPhanHoSo, UpdateThanhPhanHoSo, DeleteThanhPhanHoSo), (state, action) => {
                toast.error("Thao tác thất bại")
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer