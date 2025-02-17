import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyLienKetApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IQuanLyLienKet } from "../models";

import { CrudLocalStorage } from "@/services/localstorage";
export const SearchQuanLyLienKet =
    createAsyncThunk<IPaginationResponse<IQuanLyLienKet[]>, IPickSearch<IQuanLyLienKet, "ten" | "suDung">>("SearchQuanLyLienKet", async (params, thunkApi) => {
        try {
            const crudLocalStorage = new CrudLocalStorage();
            const resTest = await crudLocalStorage.getWithExpriry("quanlylienket");
            // if (resTest){
            //     return resTest;
            // }
            
            const res = await QuanLyLienKetApi.Search(params)
            crudLocalStorage.setWithExpiry({
                key: 'quanlylienket',
                value: res.data,
                expiry: 900000, //15ph
            });
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetQuanLyLienKet =
    createAsyncThunk<IResult<IQuanLyLienKet>, string>("GetQuanLyLienKet", async (id, thunkApi) => {
        try {
            const res = await QuanLyLienKetApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddQuanLyLienKet = createAsyncThunk("AddQuanLyLienKet", async (data: IQuanLyLienKet, thunkApi) => {
    try {
        const res = await QuanLyLienKetApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchQuanLyLienKet({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateQuanLyLienKet = createAsyncThunk("UpdateQuanLyLienKet", async (data: IOmitUpdate<IQuanLyLienKet>, thunkApi) => {
    try {
        const res = await QuanLyLienKetApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchQuanLyLienKet({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteQuanLyLienKet = createAsyncThunk("DeleteQuanLyLienKet", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await QuanLyLienKetApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchQuanLyLienKet({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 