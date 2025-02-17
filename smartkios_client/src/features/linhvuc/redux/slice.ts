import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ILinhVuc } from "../models";
import { AddLinhVuc, DeleteLinhVuc, GetLinhVuc, SearchLinhVuc, UpdateLinhVuc } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ILinhVucState extends ExtendedState<ILinhVuc>{

}

const initialState : ILinhVucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "LinhVuc",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchLinhVuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetLinhVuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddLinhVuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateLinhVuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteLinhVuc.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchLinhVuc, GetLinhVuc, AddLinhVuc, UpdateLinhVuc, DeleteLinhVuc), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchLinhVuc, GetLinhVuc, AddLinhVuc, UpdateLinhVuc, DeleteLinhVuc), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer