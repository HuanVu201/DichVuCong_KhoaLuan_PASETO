import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IThongBao } from "../models";
import { AddThongBao, DeleteThongBao, GetThongBao, SearchThongBao, UpdateThongBao } from "./action";

export interface IThongBaoState extends ExtendedState<IThongBao> {

}

const initialState: IThongBaoState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "thongbao",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchThongBao.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchThongBao.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchThongBao.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetThongBao.pending, (state) => {
                state.loading = true
            })
            .addCase(GetThongBao.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetThongBao.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddThongBao.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddThongBao.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateThongBao.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateThongBao.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteThongBao.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteThongBao.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer