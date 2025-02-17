import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IHuongDanNopHoSo } from "../models";
import { AddHuongDanNopHoSo, DeleteHuongDanNopHoSo, GetHuongDanNopHoSo, SearchHuongDanNopHoSo, UpdateHuongDanNopHoSo } from "./action";

export interface IHuongDanNopHoSotate extends ExtendedState<IHuongDanNopHoSo> {

}

const initialState: IHuongDanNopHoSotate = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "loaiphilephi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchHuongDanNopHoSo.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchHuongDanNopHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHuongDanNopHoSo.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetHuongDanNopHoSo.pending, (state) => {
                state.loading = true
            })
            .addCase(GetHuongDanNopHoSo.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetHuongDanNopHoSo.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddHuongDanNopHoSo.pending, (state) => {
               
                state.loading = true;
            })
            .addCase(AddHuongDanNopHoSo.fulfilled, (state) => {
                toast.success("Thêm thành công")
                state.loading = false;
            })
            .addCase(AddHuongDanNopHoSo.rejected, (state, action) => {
                toast.error(action.error.message)
                state.loading = false;
            })
            .addCase(UpdateHuongDanNopHoSo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateHuongDanNopHoSo.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteHuongDanNopHoSo.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteHuongDanNopHoSo.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer