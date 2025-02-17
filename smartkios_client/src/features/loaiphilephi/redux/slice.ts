import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ILoaiPhiLePhi } from "../models";
import { AddLoaiPhiLePhi, DeleteLoaiPhiLePhi, GetLoaiPhiLePhi, SearchLoaiPhiLePhi, UpdateLoaiPhiLePhi } from "./action";

export interface ILoaiPhiLePhitate extends ExtendedState<ILoaiPhiLePhi> {

}

const initialState: ILoaiPhiLePhitate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "loaiphilephi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchLoaiPhiLePhi.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchLoaiPhiLePhi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchLoaiPhiLePhi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetLoaiPhiLePhi.pending, (state) => {
                state.loading = true
            })
            .addCase(GetLoaiPhiLePhi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetLoaiPhiLePhi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddLoaiPhiLePhi.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddLoaiPhiLePhi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateLoaiPhiLePhi.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateLoaiPhiLePhi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteLoaiPhiLePhi.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteLoaiPhiLePhi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer