import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateDuThaoXuLyHoSo, duThaoXuLyHoSoApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ISearchDuThaoXuLyHoSo, IDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSoResponse } from "../models";

export const SearchDuThaoXuLyHoSo =
    createAsyncThunk<IPaginationResponse<ISearchDuThaoXuLyHoSoResponse[]>, ISearchDuThaoXuLyHoSo>("SearchDuThaoXuLyHoSo", async (params, thunkApi) => {
        try {
            const res = await duThaoXuLyHoSoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetDuThaoXuLyHoSo =
    createAsyncThunk<IResult<IDuThaoXuLyHoSo>, string>("GetDuThaoXuLyHoSo", async (id, thunkApi) => {
        try {
            const res = await duThaoXuLyHoSoApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDuThaoXuLyHoSo = createAsyncThunk<IResult<any>, CreateDuThaoXuLyHoSo>("AddDuThaoXuLyHoSo", async (data, thunkApi) => {
    try {
        const res = await duThaoXuLyHoSoApi.Create(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDuThaoXuLyHoSo = createAsyncThunk<IResult<any>, IOmitUpdate<IDuThaoXuLyHoSo>>("UpdateDuThaoXuLyHoSo", async (data, thunkApi) => {
    try {
        const res = await duThaoXuLyHoSoApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDuThaoXuLyHoSo = createAsyncThunk("DeleteDuThaoXuLyHoSo", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await duThaoXuLyHoSoApi.Delete(data);
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 