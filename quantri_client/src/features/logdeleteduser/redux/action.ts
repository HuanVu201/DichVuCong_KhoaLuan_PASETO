import { createAsyncThunk } from "@reduxjs/toolkit";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { LogDeletedUserApi } from "../services";
import { IUser } from "@/features/user/models";

export const SearchLogDeletedUser =
    createAsyncThunk<IPaginationResponse<IUser[]>, IPickSearch<IUser, "fullName">>("SearchLogDeletedUser", async (params, thunkApi) => {
        try {
            const res = await LogDeletedUserApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetLogDeletedUser =
    createAsyncThunk<IResult<IUser>, string>("GetLogDeletedUser", async (id, thunkApi) => {
        try {
            const res = await LogDeletedUserApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddLogDeletedUser = createAsyncThunk("AddLogDeletedUser", async (data: IUser, thunkApi) => {
    try {
        const res = await LogDeletedUserApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchLogDeletedUser({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateLogDeletedUser = createAsyncThunk("UpdateLogDeletedUser", async (data: IOmitUpdate<IUser>, thunkApi) => {
    try {
        const res = await LogDeletedUserApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLogDeletedUser({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteLogDeletedUser = createAsyncThunk("DeleteLogDeletedUser", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await LogDeletedUserApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLogDeletedUser({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 



