import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IDonVi } from "../models";
import { AddDonVi, DeleteDonVi, GetDonVi, SearchDonVi, UpdateDonVi } from "./action";

export interface IDonViState extends ExtendedState<IDonVi> {

}

const initialState: IDonViState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "donvi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDonVi.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDonVi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetDonVi.pending, (state) => {
                state.loading = true
            })
            .addCase(GetDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetDonVi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddDonVi.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDonVi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDonVi.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateDonVi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteDonVi.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteDonVi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer