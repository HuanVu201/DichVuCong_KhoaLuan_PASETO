import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IDanhGiaCoQuan } from "../models";
import { AddDanhGiaCoQuan, DeleteDanhGiaCoQuan, GetDanhGiaCoQuan, SearchBaoCao02, SearchDanhGiaCoQuan, SearchPublicDanhGiaCoQuan, UpdateDanhGiaCoQuan } from "./action";
import {toast} from 'react-toastify'

export interface IDanhGiaCoQuanState extends ExtendedState<IDanhGiaCoQuan, {
    publicModule: Pick<IDanhGiaCoQuan, "nam" | "quy">[] | undefined;
}, "publicModule">{

}

const initialState : IDanhGiaCoQuanState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "DanhGiaCoQuan",
    initialState,
    reducers: {
        resetPublicModule: (state) => {
            state.publicModule = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhGiaCoQuan.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDanhGiaCoQuan.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhGiaCoQuan.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(SearchBaoCao02.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchBaoCao02.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchBaoCao02.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetDanhGiaCoQuan.pending, (state) => {
                state.loading = true
            })
            .addCase(GetDanhGiaCoQuan.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhGiaCoQuan.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDanhGiaCoQuan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDanhGiaCoQuan.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateDanhGiaCoQuan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteDanhGiaCoQuan.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteDanhGiaCoQuan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(SearchPublicDanhGiaCoQuan.fulfilled, (state, action) => {
                state.publicModule = action.payload.data
            })
           
    }
})

export const {resetData, resetDatas, resetPublicModule} = Slice.actions

export default Slice.reducer