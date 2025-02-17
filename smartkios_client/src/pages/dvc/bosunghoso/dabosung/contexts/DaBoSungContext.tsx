import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaBoSungContext = createContext<IDaBoSungContext | null>(null)

export interface IDaBoSungContext {
    
}

export const useDaBoSungContext = () => {
    const context = useContext(DaBoSungContext)
    if (!context)
        throw new Error("DaBoSungContext must be used inside DaBoSungContext.Provider")
    return context
}

export const DaBoSungProvider = ({ children }: IWithChildren) => {
  
    return <DaBoSungContext.Provider value={{
        
    }}>
        {children}
    </DaBoSungContext.Provider>
}