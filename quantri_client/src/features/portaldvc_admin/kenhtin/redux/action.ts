import { createAsyncThunk } from "@reduxjs/toolkit";
import { kenhTinApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IKenhTin } from "../models";
import Search from "antd/es/input/Search";

export const SearchKenhTin =
    createAsyncThunk<IPaginationResponse<IKenhTin[]>, IPickSearch<IKenhTin, "tenKenhTin">>("SearchKenhTin", async (params, thunkApi) => {
        try {
            const res = await kenhTinApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetKenhTin =
    createAsyncThunk<IResult<IKenhTin>, string>("GetKenhTin", async (id, thunkApi) => {
        try {
            const res = await kenhTinApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddKenhTin = createAsyncThunk("AddKenhTin", async (data: IKenhTin, thunkApi) => {
    try {
        const res = await kenhTinApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchKenhTin({ reFetch: true,pageNumber: 1, pageSize: 10000, }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateKenhTin = createAsyncThunk("UpdateKenhTin", async (data: IOmitUpdate<IKenhTin>, thunkApi) => {
    try {
        const res = await kenhTinApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchKenhTin({ reFetch: true,pageNumber: 1, pageSize: 10000, }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteKenhTin = createAsyncThunk("DeleteKenhTin", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await kenhTinApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchKenhTin({ reFetch: true,pageNumber: 1, pageSize: 10000, }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 