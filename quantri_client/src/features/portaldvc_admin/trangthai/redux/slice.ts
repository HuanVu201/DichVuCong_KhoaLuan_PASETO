import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../../lib/redux/GenericSlice";
import { AddTrangThai, DeleteTrangThai, GetTrangThai, SearchTrangThai, UpdateTrangThai } from "./action";
import { ITrangThai } from "../models";
export interface ITrangThaiState extends ExtendedState<ITrangThai> {
}

const initialState: ITrangThaiState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "post",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchTrangThai.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchTrangThai.fulfilled, (state, action) => {
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
            })
            .addCase(SearchTrangThai.rejected, (state, action) => {
                state.loading = false
                toast(action.payload?.message)
            })
            .addCase(GetTrangThai.pending, (state) => {
                state.loading = true
            })
            .addCase(GetTrangThai.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
            })
            .addCase(GetTrangThai.rejected, (state, action) => {
                state.loading = false
                toast(action.payload?.message)
            })
            .addCase(AddTrangThai.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddTrangThai.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateTrangThai.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateTrangThai.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteTrangThai.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteTrangThai.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})


export default Slice.reducer

export const { resetData, resetDatas } = Slice.actions;