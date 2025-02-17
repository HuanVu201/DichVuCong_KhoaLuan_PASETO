import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ITrangThaiHoSo } from "../models";
import { AddTrangThaiHoSo, DeleteTrangThaiHoSo, GetTrangThaiHoSo, SearchTrangThaiHoSo, UpdateTrangThaiHoSo } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ITrangThaiHoSoState extends ExtendedState<ITrangThaiHoSo>{

}

const initialState : ITrangThaiHoSoState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "TrangThaiHoSo",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchTrangThaiHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetTrangThaiHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddTrangThaiHoSo.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateTrangThaiHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteTrangThaiHoSo.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchTrangThaiHoSo, GetTrangThaiHoSo, AddTrangThaiHoSo, UpdateTrangThaiHoSo, DeleteTrangThaiHoSo), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchTrangThaiHoSo, GetTrangThaiHoSo, AddTrangThaiHoSo, UpdateTrangThaiHoSo, DeleteTrangThaiHoSo), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer