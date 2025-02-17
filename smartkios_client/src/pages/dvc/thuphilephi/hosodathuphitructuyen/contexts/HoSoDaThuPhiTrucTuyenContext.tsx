import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoDaThuPhiTrucTuyenContext = createContext<IHoSoDaThuPhiTrucTuyenContext | null>(null)

export interface IHoSoDaThuPhiTrucTuyenContext {
    
}

export const useHoSoDaThuPhiTrucTuyenContext = () => {
    const context = useContext(HoSoDaThuPhiTrucTuyenContext)
    if (!context)
        throw new Error("HoSoDaThuPhiTrucTuyenContext must be used inside HoSoDaThuPhiTrucTuyenContext.Provider")
    return context
}

export const HoSoDaThuPhiTrucTuyenProvider = ({ children }: IWithChildren) => {
  
    return <HoSoDaThuPhiTrucTuyenContext.Provider value={{
        
    }}>
        {children}
    </HoSoDaThuPhiTrucTuyenContext.Provider>
}