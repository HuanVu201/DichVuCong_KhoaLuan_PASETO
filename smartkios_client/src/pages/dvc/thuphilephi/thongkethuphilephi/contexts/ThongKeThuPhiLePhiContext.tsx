import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ThongKeThuPhiLePhiContext = createContext<IThongKeThuPhiLePhiContext | null>(null)

export interface IThongKeThuPhiLePhiContext {
    
}

export const useThongKeThuPhiLePhiContext = () => {
    const context = useContext(ThongKeThuPhiLePhiContext)
    if (!context)
        throw new Error("ThongKeThuPhiLePhiContext must be used inside ThongKeThuPhiLePhiContext.Provider")
    return context
}

export const ThongKeThuPhiLePhiProvider = ({ children }: IWithChildren) => {
  
    return <ThongKeThuPhiLePhiContext.Provider value={{
        
    }}>
        {children}
    </ThongKeThuPhiLePhiContext.Provider>
}