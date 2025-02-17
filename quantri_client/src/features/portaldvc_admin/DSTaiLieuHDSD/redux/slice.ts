import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IDSTaiLieuHDSD } from "../models";
import { AddDSTaiLieuHDSD, DeleteDSTaiLieuHDSD, GetDSTaiLieuHDSD, SearchDSTaiLieuHDSD, UpdateDSTaiLieuHDSD } from "./action";

export interface IDSTaiLieuHDSDstate extends ExtendedState<IDSTaiLieuHDSD> {

}

const initialState: IDSTaiLieuHDSDstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DSTaiLieuHDSD",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDSTaiLieuHDSD.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDSTaiLieuHDSD.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDSTaiLieuHDSD.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetDSTaiLieuHDSD.pending, (state) => {
                state.loading = true
            })
            .addCase(GetDSTaiLieuHDSD.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetDSTaiLieuHDSD.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddDSTaiLieuHDSD.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDSTaiLieuHDSD.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDSTaiLieuHDSD.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateDSTaiLieuHDSD.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteDSTaiLieuHDSD.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteDSTaiLieuHDSD.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer