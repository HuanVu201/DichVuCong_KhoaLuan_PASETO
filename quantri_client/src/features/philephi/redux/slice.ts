import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IPhiLePhi } from "../models";
import { AddPhiLePhi, DeletePhiLePhi, GetPhiLePhi, SearchPhiLePhi, UpdatePhiLePhi } from "./action";
import { toast } from 'react-toastify'

export interface IPhiLePhiState extends ExtendedState<IPhiLePhi> {

}

const initialState: IPhiLePhiState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "philephi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchPhiLePhi.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchPhiLePhi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchPhiLePhi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetPhiLePhi.pending, (state) => {
                state.loading = true
            })
            .addCase(GetPhiLePhi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddPhiLePhi.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddPhiLePhi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdatePhiLePhi.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdatePhiLePhi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeletePhiLePhi.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeletePhiLePhi.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer