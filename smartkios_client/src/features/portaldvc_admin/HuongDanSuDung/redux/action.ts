import { createAsyncThunk } from "@reduxjs/toolkit";
import { HuongDanSuDungApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IHuongDanSuDung } from "../models";
import Search from "antd/es/input/Search";

export const SearchHuongDanSuDung =
    createAsyncThunk<IPaginationResponse<IHuongDanSuDung[]>, IPickSearch<IHuongDanSuDung, "tenHuongDanSuDung" | "noiDungHuongDanSuDung">>("SearchHuongDanSuDung", async (params, thunkApi) => {
        try {
            const res = await HuongDanSuDungApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetHuongDanSuDung =
    createAsyncThunk<IResult<IHuongDanSuDung>, string>("GetHuongDanSuDung", async (id, thunkApi) => {
        try {
            const res = await HuongDanSuDungApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddHuongDanSuDung = createAsyncThunk("AddHuongDanSuDung", async (data: IHuongDanSuDung, thunkApi) => {
    try {
        const res = await HuongDanSuDungApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchHuongDanSuDung({ pageSize: 10, pageNumber: 1, reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateHuongDanSuDung = createAsyncThunk("UpdateHuongDanSuDung", async (data: IOmitUpdate<IHuongDanSuDung>, thunkApi) => {
    try {
        const res = await HuongDanSuDungApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHuongDanSuDung({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteHuongDanSuDung = createAsyncThunk("DeleteHuongDanSuDung", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await HuongDanSuDungApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHuongDanSuDung({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 