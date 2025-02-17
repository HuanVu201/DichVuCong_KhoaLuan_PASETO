import { createAsyncThunk } from "@reduxjs/toolkit";
import { quaTrinhXuLyHoSoApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IQuaTrinhXuLyHoSo, ISearchQuaTrinhXuLyHoSo } from "../models";

export const SearchQuaTrinhXuLyHoSo =
    createAsyncThunk<IPaginationResponse<IQuaTrinhXuLyHoSo[]>, ISearchQuaTrinhXuLyHoSo>("SearchQuaTrinhXuLyHoSo", async (params, thunkApi) => {
        try {
            const res = await quaTrinhXuLyHoSoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetQuaTrinhXuLyHoSo =
    createAsyncThunk<IResult<IQuaTrinhXuLyHoSo>, string>("GetQuaTrinhXuLyHoSo", async (id, thunkApi) => {
        try {
            const res = await quaTrinhXuLyHoSoApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddQuaTrinhXuLyHoSo = createAsyncThunk("AddQuaTrinhXuLyHoSo", async (data: IQuaTrinhXuLyHoSo, thunkApi) => {
    try {
        const res = await quaTrinhXuLyHoSoApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchQuaTrinhXuLyHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateQuaTrinhXuLyHoSo = createAsyncThunk("UpdateQuaTrinhXuLyHoSo", async (data: IOmitUpdate<IQuaTrinhXuLyHoSo>, thunkApi) => {
    try {
        const res = await quaTrinhXuLyHoSoApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchQuaTrinhXuLyHoSo({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteQuaTrinhXuLyHoSo = createAsyncThunk("DeleteQuaTrinhXuLyHoSo", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await quaTrinhXuLyHoSoApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchQuaTrinhXuLyHoSo({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 