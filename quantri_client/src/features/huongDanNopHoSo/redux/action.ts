import { createAsyncThunk } from "@reduxjs/toolkit";
import { huongDanNopHoSoApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IHuongDanNopHoSo } from "../models";
import Search from "antd/es/input/Search";

export const SearchHuongDanNopHoSo =
    createAsyncThunk<IPaginationResponse<IHuongDanNopHoSo[]>, IPickSearch<IHuongDanNopHoSo>>("SearchHuongDanNopHoSo", async (params, thunkApi) => {
        try {
            const res = await huongDanNopHoSoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetHuongDanNopHoSo =
    createAsyncThunk<IResult<IHuongDanNopHoSo>, string>("GetHuongDanNopHoSo", async (id, thunkApi) => {
        try {
            const res = await huongDanNopHoSoApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddHuongDanNopHoSo = createAsyncThunk("AddHuongDanNopHoSo", async (data: IHuongDanNopHoSo, thunkApi) => {
    try {
        const res = await huongDanNopHoSoApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchHuongDanNopHoSo({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateHuongDanNopHoSo = createAsyncThunk("UpdateHuongDanNopHoSo", async (data: IOmitUpdate<IHuongDanNopHoSo>, thunkApi) => {
    try {
        const res = await huongDanNopHoSoApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHuongDanNopHoSo({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteHuongDanNopHoSo = createAsyncThunk("DeleteHuongDanNopHoSo", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await huongDanNopHoSoApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHuongDanNopHoSo({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 