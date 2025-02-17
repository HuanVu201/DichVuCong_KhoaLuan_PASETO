import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaChuyenCoKetQuaContext = createContext<IDaChuyenCoKetQuaContext | null>(null)

export interface IDaChuyenCoKetQuaContext {
    
}

export const useDaChuyenCoKetQuaContext = () => {
    const context = useContext(DaChuyenCoKetQuaContext)
    if (!context)
        throw new Error("DaChuyenCoKetQuaContext must be used inside DaChuyenCoKetQuaContext.Provider")
    return context
}

export const DaChuyenCoKetQuaProvider = ({ children }: IWithChildren) => {
  
    return <DaChuyenCoKetQuaContext.Provider value={{
        
    }}>
        {children}
    </DaChuyenCoKetQuaContext.Provider>
}