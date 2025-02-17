import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IDanhMucGiayToChungThuc } from "../models";
import { AddDanhMucGiayToChungThuc, DeleteDanhMucGiayToChungThuc, GetDanhMucGiayToChungThuc, SearchDanhMucGiayToChungThuc, UpdateDanhMucGiayToChungThuc } from "./action";

export interface IDanhMucGiayToChungThucState extends ExtendedState<IDanhMucGiayToChungThuc>{}

const initialState : IDanhMucGiayToChungThucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMucGiayToChungThuc",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchDanhMucGiayToChungThuc.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDanhMucGiayToChungThuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMucGiayToChungThuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetDanhMucGiayToChungThuc.pending, (state) => {
                state.loading = true
            })
            .addCase(GetDanhMucGiayToChungThuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetDanhMucGiayToChungThuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddDanhMucGiayToChungThuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDanhMucGiayToChungThuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDanhMucGiayToChungThuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateDanhMucGiayToChungThuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteDanhMucGiayToChungThuc.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteDanhMucGiayToChungThuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer