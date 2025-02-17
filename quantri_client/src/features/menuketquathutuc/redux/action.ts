
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MenuKetQuaThuTucSearchResponse, menuKetQuaThuTucApi } from "../services";
import { IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IMenuKetQuaThuTuc, ISearchMenuKetQuaThuTuc } from "../models";
import { setNavMenu } from "@/features/danhmucmenu/redux/slice";

export const SearchMenuKetQuaThuTuc = createAsyncThunk<IPaginationResponse<IMenuKetQuaThuTuc[]>, ISearchMenuKetQuaThuTuc>("SearchMenuKetQuaThuTuc", async (params, thunkApi) => {
    try {
        const res = await menuKetQuaThuTucApi.Search(params)
        if(res.status == 200){
            thunkApi.dispatch(setNavMenu(res.data.navMenu))
        }
        return res.data.menuKetQuaThuTucs
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const GetMenuKetQuaThuTuc = createAsyncThunk<IResult<IMenuKetQuaThuTuc>, string>("GetMenuKetQuaThuTuc", async (id, thunkApi) => {
    try {
        const res = await menuKetQuaThuTucApi.Get(id)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const AddMenuKetQuaThuTuc = createAsyncThunk<IResult<string>, IMenuKetQuaThuTuc>("AddMenuKetQuaThuTuc", async (data, thunkApi) => {
    try {

        const res = await menuKetQuaThuTucApi.Create(data)
        if (res.status === 201) {
            thunkApi.dispatch(SearchMenuKetQuaThuTuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateMenuKetQuaThuTuc = createAsyncThunk("UpdateMenuKetQuaThuTuc", async (data: IOmitUpdate<IMenuKetQuaThuTuc>, thunkApi) => {
    try {
        const res = await menuKetQuaThuTucApi.Update(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchMenuKetQuaThuTuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteMenuKetQuaThuTuc = createAsyncThunk("DeleteMenuKetQuaThuTuc", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await menuKetQuaThuTucApi.Delete(params)
        if (res.status === 200) {
            thunkApi.dispatch(SearchMenuKetQuaThuTuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
