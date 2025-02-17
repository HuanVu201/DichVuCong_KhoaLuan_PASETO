import { Service } from "../../../services/base";
import { API_VERSION_DEFAULT, VITE_THONGTINCSDLDANCU_API_ENDPOINT } from "../../../data/constant";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IBaseExt, ICredential, ILogin, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IUser,IUserRole,IUpdateUserRole, ThongTinCSDLDanCuSearchParams, GetCSDLDanCuResponse, ISearchUser, ILogOut, SearchNhomLanhDaoResponse } from "../models";
import axiosInstance from "@/lib/axios";
import { IChangePassWord } from "../models";
import axios from "axios";
import { IUserKiosk } from "@/features/smartkiosk/models";
class UserService extends Service.BaseApi implements Service.ICrud<IUser>{
    constructor() {
        super("users", '/api/')
    }
    Update(_params: IOmitUpdate<IUser>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Search(params: ISearchUser): AxiosResponseWrapper<IPaginationResponse<IUser[]>> {
        return axiosInstance.post(this._urlSuffix + "/search", params)
    }
    SearchNhomLanhDao(params: {officeCode: string; groupCode: string}): AxiosResponseWrapper<IPaginationResponse<SearchNhomLanhDaoResponse[]>> {
        return axiosInstance.get(this._urlSuffix + "/nhomlanhdao", {params})
    }
    Get(id: string): AxiosResponseWrapper<IResult<IUser>> {
        return axiosInstance.get(this._urlSuffix + "/" + id)
    }
    GetById(id: string): AxiosResponseWrapper<IUser> {
        return axiosInstance.get(this._urlSuffix + "/" + id)
    }
    Create(data: Partial<Omit<IUser, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, data)
    }
    GetTokenKiosk(data: IUserKiosk): AxiosResponseWrapper<ICredential> {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(id: ISoftDelete): AxiosResponseWrapper {

        return axiosInstance.delete(this._urlSuffix + "/" + id.id)
    }
    Restore(id: string): AxiosResponseWrapper {
        return axiosInstance.patch(this._urlSuffix + "/" + id)
    }

    UpdateUser(params: IUser): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + params.id, params)
    }
    UpdatePassword(_params: IOmitUpdate<IChangePassWord>): AxiosResponseWrapper {
        return axiosInstance.put("/api/personal/change-password", _params.data)
    }
    GetUser(data: Pick<ICredential, "token">): AxiosResponseWrapper<IUser> {
        return axiosInstance.get(this._urlSuffix + '/currentuser' , {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
    }
    GetUserRoles(id:string) : AxiosResponseWrapper<IUserRole[]> {
        return axiosInstance.get(this._urlSuffix+`/${id}/roles`)
    }
    UpdateUserRoles(userId:string, params: IUpdateUserRole) {
        return axiosInstance.post(this._urlSuffix+ `/${userId}/roles`, params)
    }
    AddminResetPassword(userName: string) {
        return axiosInstance.post(this._urlSuffix+ `/admin-reset-password/${userName}`)
    }
    CreateWithDefaultPassword(data: Partial<Omit<IUser, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix +`/admin-register`, data)
    }
    GetThongTinCSDLDanCu(data: ThongTinCSDLDanCuSearchParams): AxiosResponseWrapper<IResult<GetCSDLDanCuResponse>>{
        return axiosInstance.post(this._urlSuffix + '/getcsdldancu', data)
    }
    GetUserBySoDinhDanh(soDinhDanh: string): AxiosResponseWrapper<IResult<GetCSDLDanCuResponse>> {
        return axiosInstance.get(this._urlSuffix + '/detail/' + soDinhDanh)
    }
    LogoutSSO(params: {access_token: string; returnUrl?: string}): AxiosResponseWrapper<IResult<GetCSDLDanCuResponse>> {
        return axiosInstance.get('/logout', {params})
    }
}

export const userService = new UserService();