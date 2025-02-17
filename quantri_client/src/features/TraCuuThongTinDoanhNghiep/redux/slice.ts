import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ITraCuuThongTinDoanhNghiep } from "../models";
import { AddTraCuuThongTinDoanhNghiep, DeleteTraCuuThongTinDoanhNghiep, GetTraCuuThongTinDoanhNghiep, SearchTraCuuThongTinDoanhNghiep, SearchTraCuuThongTinDoanhNghiepTheoDonVi, UpdateTraCuuThongTinDoanhNghiep } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ITraCuuThongTinDoanhNghiepState extends ExtendedState<ITraCuuThongTinDoanhNghiep> {

}

const initialState: ITraCuuThongTinDoanhNghiepState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "TraCuuThongTinDoanhNghiep",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchTraCuuThongTinDoanhNghiep.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTraCuuThongTinDoanhNghiepTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetTraCuuThongTinDoanhNghiep.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddTraCuuThongTinDoanhNghiep.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateTraCuuThongTinDoanhNghiep.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteTraCuuThongTinDoanhNghiep.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchTraCuuThongTinDoanhNghiep, GetTraCuuThongTinDoanhNghiep, AddTraCuuThongTinDoanhNghiep, UpdateTraCuuThongTinDoanhNghiep, DeleteTraCuuThongTinDoanhNghiep, SearchTraCuuThongTinDoanhNghiepTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchTraCuuThongTinDoanhNghiep, GetTraCuuThongTinDoanhNghiep, AddTraCuuThongTinDoanhNghiep, UpdateTraCuuThongTinDoanhNghiep, DeleteTraCuuThongTinDoanhNghiep, SearchTraCuuThongTinDoanhNghiepTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer