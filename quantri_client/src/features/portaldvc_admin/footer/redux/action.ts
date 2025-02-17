import { createAsyncThunk } from "@reduxjs/toolkit";
import { footerApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IFooter } from "../models";
import Search from "antd/es/input/Search";

export const SearchFooter =
    createAsyncThunk<IPaginationResponse<IFooter[]>, IPickSearch<IFooter, "tieuDe" | "noiDung">>("SearchFooter", async (params, thunkApi) => {
        try {
            const res = await footerApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetFooter =
    createAsyncThunk<IResult<IFooter>, string>("GetFooter", async (id, thunkApi) => {
        try {
            const res = await footerApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddFooter = createAsyncThunk("AddFooter", async (data: IFooter, thunkApi) => {
    try {
        const res = await footerApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchFooter({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateFooter = createAsyncThunk("UpdateFooter", async (data: IOmitUpdate<IFooter>, thunkApi) => {
    try {
        const res = await footerApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchFooter({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteFooter = createAsyncThunk("DeleteFooter", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await footerApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchFooter({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 