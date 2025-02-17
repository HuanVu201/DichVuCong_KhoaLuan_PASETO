import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ITaiKhoanThuHuong } from "../models";
import { AddTaiKhoanThuHuong, DeleteTaiKhoanThuHuong, GetTaiKhoanThuHuong, SearchTaiKhoanThuHuong, UpdateTaiKhoanThuHuong } from "./action";

export interface ITaiKhoanThuHuongState extends ExtendedState<ITaiKhoanThuHuong>{

}

const initialState : ITaiKhoanThuHuongState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "TaiKhoanThuHuong",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchTaiKhoanThuHuong.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchTaiKhoanThuHuong.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTaiKhoanThuHuong.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetTaiKhoanThuHuong.pending, (state) => {
                state.loading = true
            })
            .addCase(GetTaiKhoanThuHuong.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetTaiKhoanThuHuong.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddTaiKhoanThuHuong.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddTaiKhoanThuHuong.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateTaiKhoanThuHuong.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateTaiKhoanThuHuong.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteTaiKhoanThuHuong.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteTaiKhoanThuHuong.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer