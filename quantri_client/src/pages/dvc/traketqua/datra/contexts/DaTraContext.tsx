import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaTraContext = createContext<IDaTraContext | null>(null)

export interface IDaTraContext {
    
}

export const useDaTraContext = () => {
    const context = useContext(DaTraContext)
    if (!context)
        throw new Error("DaTraContext must be used inside DaTraContext.Provider")
    return context
}

export const DaTraProvider = ({ children }: IWithChildren) => {
  
    return <DaTraContext.Provider value={{
        
    }}>
        {children}
    </DaTraContext.Provider>
}