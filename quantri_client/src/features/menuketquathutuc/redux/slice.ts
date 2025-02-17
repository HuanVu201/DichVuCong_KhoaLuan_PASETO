import { IMenu } from "@/features/danhmucmenu/models";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IMenuKetQuaThuTuc } from "../models";
import { AddMenuKetQuaThuTuc, DeleteMenuKetQuaThuTuc, GetMenuKetQuaThuTuc, SearchMenuKetQuaThuTuc, UpdateMenuKetQuaThuTuc } from "./action";
import {toast} from 'react-toastify'

export interface IMenuKetQuaThuTucState extends ExtendedState<IMenuKetQuaThuTuc>{
}

const initialState : IMenuKetQuaThuTucState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "menuKetQuaThuTuc",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
           
            .addCase(SearchMenuKetQuaThuTuc.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchMenuKetQuaThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchMenuKetQuaThuTuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetMenuKetQuaThuTuc.pending, (state) => {
                state.loading = true
            })
            .addCase(GetMenuKetQuaThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddMenuKetQuaThuTuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddMenuKetQuaThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateMenuKetQuaThuTuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateMenuKetQuaThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteMenuKetQuaThuTuc.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteMenuKetQuaThuTuc.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer