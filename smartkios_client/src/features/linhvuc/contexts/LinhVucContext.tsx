import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const LinhVucContext = createContext<ILinhVucContext | null>(null)

export interface ILinhVucContext{
    linhVucId: string | undefined;
    setLinhVucId: React.Dispatch<React.SetStateAction<string | undefined>>;
    linhVucModalVisible: boolean;
    setLinhVucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLinhVucContext = () => {
    const context = useContext(LinhVucContext)
    if(!context)
        throw new Error("LinhVucContext must be used inside LinhVucContext.Provider")
    return context
}

export const LinhVucProvider = ({children}: IWithChildren) => {
    const [linhVucId, setLinhVucId] = useState<string>()
    const [linhVucModalVisible, setLinhVucModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <LinhVucContext.Provider value={{linhVucId, setLinhVucId, linhVucModalVisible, setLinhVucModalVisible}}>
        {children}
    </LinhVucContext.Provider> 
}