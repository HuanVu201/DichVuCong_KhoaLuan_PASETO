import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ITypeOfProc_Mgr } from "../models";
import { AddTypeOfProc_Mgr, DeleteTypeOfProc_Mgr, GetTypeOfProc_Mgr, SearchTypeOfProc_Mgr, SearchTypeOfProc_MgrTheoDonVi, UpdateTypeOfProc_Mgr } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ITypeOfProc_MgrState extends ExtendedState<ITypeOfProc_Mgr> {

}

const initialState: ITypeOfProc_MgrState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "TypeOfProc_Mgr",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchTypeOfProc_Mgr.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTypeOfProc_MgrTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetTypeOfProc_Mgr.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddTypeOfProc_Mgr.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateTypeOfProc_Mgr.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteTypeOfProc_Mgr.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchTypeOfProc_Mgr, GetTypeOfProc_Mgr, AddTypeOfProc_Mgr, UpdateTypeOfProc_Mgr, DeleteTypeOfProc_Mgr, SearchTypeOfProc_MgrTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchTypeOfProc_Mgr, GetTypeOfProc_Mgr, AddTypeOfProc_Mgr, UpdateTypeOfProc_Mgr, DeleteTypeOfProc_Mgr, SearchTypeOfProc_MgrTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer