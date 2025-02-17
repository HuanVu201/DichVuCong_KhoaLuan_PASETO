import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ITraCuuHoKinhDoanh } from "../models";
import { AddTraCuuHoKinhDoanh, DeleteTraCuuHoKinhDoanh, GetTraCuuHoKinhDoanh, SearchTraCuuHoKinhDoanh, SearchTraCuuHoKinhDoanhTheoDonVi, UpdateTraCuuHoKinhDoanh } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ITraCuuHoKinhDoanhState extends ExtendedState<ITraCuuHoKinhDoanh> {

}

const initialState: ITraCuuHoKinhDoanhState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "TraCuuHoKinhDoanh",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchTraCuuHoKinhDoanh.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTraCuuHoKinhDoanhTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetTraCuuHoKinhDoanh.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddTraCuuHoKinhDoanh.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateTraCuuHoKinhDoanh.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteTraCuuHoKinhDoanh.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchTraCuuHoKinhDoanh, GetTraCuuHoKinhDoanh, AddTraCuuHoKinhDoanh, UpdateTraCuuHoKinhDoanh, DeleteTraCuuHoKinhDoanh, SearchTraCuuHoKinhDoanhTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchTraCuuHoKinhDoanh, GetTraCuuHoKinhDoanh, AddTraCuuHoKinhDoanh, UpdateTraCuuHoKinhDoanh, DeleteTraCuuHoKinhDoanh, SearchTraCuuHoKinhDoanhTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer