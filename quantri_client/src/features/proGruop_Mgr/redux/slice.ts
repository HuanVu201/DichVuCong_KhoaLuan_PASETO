import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IProcGroup_Mgr } from "../models";
import { AddProcGroup_Mgr, DeleteProcGroup_Mgr, GetProcGroup_Mgr, SearchProcGroup_Mgr, SearchProcGroup_MgrTheoDonVi, UpdateProcGroup_Mgr } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IProcGroup_MgrState extends ExtendedState<IProcGroup_Mgr> {

}

const initialState: IProcGroup_MgrState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ProcGroup_Mgr",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchProcGroup_Mgr.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchProcGroup_MgrTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetProcGroup_Mgr.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddProcGroup_Mgr.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateProcGroup_Mgr.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteProcGroup_Mgr.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchProcGroup_Mgr, GetProcGroup_Mgr, AddProcGroup_Mgr, UpdateProcGroup_Mgr, DeleteProcGroup_Mgr, SearchProcGroup_MgrTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchProcGroup_Mgr, GetProcGroup_Mgr, AddProcGroup_Mgr, UpdateProcGroup_Mgr, DeleteProcGroup_Mgr, SearchProcGroup_MgrTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer