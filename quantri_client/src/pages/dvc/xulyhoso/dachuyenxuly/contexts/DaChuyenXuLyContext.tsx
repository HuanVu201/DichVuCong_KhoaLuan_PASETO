import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaChuyenXuLyContext = createContext<IDaChuyenXuLyContext | null>(null)

export interface IDaChuyenXuLyContext {
    
}

export const useDaChuyenXuLyContext = () => {
    const context = useContext(DaChuyenXuLyContext)
    if (!context)
        throw new Error("DaChuyenXuLyContext must be used inside DaChuyenXuLyContext.Provider")
    return context
}

export const DaChuyenXuLyProvider = ({ children }: IWithChildren) => {
  
    return <DaChuyenXuLyContext.Provider value={{
        
    }}>
        {children}
    </DaChuyenXuLyContext.Provider>
}