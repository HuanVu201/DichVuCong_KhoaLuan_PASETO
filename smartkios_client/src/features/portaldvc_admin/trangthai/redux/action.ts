import { createAsyncThunk } from "@reduxjs/toolkit";
import { trangThaiApi } from "../services";
import { IError, IPaginationResponse, IPickSearch, IOmitUpdate, IResult, ISoftDelete } from "../../../../models";
import { ITrangThai, ISearchTrangThai } from "../models";


export const SearchTrangThai = createAsyncThunk
    <IPaginationResponse<ITrangThai[]>, IPickSearch<ITrangThai, "tenTrangThai">, { rejectValue: IError }>("SearchTrangThai", async (params, thunkApi) => {
        try {
            const res = await trangThaiApi.Search(params)
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const GetTrangThai = createAsyncThunk<IResult<ITrangThai>, string, { rejectValue: IError }>("GetTrangThai", async (id, thunkApi) => {
    try {
        const res = await trangThaiApi.Get(id)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

export const UpdateTrangThai = createAsyncThunk("UpdateTrangThai", async (data: IOmitUpdate<ITrangThai>, thunkApi) => {
    try {
        const res = await trangThaiApi.Update(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchTrangThai({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const AddTrangThai = createAsyncThunk("AddTrangThai", async (data: ITrangThai, thunkApi) => {
    try {
        const res = await trangThaiApi.Create(data)
        if (res.status == 201) {
            thunkApi.dispatch(SearchTrangThai({ reFetch: true }))
        }
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})
export const DeleteTrangThai = createAsyncThunk("DeleteTrangThai", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await trangThaiApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTrangThai({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 