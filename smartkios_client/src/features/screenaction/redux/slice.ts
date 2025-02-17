import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddScreenAction, AddScreenActions, DeleteScreenAction, GetScreenAction, SearchActionNotInScreenModal, SearchScreenAction } from "./crud";
import { IScreenAction } from "../models";
import type { DataNode } from 'antd/es/tree';
import { isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { IAction } from "@/features/action/models";
export interface IScreenActionState extends ExtendedState<IScreenAction, 
    {actions: IAction[], actionCount: number, actionInModals: IScreenAction[] | undefined, actionInTables: IScreenAction[] | undefined}
    ,"actions"| "actionCount" | "actionInModals" | "actionInTables"> {
}

const initialState: IScreenActionState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ScreenAction",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchScreenAction.fulfilled, (state, action) => {
                state.datas = action.payload.data || undefined
                state.count = action.payload.totalCount
                state.actionInModals = action.payload.data?.filter((action) => action.showInModal && action.showActionInModal)
                state.actionInTables = action.payload.data?.filter((action) => action.showInTable && action.showActionInTable)
                state.loading = false
            })
            .addCase(SearchActionNotInScreenModal.fulfilled, (state, action) => {
                state.actions = action.payload.data
                state.actionCount = action.payload.totalCount
                state.loading = false
            })
            .addCase(GetScreenAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
            })
            .addCase(AddScreenAction.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddScreenActions.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(DeleteScreenAction.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addMatcher(isPending(SearchScreenAction, GetScreenAction, AddScreenActions, AddScreenAction, DeleteScreenAction), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchScreenAction, GetScreenAction, AddScreenActions, AddScreenAction, DeleteScreenAction), (state, action) => {
                toast.error("Thao tác thất bại")
                state.loading = false
            })
    }
})


export default Slice.reducer

export const { resetData, resetDatas } = Slice.actions;