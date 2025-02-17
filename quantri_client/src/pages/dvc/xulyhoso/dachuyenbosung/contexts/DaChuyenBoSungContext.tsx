import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaChuyenBoSungContext = createContext<IDaChuyenBoSungContext | null>(null)

export interface IDaChuyenBoSungContext {
    
}

export const useDaChuyenBoSungContext = () => {
    const context = useContext(DaChuyenBoSungContext)
    if (!context)
        throw new Error("DaChuyenBoSungContext must be used inside DaChuyenBoSungContext.Provider")
    return context
}

export const DaChuyenBoSungProvider = ({ children }: IWithChildren) => {
  
    return <DaChuyenBoSungContext.Provider value={{
        
    }}>
        {children}
    </DaChuyenBoSungContext.Provider>
}