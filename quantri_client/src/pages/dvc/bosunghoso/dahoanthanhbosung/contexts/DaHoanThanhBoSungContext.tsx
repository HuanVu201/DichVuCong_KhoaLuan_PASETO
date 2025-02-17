import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaHoanThanhBoSungContext = createContext<IDaHoanThanhBoSungContext | null>(null)

export interface IDaHoanThanhBoSungContext {
    
}

export const useDaHoanThanhBoSungContext = () => {
    const context = useContext(DaHoanThanhBoSungContext)
    if (!context)
        throw new Error("DaHoanThanhBoSungContext must be used inside DaHoanThanhBoSungContext.Provider")
    return context
}

export const DaHoanThanhBoSungProvider = ({ children }: IWithChildren) => {
  
    return <DaHoanThanhBoSungContext.Provider value={{
        
    }}>
        {children}
    </DaHoanThanhBoSungContext.Provider>
}