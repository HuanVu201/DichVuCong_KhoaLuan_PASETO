import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IProcOfThisType_Mgr } from "../models";
import { AddProcOfThisType_Mgr, DeleteProcOfThisType_Mgr, GetProcOfThisType_Mgr, SearchProcOfThisType_Mgr, SearchProcOfThisType_MgrTheoDonVi, UpdateProcOfThisType_Mgr } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IProcOfThisType_MgrState extends ExtendedState<IProcOfThisType_Mgr> {

}

const initialState: IProcOfThisType_MgrState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ProcOfThisType_Mgr",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchProcOfThisType_Mgr.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchProcOfThisType_MgrTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetProcOfThisType_Mgr.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddProcOfThisType_Mgr.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateProcOfThisType_Mgr.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteProcOfThisType_Mgr.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchProcOfThisType_Mgr, GetProcOfThisType_Mgr, AddProcOfThisType_Mgr, UpdateProcOfThisType_Mgr, DeleteProcOfThisType_Mgr, SearchProcOfThisType_MgrTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchProcOfThisType_Mgr, GetProcOfThisType_Mgr, AddProcOfThisType_Mgr, UpdateProcOfThisType_Mgr, DeleteProcOfThisType_Mgr, SearchProcOfThisType_MgrTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer