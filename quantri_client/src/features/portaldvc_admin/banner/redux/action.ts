import { createAsyncThunk } from "@reduxjs/toolkit";
import { bannerApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IBanner } from "../models";
import Search from "antd/es/input/Search";

export const SearchBanner =
    createAsyncThunk<IPaginationResponse<IBanner[]>, IPickSearch<IBanner, "suDung" | "imageUrl">>("SearchBanner", async (params, thunkApi) => {
        try {
            const res = await bannerApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetBanner =
    createAsyncThunk<IResult<IBanner>, string>("GetBanner", async (id, thunkApi) => {
        try {
            const res = await bannerApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddBanner = createAsyncThunk("AddBanner", async (data: IBanner, thunkApi) => {
    try {
        const res = await bannerApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchBanner({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateBanner = createAsyncThunk("UpdateBanner", async (data: IOmitUpdate<IBanner>, thunkApi) => {
    try {
        const res = await bannerApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchBanner({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteBanner = createAsyncThunk("DeleteBanner", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await bannerApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchBanner({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 