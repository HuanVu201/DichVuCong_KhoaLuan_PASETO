import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IHoSoBoSung } from "../models";
import { AddHoSoBoSung, DeleteHoSoBoSung, GetHoSoBoSung, SearchHoSoBoSung, UpdateHoSoBoSung } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IHoSoBoSungState extends ExtendedState<IHoSoBoSung>{

}

const initialState : IHoSoBoSungState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "HoSoBoSung",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchHoSoBoSung.fulfilled, (state, HoSoBoSung) => {
                state.loading = false
                state.datas = HoSoBoSung.payload.data
                state.count = HoSoBoSung.payload.totalCount
            })
            .addCase(GetHoSoBoSung.fulfilled, (state, HoSoBoSung) => {
                state.loading = false
                state.data = HoSoBoSung.payload.data
            })
            .addCase(AddHoSoBoSung.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateHoSoBoSung.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteHoSoBoSung.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchHoSoBoSung, GetHoSoBoSung, AddHoSoBoSung, UpdateHoSoBoSung, DeleteHoSoBoSung), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchHoSoBoSung, GetHoSoBoSung, AddHoSoBoSung, UpdateHoSoBoSung, DeleteHoSoBoSung), (state, HoSoBoSung) => {
                toast.error(HoSoBoSung.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer