import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IQuanLyLienKet } from "../models";
import { AddQuanLyLienKet, DeleteQuanLyLienKet, GetQuanLyLienKet, SearchQuanLyLienKet, UpdateQuanLyLienKet } from "./action";


export interface IQuanLyLienKetstate extends ExtendedState<IQuanLyLienKet, {
    links: Pick<IQuanLyLienKet,  "ten" | "suDung">[] | undefined;
}, "links">{

}

const initialState: IQuanLyLienKetstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "QuanLyLienKet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchQuanLyLienKet.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchQuanLyLienKet.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchQuanLyLienKet.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetQuanLyLienKet.pending, (state) => {
                state.loading = true
            })
            .addCase(GetQuanLyLienKet.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetQuanLyLienKet.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddQuanLyLienKet.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddQuanLyLienKet.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateQuanLyLienKet.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateQuanLyLienKet.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteQuanLyLienKet.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteQuanLyLienKet.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer