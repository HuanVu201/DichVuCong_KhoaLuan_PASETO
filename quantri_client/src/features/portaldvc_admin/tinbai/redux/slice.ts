import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { ITinBai } from "../models";
import { AddTinBai, DeleteTinBai, GetTinBai, SearchTinBai, UpdateTinBai } from "./action";
import {toast} from 'react-toastify'

export interface ITinBaiState extends ExtendedState<ITinBai>{

}

const initialState : ITinBaiState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "tinbai",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchTinBai.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchTinBai.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTinBai.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetTinBai.pending, (state) => {
                state.loading = true
            })
            .addCase(GetTinBai.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddTinBai.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddTinBai.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateTinBai.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateTinBai.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteTinBai.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteTinBai.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer