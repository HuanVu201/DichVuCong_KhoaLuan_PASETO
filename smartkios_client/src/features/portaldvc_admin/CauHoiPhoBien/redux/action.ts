import { createAsyncThunk } from "@reduxjs/toolkit";
import { CauHoiPhoBienApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { ICauHoiPhoBien } from "../models";
import Search from "antd/es/input/Search";

export const SearchCauHoiPhoBien =
    createAsyncThunk<IPaginationResponse<ICauHoiPhoBien[]>, IPickSearch<ICauHoiPhoBien, "type" | "noiDungCauHoi">>("SearchCauHoiPhoBien", async (params, thunkApi) => {
        try {
            const res = await CauHoiPhoBienApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetCauHoiPhoBien =
    createAsyncThunk<IResult<ICauHoiPhoBien>, string>("GetCauHoiPhoBien", async (id, thunkApi) => {
        try {
            const res = await CauHoiPhoBienApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddCauHoiPhoBien = createAsyncThunk("AddCauHoiPhoBien", async (data: ICauHoiPhoBien, thunkApi) => {
    try {
        const res = await CauHoiPhoBienApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchCauHoiPhoBien({ pageSize: 5, reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateCauHoiPhoBien = createAsyncThunk("UpdateCauHoiPhoBien", async (data: IOmitUpdate<ICauHoiPhoBien>, thunkApi) => {
    try {
        const res = await CauHoiPhoBienApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchCauHoiPhoBien({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteCauHoiPhoBien = createAsyncThunk("DeleteCauHoiPhoBien", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await CauHoiPhoBienApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchCauHoiPhoBien({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 