import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const CaNhanHoaContext = createContext<ICaNhanHoaContext | null>(null)

export interface ICaNhanHoaContext {
    CaNhanHoaId: string | undefined;
    setCaNhanHoaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    CaNhanHoaModalVisible: boolean;
    setCaNhanHoaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCaNhanHoaContext = () => {
    const context = useContext(CaNhanHoaContext)
    if (!context)
        throw new Error("CaNhanHoaContext must be used inside CaNhanHoaContext.Provider")
    return context
}

export const CaNhanHoaProvider = ({ children }: IWithChildren) => {
    const [CaNhanHoaId, setCaNhanHoaId] = useState<string>()
    const [CaNhanHoaModalVisible, setCaNhanHoaModalVisible] = useState<boolean>(false)
    return <CaNhanHoaContext.Provider value={{
        CaNhanHoaId, setCaNhanHoaId,
        CaNhanHoaModalVisible, setCaNhanHoaModalVisible
    }}>
        {children}
    </CaNhanHoaContext.Provider>
}