import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ILogCSDLDanCuDoanhNghiep, IStatisticLogCSDLDanCuDoanhNghiep } from "../models";
import { AddLogCSDLDanCuDoanhNghiep, DeleteLogCSDLDanCuDoanhNghiep, GetLogCSDLDanCuDoanhNghiep, SearchLogCSDLDanCuDoanhNghiep, StatisticLogCSDLDanCuDoanhNghiep, UpdateLogCSDLDanCuDoanhNghiep } from "./action";

export interface ILogCSDLDanCuDoanhNghiepState extends ExtendedState<ILogCSDLDanCuDoanhNghiep>{}

const initialState : ILogCSDLDanCuDoanhNghiepState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "LogCSDLDanCuDoanhNghiep",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchLogCSDLDanCuDoanhNghiep.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchLogCSDLDanCuDoanhNghiep.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchLogCSDLDanCuDoanhNghiep.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetLogCSDLDanCuDoanhNghiep.pending, (state) => {
                state.loading = true
            })
            .addCase(GetLogCSDLDanCuDoanhNghiep.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetLogCSDLDanCuDoanhNghiep.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddLogCSDLDanCuDoanhNghiep.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddLogCSDLDanCuDoanhNghiep.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateLogCSDLDanCuDoanhNghiep.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateLogCSDLDanCuDoanhNghiep.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteLogCSDLDanCuDoanhNghiep.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteLogCSDLDanCuDoanhNghiep.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer