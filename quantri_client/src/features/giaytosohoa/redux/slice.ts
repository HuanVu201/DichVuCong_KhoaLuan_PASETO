import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IGiayToSoHoa } from "../models";
import { AddGiayToSoHoa, DeleteGiayToSoHoa, GetGiayToSoHoa, SearchGTSHOutsideKhoTaiLieu, SearchGiayToSoHoa, UpdateGTSHKhoTaiLieu, UpdateGiayToSoHoa } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IGiayToSoHoaState extends ExtendedState<IGiayToSoHoa> {

}

const initialState: IGiayToSoHoaState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "GiayToSoHoa",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchGiayToSoHoa.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchGTSHOutsideKhoTaiLieu.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetGiayToSoHoa.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddGiayToSoHoa.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(UpdateGiayToSoHoa.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateGTSHKhoTaiLieu.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteGiayToSoHoa.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchGiayToSoHoa, GetGiayToSoHoa, AddGiayToSoHoa, UpdateGiayToSoHoa, DeleteGiayToSoHoa), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchGiayToSoHoa, GetGiayToSoHoa, AddGiayToSoHoa, UpdateGiayToSoHoa, DeleteGiayToSoHoa), (state, action) => {
                toast.error("Thao tác thất bại")
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer