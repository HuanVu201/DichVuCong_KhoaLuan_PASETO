import { createAsyncThunk } from "@reduxjs/toolkit";
import { quyTrinhXuLyApi } from "../services";
import { IBaseExt, IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IDuplicateQuyTrinhXuLy, IQuyTrinhXuLy } from "../models";

export const SearchQuyTrinhXuLy =
    createAsyncThunk<IPaginationResponse<IQuyTrinhXuLy[]>, IPickSearch<IQuyTrinhXuLy>>("SearchQuyTrinhXuLy", async (params, thunkApi) => {
        try {
            const res = await quyTrinhXuLyApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetQuyTrinhXuLy =
    createAsyncThunk<IResult<IQuyTrinhXuLy>, string>("GetQuyTrinhXuLy", async (id, thunkApi) => {
        try {
            const res = await quyTrinhXuLyApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddQuyTrinhXuLy = createAsyncThunk("AddQuyTrinhXuLy", async (data: IQuyTrinhXuLy, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchQuyTrinhXuLy({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const DuplicateQuyTrinhXuLy = createAsyncThunk("DuplicateQuyTrinhXuLy", async (data: IDuplicateQuyTrinhXuLy, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.Duplicate(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const AddQuyTrinhXuLys = createAsyncThunk("AddQuyTrinhXuLys", async (data: {quyTrinhs: Partial<Omit<IQuyTrinhXuLy, keyof IBaseExt<string>>>[]}, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.CreateRange(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchQuyTrinhXuLy({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateQuyTrinhXuLy = createAsyncThunk("UpdateQuyTrinhXuLy", async (data: IOmitUpdate<IQuyTrinhXuLy>, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchQuyTrinhXuLy({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateQuyTrinhXuLyWithoutSearch = createAsyncThunk("UpdateQuyTrinhXuLyWithoutSearch", async (data: IOmitUpdate<IQuyTrinhXuLy>, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteQuyTrinhXuLy = createAsyncThunk("DeleteQuyTrinhXuLy", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchQuyTrinhXuLy({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 