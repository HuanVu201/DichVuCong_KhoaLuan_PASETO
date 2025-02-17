import { createAsyncThunk } from "@reduxjs/toolkit";
import { traCuuHoKinhDoanhApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ITraCuuHoKinhDoanh, ISearchTraCuuHoKinhDoanh } from "../models";

export const SearchTraCuuHoKinhDoanh =
    createAsyncThunk<IPaginationResponse<ITraCuuHoKinhDoanh[]>, ISearchTraCuuHoKinhDoanh>("SearchTraCuuHoKinhDoanh", async (params, thunkApi) => {
        try {
            const res = await traCuuHoKinhDoanhApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchTraCuuHoKinhDoanhTheoDonVi =
    createAsyncThunk<IPaginationResponse<ITraCuuHoKinhDoanh[]>, ISearchTraCuuHoKinhDoanh>("SearchTraCuuHoKinhDoanhTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await traCuuHoKinhDoanhApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetTraCuuHoKinhDoanh =
    createAsyncThunk<IResult<ITraCuuHoKinhDoanh>, string>("GetTraCuuHoKinhDoanh", async (id, thunkApi) => {
        try {
            const res = await traCuuHoKinhDoanhApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddTraCuuHoKinhDoanh = createAsyncThunk("AddTraCuuHoKinhDoanh", async (data: ITraCuuHoKinhDoanh, thunkApi) => {
    try {
        const res = await traCuuHoKinhDoanhApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchTraCuuHoKinhDoanh({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateTraCuuHoKinhDoanh = createAsyncThunk("UpdateTraCuuHoKinhDoanh", async (data: IOmitUpdate<ITraCuuHoKinhDoanh>, thunkApi) => {
    try {
        const res = await traCuuHoKinhDoanhApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTraCuuHoKinhDoanh({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTraCuuHoKinhDoanh = createAsyncThunk("DeleteTraCuuHoKinhDoanh", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await traCuuHoKinhDoanhApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTraCuuHoKinhDoanh({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 