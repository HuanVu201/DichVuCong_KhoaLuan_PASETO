import { createAsyncThunk } from "@reduxjs/toolkit";
import { traCuuThongTinDoanhNghiepApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ITraCuuThongTinDoanhNghiep, ISearchTraCuuThongTinDoanhNghiep } from "../models";

export const SearchTraCuuThongTinDoanhNghiep =
    createAsyncThunk<IPaginationResponse<ITraCuuThongTinDoanhNghiep[]>, ISearchTraCuuThongTinDoanhNghiep>("SearchTraCuuThongTinDoanhNghiep", async (params, thunkApi) => {
        try {
            const res = await traCuuThongTinDoanhNghiepApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchTraCuuThongTinDoanhNghiepTheoDonVi =
    createAsyncThunk<IPaginationResponse<ITraCuuThongTinDoanhNghiep[]>, ISearchTraCuuThongTinDoanhNghiep>("SearchTraCuuThongTinDoanhNghiepTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await traCuuThongTinDoanhNghiepApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetTraCuuThongTinDoanhNghiep =
    createAsyncThunk<IResult<ITraCuuThongTinDoanhNghiep>, string>("GetTraCuuThongTinDoanhNghiep", async (id, thunkApi) => {
        try {
            const res = await traCuuThongTinDoanhNghiepApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddTraCuuThongTinDoanhNghiep = createAsyncThunk("AddTraCuuThongTinDoanhNghiep", async (data: ITraCuuThongTinDoanhNghiep, thunkApi) => {
    try {
        const res = await traCuuThongTinDoanhNghiepApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchTraCuuThongTinDoanhNghiep({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateTraCuuThongTinDoanhNghiep = createAsyncThunk("UpdateTraCuuThongTinDoanhNghiep", async (data: IOmitUpdate<ITraCuuThongTinDoanhNghiep>, thunkApi) => {
    try {
        const res = await traCuuThongTinDoanhNghiepApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTraCuuThongTinDoanhNghiep({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTraCuuThongTinDoanhNghiep = createAsyncThunk("DeleteTraCuuThongTinDoanhNghiep", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await traCuuThongTinDoanhNghiepApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTraCuuThongTinDoanhNghiep({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 