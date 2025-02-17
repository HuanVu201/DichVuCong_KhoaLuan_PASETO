import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoTraLaiXinRutContext = createContext<IHoSoTraLaiXinRutContext | null>(null)

export interface IHoSoTraLaiXinRutContext {
    
}

export const useHoSoTraLaiXinRutContext = () => {
    const context = useContext(HoSoTraLaiXinRutContext)
    if (!context)
        throw new Error("HoSoTraLaiXinRutContext must be used inside HoSoTraLaiXinRutContext.Provider")
    return context
}

export const HoSoTraLaiXinRutProvider = ({ children }: IWithChildren) => {
  
    return <HoSoTraLaiXinRutContext.Provider value={{
        
    }}>
        {children}
    </HoSoTraLaiXinRutContext.Provider>
}