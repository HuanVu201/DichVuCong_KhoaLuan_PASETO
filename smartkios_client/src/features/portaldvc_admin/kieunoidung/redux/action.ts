import { createAsyncThunk } from "@reduxjs/toolkit";
import { kieuNoiDungApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IKieuNoiDung } from "../models";

export const SearchKieuNoiDung =
    createAsyncThunk<IPaginationResponse<IKieuNoiDung[]>, IPickSearch<IKieuNoiDung, "tenNoiDung">>("SearchKieuNoiDung", async (params, thunkApi) => {
        try {
            const res = await kieuNoiDungApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetKieuNoiDung =
    createAsyncThunk<IResult<IKieuNoiDung>, string>("GetKieuNoiDung", async (id, thunkApi) => {
        try {
            const res = await kieuNoiDungApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddKieuNoiDung = createAsyncThunk("AddKieuNoiDung", async (data: IKieuNoiDung, thunkApi) => {
    try {
        const res = await kieuNoiDungApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchKieuNoiDung({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateKieuNoiDung = createAsyncThunk("UpdateKieuNoiDung", async (data: IOmitUpdate<IKieuNoiDung>, thunkApi) => {
    try {
        const res = await kieuNoiDungApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchKieuNoiDung({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteKieuNoiDung = createAsyncThunk("DeleteKieuNoiDung", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await kieuNoiDungApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchKieuNoiDung({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 