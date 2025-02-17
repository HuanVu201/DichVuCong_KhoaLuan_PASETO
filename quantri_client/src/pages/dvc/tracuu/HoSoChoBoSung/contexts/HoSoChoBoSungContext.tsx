import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoChoBoSungContext = createContext<IHoSoChoBoSungContext | null>(null)

export interface IHoSoChoBoSungContext {
    
}

export const useHoSoChoBoSungContext = () => {
    const context = useContext(HoSoChoBoSungContext)
    if (!context)
        throw new Error("HoSoChoBoSungContext must be used inside HoSoChoBoSungContext.Provider")
    return context
}

export const HoSoChoBoSungProvider = ({ children }: IWithChildren) => {
  
    return <HoSoChoBoSungContext.Provider value={{
        
    }}>
        {children}
    </HoSoChoBoSungContext.Provider>
}