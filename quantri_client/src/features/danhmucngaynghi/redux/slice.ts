import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { INgayNghi } from "../models";
import { AddNgayNghi, DeleteNgayNghi, GetNgayNghi, SearchNgayNghi , UpdateNgayNghi } from "./action";

export interface INgayNghiState extends ExtendedState<INgayNghi>{

}

const initialState : INgayNghiState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ngaynghi",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchNgayNghi.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchNgayNghi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchNgayNghi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetNgayNghi.pending, (state) => {
                state.loading = true
            })
            .addCase(GetNgayNghi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetNgayNghi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddNgayNghi.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddNgayNghi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateNgayNghi.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateNgayNghi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteNgayNghi.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteNgayNghi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer