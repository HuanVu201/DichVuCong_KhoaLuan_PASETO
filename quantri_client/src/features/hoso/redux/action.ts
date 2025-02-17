import { IHoSoTiepNhanQuaHan, ISearchHoSoTiepNhanQuaHan } from './../../thongKe/thongKeQD766/models/ThongKeHoSoTiepNhanQuaHan';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CapSoVaDongDauHoSoChungThucParams, ChuyenBuocXuLyHoSo, ChuyenNoiBoParam, ChuyenPhiDiaGioiParams, DeleteHoSoParam, DinhKemHoSoBoSung, GetHoSoParam, TiepNhanHoSoChungThucParams, TiepNhanHoSoTrucTuyenParams, TuChoiTiepNhanHoSoTrucTuyenParams, XacNhanKetQuaVaYeuCauThuPhiParams, YeuCauThuPhiParams, hoSoApi, GetHoSoDanhGiaHaiLongParam, XacNhanKetQuaParams, ChuyenDuLieuTaiKhoanParams, CapNhatKetQuaXuLyHoSo, TraLaiBuocTruocParams, StatisticHoSoChungThucParams, UpdateTrangThaiHoSoParams, ChuyenBuocXuLyNhieuHoSoParams, TiepNhanNhieuHoSoTrucTuyenParams, TiepNhanNhieuHoSoChungThucParams, KetThucHoSoTBKMParams, ThuHoiMaVanDonBuuDienRequest, yeuCauBCCILayKetQuaWithOutItemCodeParams, KetThucNhieuHoSoTBKMParams, ThongKeHSLTParams, CapNhatKetQuaXuLyNhieuHoSo, DatLaiQuaHanNhieuHoSoParams } from "../services";
import { IDeleteFiles, IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IHoSo, ISearchHoSo, ISearchHoSoTheoBaoCaoTongHopParams, ISearchHoSoTraLaiXinRut, ISearchTheoDoiHoSoChungThucParams, ITheoDoiHoSoKhongDuocTiepNhan, IThongKeHoSoTrongNgay, IThongKeHSLT, IThongKeTheoDoiTrangThaiXuLyHS } from "../models";
import { AxiosError } from "axios";
import { IDinhKemBoSungHoSo } from "../components/actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal";
import { IThemHoSo } from "../components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal";
import { IHoSoTheoTrangThaiXuLy, ISearchHoSoTheoTrangThaiXuLy } from "../models/searchHoSoTheoTrangThaiXuLy";
import { ISearchThongKeHoSoChungThuc, IThongKeHoSoChungThuc } from "@/features/sochungthuc/models";

export const SearchHoSo =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchHoSo", async (params, thunkApi) => {
        try {
            // if(params.laNguoiNhanHoSo) {
            //     const res = await hoSoApi.SearchNguoiNhanHoSo(params)
            //     return res.data
            // } else 
            if(params.byCurrentUser) {
                const res = await hoSoApi.SearchNguoiDangXuLy(params)
                return res.data
            } else if(params.nguoiDaXuLy) {
                const res = await hoSoApi.SearchNguoiDaXuLy(params)
                return res.data
            }
            const res = await hoSoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
})
export const SearchNguoiDangXuLy =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchNguoiDangXuLy", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchNguoiDangXuLy(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
})

export const SearchHoSoByNguoiGui =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchHoSoByNguoiGui", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchHoSoByNguoiGui(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
})


export const SearchNguoiDaXuLy =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchNguoiDaXuLy", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchNguoiDaXuLy(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
})
export const SearchNguoiNhanHoSo =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchNguoiNhanHoSo", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchNguoiNhanHoSo(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
})

    export const SearchScanHoSoDienTu =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchScanHoSoDienTu", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchScanHoSo(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const ThongKeTheoDoiTrangThaiHSAction =
    createAsyncThunk<IPaginationResponse<IThongKeTheoDoiTrangThaiXuLyHS[]>, ThongKeHSLTParams>("ThongKeTheoDoiTrangThaiHSAction", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.ThongKeTheoDoiTrangThaiHS(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const TheoDoiHoSoKhongDuocTiepNhanAction =
    createAsyncThunk<IPaginationResponse<ITheoDoiHoSoKhongDuocTiepNhan[]>, ThongKeHSLTParams>("TheoDoiHoSoKhongDuocTiepNhanAction", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.TheoDoiHoSoKhongDuocTiepNhan(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const ThongKeHoSoTrongNgayAction =
    createAsyncThunk<IPaginationResponse<IThongKeHoSoTrongNgay[]>, ThongKeHSLTParams>("ThongKeHoSoTrongNgayAction", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.ThongKeHoSoTrongNgay(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchThongKeHSLT =
    createAsyncThunk<IPaginationResponse<IThongKeHSLT[]>, ThongKeHSLTParams>("ThongKeHSLT", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.ThongKeHSLT(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchHoSoLienThong =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchHoSLienThong", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchHoSoLienThong(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const CanBoBCCISearch =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("CanBoBCCISearch", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.CanBoBCCISearch(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchHoSoPortal =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSo>("SearchHoSoPortal", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchPortal(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const SearchTheoDoiHoSoChungThuc =
    createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchTheoDoiHoSoChungThucParams>("SearchTheoDoiHoSoChungThuc", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchTheoDoiHoSoChungThuc(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const PostEmailTheoDoiHoSoChungThuc =
    createAsyncThunk<IResult<IHoSo>, { id: string }>("PostEmailTheoDoiHoSoChungThuc", async (data, thunkApi) => {
        try {
            const res = await hoSoApi.GuiEmailTheoDoiHoSoChungThuc(data);
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


export const AddHoSoTrucTiep = createAsyncThunk<IResult<any>, IThemHoSo & IDeleteFiles, { rejectValue: IResult<any> }>("AddHoSoTrucTiep", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const AddHoSoPhiDiaGioi = createAsyncThunk<IResult<any>, IThemHoSo & IDeleteFiles, { rejectValue: IResult<any> }>("AddHoSoPhiDiaGioi", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.AddPhiDiaGioi(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        if (res)
            return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const ThemHoSoChungThucTrucTiep = createAsyncThunk<IResult<any>, IThemHoSo & IDeleteFiles, { rejectValue: IResult<any> }>("ThemHoSoChungThucTrucTiep", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.ThemHoSoChungThucTrucTiep(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
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

export const TiepNhanNhieuHoSoTrucTuyen = createAsyncThunk<IResult<Record<string, string>>, TiepNhanNhieuHoSoTrucTuyenParams, { rejectValue: IResult<any> }>("TiepNhanNhieuHoSoTrucTuyen", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.TiepNhanNhieuHoSoTrucTuyen(data);
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

export const TiepNhanNhieuHoSoChungThuc = createAsyncThunk<IResult<Record<string, string>>, TiepNhanNhieuHoSoChungThucParams, { rejectValue: IResult<any> }>("TiepNhanNhieuHoSoChungThuc", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.TiepNhanNhieuHoSoChungThuc(data);
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


export const UpdateHoSo = createAsyncThunk<IResult<string>, IOmitUpdate<IHoSo> & { deletedThanhPhanIds?: string[] }, { rejectValue: IResult<any> }>("UpdateHoSo", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const ChuyenDuLieuTaiKhoan = createAsyncThunk("ChuyenDuLieuTaiKhoan", async (data: ChuyenDuLieuTaiKhoanParams, thunkApi) => {
    try {
        const res = await hoSoApi.ChuyenDuLieuTaiKhoan(data);

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})
export const UpdateTrangThaiHoSo = createAsyncThunk("UpdateTrangThaiHoSo", async (data: UpdateTrangThaiHoSoParams, thunkApi) => {
    try {
        const res = await hoSoApi.UpdateTrangThaiHoSo(data);

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const KetThucHoSoTBKM = createAsyncThunk("KetThucHoSoTBKM", async (data: KetThucHoSoTBKMParams, thunkApi) => {
    try {
        const res = await hoSoApi.KetThucHoSoTBKM(data);

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
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

export const KySoHoSoChungThuc = createAsyncThunk<IResult<any>, { data: ChuyenBuocXuLyHoSo, id: string }, { rejectValue: IResult<any> }>("KySoHoSoChungThuc", async (params, thunkApi) => {
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
export const ChuyenBuocXuLyNhieuHoSo = createAsyncThunk<IResult<Record<string, string>>, { data: ChuyenBuocXuLyNhieuHoSoParams }, { rejectValue: IResult<any> }>("ChuyenBuocXuLyNhieuHoSo", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.ChuyenBuocXuLyNhieuHoSo(params);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const KetThucNhieuHoSoTBKM = createAsyncThunk<IResult<Record<string, string>>, { data: KetThucNhieuHoSoTBKMParams }, { rejectValue: IResult<any> }>("ChuyenBuocXuLyNhieuHoSo", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.KetThucNhieuHoSoTBKM(params);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const DatLaiNhieuHoSoQuaHanAction = createAsyncThunk<IResult<Record<string, string>>, { data: DatLaiQuaHanNhieuHoSoParams }, { rejectValue: IResult<any> }>("DatLaiQuaHanNhieuHoSo", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.DatLaiNhieuHoSoQuaHan(params);
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

export const TraKetQuaHoSo = createAsyncThunk<IResult<any>, Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua" | "YeuCauBCCILayKetQua">, { rejectValue: IResult<any> }>("TraKetQuaHoSo", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.TraKetQuaHoSo(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const TraKetQuaChungThuc = createAsyncThunk<IResult<any>, Pick<IHoSo, "id" | "trichYeuKetQua" | "dinhKemKetQua">, { rejectValue: IResult<any> }>("TraKetQuaChungThuc", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.TraKetQuaChungThuc(data);
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

export const TraLaiHoSo = createAsyncThunk<IResult<any>, TraLaiBuocTruocParams, { rejectValue: IResult<any> }>("TraLaiHoSo", async (id, thunkApi) => {
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


export const CapNhatKetQuaHoSo = createAsyncThunk<IResult<any>, CapNhatKetQuaXuLyHoSo, { rejectValue: IResult<any> }>("CapNhatKetQuaHoSo", async (data, thunkApi) => {
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

export const CapNhatKetQuaNhieuHoSo = createAsyncThunk<IResult<any>, CapNhatKetQuaXuLyNhieuHoSo, { rejectValue: IResult<any> }>("CapNhatKetQuaNhieuHoSo", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.CapNhatKetQuaNhieuHoSo(data);
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

        console.log(data);

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
export const SearchHoSoQuaHanAction =
    createAsyncThunk<IPaginationResponse<IHoSoTheoTrangThaiXuLy[]>, ISearchHoSoTheoTrangThaiXuLy>("SearchHoSoQuaHanAction", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchHoSoQuaHan(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchHoSoTiepNhanQuaHan =
    createAsyncThunk<IHoSoTiepNhanQuaHan[], ISearchHoSoTiepNhanQuaHan>("SearchHoSoTiepNhanQuaHan", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchHoSoTiepNhanQuaHan(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchSoTheoDoiHoSoAction =
    createAsyncThunk<IPaginationResponse<IHoSoTiepNhanQuaHan[]>, ISearchHoSoTiepNhanQuaHan>("SearchSoTheoDoiHoSoAction", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchSoTheoDoiHoSo(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const SearchThongKeHoSoPhiDiaGioiAction =
    createAsyncThunk<IPaginationResponse<IHoSoTiepNhanQuaHan[]>, ISearchHoSoTiepNhanQuaHan>("SearchThongKeHoSoPhiDiaGioiAction", async (params, thunkApi) => {
        try {
            const res = await hoSoApi.SearchThongKeHoSoPhiDiaGioi(params)
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
export const XacNhanBoSung = createAsyncThunk("XacNhanBoSung", async (data: XacNhanKetQuaParams, thunkApi) => {
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
export const XacNhanTraLaiXinRut = createAsyncThunk("XacNhanTraLaiXinRut", async (data: XacNhanKetQuaParams, thunkApi) => {
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
export const XacNhanKetQuaVaYeuCauThuPhi = createAsyncThunk<IResult<any>, XacNhanKetQuaVaYeuCauThuPhiParams, { rejectValue: IResult<any> }>("XacNhanKetQuaVaYeuCauThuPhi", async (data, thunkApi) => {
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
export const ThuHoiChuyenTraKq = createAsyncThunk("ThuHoiChuyenTraKq", async (data: { ids: string[], TrangThaiTraKq?: string, ThaoTac?: string }, thunkApi) => {
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
export const ChuyenPhiDiaGioi = createAsyncThunk<IResult<any>, ChuyenPhiDiaGioiParams, { rejectValue: IResult<any> }>("ChuyenPhiDiaGioi", async (data, thunkApi) => {
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
export const YeuCauBCCILayKetQua = createAsyncThunk("YeuCauBCCILayKetQua", async (_id: string, thunkApi) => {
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
export const YeuCauBCCILayKetQuaWithoutItemCode = createAsyncThunk("YeuCauBCCILayKetQuaWithoutItemCode", async (_id: yeuCauBCCILayKetQuaWithOutItemCodeParams, thunkApi) => {
    try {
        const res = await hoSoApi.YeuCauBCCILayKetQuaWithoutItemCode(_id);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const YeuCauBCCILayKetQuaNhieuHoSoItemCode = createAsyncThunk("YeuCauBCCILayKetQuaNhieuHoSoItemCode", async (_id: yeuCauBCCILayKetQuaWithOutItemCodeParams, thunkApi) => {
    try {
        const res = await hoSoApi.YeuCauBCCILayKetQuaNhieuHoSoItemCode(_id);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const ThuHoiMaVanDonBuuDien = createAsyncThunk("ThuHoiMaVanDonBuuDien", async (_id: ThuHoiMaVanDonBuuDienRequest, thunkApi) => {
    try {
        const res = await hoSoApi.ThuHoiMaVanDonBuuDien(_id);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const ThuHoiDangKyNhanKqQuaBCCI = createAsyncThunk("ThuHoiDangKyNhanKqQuaBCCI", async (_id: yeuCauBCCILayKetQuaWithOutItemCodeParams, thunkApi) => {
    try {
        const res = await hoSoApi.ThuHoiDangKyNhanKqQuaBCCI(_id);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const XacNhanVaYeuCauBCCILayKetQua = createAsyncThunk("XacNhanVaYeuCauBCCILayKetQua", async (_id: string, thunkApi) => {
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
export const DangKyNhanKqQuaBCCI = createAsyncThunk("DangKyNhanKqQuaBCCI", async (prams: { id: string, DangKyNhanKqQuaBCCIData: string, loai?: string }, thunkApi) => {
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
export const SearchHoSoTheoBaoCaoTongHop = createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSoTheoBaoCaoTongHopParams>("SearchHoSoTheoBaoCaoTongHop", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.SearchHoSoTheoBaoCaoTongHop(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const SearchHoSoTheoBaoCaoTongHopDonVi = createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSoTheoBaoCaoTongHopParams>("SearchHoSoTheoBaoCaoTongHopDonVi", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.SearchHoSoTheoBaoCaoTongHopDonVi(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const SearchHoSoTheoTiepNhanTrucTuyen = createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSoTheoBaoCaoTongHopParams>("SearchHoSoTheoTiepNhanTrucTuyen", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.SearchHoSoTheoTiepNhanTrucTuyen(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const SearchHoSoTheoTienDoGiaiQuyet = createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSoTheoBaoCaoTongHopParams>("SearchHoSoTheoTienDoGiaiQuyet", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.SearchHoSoTheoTiendoGiaiQuyet(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const SearchHoSoTheoChiTieuSoHoa = createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSoTheoBaoCaoTongHopParams>("SearchHoSoTheoChiTieuSoHoa", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.SearchHoSoTheoChiTieuSoHoa(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const SearchHoSoTheoChiTieuDvcTrucTuyen = createAsyncThunk<IPaginationResponse<IHoSo[]>, ISearchHoSoTheoBaoCaoTongHopParams>("SearchHoSoTheoChiTieuDvcTrucTuyen", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.SearchHoSoTheoChiTieuDvcTrucTuyen(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const SearchHoSoTraLaiXinRut = createAsyncThunk<
    ISearchHoSoTraLaiXinRut,
    IHoSo
>("SearchHoSoTraLaiXinRut", async (data, thunkApi) => {
    try {
        const res = await hoSoApi.SearchHoSoTraLaiXinRut(data);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});