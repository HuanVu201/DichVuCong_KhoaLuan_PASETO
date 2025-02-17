import { createAsyncThunk } from "@reduxjs/toolkit";
import { buocXuLyApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IBuocXuLy } from "../models";

export const SearchBuocXuLy =
    createAsyncThunk<IPaginationResponse<IBuocXuLy[]>, IPickSearch<IBuocXuLy, "tenBuoc">>("SearchBuocXuLy", async (params, thunkApi) => {
        try {
            const res = await buocXuLyApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetBuocXuLy =
    createAsyncThunk<IResult<IBuocXuLy>, string>("GetBuocXuLy", async (id, thunkApi) => {
        try {
            const res = await buocXuLyApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddBuocXuLy = createAsyncThunk("AddBuocXuLy", async (data: IBuocXuLy, thunkApi) => {
    try {
        const res = await buocXuLyApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchBuocXuLy({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateBuocXuLy = createAsyncThunk("UpdateBuocXuLy", async (data: IOmitUpdate<IBuocXuLy>, thunkApi) => {
    try {
        const res = await buocXuLyApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchBuocXuLy({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteBuocXuLy = createAsyncThunk("DeleteBuocXuLy", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await buocXuLyApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchBuocXuLy({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 