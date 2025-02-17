import { createAsyncThunk } from "@reduxjs/toolkit";
import { procOfThisType_MgrApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IProcOfThisType_Mgr, ISearchProcOfThisType_Mgr } from "../models";

export const SearchProcOfThisType_Mgr =
    createAsyncThunk<IPaginationResponse<IProcOfThisType_Mgr[]>, ISearchProcOfThisType_Mgr>("SearchProcOfThisType_Mgr", async (params, thunkApi) => {
        try {
            const res = await procOfThisType_MgrApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchProcOfThisType_MgrTheoDonVi =
    createAsyncThunk<IPaginationResponse<IProcOfThisType_Mgr[]>, ISearchProcOfThisType_Mgr>("SearchProcOfThisType_MgrTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await procOfThisType_MgrApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetProcOfThisType_Mgr =
    createAsyncThunk<IResult<IProcOfThisType_Mgr>, string>("GetProcOfThisType_Mgr", async (id, thunkApi) => {
        try {
            const res = await procOfThisType_MgrApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddProcOfThisType_Mgr = createAsyncThunk("AddProcOfThisType_Mgr", async (data: IProcOfThisType_Mgr, thunkApi) => {
    try {
        const res = await procOfThisType_MgrApi.Create(data);
        if (res.status === 201) {
           // thunkApi.dispatch(SearchProcOfThisType_Mgr({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateProcOfThisType_Mgr = createAsyncThunk("UpdateProcOfThisType_Mgr", async (data: IOmitUpdate<IProcOfThisType_Mgr>, thunkApi) => {
    try {
        const res = await procOfThisType_MgrApi.Update(data);
        if (res.status === 200) {
          //thunkApi.dispatch(SearchProcOfThisType_Mgr({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteProcOfThisType_Mgr = createAsyncThunk("DeleteProcOfThisType_Mgr", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await procOfThisType_MgrApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchProcOfThisType_Mgr({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 