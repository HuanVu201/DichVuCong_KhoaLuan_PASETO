import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IHuongDanSuDung } from "../models";
import { AddHuongDanSuDung, DeleteHuongDanSuDung, GetHuongDanSuDung, SearchHuongDanSuDung, UpdateHuongDanSuDung } from "./action";

export interface IHuongDanSuDungstate extends ExtendedState<IHuongDanSuDung> {

}

const initialState: IHuongDanSuDungstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "HuongDanSuDung",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchHuongDanSuDung.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchHuongDanSuDung.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHuongDanSuDung.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetHuongDanSuDung.pending, (state) => {
                state.loading = true
            })
            .addCase(GetHuongDanSuDung.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetHuongDanSuDung.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddHuongDanSuDung.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddHuongDanSuDung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateHuongDanSuDung.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateHuongDanSuDung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteHuongDanSuDung.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteHuongDanSuDung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer