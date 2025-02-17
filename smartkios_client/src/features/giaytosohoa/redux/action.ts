import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddGiayToSoHoaParams, GetGiayToSoHoaParams, giayToSoHoaApi } from "../services";
import { IBaseExt, IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "../models";

export const SearchGiayToSoHoa =
    createAsyncThunk<IPaginationResponse<IGiayToSoHoa[]>, ISearchGiayToSoHoa>("SearchGiayToSoHoa", async (params, thunkApi) => {
        try {
            const res = await giayToSoHoaApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetGiayToSoHoa =
    createAsyncThunk<IResult<IGiayToSoHoa>, GetGiayToSoHoaParams>("GetGiayToSoHoa", async (params, thunkApi) => {
        try {
            const res = await giayToSoHoaApi.Get(params);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddGiayToSoHoa = createAsyncThunk<IResult<string>, AddGiayToSoHoaParams>("AddGiayToSoHoa", async (data, thunkApi) => {
    try {
        const res = await giayToSoHoaApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchGiayToSoHoa({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateGiayToSoHoa = createAsyncThunk("UpdateGiayToSoHoa", async (data: IOmitUpdate<IGiayToSoHoa>, thunkApi) => {
    try {
        const res = await giayToSoHoaApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchGiayToSoHoa({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteGiayToSoHoa = createAsyncThunk("DeleteGiayToSoHoa", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await giayToSoHoaApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchGiayToSoHoa({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 