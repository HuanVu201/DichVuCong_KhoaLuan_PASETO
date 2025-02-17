import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddCoCauToChuc, DeleteChildGroups, DeleteCoCauToChuc, GetByGroupCodeAction, GetCoCauToChuc, PortalSearchCoCauToChuc, SearchCoCauToChuc, SearchCoCauToChucPhongBan, UpdateCoCauToChuc } from "./crud";
import { ICoCauToChuc } from "../models";
import type { DataNode } from 'antd/es/tree';
import { isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
export interface ICoCauToChucState extends ExtendedState<ICoCauToChuc, {
    phongBans: ICoCauToChuc[],
    phongBanCount: number,
    maTinh: ICoCauToChuc[] | undefined, maHuyen: ICoCauToChuc[] | undefined, maXa: ICoCauToChuc[] | undefined
}, "phongBans" | "phongBanCount" | "maHuyen" | "maTinh" | "maXa"> {
}

const initialState: ICoCauToChucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "coCauToChuc",
    initialState,
    reducers: {
        resetMaTinh: (state) => {
            state.maTinh = undefined
        },
        resetMaHuyen: (state) => {
            state.maHuyen = undefined
        },
        resetMaXa: (state) => {
            state.maXa = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchCoCauToChuc.fulfilled, (state, action) => {
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
                const type = action.meta.arg.cataLog
                state.datas = action.payload.data
                if (type == "so-ban-nganh")
                    state.maTinh = action.payload.data
                else if (type == "quan-huyen")
                    state.maHuyen = action.payload.data
                else if (type == "xa-phuong")
                    state.maXa = action.payload.data
            })
            .addCase(PortalSearchCoCauToChuc.fulfilled, (state, action) => {
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
                const type = action.meta.arg.cataLog
                state.datas = action.payload.data
                if (type == "so-ban-nganh")
                    state.maTinh = action.payload.data
                else if (type == "quan-huyen")
                    state.maHuyen = action.payload.data
                else if (type == "xa-phuong")
                    state.maXa = action.payload.data
            })

            .addCase(SearchCoCauToChucPhongBan.fulfilled, (state, action) => {
                state.phongBans = action.payload.data
                state.phongBanCount = action.payload.totalCount
                state.loading = false
            })
            .addCase(GetCoCauToChuc.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
            })
            .addCase(GetByGroupCodeAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
            })
            .addCase(AddCoCauToChuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateCoCauToChuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteCoCauToChuc.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addCase(DeleteChildGroups.fulfilled, () => {
                toast.success("Xoá nhóm con thành công")
            })
            .addMatcher(isPending(SearchCoCauToChuc, PortalSearchCoCauToChuc, GetCoCauToChuc, AddCoCauToChuc, UpdateCoCauToChuc, DeleteCoCauToChuc, GetByGroupCodeAction), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchCoCauToChuc, GetCoCauToChuc, AddCoCauToChuc, UpdateCoCauToChuc, DeleteCoCauToChuc, DeleteChildGroups, GetByGroupCodeAction), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})


export default Slice.reducer

export const { resetData, resetDatas, resetMaTinh, resetMaHuyen, resetMaXa } = Slice.actions;