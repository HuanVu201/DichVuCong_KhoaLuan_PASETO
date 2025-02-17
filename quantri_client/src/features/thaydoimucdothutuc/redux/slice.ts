import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IThayDoiMucDoThuTuc } from "../models";
import { AddThayDoiMucDoThuTuc, DeleteThayDoiMucDoThuTuc, GetThayDoiMucDoThuTuc, SearchThayDoiMucDoThuTuc, UpdateThayDoiMucDoThuTuc } from "./action";

export interface IThayDoiMucDoThuTucState extends ExtendedState<IThayDoiMucDoThuTuc>{

}

const initialState : IThayDoiMucDoThuTucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ThayDoiMucDoThuTuc",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchThayDoiMucDoThuTuc.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchThayDoiMucDoThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchThayDoiMucDoThuTuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetThayDoiMucDoThuTuc.pending, (state) => {
                state.loading = true
            })
            .addCase(GetThayDoiMucDoThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetThayDoiMucDoThuTuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddThayDoiMucDoThuTuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddThayDoiMucDoThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateThayDoiMucDoThuTuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateThayDoiMucDoThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteThayDoiMucDoThuTuc.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteThayDoiMucDoThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer