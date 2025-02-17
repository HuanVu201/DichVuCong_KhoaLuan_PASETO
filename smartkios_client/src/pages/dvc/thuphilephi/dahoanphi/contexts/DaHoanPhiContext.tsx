import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaHoanPhiContext = createContext<IDaHoanPhiContext | null>(null)

export interface IDaHoanPhiContext {
    
}

export const useDaHoanPhiContext = () => {
    const context = useContext(DaHoanPhiContext)
    if (!context)
        throw new Error("DaHoanPhiContext must be used inside DaHoanPhiContext.Provider")
    return context
}

export const DaHoanPhiProvider = ({ children }: IWithChildren) => {
  
    return <DaHoanPhiContext.Provider value={{
        
    }}>
        {children}
    </DaHoanPhiContext.Provider>
}