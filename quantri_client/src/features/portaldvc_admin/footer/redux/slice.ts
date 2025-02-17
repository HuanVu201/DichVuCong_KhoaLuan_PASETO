import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IFooter } from "../models";
import { AddFooter, DeleteFooter, GetFooter, SearchFooter, UpdateFooter } from "./action";

export interface IFooterstate extends ExtendedState<IFooter> {

}

const initialState: IFooterstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Footer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchFooter.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchFooter.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchFooter.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetFooter.pending, (state) => {
                state.loading = true
            })
            .addCase(GetFooter.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetFooter.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddFooter.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddFooter.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateFooter.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateFooter.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteFooter.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteFooter.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer