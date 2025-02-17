import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const MauPhoiCNHContext = createContext<IMauPhoiCNHContext | null>(null)

export interface IMauPhoiCNHContext {
    mauPhoiCNHId: string | undefined;
    setMauPhoiCNHId: React.Dispatch<React.SetStateAction<string | undefined>>;
    mauPhoiCNHModalVisible: boolean;
    setMauPhoiCNHModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMauPhoiCNHContext = () => {
    const context = useContext(MauPhoiCNHContext)
    if (!context)
        throw new Error("MauPhoiCNHContext must be used inside MauPhoiCNHContext.Provider")
    return context
}

export const MauPhoiCNHProvider = ({ children }: IWithChildren) => {
    const [mauPhoiCNHId, setMauPhoiCNHId] = useState<string>()
    const [mauPhoiCNHModalVisible, setMauPhoiCNHModalVisible] = useState<boolean>(false)
    return <MauPhoiCNHContext.Provider value={{
        mauPhoiCNHId, setMauPhoiCNHId,
        mauPhoiCNHModalVisible, setMauPhoiCNHModalVisible
    }}>
        {children}
    </MauPhoiCNHContext.Provider>
}