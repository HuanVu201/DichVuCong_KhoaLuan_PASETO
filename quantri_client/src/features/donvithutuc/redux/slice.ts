import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IDonViThuTuc } from "../models";
import { AddDonViThuTuc, AddMultiDonViThuTuc, DeleteDonViThuTuc, DeleteMultiDonViThuTuc, GetDonViThuTuc, SearchDonViThuTuc, UpdateDonViThuTuc } from "./action";

export interface IDonViThuTucState extends ExtendedState<IDonViThuTuc>{

}

const initialState : IDonViThuTucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "donvithutuc",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchDonViThuTuc.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDonViThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDonViThuTuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetDonViThuTuc.pending, (state) => {
                state.loading = true
            })
            .addCase(GetDonViThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(DeleteMultiDonViThuTuc.pending, (state) => {
                state.loading = true
            })
            .addCase(DeleteMultiDonViThuTuc.fulfilled, (state, action) => {
                state.loading = false
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteMultiDonViThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(GetDonViThuTuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.datas = undefined
            })
            .addCase(AddDonViThuTuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddMultiDonViThuTuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDonViThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(AddMultiDonViThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDonViThuTuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateDonViThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteDonViThuTuc.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteDonViThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer