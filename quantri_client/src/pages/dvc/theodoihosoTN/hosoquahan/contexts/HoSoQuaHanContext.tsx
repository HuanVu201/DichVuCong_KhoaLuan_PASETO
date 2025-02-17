import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoQuaHanContext = createContext<IHoSoQuaHanContext | null>(null)

export interface IHoSoQuaHanContext {
    
}

export const useHoSoQuaHanContext = () => {
    const context = useContext(HoSoQuaHanContext)
    if (!context)
        throw new Error("HoSoQuaHanContext must be used inside HoSoQuaHanContext.Provider")
    return context
}

export const HoSoQuaHanProvider = ({ children }: IWithChildren) => {
  
    return <HoSoQuaHanContext.Provider value={{
        
    }}>
        {children}
    </HoSoQuaHanContext.Provider>
}