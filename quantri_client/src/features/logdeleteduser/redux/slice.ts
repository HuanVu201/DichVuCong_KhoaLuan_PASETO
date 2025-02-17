import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { SearchLogCSDLDanCuDoanhNghiep } from "@/features/taikhoancsdldancu/redux/action";
import { GetLogDeletedUser, SearchLogDeletedUser } from "./action";
import { IUser } from "@/features/user/models";

export interface ILogCSDLDanCuDoanhNghiepState extends ExtendedState<IUser>{}

const initialState : ILogCSDLDanCuDoanhNghiepState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "LogCSDLDanCuDoanhNghiep",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchLogDeletedUser.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchLogDeletedUser.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchLogDeletedUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetLogDeletedUser.pending, (state) => {
                state.loading = true
            })
            .addCase(GetLogDeletedUser.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetLogDeletedUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
           
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer