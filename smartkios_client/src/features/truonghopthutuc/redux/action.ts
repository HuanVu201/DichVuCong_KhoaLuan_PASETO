import { createAsyncThunk } from "@reduxjs/toolkit";
import { DuLieuThemHoSoParams, truongHopThuTucApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IGetDuLieuThemHoSo, ITruongHopThuTuc, TruongHopThuTucQuyTrinhResponse } from "../models";
import { toast } from "react-toastify";

export const SearchTruongHopThuTuc =
    createAsyncThunk<IPaginationResponse<ITruongHopThuTuc[]>, IPickSearch<ITruongHopThuTuc, "thuTucId">>("SearchTruongHopThuTuc", async (params, thunkApi) => {
        try {
            const res = await truongHopThuTucApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetTruongHopThuTuc =
    createAsyncThunk<IResult<ITruongHopThuTuc>, string>("GetTruongHopThuTuc", async (id, thunkApi) => {
        try {
            const res = await truongHopThuTucApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDuLieuThemHoSo =
    createAsyncThunk<IResult<IGetDuLieuThemHoSo>, DuLieuThemHoSoParams>("GetDuLieuThemHoSo", async (data, thunkApi) => {
        try {
            const res = await truongHopThuTucApi.GetDuLieuThemHoSo(data);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetByHoSoId =
    createAsyncThunk<IResult<TruongHopThuTucQuyTrinhResponse>, string>("GetByHoSoId", async (data, thunkApi) => {
        try {
            const res = await truongHopThuTucApi.GetByHoSoId(data);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddTruongHopThuTuc = createAsyncThunk("AddTruongHopThuTuc", async (data: ITruongHopThuTuc, thunkApi) => {
    try {
        const res = await truongHopThuTucApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchTruongHopThuTuc({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const NhanBanTruongHopThuTuc = createAsyncThunk("NhanBanTruongHopThuTuc", async (id: any, thunkApi) => {
    try {
        const res = await truongHopThuTucApi.NhanBanTruongHopThuTuc(id);
        if(res.status == 201){
            toast.success('Đã sao chép trường hợp thủ tục!')
            
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateTruongHopThuTuc = createAsyncThunk("UpdateTruongHopThuTuc", async (data: IOmitUpdate<ITruongHopThuTuc>, thunkApi) => {
    try {
        const res = await truongHopThuTucApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchTruongHopThuTuc({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateTruongHopThuTucWithoutSearch = createAsyncThunk("UpdateTruongHopThuTucWithoutSearch", async (data: IOmitUpdate<ITruongHopThuTuc>, thunkApi) => {
    try {
        const res = await truongHopThuTucApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTruongHopThuTuc = createAsyncThunk("DeleteTruongHopThuTuc", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await truongHopThuTucApi.Delete(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchTruongHopThuTuc({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 