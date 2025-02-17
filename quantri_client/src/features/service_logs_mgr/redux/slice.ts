import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IService_Logs_Mgr } from "../models";
import { AddService_Logs_Mgr, DeleteService_Logs_Mgr, GetService_Logs_Mgr, SearchService_Logs_Mgr, UpdateService_Logs_Mgr } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IService_Logs_MgrState extends ExtendedState<IService_Logs_Mgr>{

}

const initialState : IService_Logs_MgrState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Service_Logs_Mgr",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchService_Logs_Mgr.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetService_Logs_Mgr.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddService_Logs_Mgr.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateService_Logs_Mgr.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteService_Logs_Mgr.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchService_Logs_Mgr, GetService_Logs_Mgr, AddService_Logs_Mgr, UpdateService_Logs_Mgr, DeleteService_Logs_Mgr), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchService_Logs_Mgr, GetService_Logs_Mgr, AddService_Logs_Mgr, UpdateService_Logs_Mgr, DeleteService_Logs_Mgr), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer