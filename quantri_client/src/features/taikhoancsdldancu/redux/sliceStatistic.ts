import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ILogCSDLDanCuDoanhNghiep, IStatisticLogCSDLDanCuDoanhNghiep } from "../models";
import { AddLogCSDLDanCuDoanhNghiep, DeleteLogCSDLDanCuDoanhNghiep, GetLogCSDLDanCuDoanhNghiep, SearchLogCSDLDanCuDoanhNghiep, StatisticLogCSDLDanCuDoanhNghiep, UpdateLogCSDLDanCuDoanhNghiep } from "./action";

export interface IStatisticLogCSDLDanCuDoanhNghiepState extends ExtendedState<IStatisticLogCSDLDanCuDoanhNghiep>{}


const initialState : IStatisticLogCSDLDanCuDoanhNghiepState = {
    loading: false,
}

const SliceStatistic = createGenericSlice({
    name: "StatisticLogCSDLDanCuDoanhNghiep",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(StatisticLogCSDLDanCuDoanhNghiep.pending, (state) => {
                state.loading = true
            })
            .addCase(StatisticLogCSDLDanCuDoanhNghiep.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(StatisticLogCSDLDanCuDoanhNghiep.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const {resetData, resetDatas} = SliceStatistic.actions

export default SliceStatistic.reducer
