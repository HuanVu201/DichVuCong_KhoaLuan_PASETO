import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICredential, IError, ILogin, IParseUserToken } from "../../../models";
import { GetUser } from "../../user/redux/Actions";
import { setUserData } from "@/features/user/redux/Slice";
import { parseJwt } from "@/utils/common";
import { IUser } from "@/features/user/models";
import { SearchConfig, SearchPublicConfig } from "@/features/config/redux/action";
import { authServiceKiosk } from "../services";
import { IUserKiosk } from "../models";

export const GetTokenKiosk = createAsyncThunk
    <string, IUserKiosk["data"], { rejectValue: IError }>("GetTokenKiosk", async (params, thunkApi) => {
        try {
            const res = await authServiceKiosk.GetTokenKiosk(params)

            if (res.status === 200 && res.data) { // fake api response with status 201
                thunkApi.dispatch(SearchPublicConfig())
                var response: ICredential = JSON.parse(res.data)
                if (response) {
                    const userData: IParseUserToken = parseJwt(response.token)
                    thunkApi.dispatch(setUserData(userData))

                }

            }


            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const RefreshTokenKiosk = createAsyncThunk
    <ICredential, Omit<ICredential, "refreshTokenExpiryTime">, { rejectValue: IError }>("RefreshToken", async (params, thunkApi) => {
        try {
            const res = await authServiceKiosk.RefreshTokenKiosk(params)
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

