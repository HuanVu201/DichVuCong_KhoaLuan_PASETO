import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IHoiDap } from "../models";
import { AddHoiDap, DeleteHoiDap, GetHoiDap, SearchHoiDap, UpdateHoiDap } from "./action";

export interface IHoiDapstate extends ExtendedState<IHoiDap> {

}

const initialState: IHoiDapstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "HoiDap",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchHoiDap.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchHoiDap.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHoiDap.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetHoiDap.pending, (state) => {
                state.loading = true
            })
            .addCase(GetHoiDap.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetHoiDap.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddHoiDap.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddHoiDap.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateHoiDap.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateHoiDap.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteHoiDap.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteHoiDap.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer