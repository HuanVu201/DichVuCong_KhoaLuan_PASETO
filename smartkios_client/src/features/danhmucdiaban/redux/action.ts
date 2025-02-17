import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMucDiaBanApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IDanhMucDiaBan, ISearchDanhMucDiaBan } from "../models";

export const SearchDanhMucDiaBan =
    createAsyncThunk<IPaginationResponse<IDanhMucDiaBan[]>, ISearchDanhMucDiaBan>("SearchDanhMucDiaBan", async (params, thunkApi) => {
        try {
            const res = await danhMucDiaBanApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetDanhMucDiaBan =
    createAsyncThunk<IResult<IDanhMucDiaBan>, string>("GetDanhMucDiaBan", async (id, thunkApi) => {
        try {
            const res = await danhMucDiaBanApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

// export const GetDanhMucDiaBanByMa =
//     createAsyncThunk<IResult<IDanhMucDiaBan>, {maDiaBan: string[]}>("GetDanhMucDiaBanByMa", async (params, thunkApi) => {
//         try {
//             const res = await danhMucDiaBanApi.GetByMa(params);
//             return res.data
//         } catch (error) {
//             return thunkApi.rejectWithValue(error)
//         }
//     })

export const AddDanhMucDiaBan = createAsyncThunk("AddDanhMucDiaBan", async (data: IDanhMucDiaBan, thunkApi) => {
    try {
        const res = await danhMucDiaBanApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMucDiaBan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMucDiaBan = createAsyncThunk("UpdateDanhMucDiaBan", async (data: IOmitUpdate<IDanhMucDiaBan>, thunkApi) => {
    try {
        const res = await danhMucDiaBanApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMucDiaBan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMucDiaBan = createAsyncThunk("DeleteDanhMucDiaBan", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMucDiaBanApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMucDiaBan({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
