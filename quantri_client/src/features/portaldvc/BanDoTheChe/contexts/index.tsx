import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ICoordinates, ISearchSoLieuBaoCao, ISoLieuBaoCao } from "../models";

const SoLieuBaoCaoContext = createContext<ISoLieuBaoCaoContext | null>(null)

export interface ISoLieuBaoCaoContext {
    nhomChiTieu: string | undefined
    setNhomChiTieu: React.Dispatch<React.SetStateAction<string | undefined>>;
    soLieuTheoKy: ISoLieuBaoCao[] | undefined
    setSoLieuTheoKy: React.Dispatch<React.SetStateAction<ISoLieuBaoCao[] | undefined>>;
    soLieuHienTai: ISoLieuBaoCao[] | undefined
    setSoLieuHienTai: React.Dispatch<React.SetStateAction<ISoLieuBaoCao[] | undefined>>;
    soLieu12Thang: ISoLieuBaoCao[] | undefined
    setSoLieu12Thang: React.Dispatch<React.SetStateAction<ISoLieuBaoCao[] | undefined>>;
    searchParams: ISearchSoLieuBaoCao | undefined
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchSoLieuBaoCao | undefined>>;

    coordinateHuyens: ICoordinates[] | undefined
    setCoordinateHuyens: React.Dispatch<React.SetStateAction<ICoordinates[] | undefined>>;
    coordinateXas: ICoordinates[] | undefined
    setCoordinateXas: React.Dispatch<React.SetStateAction<ICoordinates[] | undefined>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading1: boolean;
    setLoading1: React.Dispatch<React.SetStateAction<boolean>>;
    loading2: boolean;
    setLoading2: React.Dispatch<React.SetStateAction<boolean>>;
    loading3: boolean;
    setLoading3: React.Dispatch<React.SetStateAction<boolean>>;
    loading4: boolean;
    setLoading4: React.Dispatch<React.SetStateAction<boolean>>;
    loading5: boolean;
    setLoading5: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSoLieuBaoCaoContext = () => {
    const context = useContext(SoLieuBaoCaoContext)
    if (!context)
        throw new Error("SoLieuBaoCaoContext must be used inside SoLieuBaoCaoContext.Provider")
    return context
}

export const SoLieuBaoCaoProvider = ({ children }: IWithChildren) => {
    const [nhomChiTieu, setNhomChiTieu] = useState<string>()
    const [soLieuTheoKy, setSoLieuTheoKy] = useState<ISoLieuBaoCao[] | undefined>()
    const [soLieuHienTai, setSoLieuHienTai] = useState<ISoLieuBaoCao[] | undefined>()
    const [soLieu12Thang, setSoLieu12Thang] = useState<ISoLieuBaoCao[] | undefined>()
    const [coordinateHuyens, setCoordinateHuyens] = useState<ICoordinates[] | undefined>()
    const [coordinateXas, setCoordinateXas] = useState<ICoordinates[] | undefined>()
    const [searchParams, setSearchParams] = useState<ISearchSoLieuBaoCao>()
    const [loading, setLoading] = useState<boolean>(false)
    const [loading1, setLoading1] = useState<boolean>(false)
    const [loading2, setLoading2] = useState<boolean>(false)
    const [loading3, setLoading3] = useState<boolean>(false)
    const [loading4, setLoading4] = useState<boolean>(false)
    const [loading5, setLoading5] = useState<boolean>(false)
    return <SoLieuBaoCaoContext.Provider value={{
        nhomChiTieu, setNhomChiTieu,
        soLieuTheoKy, setSoLieuTheoKy,
        soLieuHienTai, setSoLieuHienTai,
        soLieu12Thang, setSoLieu12Thang,
        coordinateHuyens, setCoordinateHuyens,
        coordinateXas, setCoordinateXas,
        loading, setLoading,
        loading1, setLoading1,
        loading2, setLoading2,
        loading3, setLoading3,
        loading4, setLoading4,
        loading5, setLoading5,
        searchParams, setSearchParams
    }}>
        {children}
    </SoLieuBaoCaoContext.Provider>
}