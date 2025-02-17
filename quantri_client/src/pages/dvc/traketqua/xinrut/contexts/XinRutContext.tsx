import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const XinRutContext = createContext<IXinRutContext | null>(null)

export interface IXinRutContext {
    
}

export const useXinRutContext = () => {
    const context = useContext(XinRutContext)
    if (!context)
        throw new Error("XinRutContext must be used inside XinRutContext.Provider")
    return context
}

export const XinRutProvider = ({ children }: IWithChildren) => {
  
    return <XinRutContext.Provider value={{
        
    }}>
        {children}
    </XinRutContext.Provider>
}