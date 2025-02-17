import { createAsyncThunk } from "@reduxjs/toolkit";
import { linhVucApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ILinhVuc, ISearchLinhVuc } from "../models";

export const SearchLinhVuc =
    createAsyncThunk<IPaginationResponse<ILinhVuc[]>, ISearchLinhVuc>("SearchLinhVuc", async (params, thunkApi) => {
        try {
            const res = await linhVucApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetLinhVuc =
    createAsyncThunk<IResult<ILinhVuc>, string>("GetLinhVuc", async (id, thunkApi) => {
        try {
            const res = await linhVucApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddLinhVuc = createAsyncThunk("AddLinhVuc", async (data: ILinhVuc, thunkApi) => {
    try {
        const res = await linhVucApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchLinhVuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateLinhVuc = createAsyncThunk("UpdateLinhVuc", async (data: IOmitUpdate<ILinhVuc>, thunkApi) => {
    try {
        const res = await linhVucApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLinhVuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteLinhVuc = createAsyncThunk("DeleteLinhVuc", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await linhVucApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLinhVuc({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 