import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState, GenericState } from "../../../lib/redux/GenericSlice";
import { IGetDuLieuThemHoSo, ITruongHopThuTuc, TruongHopThuTucQuyTrinhResponse } from "../models";
import {GetDuLieuThemHoSo, AddTruongHopThuTuc, DeleteTruongHopThuTuc, GetByHoSoId, GetTruongHopThuTuc, SearchTruongHopThuTuc, UpdateTruongHopThuTuc, UpdateTruongHopThuTucWithoutSearch } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { IPhiLePhi } from "@/features/philephi/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";

export interface ITruongHopThuTucState extends ExtendedState<ITruongHopThuTuc, {
    duLieuThemHoSo: IGetDuLieuThemHoSo | undefined,
    quyTrinhXuLy: TruongHopThuTucQuyTrinhResponse
}, "duLieuThemHoSo" | "quyTrinhXuLy">{

}

const initialState : ITruongHopThuTucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "TruongHopThuTuc",
    initialState,
    reducers: {
        resetDuLieuThemHoSo: (state) => state.duLieuThemHoSo = undefined,
        resetQuyTrinhXuLy: (state) => state.quyTrinhXuLy = undefined,
    },
    extraReducers:(builder) => {
        builder
            .addCase(SearchTruongHopThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetTruongHopThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetDuLieuThemHoSo.fulfilled, (state, action) => {
                state.duLieuThemHoSo = action.payload.data
                state.loading = false
            })
            .addCase(GetByHoSoId.fulfilled, (state, action) => {
                state.quyTrinhXuLy = action.payload.data
                state.loading = false
            })
            .addCase(AddTruongHopThuTuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateTruongHopThuTuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateTruongHopThuTucWithoutSearch.fulfilled, () => {
                
            })
            .addCase(DeleteTruongHopThuTuc.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addCase(GetDuLieuThemHoSo.rejected, (state) => {
                state.loading = false
            })
            .addMatcher(isPending(GetByHoSoId, SearchTruongHopThuTuc, GetDuLieuThemHoSo, GetTruongHopThuTuc, AddTruongHopThuTuc, UpdateTruongHopThuTuc, DeleteTruongHopThuTuc), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchTruongHopThuTuc, GetTruongHopThuTuc, AddTruongHopThuTuc, UpdateTruongHopThuTuc, DeleteTruongHopThuTuc), (state, action) => {
                toast.error("Thao tác thất bại")
                state.loading = false
            })
    }
})

export const {resetData, resetDatas, resetDuLieuThemHoSo, resetQuyTrinhXuLy} = Slice.actions

export default Slice.reducer