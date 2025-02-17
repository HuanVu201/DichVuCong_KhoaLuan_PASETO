import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ISoChungThuc } from "../models";
import { AddSoChungThuc, DeleteSoChungThuc, GetSoChungThuc, SearchSoChungThuc, UpdateSoChungThuc } from "./action";

export interface ISoChungThucState extends ExtendedState<ISoChungThuc>{}

const initialState : ISoChungThucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "SoChungThuc",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchSoChungThuc.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchSoChungThuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchSoChungThuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetSoChungThuc.pending, (state) => {
                state.loading = true
            })
            .addCase(GetSoChungThuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetSoChungThuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddSoChungThuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddSoChungThuc.rejected, (_, action) => {
                toast.error((action?.payload as any).response?.data ?? "Thao tác thất bại")
            })
            .addCase(UpdateSoChungThuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateSoChungThuc.rejected, (_, action) => {
                toast.error((action?.payload as any).response?.data ?? "Thao tác thất bại")
            })
            .addCase(DeleteSoChungThuc.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addCase(DeleteSoChungThuc.rejected, (state, action) => {
                toast.error((action?.payload as any).response?.data ?? "Thao tác thất bại")
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer