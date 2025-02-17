import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoToiHanContext = createContext<IHoSoToiHanContext | null>(null)

export interface IHoSoToiHanContext {
    
}

export const useHoSoToiHanContext = () => {
    const context = useContext(HoSoToiHanContext)
    if (!context)
        throw new Error("HoSoToiHanContext must be used inside HoSoToiHanContext.Provider")
    return context
}

export const HoSoToiHanProvider = ({ children }: IWithChildren) => {
  
    return <HoSoToiHanContext.Provider value={{
        
    }}>
        {children}
    </HoSoToiHanContext.Provider>
}