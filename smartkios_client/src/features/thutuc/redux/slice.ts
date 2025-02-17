import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IThuTuc } from "../models";
import { AddThuTuc, DeleteThuTuc, GetThuTuc, PortalSearchThuTuc, SearchDanhMucTTHC, SearchThuTuc, SearchThuTucNoiBat, UpdateThuTuc } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface IThuTucState extends ExtendedState<IThuTuc, 
    {thuTucNoiBats?: IThuTuc[]}, "thuTucNoiBats">{

}

const initialState : IThuTucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ThuTuc",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchThuTuc.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchThuTuc.fulfilled, (state, action) => {
              
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
            })
            .addCase(PortalSearchThuTuc.fulfilled, (state, action) => {
              
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.currentPages= action.payload.currentPage
                state.pageSize = action.payload.pageSize
                state.loading = false
            })
            .addCase(SearchDanhMucTTHC.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDanhMucTTHC.fulfilled, (state, action) => {
              
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
            })
            .addCase(GetThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddThuTuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateThuTuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteThuTuc.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(SearchThuTucNoiBat.fulfilled, (state, action) => {
                state.thuTucNoiBats =action.payload.data
                
            })
            .addMatcher(isPending(SearchThuTuc, GetThuTuc, AddThuTuc, UpdateThuTuc, DeleteThuTuc,PortalSearchThuTuc), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchThuTuc, GetThuTuc, AddThuTuc, UpdateThuTuc, DeleteThuTuc,PortalSearchThuTuc), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer