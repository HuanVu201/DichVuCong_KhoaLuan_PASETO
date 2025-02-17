import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoChoCanBoTraKetQuaContext = createContext<IHoSoChoCanBoTraKetQuaContext | null>(null)

export interface IHoSoChoCanBoTraKetQuaContext {
    
}

export const useHoSoChoCanBoTraKetQuaContext = () => {
    const context = useContext(HoSoChoCanBoTraKetQuaContext)
    if (!context)
        throw new Error("HoSoChoCanBoTraKetQuaContext must be used inside HoSoChoCanBoTraKetQuaContext.Provider")
    return context
}

export const HoSoChoCanBoTraKetQuaProvider = ({ children }: IWithChildren) => {
  
    return <HoSoChoCanBoTraKetQuaContext.Provider value={{
        
    }}>
        {children}
    </HoSoChoCanBoTraKetQuaContext.Provider>
}