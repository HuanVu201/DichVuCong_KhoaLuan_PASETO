import { createAsyncThunk } from "@reduxjs/toolkit";
import { DanhMucGiayToChungThucApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IDanhMucGiayToChungThuc, ISearchDanhMucGiayToChungThuc } from "../models";

export const SearchDanhMucGiayToChungThuc =
    createAsyncThunk<IPaginationResponse<IDanhMucGiayToChungThuc[]>, ISearchDanhMucGiayToChungThuc>("SearchDanhMucGiayToChungThuc", async (params, thunkApi) => {
        try {
            const res = await DanhMucGiayToChungThucApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetDanhMucGiayToChungThuc =
    createAsyncThunk<IResult<IDanhMucGiayToChungThuc>, string>("GetDanhMucGiayToChungThuc", async (id, thunkApi) => {
        try {
            const res = await DanhMucGiayToChungThucApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMucGiayToChungThuc = createAsyncThunk("AddDanhMucGiayToChungThuc", async (data: IDanhMucGiayToChungThuc, thunkApi) => {
    try {
        const res = await DanhMucGiayToChungThucApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMucGiayToChungThuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMucGiayToChungThuc = createAsyncThunk("UpdateDanhMucGiayToChungThuc", async (data: IOmitUpdate<IDanhMucGiayToChungThuc>, thunkApi) => {
    try {
        const res = await DanhMucGiayToChungThucApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMucGiayToChungThuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMucGiayToChungThuc = createAsyncThunk("DeleteDanhMucGiayToChungThuc", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await DanhMucGiayToChungThucApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMucGiayToChungThuc({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
