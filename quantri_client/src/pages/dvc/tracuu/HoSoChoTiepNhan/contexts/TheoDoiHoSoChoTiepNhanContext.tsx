import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TheoDoiHoSoChoTiepNhanContext = createContext<ITheoDoiHoSoChoTiepNhanContext | null>(null)

export interface ITheoDoiHoSoChoTiepNhanContext {
    
}

export const useTheoDoiHoSoChoTiepNhanContext = () => {
    const context = useContext(TheoDoiHoSoChoTiepNhanContext)
    if (!context)
        throw new Error("TheoDoiHoSoChoTiepNhanContext must be used inside TheoDoiHoSoChoTiepNhanContext.Provider")
    return context
}

export const TheoDoiHoSoChoTiepNhanProvider = ({ children }: IWithChildren) => {
  
    return <TheoDoiHoSoChoTiepNhanContext.Provider value={{
        
    }}>
        {children}
    </TheoDoiHoSoChoTiepNhanContext.Provider>
}