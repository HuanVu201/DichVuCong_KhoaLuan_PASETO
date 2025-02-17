import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";

import { AddYeuCauThanhToan, DeleteYeuCauThanhToan, GetYeuCauThanhToan, InitBienLai, PayYeuCauThanhToan, SearchHoSoTheoBaoCaoTTTT, SearchYeuCauThanhToan, SearchThongKeThuPhiLePhi, UpdateBienLai, UpdateYeuCauThanhToan, YeuCauThanhToanLai } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { IYeuCauThanhToan } from "../models";


export interface IYeuCauThanhToanState extends ExtendedState<IYeuCauThanhToan> {

}

const initialState: IYeuCauThanhToanState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "YeuCauThanhToan",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchYeuCauThanhToan.fulfilled, (state, YeuCauThanhToan) => {
                state.loading = false
                state.datas = YeuCauThanhToan.payload.data
                state.count = YeuCauThanhToan.payload.totalCount
            })
            .addCase(SearchThongKeThuPhiLePhi.fulfilled, (state, YeuCauThanhToan) => {
                state.loading = false
                state.datas = YeuCauThanhToan.payload.data
                state.count = YeuCauThanhToan.payload.totalCount
            })
            .addCase(SearchHoSoTheoBaoCaoTTTT.fulfilled, (state, YeuCauThanhToan) => {
                state.loading = false
                state.datas = YeuCauThanhToan.payload.data
                state.count = YeuCauThanhToan.payload.totalCount
            })

            .addCase(GetYeuCauThanhToan.fulfilled, (state, YeuCauThanhToan) => {
                state.loading = false
                state.data = YeuCauThanhToan.payload.data
            })
            .addCase(AddYeuCauThanhToan.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(InitBienLai.fulfilled, (state, YeuCauThanhToan) => {
                if (YeuCauThanhToan.payload.data)
                    toast.success("Thêm thành công")
                else toast.warning("Lỗi xuất biên lai")
            })
            .addCase(UpdateYeuCauThanhToan.fulfilled, (state, payload) => {
                state.loading = false;
                var tmp = payload as any;
                if (payload?.payload?.succeeded) {
                    toast.success("Cập nhật thành công")

                } else {
                    toast.warning(payload?.payload?.message)
                }
            })
            .addCase(UpdateBienLai.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(PayYeuCauThanhToan.fulfilled, (state, YeuCauThanhToan) => {
                state.loading = false
                toast.success("Thành công")
            })
            .addCase(YeuCauThanhToanLai.fulfilled, (state, YeuCauThanhToan) => {
                state.loading = false
                toast.success("Thành công")
            })

            .addCase(DeleteYeuCauThanhToan.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchYeuCauThanhToan, SearchThongKeThuPhiLePhi, SearchHoSoTheoBaoCaoTTTT, GetYeuCauThanhToan, AddYeuCauThanhToan, UpdateYeuCauThanhToan, DeleteYeuCauThanhToan, PayYeuCauThanhToan, YeuCauThanhToanLai, UpdateBienLai,
                InitBienLai
            ), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchYeuCauThanhToan, SearchThongKeThuPhiLePhi, SearchHoSoTheoBaoCaoTTTT, GetYeuCauThanhToan, AddYeuCauThanhToan, UpdateYeuCauThanhToan, DeleteYeuCauThanhToan, PayYeuCauThanhToan, YeuCauThanhToanLai, UpdateBienLai
                , InitBienLai
            ), (state, YeuCauThanhToan) => {

                toast.error((YeuCauThanhToan.payload as any)?.response?.data)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer