import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyVanBanApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IQuanLyVanBan } from "../models";

import { CrudLocalStorage } from "@/services/localstorage";
export const SearchQuanLyVanBan =
    createAsyncThunk<IPaginationResponse<IQuanLyVanBan[]>, IPickSearch<IQuanLyVanBan, "maLinhVuc" | "congKhai" | "trichYeu" | "loaiVanBan">>("SearchQuanLyVanBan", async (params, thunkApi) => {
        try {
            const crudLocalStorage = new CrudLocalStorage();
            const resTest = await crudLocalStorage.getWithExpriry("QuanLyVanBan");
            // if (resTest){
            //     return resTest;
            // }

            const res = await QuanLyVanBanApi.Search(params)
            crudLocalStorage.setWithExpiry({
                key: 'QuanLyVanBan',
                value: res.data,
                expiry: 900000, //15ph
            });
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetQuanLyVanBan =
    createAsyncThunk<IResult<IQuanLyVanBan>, string>("GetQuanLyVanBan", async (id, thunkApi) => {
        try {
            const res = await QuanLyVanBanApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddQuanLyVanBan = createAsyncThunk("AddQuanLyVanBan", async (data: IQuanLyVanBan, thunkApi) => {
    try {
        const res = await QuanLyVanBanApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchQuanLyVanBan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateQuanLyVanBan = createAsyncThunk("UpdateQuanLyVanBan", async (data: IOmitUpdate<IQuanLyVanBan>, thunkApi) => {
    try {
        const res = await QuanLyVanBanApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchQuanLyVanBan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteQuanLyVanBan = createAsyncThunk("DeleteQuanLyVanBan", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await QuanLyVanBanApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchQuanLyVanBan({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 