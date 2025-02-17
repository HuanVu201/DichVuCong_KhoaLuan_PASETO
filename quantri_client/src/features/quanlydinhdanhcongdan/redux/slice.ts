import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { IQuanLyTaiKhoanDinhDanh } from "../models/QuanLyTaiKhoanModel";
import { GetThongTinTaiKhoan, SearchDanhSachTaiKhoan, GetDataChartDinhDanhCongDan } from "./action";

export interface IQuanLyTaiKhoanDinhDanhState extends ExtendedState<IQuanLyTaiKhoanDinhDanh>{

}

const initialState : IQuanLyTaiKhoanDinhDanhState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DinhDanhCongDan",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchDanhSachTaiKhoan.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetThongTinTaiKhoan.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })

            .addCase(GetDataChartDinhDanhCongDan.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
           
            .addMatcher(isPending(SearchDanhSachTaiKhoan, GetThongTinTaiKhoan), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhSachTaiKhoan, GetThongTinTaiKhoan), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer