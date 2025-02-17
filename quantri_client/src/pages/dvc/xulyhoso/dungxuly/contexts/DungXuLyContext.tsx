import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DungXuLyContext = createContext<IDungXuLyContext | null>(null)

export interface IDungXuLyContext {
    
}

export const useDungXuLyContext = () => {
    const context = useContext(DungXuLyContext)
    if (!context)
        throw new Error("DungXuLyContext must be used inside DungXuLyContext.Provider")
    return context
}

export const DungXuLyProvider = ({ children }: IWithChildren) => {
  
    return <DungXuLyContext.Provider value={{
        
    }}>
        {children}
    </DungXuLyContext.Provider>
}