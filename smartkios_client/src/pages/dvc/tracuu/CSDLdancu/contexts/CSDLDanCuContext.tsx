import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const CSDLDanCuContext = createContext<ICSDLDanCuContext | null>(null)

export interface ICSDLDanCuContext {
    
}

export const useCSDLDanCuContext = () => {
    const context = useContext(CSDLDanCuContext)
    if (!context)
        throw new Error("CSDLDanCuContext must be used inside CSDLDanCuContext.Provider")
    return context
}

export const CSDLDanCuProvider = ({ children }: IWithChildren) => {
  
    return <CSDLDanCuContext.Provider value={{
        
    }}>
        {children}
    </CSDLDanCuContext.Provider>
}