import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TrangThaiContext = createContext<ITrangThaiContext | null>(null)

export interface ITrangThaiContext{
    maTrangThai: string | undefined;
    setMaTrangThai: React.Dispatch<React.SetStateAction<string | undefined>>;
    maTrangThaiModalVisible: boolean;
    setMaTrangThaiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTrangThaiContext = () => {
    const context = useContext(TrangThaiContext)
    if(!context)
        throw new Error("TrangThaiContext must be used inside TrangThaiContext.Provider")
    return context
}

export const TrangThaiProvider = ({children}: IWithChildren) => {
    const [maTrangThai, setMaTrangThai] = useState<string>()
    const [maTrangThaiModalVisible, setMaTrangThaiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TrangThaiContext.Provider value={{maTrangThai, setMaTrangThai, maTrangThaiModalVisible, setMaTrangThaiModalVisible}}>
        {children}
    </TrangThaiContext.Provider> 
}