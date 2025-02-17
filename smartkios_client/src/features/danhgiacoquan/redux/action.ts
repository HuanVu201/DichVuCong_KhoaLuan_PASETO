import { createAsyncThunk } from "@reduxjs/toolkit";
import { DanhGiaCoQuanApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IDanhGiaCoQuan, ISearchDanhGiaCoQuan } from "../models";

export const SearchDanhGiaCoQuan =
    createAsyncThunk<IPaginationResponse<IDanhGiaCoQuan[]>, ISearchDanhGiaCoQuan>("SearchDanhGiaCoQuan", async (params, thunkApi) => {
        try {
            const res = await DanhGiaCoQuanApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

    export const SearchBaoCao02 =
    createAsyncThunk<IPaginationResponse<IDanhGiaCoQuan[]>, ISearchDanhGiaCoQuan>("SearchBaoCao02", async (params, thunkApi) => {
        try {
            const res = await DanhGiaCoQuanApi.SearchBaoCao02(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const SearchPublicDanhGiaCoQuan =
    createAsyncThunk<IPaginationResponse<IDanhGiaCoQuan[]>, undefined>("SearchPublicDanhGiaCoQuan", async (params, thunkApi) => {
        try {
            const res = await DanhGiaCoQuanApi.SearchPublicModule()
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetDanhGiaCoQuan =
    createAsyncThunk<IResult<IDanhGiaCoQuan>, string>("GetDanhGiaCoQuan", async (id, thunkApi) => {
        try {
            const res = await DanhGiaCoQuanApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhGiaCoQuan = createAsyncThunk("AddDanhGiaCoQuan", async (data: IDanhGiaCoQuan, thunkApi) => {
    try {
        const res = await DanhGiaCoQuanApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhGiaCoQuan({ reFetch: true , pageSize: 50}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhGiaCoQuan = createAsyncThunk("UpdateDanhGiaCoQuan", async (data: IOmitUpdate<IDanhGiaCoQuan>, thunkApi) => {
    try {
        const res = await DanhGiaCoQuanApi.Update(data);
       
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhGiaCoQuan = createAsyncThunk("DeleteDanhGiaCoQuan", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await DanhGiaCoQuanApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhGiaCoQuan({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
