import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { StatisticChiTietHoSoChungThuc, StatisticHoSoChungThuc } from "./action";
import { IThongKeHoSoChungThuc, IThongKeHoSoChungThucChiTiet } from "@/features/sochungthuc/models";

export interface IThongKeHoSoChungThucState extends ExtendedState<IThongKeHoSoChungThuc,{datasChiTietStatisticHSCT : IThongKeHoSoChungThucChiTiet[]},"datasChiTietStatisticHSCT"> {

}

const initialState: IThongKeHoSoChungThucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "statistichosochungthuc",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(StatisticHoSoChungThuc.pending, (state) => {
                state.loading = true
            })
            .addCase(StatisticHoSoChungThuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(StatisticHoSoChungThuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(StatisticChiTietHoSoChungThuc.pending, (state) => {
                state.loading = true
            })
            .addCase(StatisticChiTietHoSoChungThuc.fulfilled, (state, action) => {
                state.loading = false
                state.datasChiTietStatisticHSCT = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(StatisticChiTietHoSoChungThuc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        }
          
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer