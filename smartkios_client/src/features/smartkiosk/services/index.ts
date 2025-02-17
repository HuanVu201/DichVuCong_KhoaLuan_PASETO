import axios from "axios";
import { Service } from "../../../services/base";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import {ICredential, ILogin } from "../../../models";
import axiosInstance from "@/lib/axios";
import { IUserKiosk } from "../models";
import { IAuthenticate } from "@/features/auth/services/interface";
class AuthServiceKiosk extends Service.BaseApi {
    constructor() {
        super("users", "/api/")
    }
    GetTokenKiosk(data: IUserKiosk["data"]): AxiosResponseWrapper<string> {
        return axiosInstance.post(this._urlSuffix + "/kiemtranguoidungsmartkios", data)
    }
    RefreshTokenKiosk(data: Omit<ICredential, "refreshTokenExpiryTime">): AxiosResponseWrapper<ICredential> {
        return axiosInstance.post(this._urlSuffix + "/refresh", data)
    }
}

export const authServiceKiosk = new AuthServiceKiosk();