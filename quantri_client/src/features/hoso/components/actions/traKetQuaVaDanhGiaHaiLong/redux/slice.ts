import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IPhieuKhaoSat } from "../models";
import { AddPhieuKhaoSat, DeletePhieuKhaoSat, ExportExcelBaoCao01, GetBaoCao1, GetByMHS, GetPhieuKhaoSat, SearchBaoCao01, SearchPhieuKhaoSat, SearchPublicPhieuKhaoSat, UpdatePhieuKhaoSat } from "./action";
import { toast } from 'react-toastify'

export interface IPhieuKhaoSatState extends ExtendedState<IPhieuKhaoSat, {
    publicModule: Pick<IPhieuKhaoSat, "maHoSo" | "ngayTao">[] | undefined;
}, "publicModule"> {

}

const initialState: IPhieuKhaoSatState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "PhieuKhaoSat",
    initialState,
    reducers: {
        resetPublicModule: (state) => {
            state.publicModule = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchPhieuKhaoSat.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchPhieuKhaoSat.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchPhieuKhaoSat.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(SearchBaoCao01.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchBaoCao01.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchBaoCao01.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // .addCase(ExportExcelBaoCao01.pending, (state) => {
            //     state.loading = true
            // })
            // .addCase(ExportExcelBaoCao01.fulfilled, (state, action) => {
            //     state.loading = false
            //     state.datas = action.payload.data
            //     state.count = action.payload.totalCount
            // })
            // .addCase(ExportExcelBaoCao01.rejected, (state, action) => {
            //     state.loading = false
            //     state.error = action.error.message
            // })
            .addCase(GetPhieuKhaoSat.pending, (state) => {
                state.loading = true
            })
            .addCase(GetPhieuKhaoSat.fulfilled, (state, action) => {
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
            .addCase(AddPhieuKhaoSat.fulfilled, () => {
                toast.success("Đánh giá thành công")
            })
            .addCase(AddPhieuKhaoSat.rejected, (_, action) => {
                toast.error((action.payload as any).response.data)
            })
            .addCase(UpdatePhieuKhaoSat.fulfilled, () => {
                toast.success("Đánh giá thành công")
            })
            .addCase(UpdatePhieuKhaoSat.rejected, (state, action) => {
                toast.error("Đánh giá thất bại")
            })
            .addCase(DeletePhieuKhaoSat.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeletePhieuKhaoSat.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(SearchPublicPhieuKhaoSat.fulfilled, (state, action) => {
                state.publicModule = action.payload.data
            })

    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer