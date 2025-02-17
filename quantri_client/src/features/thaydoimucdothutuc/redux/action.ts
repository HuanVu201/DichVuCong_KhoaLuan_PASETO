import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThayDoiMucDoThuTucApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IThayDoiMucDoThuTuc } from "../models";

export const SearchThayDoiMucDoThuTuc =
    createAsyncThunk<IPaginationResponse<IThayDoiMucDoThuTuc[]>, IPickSearch<IThayDoiMucDoThuTuc, "thuTuc" | "donVi" | "mucDoCu" | "mucDoMoi">>("SearchThayDoiMucDoThuTuc", async (params, thunkApi) => {
        try {
            const res = await ThayDoiMucDoThuTucApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetThayDoiMucDoThuTuc =
    createAsyncThunk<IResult<IThayDoiMucDoThuTuc>, string>("GetThayDoiMucDoThuTuc", async (id, thunkApi) => {
        try {
            const res = await ThayDoiMucDoThuTucApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddThayDoiMucDoThuTuc = createAsyncThunk("AddThayDoiMucDoThuTuc", async (data: IThayDoiMucDoThuTuc, thunkApi) => {
    try {
        const res = await ThayDoiMucDoThuTucApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchThayDoiMucDoThuTuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateThayDoiMucDoThuTuc = createAsyncThunk("UpdateThayDoiMucDoThuTuc", async (data: IOmitUpdate<IThayDoiMucDoThuTuc>, thunkApi) => {
    try {
        const res = await ThayDoiMucDoThuTucApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchThayDoiMucDoThuTuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteThayDoiMucDoThuTuc = createAsyncThunk("DeleteThayDoiMucDoThuTuc", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await ThayDoiMucDoThuTucApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchThayDoiMucDoThuTuc({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 