import { createAsyncThunk } from "@reduxjs/toolkit";
import { thongBaoApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IThongBao } from "../models";

export const SearchThongBao =
    createAsyncThunk<IPaginationResponse<IThongBao[]>, IPickSearch<IThongBao, "donViId">>("SearchThongBao", async (params, thunkApi) => {
        try {
            const res = await thongBaoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetThongBao =
    createAsyncThunk<IResult<IThongBao>, string>("GetThongBao", async (id, thunkApi) => {
        try {
            const res = await thongBaoApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddThongBao = createAsyncThunk("AddThongBao", async (data: IThongBao, thunkApi) => {
    try {
        const res = await thongBaoApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchThongBao({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateThongBao = createAsyncThunk("UpdateThongBao", async (data: IOmitUpdate<IThongBao>, thunkApi) => {
    try {
        const res = await thongBaoApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchThongBao({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteThongBao = createAsyncThunk("DeleteThongBao", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await thongBaoApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchThongBao({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 