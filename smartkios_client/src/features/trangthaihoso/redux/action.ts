import { createAsyncThunk } from "@reduxjs/toolkit";
import { trangThaiHoSoApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ITrangThaiHoSo } from "../models";

export const SearchTrangThaiHoSo =
    createAsyncThunk<IPaginationResponse<ITrangThaiHoSo[]>, IPickSearch<ITrangThaiHoSo, "ten" | "laTrangThaiQuyTrinh">>("SearchTrangThaiHoSo", async (params, thunkApi) => {
        try {
            const res = await trangThaiHoSoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetTrangThaiHoSo =
    createAsyncThunk<IResult<ITrangThaiHoSo>, string>("GetTrangThaiHoSo", async (id, thunkApi) => {
        try {
            const res = await trangThaiHoSoApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddTrangThaiHoSo = createAsyncThunk("AddTrangThaiHoSo", async (data: ITrangThaiHoSo, thunkApi) => {
    try {
        const res = await trangThaiHoSoApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchTrangThaiHoSo({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateTrangThaiHoSo = createAsyncThunk("UpdateTrangThaiHoSo", async (data: IOmitUpdate<ITrangThaiHoSo>, thunkApi) => {
    try {
        const res = await trangThaiHoSoApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTrangThaiHoSo({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTrangThaiHoSo = createAsyncThunk("DeleteTrangThaiHoSo", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await trangThaiHoSoApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTrangThaiHoSo({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 