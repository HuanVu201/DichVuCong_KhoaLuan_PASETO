import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoTraTrucTuyenContext = createContext<IChoTraTrucTuyenContext | null>(null)

export interface IChoTraTrucTuyenContext {
    
}

export const useChoTraTrucTuyenContext = () => {
    const context = useContext(ChoTraTrucTuyenContext)
    if (!context)
        throw new Error("ChoTraTrucTuyenContext must be used inside ChoTraTrucTuyenContext.Provider")
    return context
}

export const ChoTraTrucTuyenProvider = ({ children }: IWithChildren) => {
  
    return <ChoTraTrucTuyenContext.Provider value={{
        
    }}>
        {children}
    </ChoTraTrucTuyenContext.Provider>
}