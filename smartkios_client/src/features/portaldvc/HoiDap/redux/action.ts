import { createAsyncThunk } from "@reduxjs/toolkit";
import { hoiDapApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IHoiDap } from "../models";
import Search from "antd/es/input/Search";

export const SearchHoiDap =
    createAsyncThunk<IPaginationResponse<IHoiDap[]>, IPickSearch<IHoiDap, "maDonVi" | "noiDung" | "congKhai" | "trangThai">>("SearchHoiDap", async (params, thunkApi) => {
        try {
            const res = await hoiDapApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetHoiDap =
    createAsyncThunk<IResult<IHoiDap>, string>("GetHoiDap", async (id, thunkApi) => {
        try {
            const res = await hoiDapApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddHoiDap = createAsyncThunk("AddHoiDap", async (data: IHoiDap, thunkApi) => {
    try {
        const res = await hoiDapApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchHoiDap({ pageSize: 5, reFetch: true  }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateHoiDap = createAsyncThunk("UpdateHoiDap", async (data: IOmitUpdate<IHoiDap>, thunkApi) => {
    try {
        const res = await hoiDapApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHoiDap({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteHoiDap = createAsyncThunk("DeleteHoiDap", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await hoiDapApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHoiDap({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 