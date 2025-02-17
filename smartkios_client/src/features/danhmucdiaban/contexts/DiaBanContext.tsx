import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DiaBanContext = createContext<IDiaBanContext | null>(null)

export interface IDiaBanContext{
    DiaBanId: string | undefined;
    setDiaBanId: React.Dispatch<React.SetStateAction<string | undefined>>;
    DiaBanModalVisible: boolean;
    setDiaBanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDiaBanContext = () => {
    const context = useContext(DiaBanContext)
    if(!context)
        throw new Error("DiaBanContext must be used inside DiaBanContext.Provider")
    return context
}

export const DiaBanProvider = ({children}: IWithChildren) => {
    const [DiaBanId, setDiaBanId] = useState<string>()
    const [DiaBanModalVisible, setDiaBanModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DiaBanContext.Provider value={{DiaBanId, setDiaBanId, DiaBanModalVisible, setDiaBanModalVisible}}>
        {children}
    </DiaBanContext.Provider> 
}