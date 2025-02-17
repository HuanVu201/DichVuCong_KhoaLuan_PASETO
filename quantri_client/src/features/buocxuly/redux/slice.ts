import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IBuocXuLy } from "../models";
import { AddBuocXuLy, DeleteBuocXuLy, GetBuocXuLy, SearchBuocXuLy, UpdateBuocXuLy } from "./action";

export interface IBuocXuLyState extends ExtendedState<IBuocXuLy>{

}

const initialState : IBuocXuLyState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "dichvu",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchBuocXuLy.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchBuocXuLy.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchBuocXuLy.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetBuocXuLy.pending, (state) => {
                state.loading = true
            })
            .addCase(GetBuocXuLy.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetBuocXuLy.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddBuocXuLy.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddBuocXuLy.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateBuocXuLy.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateBuocXuLy.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteBuocXuLy.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteBuocXuLy.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer