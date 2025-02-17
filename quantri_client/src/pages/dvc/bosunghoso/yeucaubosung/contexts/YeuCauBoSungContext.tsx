import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const YeuCauBoSungContext = createContext<IYeuCauBoSungContext | null>(null)

export interface IYeuCauBoSungContext {
    
}

export const useYeuCauBoSungContext = () => {
    const context = useContext(YeuCauBoSungContext)
    if (!context)
        throw new Error("YeuCauBoSungContext must be used inside YeuCauBoSungContext.Provider")
    return context
}

export const YeuCauBoSungProvider = ({ children }: IWithChildren) => {
  
    return <YeuCauBoSungContext.Provider value={{
        
    }}>
        {children}
    </YeuCauBoSungContext.Provider>
}