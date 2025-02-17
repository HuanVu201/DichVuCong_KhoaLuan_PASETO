import { createAsyncThunk } from "@reduxjs/toolkit";
import { CapSoVaDongDauHoSoChungThucParams, ChuyenBuocXuLyHoSo, ChuyenNoiBoParam, ChuyenPhiDiaGioiParams, DeleteHoSoParam, DinhKemHoSoBoSung, GetHoSoParam, TiepNhanHoSoChungThucParams, TiepNhanHoSoTrucTuyenParams, TuChoiTiepNhanHoSoTrucTuyenParams, XacNhanKetQuaVaYeuCauThuPhiParams, YeuCauThuPhiParams, hoSoApi, GetHoSoDanhGiaHaiLongParam, XacNhanKetQuaParams } from "../services";
import { IDeleteFiles, IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IHoSo, ISearchHoSo } from "../models";
import { AxiosError } from "axios";
import { IDinhKemBoSungHoSo } from "../components/actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal";
import { IThemHoSo } from "../components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal";
import { IHoSoTheoTrangThaiXuLy, ISearchHoSoTheoTrangThaiXuLy } from "../models/searchHoSoTheoTrangThaiXuLy";

export const SearchHoSo =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchHoSo", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetHoSo =
    createAsyncThunk<IResult<IHoSo>, GetHoSoParam>("GetHoSo", async (id, thunkApi) => {
        try {
            const res = await hoSoApi.GetHoSo(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetHoSoDanhGiaHaiLong =
    createAsyncThunk<IResult<IHoSo>, GetHoSoDanhGiaHaiLongParam>("GetHoSoDanhGiaHaiLong", async (maHoSo, thunkApi) => {
        try {
            const res = await hoSoApi.GetHoSoDanhGiaHaiLong(maHoSo);
            
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetHoSoByMa =
    createAsyncThunk<IResult<IHoSo>, string>("GetHoSoByMa", async (id, thunkApi) => {
        try {
            const res = await hoSoApi.GetByMa(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const AddHoSoTrucTiep = createAsyncThunk("AddHoSoTrucTiep", async (data: IThemHoSo & IDeleteFiles, thunkApi) => {
    try {
        const res = await hoSoApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const ThemHoSoChungThucTrucTiep = createAsyncThunk("ThemHoSoChungThucTrucTiep", async (data: IThemHoSo & IDeleteFiles, thunkApi) => {
    try {
        const res = await hoSoApi.ThemHoSoChungThucTrucTiep(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const TiepNhanHoSoTrucTuyen = createAsyncThunk<IResult<any>, TiepNhanHoSoTrucTuyenParams, { rejectValue: IResult<any> }>("TiepNhanHoSoTrucTuyen", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.TiepNhanHoSoTrucTuyen(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})
export const TiepNhanHoSoChungThuc = createAsyncThunk<IResult<any>, TiepNhanHoSoChungThucParams, { rejectValue: IResult<any> }>("TiepNhanHoSoChungThuc", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.TiepNhanHoSoChungThuc(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})



export const YeuCauThuPhi = createAsyncThunk<IResult<any>, { id: string, data: YeuCauThuPhiParams }, { rejectValue: IResult<any> }>("YeuCauThuPhi", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.YeuCauThuPhi(params);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const TuChoiTiepNhanHoSoTrucTuyen = createAsyncThunk<IResult<any>, TuChoiTiepNhanHoSoTrucTuyenParams, { rejectValue: IResult<any> }>("TuChoiTiepNhanHoSoTrucTuyen", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.TuChoiTiepNhanHoSoTrucTuyen(params);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})
export const KhongTiepNhanHoSoBoSungQuaHan = createAsyncThunk<IResult<any>, TuChoiTiepNhanHoSoTrucTuyenParams, { rejectValue: IResult<any> }>("KhongTiepNhanHoSoBoSungQuaHan", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.KhongTiepNhanHoSoBoSungQuaHan(params);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const YeuCauCongDanBoSung = createAsyncThunk<IResult<any>, string, { rejectValue: IResult<any> }>("YeuCauCongDanBoSung", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.YeuCauCongDanBoSungHoSo(params);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const ThongKeHoSoNguoiDung = createAsyncThunk<IResult<any>, undefined, { rejectValue: IResult<any> }>("ThongKeHoSoNguoiDung", async (id, thunkApi) => {
    try {
        const res = await hoSoApi.ThongKeHoSoNguoiDung();
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})



export const AddHoSoTrucTuyen = createAsyncThunk<IResult<string>, IThemHoSo & IDeleteFiles, { rejectValue: IResult<any> }>("AddHoSoTrucTuyen", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.NopTrucTuyen(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const UpdateHoSo = createAsyncThunk("UpdateHoSo", async (data: IOmitUpdate<IHoSo> & { deletedThanhPhanIds?: string[] }, thunkApi) => {
    try {
        const res = await hoSoApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const ChuyenTiepBuocXuLy = createAsyncThunk<IResult<any>, { data: ChuyenBuocXuLyHoSo, id: string }, { rejectValue: IResult<any> }>("ChuyenTiepBuocXuLy", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.ChuyenTiepBuocXuLy(params);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const KySoHoSoChungThuc = createAsyncThunk<IResult<any>, {data: ChuyenBuocXuLyHoSo, id: string}, {rejectValue: IResult<any>}>("KySoHoSoChungThuc", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.KySoHoSoChungThuc(params);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const CapSoVaDongDauHoSoChungThuc = createAsyncThunk<IResult<any>, { data: CapSoVaDongDauHoSoChungThucParams, id: string }, { rejectValue: IResult<any> }>("CapSoVaDongDauHoSoChungThuc", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.CapSoVaDongDauHoSoChungThuc(params);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})



// export const ChuyenBuocNhanhHoSo = createAsyncThunk<IResult<any>, {id:string}, {rejectValue: IResult<any>}>("ChuyenBuocNhanhHoSo", async (params, thunkApi) => {
//     try {
//         const res = await hoSoApi.ChuyenBuocNhanhHoSo(params);
//         // if (res.status === 200) {
//         //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
//         // }
//         return res.data
//     } catch (error) {
//         return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
//     }
// })

export const ThayDoiTruongHopThuTuc = createAsyncThunk<IResult<any>, { hoSoId: string, truongHopThuTucId: string }, { rejectValue: IResult<any> }>("ThayDoiTruongHopThuTuc", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.ThayDoiTruongHopThuTuc(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const TraKetQuaHoSo = createAsyncThunk<IResult<any>, Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua"|"YeuCauBCCILayKetQua"> , { rejectValue: IResult<any> }>("TraKetQuaHoSo", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.TraKetQuaHoSo(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const ThuHoiHoSo = createAsyncThunk<IResult<any>, string, { rejectValue: IResult<any> }>("ThuHoiHoSo", async (id, thunkApi) => {
    try {
        const res = await hoSoApi.ThuHoiHoSo(id);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const TraLaiHoSo = createAsyncThunk<IResult<any>, string, { rejectValue: IResult<any> }>("TraLaiHoSo", async (id, thunkApi) => {
    try {
        const res = await hoSoApi.TraLaiHoSo(id);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const CapNhatKetQuaHoSo = createAsyncThunk<IResult<any>, Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua" | "eFormKetQuaData">, { rejectValue: IResult<any> }>("CapNhatKetQuaHoSo", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.CapNhatKetQuaHoSo(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})



export const KetThucHoSo = createAsyncThunk<IResult<any>, Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua">, { rejectValue: IResult<any> }>("KetThucHoSo", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.KetThucHoSo(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const ChuyenNoiBo = createAsyncThunk<IResult<any>, ChuyenNoiBoParam, { rejectValue: IResult<any> }>("ChuyenNoiBo", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.ChuyenNoiBo(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})
export const YeuCauMotCuaBoSungHoSo = createAsyncThunk<IResult<any>, { id: string, data: IDinhKemBoSungHoSo }, { rejectValue: IResult<any> }>("YeuCauMotCuaBoSungHoSo", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.YeuCauMotCuaBoSungHoSo(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const MotCuaCapNhatBoSung = createAsyncThunk<IResult<any>, { id: string, data: DinhKemHoSoBoSung }, { rejectValue: IResult<any> }>("MotCuaCapNhatBoSung", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.MotCuaCapNhatBoSung(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const MotCuaGuiBoSung = createAsyncThunk<IResult<any>, { id: string, data: DinhKemHoSoBoSung }, { rejectValue: IResult<any> }>("MotCuaGuiBoSung", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.MotCuaGuiBoSung(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const CongDanCapNhatBoSung = createAsyncThunk<IResult<any>, { id: string, data: DinhKemHoSoBoSung }, { rejectValue: IResult<any> }>("CongDanCapNhatBoSung", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.CongDanCapNhatBoSung(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const CongDanGuiBoSung = createAsyncThunk<IResult<any>, { id: string, data: DinhKemHoSoBoSung }, { rejectValue: IResult<any> }>("CongDanGuiBoSung", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.CongDanGuiBoSung(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const DeleteHoSo = createAsyncThunk("DeleteHoSo", async (data: DeleteHoSoParam, thunkApi) => {
    try {
        const res = await hoSoApi.Delete(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const SearchHoSoTheoTrangThaiXuLy =
    createAsyncThunk<IPaginationResponse<IHoSoTheoTrangThaiXuLy[]>, ISearchHoSoTheoTrangThaiXuLy>("SearchHoSoTheoTrangThaiXuLy", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchTheoTrangThaiXuLy(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchHoSoTheoTrangThaiThuPhi =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchHoSoTheoTrangThaiThuPhi", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchTheoTrangThaiThuPhi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const XacNhanKetQua = createAsyncThunk("XacNhanKetQua", async (data: XacNhanKetQuaParams, thunkApi) => {
    try {
        const res = await hoSoApi.XacNhanKetQua(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
}) 
export const XacNhanKetQuaVaYeuCauThuPhi = createAsyncThunk<IResult<any>, XacNhanKetQuaVaYeuCauThuPhiParams, { rejectValue: IResult<any> }>("XacNhanKetQuaVaYeuCauThuPhi", async ( data, thunkApi) => {
    try {
        const res = await hoSoApi.XacNhanKetQuaVaYeuCauThuPhi(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
}) 
export const ThuHoiChuyenTraKq = createAsyncThunk("ThuHoiChuyenTraKq", async ( data: {ids: string[], TrangThaiTraKq?: string, ThaoTac?: string}, thunkApi) => {
    try {
        const res = await hoSoApi.ThuHoiChuyenTraKqTTHCC(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
export const ChuyenPhiDiaGioi = createAsyncThunk<IResult<any>, ChuyenPhiDiaGioiParams, { rejectValue: IResult<any> }>("ChuyenPhiDiaGioi", async ( data, thunkApi) => {
    try {
        const res = await hoSoApi.ChuyenPhiDiaGioi(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
}) 
export const YeuCauBCCILayKetQua = createAsyncThunk("YeuCauBCCILayKetQua", async ( _id: string, thunkApi) => {
    try {
        const res = await hoSoApi.YeuCauBCCILayKetQua(_id);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
export const XacNhanVaYeuCauBCCILayKetQua = createAsyncThunk("XacNhanVaYeuCauBCCILayKetQua", async ( _id: string, thunkApi) => {
    try {
        const res = await hoSoApi.XacNhanVaYeuCauBCCILayKetQua(_id);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const DangKyNhanKqQuaBCCI = createAsyncThunk("DangKyNhanKqQuaBCCI", async (prams: { id: string, DangKyNhanKqQuaBCCIData : string }, thunkApi) => {
    try {
        const res = await hoSoApi.DangKyNhanKqQuaBCCI(prams);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})