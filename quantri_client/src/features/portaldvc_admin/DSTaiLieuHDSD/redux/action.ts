import { createAsyncThunk } from "@reduxjs/toolkit";
import { DSTaiLieuHDSDApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IDSTaiLieuHDSD } from "../models";
import Search from "antd/es/input/Search";

export const SearchDSTaiLieuHDSD =
    createAsyncThunk<IPaginationResponse<IDSTaiLieuHDSD[]>, IPickSearch<IDSTaiLieuHDSD, "tenTaiLieu" | "taiLieuDanhCho">>("SearchDSTaiLieuHDSD", async (params, thunkApi) => {
        try {
            const res = await DSTaiLieuHDSDApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetDSTaiLieuHDSD =
    createAsyncThunk<IResult<IDSTaiLieuHDSD>, string>("GetDSTaiLieuHDSD", async (id, thunkApi) => {
        try {
            const res = await DSTaiLieuHDSDApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDSTaiLieuHDSD = createAsyncThunk("AddDSTaiLieuHDSD", async (data: IDSTaiLieuHDSD, thunkApi) => {
    try {
        const res = await DSTaiLieuHDSDApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDSTaiLieuHDSD({ pageSize: 10, pageNumber: 1, reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDSTaiLieuHDSD = createAsyncThunk("UpdateDSTaiLieuHDSD", async (data: IOmitUpdate<IDSTaiLieuHDSD>, thunkApi) => {
    try {
        const res = await DSTaiLieuHDSDApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDSTaiLieuHDSD({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDSTaiLieuHDSD = createAsyncThunk("DeleteDSTaiLieuHDSD", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await DSTaiLieuHDSDApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDSTaiLieuHDSD({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 