import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSoResponse } from "../models";
import { AddDuThaoXuLyHoSo, DeleteDuThaoXuLyHoSo, GetDuThaoXuLyHoSo, SearchDuThaoXuLyHoSo, UpdateDuThaoXuLyHoSo } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDuThaoXuLyHoSoState extends ExtendedState<IDuThaoXuLyHoSo , {
    duThaoXuLyHoSos?: ISearchDuThaoXuLyHoSoResponse[]
}, "duThaoXuLyHoSos">{
    
}

const initialState : IDuThaoXuLyHoSoState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DuThaoXuLyHoSo",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchDuThaoXuLyHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.duThaoXuLyHoSos = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetDuThaoXuLyHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDuThaoXuLyHoSo.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            // .addCase(UpdateDuThaoXuLyHoSo.fulfilled, () => {
            //     toast.success("Cập nhật thành công")
            // })
            .addCase(DeleteDuThaoXuLyHoSo.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDuThaoXuLyHoSo, GetDuThaoXuLyHoSo, AddDuThaoXuLyHoSo, UpdateDuThaoXuLyHoSo, DeleteDuThaoXuLyHoSo), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDuThaoXuLyHoSo, GetDuThaoXuLyHoSo, AddDuThaoXuLyHoSo, UpdateDuThaoXuLyHoSo, DeleteDuThaoXuLyHoSo), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer