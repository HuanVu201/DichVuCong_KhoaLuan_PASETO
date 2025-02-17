import { createAsyncThunk } from "@reduxjs/toolkit";
import { thanhPhanHoSoApi } from "../services";
import { IBaseExt, IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "../models";

export const SearchThanhPhanHoSo =
    createAsyncThunk<IPaginationResponse<IThanhPhanHoSo[]>, ISearchThanhPhanHoSo>("SearchThanhPhanHoSo", async (params, thunkApi) => {
        try {
            const res = await thanhPhanHoSoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetThanhPhanHoSo =
    createAsyncThunk<IResult<IThanhPhanHoSo>, string>("GetThanhPhanHoSo", async (id, thunkApi) => {
        try {
            const res = await thanhPhanHoSoApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddThanhPhanHoSo = createAsyncThunk("AddThanhPhanHoSo", async (data: IThanhPhanHoSo, thunkApi) => {
    try {
        const res = await thanhPhanHoSoApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchThanhPhanHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateThanhPhanHoSo = createAsyncThunk("UpdateThanhPhanHoSo", async (data: IOmitUpdate<IThanhPhanHoSo>, thunkApi) => {
    try {
        const res = await thanhPhanHoSoApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchThanhPhanHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteThanhPhanHoSo = createAsyncThunk("DeleteThanhPhanHoSo", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await thanhPhanHoSoApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchThanhPhanHoSo({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 