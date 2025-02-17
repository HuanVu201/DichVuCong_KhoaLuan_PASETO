import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogCSDLDanCuDoanhNghiepApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IGetUrlPhoi, ILogCSDLDanCuDoanhNghiep, ISearchLogCSDLDanCuDoanhNghiep } from "../models";

export const SearchLogCSDLDanCuDoanhNghiep =
    createAsyncThunk<IPaginationResponse<ILogCSDLDanCuDoanhNghiep[]>, ISearchLogCSDLDanCuDoanhNghiep>("SearchLogCSDLDanCuDoanhNghiep", async (params, thunkApi) => {
        try {
            const res = await LogCSDLDanCuDoanhNghiepApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetUrlPhoi =
    createAsyncThunk<string, IGetUrlPhoi>("GetUrlPhoi", async (params, thunkApi) => {
        try {
            const res = await LogCSDLDanCuDoanhNghiepApi.GetUrlPhoi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetLogCSDLDanCuDoanhNghiep =
    createAsyncThunk<IResult<ILogCSDLDanCuDoanhNghiep>, string>("GetLogCSDLDanCuDoanhNghiep", async (id, thunkApi) => {
        try {
            const res = await LogCSDLDanCuDoanhNghiepApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddLogCSDLDanCuDoanhNghiep = createAsyncThunk("AddLogCSDLDanCuDoanhNghiep", async (data: ILogCSDLDanCuDoanhNghiep, thunkApi) => {
    try {
        const res = await LogCSDLDanCuDoanhNghiepApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchLogCSDLDanCuDoanhNghiep({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateLogCSDLDanCuDoanhNghiep = createAsyncThunk("UpdateLogCSDLDanCuDoanhNghiep", async (data: IOmitUpdate<ILogCSDLDanCuDoanhNghiep>, thunkApi) => {
    try {
        const res = await LogCSDLDanCuDoanhNghiepApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLogCSDLDanCuDoanhNghiep({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteLogCSDLDanCuDoanhNghiep = createAsyncThunk("DeleteLogCSDLDanCuDoanhNghiep", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await LogCSDLDanCuDoanhNghiepApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLogCSDLDanCuDoanhNghiep({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 