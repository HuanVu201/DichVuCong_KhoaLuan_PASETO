import { Service } from "../../../services/base";
import { API_VERSION_DEFAULT, VITE_THONGTINCSDLDANCU_API_ENDPOINT } from "../../../data/constant";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IBaseExt, ICredential, ILogin, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";

import { IUser, IUserRole, IUpdateUserRole, ThongTinCSDLDanCuSearchParams, GetCSDLDanCuResponse, ISearchUser, ILogOut, SearchNhomLanhDaoResponse, ISearchUserByPermision, UpdateEmailAndPhoneNumberPortalParams } from "../models";

import axiosInstance from "@/lib/axios";
import { IChangePassWord } from "../models";
import axios from "axios";
import { DeletePhiLePhiParams } from "@/features/philephi/services";
class UserService extends Service.BaseApi implements Service.ICrud<IUser> {
    constructor() {
        super("users", '/api/')
    }
    Update(_params: IOmitUpdate<IUser>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Search(params: ISearchUser): AxiosResponseWrapper<IPaginationResponse<IUser[]>> {
        params = { ...params, typeUser: "CanBo" }
        return axiosInstance.post(this._urlSuffix + "/search", params)
    }
    GetUsersWithDonViQuanLy(_params: IPickSearch<ISearchUser, "fullName" | "groupCode" | "officeCode" | "soDinhDanh" | "laCanBoTiepNhan">): AxiosResponseWrapper<IPaginationResponse<IUser[]>> {
        return axiosInstance.get(this._urlSuffix + "/getuserswithdonviquanly", { params: _params })
    }
    SearchPortal(params: { officeCode?: string; groupCode?: string, laCanBoTiepNhan?: boolean }): AxiosResponseWrapper<IPaginationResponse<IUser[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchPortal", { params })

    }
    SearchNhomLanhDao(params: { officeCode: string; groupCode: string }): AxiosResponseWrapper<IPaginationResponse<SearchNhomLanhDaoResponse[]>> {
        return axiosInstance.get(this._urlSuffix + "/nhomlanhdao", { params })
    }
    Get(id: string): AxiosResponseWrapper<IResult<IUser>> {
        return axiosInstance.get(this._urlSuffix + "/" + id)
    }
    GetById(id: string, token: string = ""): AxiosResponseWrapper<IUser> {
        if (token) {
            return axiosInstance.get(this._urlSuffix + "/" + id, { headers: { Authorization: `Bearer ${token}` } })
        }
        return axiosInstance.get(this._urlSuffix + "/" + id)
    }
    Create(data: Partial<Omit<IUser, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(id: ISoftDelete): AxiosResponseWrapper {

        return axiosInstance.delete(this._urlSuffix + "/" + id.id)
    }
    DeleteMulti(data: DeletePhiLePhiParams): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + `/deletemutiple`, data)
    }
    Restore(id: string): AxiosResponseWrapper {
        return axiosInstance.patch(this._urlSuffix + "/" + id)
    }

    UpdateUser(params: IUser): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + params.id, params)
    }
    UpdateCurrentUser(params: IUser): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateCurrentUser/" + params.id, params)
    }
    UpdatePassword(_params: IOmitUpdate<IChangePassWord>): AxiosResponseWrapper {
        return axiosInstance.put("/api/personal/change-password", _params.data)
    }
    GetUser(data: Pick<ICredential, "token">): AxiosResponseWrapper<IUser> {
        return axiosInstance.get(this._urlSuffix + '/currentuser', {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
    }
    GetUserRoles(id: string, laQuyenQuanTriDonVi?: boolean): AxiosResponseWrapper<IUserRole[]> {
        let url = this._urlSuffix + `/${id}/roles`;

        if (laQuyenQuanTriDonVi !== undefined) {
            url += `?laQuyenQuanTriDonVi=${laQuyenQuanTriDonVi}`;
        }
        return axiosInstance.get(url)
    }
    UpdateUserRoles(userId: string, params: IUpdateUserRole) {
        return axiosInstance.post(this._urlSuffix + `/${userId}/roles`, params)
    }
    AddminResetPassword(userName: string) {
        return axiosInstance.post(this._urlSuffix + `/admin-reset-password/${userName}`)
    }

    CreateWithDefaultPassword(data: Partial<Omit<IUser, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + `/admin-register`, data)
    }
    GetThongTinCSDLDanCu(data: ThongTinCSDLDanCuSearchParams): AxiosResponseWrapper<IResult<GetCSDLDanCuResponse>> {
        return axiosInstance.post(this._urlSuffix + '/getcsdldancu', data)
    }
    GetUserBySoDinhDanh(soDinhDanh: string): AxiosResponseWrapper<IResult<GetCSDLDanCuResponse>> {
        return axiosInstance.get(this._urlSuffix + '/detail/' + soDinhDanh)
    }
    LogoutSSO(params: { access_token: string; returnUrl?: string }): AxiosResponseWrapper<IResult<GetCSDLDanCuResponse>> {
        return axiosInstance.get('/logout', { params })
    }


    SearchByPermision(params: ISearchUserByPermision): AxiosResponseWrapper<IPaginationResponse<IUser[]>> {
        params = { ...params, typeUser: "CanBo" }
        return axiosInstance.post(this._urlSuffix + "/userroles/search", params)
    }

    UpdateEmailAndPhoneNumberPortal(_params: UpdateEmailAndPhoneNumberPortalParams): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + '/UpdateEmailAndPhoneNumberPortal', _params)
    }
    ConfirmCongDanDinhDanh(_params: { MaCaptCha: string }): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + '/ConfirmCongDanDinhDanh', _params)
    }


}

export const userService = new UserService();