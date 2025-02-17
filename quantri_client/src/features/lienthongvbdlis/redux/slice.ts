import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";


import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { stat } from "fs";
import { ILienThongVBDLIS } from "../models";
import { BoSungHoSoGuiVBDLISAction, TiepNhanGuiVBDLISAction } from "./action";

export interface ILienThongVBDLISState extends ExtendedState<ILienThongVBDLIS,
    { thuTucNoiBats?: ILienThongVBDLIS[] }, "thuTucNoiBats"> {

}

const initialState: ILienThongVBDLISState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "VBDLIS",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(TiepNhanGuiVBDLISAction.fulfilled, (state, action) => {

                state.loading = false
            })
            .addCase(BoSungHoSoGuiVBDLISAction.fulfilled, (state, action) => {

                state.loading = false
            })
            .addMatcher(isPending(TiepNhanGuiVBDLISAction, BoSungHoSoGuiVBDLISAction), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(TiepNhanGuiVBDLISAction, BoSungHoSoGuiVBDLISAction), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer