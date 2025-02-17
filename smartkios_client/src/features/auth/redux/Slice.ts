import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { ICredential } from "../../../models";
import { GetToken, RefreshToken } from "./Actions";
import {Slice as UserSlice} from '../../user/redux/Slice'
import { parseJwt } from "@/utils/common";
import { IUser } from "@/features/user/models";
import { GetTokenKiosk } from "@/features/smartkiosk/redux/action";

export interface IAuthState extends ExtendedState<ICredential>{
}

const initialState: IAuthState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetToken.pending, (state) => {
            state.loading = true
        })
        .addCase(GetToken.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
            
        })
        .addCase(GetToken.rejected, (state, action) => {
            toast.error("Tài khoản hoặc mật khẩu không chính xác")
            // state.error = action.payload?.message
            state.loading = false
        })
        .addCase(GetTokenKiosk.pending, (state) => {
            state.loading = true
        })
        .addCase(GetTokenKiosk.fulfilled, (state, action) => {
            state.data = JSON.parse(action.payload)
            state.loading = false
            
        })
        .addCase(GetTokenKiosk.rejected, (state, action) => {
            toast.warning("Vui lòng cho thẻ căn cước công dân vào thiết bị để đăng nhập")
            
            state.loading
        })
        .addCase(RefreshToken.fulfilled, (state, action) => {
            state.data = action.payload
        })
        // .addCase(GetUser.pending, (state) => {
        //     state.loading = true
        // })
        // .addCase(GetUser.fulfilled, (state, action) => {
        //     state.user = action.payload
        //     state.loading = false
        // })
        // .addCase(GetUser.rejected, (state, action) => {
        //     state.error = action.payload?.message
        //     state.loading = false
        // })
    }
})


export default Slice.reducer

export const {resetData} = Slice.actions;