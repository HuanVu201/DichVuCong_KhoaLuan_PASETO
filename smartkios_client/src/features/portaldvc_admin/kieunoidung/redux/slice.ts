import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IKieuNoiDung } from "../models";
import { AddKieuNoiDung, DeleteKieuNoiDung, GetKieuNoiDung, SearchKieuNoiDung, UpdateKieuNoiDung } from "./action";

export interface IKieuNoiDungstate extends ExtendedState<IKieuNoiDung> {

}

const initialState: IKieuNoiDungstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Footer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchKieuNoiDung.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchKieuNoiDung.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchKieuNoiDung.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetKieuNoiDung.pending, (state) => {
                state.loading = true
            })
            .addCase(GetKieuNoiDung.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetKieuNoiDung.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddKieuNoiDung.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddKieuNoiDung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateKieuNoiDung.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateKieuNoiDung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteKieuNoiDung.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteKieuNoiDung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer