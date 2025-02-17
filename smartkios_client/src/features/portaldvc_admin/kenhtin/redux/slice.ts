import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IKenhTin } from "../models";
import { AddKenhTin, DeleteKenhTin, GetKenhTin, SearchKenhTin, UpdateKenhTin } from "./action";

export interface IKenhTinstate extends ExtendedState<IKenhTin> {

}

const initialState: IKenhTinstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "KenhTin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchKenhTin.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchKenhTin.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchKenhTin.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetKenhTin.pending, (state) => {
                state.loading = true
            })
            .addCase(GetKenhTin.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetKenhTin.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddKenhTin.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddKenhTin.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateKenhTin.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateKenhTin.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteKenhTin.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteKenhTin.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer