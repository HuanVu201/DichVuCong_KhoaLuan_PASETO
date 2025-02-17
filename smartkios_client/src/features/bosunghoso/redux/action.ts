import { createAsyncThunk } from "@reduxjs/toolkit";
import { hoSoBoSungApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IHoSoBoSung } from "../models";

export const SearchHoSoBoSung =
    createAsyncThunk<IPaginationResponse<IHoSoBoSung[]>, IPickSearch<IHoSoBoSung, "maHoSo">>("SearchHoSoBoSung", async (params, thunkApi) => {
        try {
            const res = await hoSoBoSungApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetHoSoBoSung =
    createAsyncThunk<IResult<IHoSoBoSung>, string>("GetHoSoBoSung", async (id, thunkApi) => {
        try {
            const res = await hoSoBoSungApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddHoSoBoSung = createAsyncThunk("AddHoSoBoSung", async (data: IHoSoBoSung, thunkApi) => {
    try {
        const res = await hoSoBoSungApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSoBoSung({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateHoSoBoSung = createAsyncThunk("UpdateHoSoBoSung", async (data: IOmitUpdate<IHoSoBoSung>, thunkApi) => {
    try {
        const res = await hoSoBoSungApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSoBoSung({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteHoSoBoSung = createAsyncThunk("DeleteHoSoBoSung", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await hoSoBoSungApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHoSoBoSung({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 