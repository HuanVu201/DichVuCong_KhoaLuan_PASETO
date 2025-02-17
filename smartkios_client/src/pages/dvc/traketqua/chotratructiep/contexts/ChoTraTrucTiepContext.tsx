import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoTraTrucTiepContext = createContext<IChoTraTrucTiepContext | null>(null)

export interface IChoTraTrucTiepContext {
    
}

export const useChoTraTrucTiepContext = () => {
    const context = useContext(ChoTraTrucTiepContext)
    if (!context)
        throw new Error("ChoTraTrucTiepContext must be used inside ChoTraTrucTiepContext.Provider")
    return context
}

export const ChoTraTrucTiepProvider = ({ children }: IWithChildren) => {
  
    return <ChoTraTrucTiepContext.Provider value={{
        
    }}>
        {children}
    </ChoTraTrucTiepContext.Provider>
}