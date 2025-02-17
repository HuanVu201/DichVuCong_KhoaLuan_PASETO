import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoTraBCCIContext = createContext<IChoTraBCCIContext | null>(null)

export interface IChoTraBCCIContext {
    
}

export const useChoTraBCCIContext = () => {
    const context = useContext(ChoTraBCCIContext)
    if (!context)
        throw new Error("ChoTraBCCIContext must be used inside ChoTraBCCIContext.Provider")
    return context
}

export const ChoTraBCCIProvider = ({ children }: IWithChildren) => {
  
    return <ChoTraBCCIContext.Provider value={{
        
    }}>
        {children}
    </ChoTraBCCIContext.Provider>
}