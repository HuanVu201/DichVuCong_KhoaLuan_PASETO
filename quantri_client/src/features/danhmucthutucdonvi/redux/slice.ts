import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IDonViThuTuc } from "../models";
import { AddDonViThuTuc, DeleteDonViThuTuc, GetDonViThuTuc, SearchDonViThuTuc, UpdateDonViThuTuc, UpdateMultiDonViThuTuc } from "./action";

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
            .addCase(GetDonViThuTuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.datas = undefined
            })
            .addCase(AddDonViThuTuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDonViThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDonViThuTuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateMultiDonViThuTuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateMultiDonViThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
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