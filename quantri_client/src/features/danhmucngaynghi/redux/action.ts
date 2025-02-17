import { createAsyncThunk } from "@reduxjs/toolkit";
import { ngayNghiApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { INgayNghi } from "../models";

export const SearchNgayNghi =
    createAsyncThunk<IPaginationResponse<INgayNghi[]>, IPickSearch<INgayNghi, "date">>("SearchNgayNghi", async (params, thunkApi) => {
        try {
            const res = await ngayNghiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetNgayNghi =
    createAsyncThunk<IResult<INgayNghi>, string>("GetNgayNghi", async (id, thunkApi) => {
        try {
            const res = await ngayNghiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddNgayNghi = createAsyncThunk("AddNgayNghi", async (data: INgayNghi, thunkApi) => {
    try {
        const res = await ngayNghiApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchNgayNghi({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateNgayNghi = createAsyncThunk("UpdateNgayNghi", async (data: IOmitUpdate<INgayNghi>, thunkApi) => {
    try {
        const res = await ngayNghiApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchNgayNghi({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteNgayNghi = createAsyncThunk("DeleteNgayNghi", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await ngayNghiApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchNgayNghi({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 