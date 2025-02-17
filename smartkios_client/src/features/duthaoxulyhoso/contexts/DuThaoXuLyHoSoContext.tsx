import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DuThaoXuLyHoSoContext = createContext<IDuThaoXuLyHoSoContext | null>(null)

export interface IDuThaoXuLyHoSoContext {
    maDuThaoXuLyHoSo: string | undefined;
    setMaDuThaoXuLyHoSo: React.Dispatch<React.SetStateAction<string | undefined>>;
    DuThaoXuLyHoSoModalVisible: boolean;
    setDuThaoXuLyHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDuThaoXuLyHoSoContext = () => {
    const context = useContext(DuThaoXuLyHoSoContext)
    if (!context)
        throw new Error("DuThaoXuLyHoSoContext must be used inside DuThaoXuLyHoSoContext.Provider")
    return context
}

export const DuThaoXuLyHoSoProvider = ({ children }: IWithChildren) => {
    const [maDuThaoXuLyHoSo, setMaDuThaoXuLyHoSo] = useState<string>()
    const [DuThaoXuLyHoSoModalVisible, setDuThaoXuLyHoSoModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DuThaoXuLyHoSoContext.Provider value={{
        maDuThaoXuLyHoSo, setMaDuThaoXuLyHoSo, DuThaoXuLyHoSoModalVisible, setDuThaoXuLyHoSoModalVisible,
    }}>
        {children}
    </DuThaoXuLyHoSoContext.Provider>
}