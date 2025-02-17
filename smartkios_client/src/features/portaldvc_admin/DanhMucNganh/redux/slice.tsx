import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IDanhMucNganh } from "../models";
import { AddDanhMucNganh, DeleteDanhMucNganh, GetDanhMucNganh, SearchDanhMucNganh, UpdateDanhMucNganh } from "./action";

export interface IDanhMucNganhstate extends ExtendedState<IDanhMucNganh> {

}

const initialState: IDanhMucNganhstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMucNganh",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMucNganh.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDanhMucNganh.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMucNganh.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetDanhMucNganh.pending, (state) => {
                state.loading = true
            })
            .addCase(GetDanhMucNganh.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetDanhMucNganh.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddDanhMucNganh.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDanhMucNganh.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDanhMucNganh.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateDanhMucNganh.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteDanhMucNganh.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteDanhMucNganh.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer