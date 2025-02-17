import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IPhanAnhKienNghi } from "../models";
import { AddPhanAnhKienNghi, DeletePhanAnhKienNghi, GetPhanAnhKienNghi, SearchPhanAnhKienNghi, UpdatePhanAnhKienNghi } from "./action";

export interface IPhanAnhKienNghistate extends ExtendedState<IPhanAnhKienNghi> {

}

const initialState: IPhanAnhKienNghistate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "PhanAnhKienNghi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchPhanAnhKienNghi.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchPhanAnhKienNghi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchPhanAnhKienNghi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetPhanAnhKienNghi.pending, (state) => {
                state.loading = true
            })
            .addCase(GetPhanAnhKienNghi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetPhanAnhKienNghi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddPhanAnhKienNghi.fulfilled, () => {
                // toast.success("Thêm thành công")
            })
            .addCase(AddPhanAnhKienNghi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdatePhanAnhKienNghi.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdatePhanAnhKienNghi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeletePhanAnhKienNghi.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeletePhanAnhKienNghi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer