import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DangXuLyLienThongContext = createContext<IDangXuLyLienThongContext | null>(null)

export interface IDangXuLyLienThongContext {
    
}

export const useDangXuLyLienThongLienThongContext = () => {
    const context = useContext(DangXuLyLienThongContext)
    if (!context)
        throw new Error("DangXuLyLienThongContext must be used inside DangXuLyLienThongContext.Provider")
    return context
}

export const DangXuLyLienThongProvider = ({ children }: IWithChildren) => {
  
    return <DangXuLyLienThongContext.Provider value={{
        
    }}>
        {children}
    </DangXuLyLienThongContext.Provider>
}