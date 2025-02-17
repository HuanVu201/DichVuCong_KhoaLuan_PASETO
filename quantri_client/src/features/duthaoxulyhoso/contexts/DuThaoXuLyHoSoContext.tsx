import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DuThaoXuLyHoSoContext = createContext<IDuThaoXuLyHoSoContext | null>(null)

export interface IDuThaoXuLyHoSoContext {
    duThaoId: string | undefined;
    setDuThaoId: React.Dispatch<React.SetStateAction<string | undefined>>;
    duThaoXuLyHoSoModalVisible: boolean;
    setDuThaoXuLyHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDuThaoXuLyHoSoContext = () => {
    const context = useContext(DuThaoXuLyHoSoContext)
    if (!context)
        throw new Error("DuThaoXuLyHoSoContext must be used inside DuThaoXuLyHoSoContext.Provider")
    return context
}

export const DuThaoXuLyHoSoProvider = ({ children }: IWithChildren) => {
    const [duThaoId, setDuThaoId] = useState<string>()
    const [duThaoXuLyHoSoModalVisible, setDuThaoXuLyHoSoModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DuThaoXuLyHoSoContext.Provider value={{
        duThaoId, setDuThaoId, duThaoXuLyHoSoModalVisible, setDuThaoXuLyHoSoModalVisible,
    }}>
        {children}
    </DuThaoXuLyHoSoContext.Provider>
}