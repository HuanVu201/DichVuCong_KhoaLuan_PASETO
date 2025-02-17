

import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../services";
import { ICredential, IError, ILogin, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { GetCSDLDanCuResponse, ILogOut, ISearchUser, IUser, ThongTinCSDLDanCuSearchParams } from "../models";
import axiosInstance from "@/lib/axios";
import { IChangePassWord } from "../models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


export const GetUser = createAsyncThunk
    <IUser, Pick<ICredential, "token">, { rejectValue: IError }>("GetUser", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.GetUser(params)
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const SearchUser = createAsyncThunk
    <IPaginationResponse<IUser[]>, ISearchUser, { rejectValue: IError }>("SearchUser", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.Search(params)

            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const GetUsersWithDonViQuanLy = createAsyncThunk
    <IPaginationResponse<IUser[]>, ISearchUser, { rejectValue: IError }>("GetUsersWithDonViQuanLy", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.GetUsersWithDonViQuanLy(params)

            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const SearchPortalUser = createAsyncThunk
    <IPaginationResponse<IUser[]>, ISearchUser, { rejectValue: IError }>("SearchPortalUser", async (params, thunkApi) => {
        try {
            const res = await userService.SearchPortal(params)

            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const SearchUserDonViThuTuc = createAsyncThunk
    <IPaginationResponse<IUser[]>, ISearchUser, { rejectValue: IError }>("SearchUserDonViThuTuc", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.Search(params)

            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const GetUserById = createAsyncThunk
    <IUser, string, { rejectValue: IError }>("GetUserById", async (id, thunkApi) => {
        try {
            const res = await userService.GetById(id)
            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })
export const CreateUser = createAsyncThunk("CreateUser", async (data: IUser, thunkApi) => {
    try {

        const res = await userService.Create(data)
        if (res.status === 201) {
            thunkApi.dispatch(SearchUser({ reFetch: true }))
        }
        return res.data
    } catch (error) {

        return thunkApi.rejectWithValue(error)
    }
})
export const CreateUserWithDefaultPassword = createAsyncThunk("CreateUserWithDefaultPassword", async (data: IUser, thunkApi) => {
    try {

        const res = await userService.CreateWithDefaultPassword(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchUser({ reFetch: true, groupCode: data.groupCode }))
        }
        return res.data
    } catch (error) {

        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateUser = createAsyncThunk("UpdateUser", async (data: IUser, thunkApi) => {
    try {
        const res = await userService.UpdateUser(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchUser({ reFetch: true, groupCode: data?.groupCode || "" }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const ChangeUserGroup = createAsyncThunk("ChangeUserGroup", async (data: IUser, thunkApi) => {
    try {
        const res = await userService.UpdateUser(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchUser({ reFetch: true, groupCode: data?.oldGroupCode || "" }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

// export const AdminResetPassword = createAsyncThunk("AdminResetPassword", async (data: IChangePassWord, thunkApi) => {
//     try {
//         const res = await userService.AddminResetPassword(data)

//         return res.data
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })
export const AdminResetPassword = createAsyncThunk("AdminResetPassword", async (data: string, thunkApi) => {
    try {
        const res = await userService.AddminResetPassword(data)

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteUser = createAsyncThunk("DeleteUser", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await userService.Delete(params)

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const ChangePasswordUser = createAsyncThunk("ChangePasswordUser", async (data: IOmitUpdate<IChangePassWord>, thunkApi) => {
    try {
        const res = await userService.UpdatePassword(data)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const GetUserFromCSDLDanCu = createAsyncThunk<IResult<any>, ThongTinCSDLDanCuSearchParams, { rejectValue: IResult<any> }>("GetUserFromCSDLDanCu", async (data, thunkApi) => {
    try {
        
        const res = await userService.GetThongTinCSDLDanCu(data)
        return res.data
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const GetUserBySoDinhDanh = createAsyncThunk<IResult<any>, string, { rejectValue: IResult<any> }>("GetUserBySoDinhDanh", async (soDinhDanh, thunkApi) => {
    try {
        const res = await userService.GetUserBySoDinhDanh(soDinhDanh)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const SearchUserByPermision = createAsyncThunk
    <IPaginationResponse<IUser[]>, ISearchUser, { rejectValue: IError }>("SearchUserByPermision", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.SearchByPermision(params)

            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })


