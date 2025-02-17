import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DanhMucGiayToChungThucContext = createContext<IDanhMucGiayToChungThucContext | null>(null)

export interface IDanhMucGiayToChungThucContext {
    maDanhMucGiayToChungThuc: string | undefined;
    setMaDanhMucGiayToChungThuc: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMucGiayToChungThucModalVisible: boolean;
    setDanhMucGiayToChungThucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMucGiayToChungThucContext = () => {
    const context = useContext(DanhMucGiayToChungThucContext)
    if (!context)
        throw new Error("DanhMucGiayToChungThucContext must be used inside DanhMucGiayToChungThucContext.Provider")
    return context
}

export const DanhMucGiayToChungThucProvider = ({ children }: IWithChildren) => {
    const [maDanhMucGiayToChungThuc, setMaDanhMucGiayToChungThuc] = useState<string>()
    const [danhMucGiayToChungThucModalVisible, setDanhMucGiayToChungThucModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMucGiayToChungThucContext.Provider value={{
        maDanhMucGiayToChungThuc, setMaDanhMucGiayToChungThuc, danhMucGiayToChungThucModalVisible, setDanhMucGiayToChungThucModalVisible,
    }}>
        {children}
    </DanhMucGiayToChungThucContext.Provider>
}