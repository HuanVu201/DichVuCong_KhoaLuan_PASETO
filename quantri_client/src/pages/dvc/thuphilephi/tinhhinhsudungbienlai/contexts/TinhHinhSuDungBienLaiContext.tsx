import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TinhHinhSuDungBienLaiContext = createContext<ITinhHinhSuDungBienLaiContext | null>(null)

export interface ITinhHinhSuDungBienLaiContext {
    
}

export const useTinhHinhSuDungBienLaiContext = () => {
    const context = useContext(TinhHinhSuDungBienLaiContext)
    if (!context)
        throw new Error("TinhHinhSuDungBienLaiContext must be used inside TinhHinhSuDungBienLaiContext.Provider")
    return context
}

export const TinhHinhSuDungBienLaiProvider = ({ children }: IWithChildren) => {
  
    return <TinhHinhSuDungBienLaiContext.Provider value={{
        
    }}>
        {children}
    </TinhHinhSuDungBienLaiContext.Provider>
}