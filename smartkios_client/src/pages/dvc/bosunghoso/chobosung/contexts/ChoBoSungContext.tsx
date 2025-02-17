import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoBoSungContext = createContext<IChoBoSungContext | null>(null)

export interface IChoBoSungContext {
    
}

export const useChoBoSungContext = () => {
    const context = useContext(ChoBoSungContext)
    if (!context)
        throw new Error("ChoBoSungContext must be used inside ChoBoSungContext.Provider")
    return context
}

export const ChoBoSungProvider = ({ children }: IWithChildren) => {
  
    return <ChoBoSungContext.Provider value={{
        
    }}>
        {children}
    </ChoBoSungContext.Provider>
}