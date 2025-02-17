import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { ILogThongKeDGHLCongDan } from "../models";
import { AddLogThongKeDGHLCongDan, DeleteLogThongKeDGHLCongDan, GetBaoCao1, GetByMHS, GetLogThongKeDGHLCongDan, SearchLogThongKeDGHLCongDan, SearchPublicLogThongKeDGHLCongDan, UpdateLogThongKeDGHLCongDan } from "./action";
import { toast } from 'react-toastify'

export interface ILogThongKeDGHLCongDanState extends ExtendedState<ILogThongKeDGHLCongDan, {
    publicModule: Pick<ILogThongKeDGHLCongDan, "maHoSo" | "ngayTao">[] | undefined;
}, "publicModule"> {

}

const initialState: ILogThongKeDGHLCongDanState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "LogThongKeDGHLCongDan",
    initialState,
    reducers: {
        resetPublicModule: (state) => {
            state.publicModule = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchLogThongKeDGHLCongDan.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchLogThongKeDGHLCongDan.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchLogThongKeDGHLCongDan.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            
            .addCase(GetLogThongKeDGHLCongDan.pending, (state) => {
                state.loading = true
            })
            .addCase(GetLogThongKeDGHLCongDan.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetBaoCao1.pending, (state) => {
                state.loading = true
            })
            .addCase(GetBaoCao1.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetByMHS.pending, (state) => {
                state.loading = true
            })
            .addCase(GetByMHS.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddLogThongKeDGHLCongDan.fulfilled, () => {
                toast.success("Đánh giá thành công")
            })
            .addCase(AddLogThongKeDGHLCongDan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateLogThongKeDGHLCongDan.fulfilled, () => {
                toast.success("Đánh giá thành công")
            })
            .addCase(UpdateLogThongKeDGHLCongDan.rejected, (_, action) => {
                toast.error("Đánh giá thất bại")
            })
            .addCase(DeleteLogThongKeDGHLCongDan.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteLogThongKeDGHLCongDan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(SearchPublicLogThongKeDGHLCongDan.fulfilled, (state, action) => {
                state.publicModule = action.payload.data
            })

    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer