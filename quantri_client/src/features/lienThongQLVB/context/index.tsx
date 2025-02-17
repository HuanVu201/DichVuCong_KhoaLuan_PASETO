import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IConfigApiString, IQLVBSearchParams } from "../models";

const LienThongQLVBContext = createContext<ILienThongQLVBContext | null>(null)

export interface ILienThongQLVBContext {
    lienThongQLVBId: string | undefined;
    setLienThongQLVBId: React.Dispatch<React.SetStateAction<string | undefined>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean >>;
    configApiString: IConfigApiString | undefined;
    setConfigApiString: React.Dispatch<React.SetStateAction<IConfigApiString | undefined>>;
    searchParams: IQLVBSearchParams;
    setSearchParams: React.Dispatch<React.SetStateAction<IQLVBSearchParams>>;
    hoSoDetailModalVisible: boolean;
    setHoSoDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    vanBanDetailModalVisible: boolean;
    setVanBanDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLienThongQLVBContext = () => {
    const context = useContext(LienThongQLVBContext)
    if (!context)
        throw new Error("LienThongQLVBContext must be used inside LienThongQLVBContext.Provider")
    return context
}

export const LienThongQLVBProvider = ({ children }: IWithChildren) => {
    const [lienThongQLVBId, setLienThongQLVBId] = useState<string>()
    const [configApiString, setConfigApiString] = useState<IConfigApiString>()
    const [searchParams, setSearchParams] = useState<IQLVBSearchParams>({
        draw: 2,
        columns: [

        ],
        order: [],
        start: 0,
        length: 10000,
        search: {
            value: "",
            regex: false
        },
        TuNgay: '',
        DenNgay: '',
        XLTuNgay: '',
        XLDenNgay: '',
        TrangThai: null,
        LoaiGuiNhan: null,
        LoaiGoiTin: '',
        TrongNgay: ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [hoSoDetailModalVisible, setHoSoDetailModalVisible] = useState<boolean>(false)
    const [vanBanDetailModalVisible, setVanBanDetailModalVisible] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    return <LienThongQLVBContext.Provider value={{
        lienThongQLVBId, setLienThongQLVBId,
        loading, setLoading,
        hoSoDetailModalVisible, setHoSoDetailModalVisible,
        vanBanDetailModalVisible, setVanBanDetailModalVisible,
        searchParams, setSearchParams,
        configApiString, setConfigApiString,
        reload, setReload
    }}>
        {children}
    </LienThongQLVBContext.Provider>
}