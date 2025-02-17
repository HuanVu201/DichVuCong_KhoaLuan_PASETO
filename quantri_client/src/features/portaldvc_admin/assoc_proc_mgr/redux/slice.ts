import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IAssor_Proc_Mgr } from "../model";
import { AddAssor_proc_mgrs, DeleteAssor_proc_mgrs, GetAssor_proc_mgrs, SearchAssor_proc_mgrs, UpdateAssor_proc_mgrs } from "./action";

export interface IAssor_proc_mgrsstate extends ExtendedState<IAssor_Proc_Mgr> {

}

const initialState: IAssor_proc_mgrsstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Assor_proc_mgrs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchAssor_proc_mgrs.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchAssor_proc_mgrs.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchAssor_proc_mgrs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetAssor_proc_mgrs.pending, (state) => {
                state.loading = true
            })
            .addCase(GetAssor_proc_mgrs.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetAssor_proc_mgrs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddAssor_proc_mgrs.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddAssor_proc_mgrs.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateAssor_proc_mgrs.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateAssor_proc_mgrs.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteAssor_proc_mgrs.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteAssor_proc_mgrs.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer