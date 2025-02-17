import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ITraCuuHopTacXa } from "../models";
import { AddTraCuuHopTacXa, DeleteTraCuuHopTacXa, GetTraCuuHopTacXa, SearchTraCuuHopTacXa, SearchTraCuuHopTacXaTheoDonVi, UpdateTraCuuHopTacXa } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ITraCuuHopTacXaState extends ExtendedState<ITraCuuHopTacXa> {

}

const initialState: ITraCuuHopTacXaState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "TraCuuHopTacXa",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchTraCuuHopTacXa.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTraCuuHopTacXaTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetTraCuuHopTacXa.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddTraCuuHopTacXa.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateTraCuuHopTacXa.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteTraCuuHopTacXa.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchTraCuuHopTacXa, GetTraCuuHopTacXa, AddTraCuuHopTacXa, UpdateTraCuuHopTacXa, DeleteTraCuuHopTacXa, SearchTraCuuHopTacXaTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchTraCuuHopTacXa, GetTraCuuHopTacXa, AddTraCuuHopTacXa, UpdateTraCuuHopTacXa, DeleteTraCuuHopTacXa, SearchTraCuuHopTacXaTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer