import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../../lib/redux/GenericSlice";
import { IQuanLyVanBan } from "../models";
import { AddQuanLyVanBan, DeleteQuanLyVanBan, GetQuanLyVanBan, SearchQuanLyVanBan, UpdateQuanLyVanBan } from "./action";


export interface IQuanLyVanBanstate extends ExtendedState<IQuanLyVanBan, {
    links: Pick<IQuanLyVanBan, "maLinhVuc" | "congKhai" | "trichYeu" | "loaiVanBan">[] | undefined;
}, "links"> {

}

const initialState: IQuanLyVanBanstate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "QuanLyVanBan",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchQuanLyVanBan.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchQuanLyVanBan.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchQuanLyVanBan.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetQuanLyVanBan.pending, (state) => {
                state.loading = true
            })
            .addCase(GetQuanLyVanBan.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetQuanLyVanBan.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddQuanLyVanBan.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddQuanLyVanBan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateQuanLyVanBan.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateQuanLyVanBan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteQuanLyVanBan.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteQuanLyVanBan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer