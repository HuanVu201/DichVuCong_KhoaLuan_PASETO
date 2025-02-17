import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const MauPhoiContext = createContext<IMauPhoiContext | null>(null)

export interface IMauPhoiContext{
    MauPhoiId: string | undefined;
    setMauPhoiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    MauPhoiModalVisible: boolean;
    setMauPhoiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMauPhoiContext = () => {
    const context = useContext(MauPhoiContext)
    if(!context)
        throw new Error("MauPhoiContext must be used inside MauPhoiContext.Provider")
    return context
}

export const MauPhoiProvider = ({children}: IWithChildren) => {
    const [MauPhoiId, setMauPhoiId] = useState<string>()
    const [MauPhoiModalVisible, setMauPhoiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <MauPhoiContext.Provider value={{MauPhoiId, setMauPhoiId, MauPhoiModalVisible, setMauPhoiModalVisible}}>
        {children}
    </MauPhoiContext.Provider> 
}