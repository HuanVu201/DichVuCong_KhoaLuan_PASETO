import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IBanner } from "../models";
import { AddBanner, DeleteBanner, GetBanner, SearchBanner, UpdateBanner } from "./action";

export interface IBannerstate extends ExtendedState<IBanner> {

}

const initialState: IBannerstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchBanner.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchBanner.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchBanner.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetBanner.pending, (state) => {
                state.loading = true
            })
            .addCase(GetBanner.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetBanner.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddBanner.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddBanner.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateBanner.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateBanner.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteBanner.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteBanner.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer