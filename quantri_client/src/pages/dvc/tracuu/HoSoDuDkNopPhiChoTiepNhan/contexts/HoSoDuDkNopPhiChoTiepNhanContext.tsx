import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoDuDkNopPhiChoTiepNhanContext = createContext<IHoSoDuDkNopPhiChoTiepNhanContext | null>(null)

export interface IHoSoDuDkNopPhiChoTiepNhanContext {
    
}

export const useHoSoDuDkNopPhiChoTiepNhanContext = () => {
    const context = useContext(HoSoDuDkNopPhiChoTiepNhanContext)
    if (!context)
        throw new Error("HoSoDuDkNopPhiChoTiepNhanContext must be used inside HoSoDuDkNopPhiChoTiepNhanContext.Provider")
    return context
}

export const HoSoDuDkNopPhiChoTiepNhanProvider = ({ children }: IWithChildren) => {
  
    return <HoSoDuDkNopPhiChoTiepNhanContext.Provider value={{
        
    }}>
        {children}
    </HoSoDuDkNopPhiChoTiepNhanContext.Provider>
}