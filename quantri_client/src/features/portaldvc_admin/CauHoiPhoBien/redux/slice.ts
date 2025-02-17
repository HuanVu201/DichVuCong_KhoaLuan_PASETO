import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { ICauHoiPhoBien } from "../models";
import { AddCauHoiPhoBien, DeleteCauHoiPhoBien, GetCauHoiPhoBien, SearchCauHoiPhoBien, UpdateCauHoiPhoBien } from "./action";

export interface ICauHoiPhoBienstate extends ExtendedState<ICauHoiPhoBien> {

}

const initialState: ICauHoiPhoBienstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "CauHoiPhoBien",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchCauHoiPhoBien.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchCauHoiPhoBien.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchCauHoiPhoBien.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetCauHoiPhoBien.pending, (state) => {
                state.loading = true
            })
            .addCase(GetCauHoiPhoBien.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetCauHoiPhoBien.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddCauHoiPhoBien.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddCauHoiPhoBien.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateCauHoiPhoBien.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateCauHoiPhoBien.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteCauHoiPhoBien.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteCauHoiPhoBien.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer