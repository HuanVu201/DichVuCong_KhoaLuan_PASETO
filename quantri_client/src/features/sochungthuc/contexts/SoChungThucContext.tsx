import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const SoChungThucContext = createContext<ISoChungThucContext | null>(null)

export interface ISoChungThucContext {
    maSoChungThuc: string | undefined;
    setMaSoChungThuc: React.Dispatch<React.SetStateAction<string | undefined>>;
    SoChungThucModalVisible: boolean;
    setSoChungThucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    danhSachGiayToModalVisible: boolean;
    setDanhSachGiayToModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    loaiSoChungThuc: string | undefined;
    setLoaiSoChungThuc: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const useSoChungThucContext = () => {
    const context = useContext(SoChungThucContext)
    if (!context)
        throw new Error("SoChungThucContext must be used inside SoChungThucContext.Provider")
    return context
}

export const SoChungThucProvider = ({ children }: IWithChildren) => {
    const [maSoChungThuc, setMaSoChungThuc] = useState<string>()
    const [SoChungThucModalVisible, setSoChungThucModalVisible] = useState<boolean>(false)
    const [danhSachGiayToModalVisible, setDanhSachGiayToModalVisible] = useState<boolean>(false)
    const [loaiSoChungThuc, setLoaiSoChungThuc] = useState<string>()
    // thêm các hàm search cho các tabs ở đây
    return <SoChungThucContext.Provider value={{
        maSoChungThuc, setMaSoChungThuc, SoChungThucModalVisible, setSoChungThucModalVisible,
        danhSachGiayToModalVisible, setDanhSachGiayToModalVisible, loaiSoChungThuc, setLoaiSoChungThuc
    }}>
        {children}
    </SoChungThucContext.Provider>
}