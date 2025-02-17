import { createAsyncThunk } from "@reduxjs/toolkit";
import { traCuuHopTacXaApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ITraCuuHopTacXa, ISearchTraCuuHopTacXa } from "../models";

export const SearchTraCuuHopTacXa =
    createAsyncThunk<IPaginationResponse<ITraCuuHopTacXa[]>, ISearchTraCuuHopTacXa>("SearchTraCuuHopTacXa", async (params, thunkApi) => {
        try {
            const res = await traCuuHopTacXaApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchTraCuuHopTacXaTheoDonVi =
    createAsyncThunk<IPaginationResponse<ITraCuuHopTacXa[]>, ISearchTraCuuHopTacXa>("SearchTraCuuHopTacXaTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await traCuuHopTacXaApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetTraCuuHopTacXa =
    createAsyncThunk<IResult<ITraCuuHopTacXa>, string>("GetTraCuuHopTacXa", async (id, thunkApi) => {
        try {
            const res = await traCuuHopTacXaApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddTraCuuHopTacXa = createAsyncThunk("AddTraCuuHopTacXa", async (data: ITraCuuHopTacXa, thunkApi) => {
    try {
        const res = await traCuuHopTacXaApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchTraCuuHopTacXa({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateTraCuuHopTacXa = createAsyncThunk("UpdateTraCuuHopTacXa", async (data: IOmitUpdate<ITraCuuHopTacXa>, thunkApi) => {
    try {
        const res = await traCuuHopTacXaApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTraCuuHopTacXa({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTraCuuHopTacXa = createAsyncThunk("DeleteTraCuuHopTacXa", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await traCuuHopTacXaApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTraCuuHopTacXa({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 