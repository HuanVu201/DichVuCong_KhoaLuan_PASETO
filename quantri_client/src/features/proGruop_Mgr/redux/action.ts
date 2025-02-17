import { createAsyncThunk } from "@reduxjs/toolkit";
import { procGroup_MgrApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IProcGroup_Mgr, ISearchProcGroup_Mgr } from "../models";

export const SearchProcGroup_Mgr =
    createAsyncThunk<IPaginationResponse<IProcGroup_Mgr[]>, ISearchProcGroup_Mgr>("SearchProcGroup_Mgr", async (params, thunkApi) => {
        try {
            const res = await procGroup_MgrApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchProcGroup_MgrTheoDonVi =
    createAsyncThunk<IPaginationResponse<IProcGroup_Mgr[]>, ISearchProcGroup_Mgr>("SearchProcGroup_MgrTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await procGroup_MgrApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetProcGroup_Mgr =
    createAsyncThunk<IResult<IProcGroup_Mgr>, string>("GetProcGroup_Mgr", async (id, thunkApi) => {
        try {
            const res = await procGroup_MgrApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddProcGroup_Mgr = createAsyncThunk("AddProcGroup_Mgr", async (data: IProcGroup_Mgr, thunkApi) => {
    try {
        const res = await procGroup_MgrApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchProcGroup_Mgr({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateProcGroup_Mgr = createAsyncThunk("UpdateProcGroup_Mgr", async (data: IOmitUpdate<IProcGroup_Mgr>, thunkApi) => {
    try {
        const res = await procGroup_MgrApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchProcGroup_Mgr({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteProcGroup_Mgr = createAsyncThunk("DeleteProcGroup_Mgr", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await procGroup_MgrApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchProcGroup_Mgr({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 