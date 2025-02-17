import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services";
import { ICredential, IError, ILogin, IParseUserToken } from "../../../models";
import { GetUser } from "../../user/redux/Actions";
import { setUserData } from "@/features/user/redux/Slice";
import { parseJwt } from "@/utils/common";
import { IUser } from "@/features/user/models";
import { SearchConfig, SearchPublicConfig } from "@/features/config/redux/action";
import { IAuthState } from "./Slice";
import { togglerLoginModalVisible } from "@/lib/redux/GlobalState";
import { Formio } from "@formio/react"

export const GetToken = createAsyncThunk
    <ICredential, ILogin, { rejectValue: IError }>("GetToken", async (params, thunkApi) => {
        try {
            const res = await authService.GetToken(params)
            if (res.status === 200 && res.data) { // fake api response with status 201
                thunkApi.dispatch(SearchPublicConfig())
            }
            // const userData: IParseUserToken = parseJwt(res.data.token)
            // thunkApi.dispatch(setUserData(userData))
            thunkApi.dispatch(togglerLoginModalVisible(false))
            if (Formio) {
                Formio.setToken(res.data.token)
            }
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const RefreshToken = createAsyncThunk
    <ICredential, Omit<ICredential, "refreshTokenExpiryTime">, { rejectValue: IError }>("RefreshToken", async (params, thunkApi) => {
        try {
            const res = await authService.RefreshToken(params)
            if (Formio) {
                Formio.setToken(res.data.token)
            }
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

