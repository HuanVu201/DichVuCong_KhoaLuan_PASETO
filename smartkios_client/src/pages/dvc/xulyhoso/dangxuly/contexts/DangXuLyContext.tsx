import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DangXuLyContext = createContext<IDangXuLyContext | null>(null)

export interface IDangXuLyContext {
    
}

export const useDangXuLyContext = () => {
    const context = useContext(DangXuLyContext)
    if (!context)
        throw new Error("DangXuLyContext must be used inside DangXuLyContext.Provider")
    return context
}

export const DangXuLyProvider = ({ children }: IWithChildren) => {
  
    return <DangXuLyContext.Provider value={{
        
    }}>
        {children}
    </DangXuLyContext.Provider>
}