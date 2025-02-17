import { createAsyncThunk } from "@reduxjs/toolkit";
import { yeuCauThanhToanApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IBienLaiDienTuDto, ISearchYeuCauThanhToan, IYeuCauThanhToan } from "../models";
import { IConfirmDvcPaymentResponse } from "@/features/giaodichthanhtoan/models";


export const SearchYeuCauThanhToan =
    createAsyncThunk<IPaginationResponse<IYeuCauThanhToan[]>, ISearchYeuCauThanhToan>("SearchYeuCauThanhToan", async (params, thunkApi) => {
        try {
            const res = await yeuCauThanhToanApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchThongKeThuPhiLePhi =
    createAsyncThunk<IPaginationResponse<IYeuCauThanhToan[]>, ISearchYeuCauThanhToan>("SearchThongKeThuPhiLePhi", async (params, thunkApi) => {
        try {
            const res = await yeuCauThanhToanApi.SearchThongKeThuPhiLePhi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchHoSoTheoBaoCaoTTTT =
    createAsyncThunk<IPaginationResponse<IYeuCauThanhToan[]>, ISearchYeuCauThanhToan>("SearchHoSoTheoBaoCaoTTTT", async (params, thunkApi) => {
        try {
            const res = await yeuCauThanhToanApi.SearchTheoBaoCaoTTTT(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetYeuCauThanhToan =
    createAsyncThunk<IResult<IYeuCauThanhToan>, string>("GetYeuCauThanhToan", async (id, thunkApi) => {
        try {
            const res = await yeuCauThanhToanApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddYeuCauThanhToan = createAsyncThunk("AddYeuCauThanhToan", async (data: IYeuCauThanhToan, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateYeuCauThanhToan = createAsyncThunk("UpdateYeuCauThanhToan", async (data: IOmitUpdate<IYeuCauThanhToan>, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const PayYeuCauThanhToan = createAsyncThunk("PayYeuCauThanhToan", async (data: IOmitUpdate<IYeuCauThanhToan>, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.Pay(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        // }
        return res.data
    } catch (error) {

        return thunkApi.rejectWithValue(error)
    }
})
export const InitBienLai = createAsyncThunk("InitBienLai", async (data: IOmitUpdate<IBienLaiDienTuDto>, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.InitBienLai(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        // }
        return res.data
    } catch (error) {

        return thunkApi.rejectWithValue(error)
    }
})
export const UpdateBienLai = createAsyncThunk("UpdateBienLai", async (data: IOmitUpdate<IYeuCauThanhToan>, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.UpdateBienLai(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        // }
        return res.data
    } catch (error) {

        return thunkApi.rejectWithValue(error)
    }
})


export const YeuCauThanhToanLai = createAsyncThunk("YeuCauThanhToanLai", async (data: IOmitUpdate<IYeuCauThanhToan>, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.YeuCauThanhToanLai(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        // }
        return res.data
    } catch (error) {

        return thunkApi.rejectWithValue(error)
    }
})
export const DeleteYeuCauThanhToan = createAsyncThunk("DeleteYeuCauThanhToan", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 