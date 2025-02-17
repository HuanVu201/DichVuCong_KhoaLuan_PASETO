import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TheoDoiTatCaHoSoContext = createContext<ITheoDoiTatCaHoSoContext | null>(null)

export interface ITheoDoiTatCaHoSoContext {
    
}

export const useTheoDoiTatCaHoSoContext = () => {
    const context = useContext(TheoDoiTatCaHoSoContext)
    if (!context)
        throw new Error("TheoDoiTatCaHoSoContext must be used inside TheoDoiTatCaHoSoContext.Provider")
    return context
}

export const TheoDoiTatCaHoSoProvider = ({ children }: IWithChildren) => {
  
    return <TheoDoiTatCaHoSoContext.Provider value={{
        
    }}>
        {children}
    </TheoDoiTatCaHoSoContext.Provider>
}