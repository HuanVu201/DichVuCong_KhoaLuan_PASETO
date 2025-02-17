import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { INguoiTiepNhanThuTuc, IThuTuc } from "../models";
import { AddThuTuc, DeleteThuTuc, GetThuTuc, PortalSearchThuTuc, SearchDanhMucTTHC, SearchNguoiTiepNhanThuTucs, SearchThuTuc, SearchThuTucNoiBat, UpdateThuTuc } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface ITNguoiTiepNhanThuTucState extends ExtendedState<INguoiTiepNhanThuTuc>{

}

const initialState : ITNguoiTiepNhanThuTucState = {
    loading: false,
}

const Slice2 = createGenericSlice({
    name: "NguoiTiepNhanThuTuc",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchNguoiTiepNhanThuTucs.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchNguoiTiepNhanThuTucs.fulfilled, (state, action) => {
              
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
            })
            .addCase(SearchNguoiTiepNhanThuTucs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
           
    }
})

export const {resetData, resetDatas} = Slice2.actions

export default Slice2.reducer