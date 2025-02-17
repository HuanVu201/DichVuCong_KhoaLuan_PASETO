import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TraCuuHoSoSoHoaContext = createContext<ITraCuuHoSoSoHoaContext | null>(null)

export interface ITraCuuHoSoSoHoaContext {

}

export const useTraCuuHoSoSoHoaContext = () => {
    const context = useContext(TraCuuHoSoSoHoaContext)
    if (!context)
        throw new Error("TraCuuHoSoSoHoaContext must be used inside TraCuuHoSoSoHoaContext.Provider")
    return context
}

export const TraCuuHoSoSoHoaProvider = ({ children }: IWithChildren) => {

    return <TraCuuHoSoSoHoaContext.Provider value={{

    }}>
        {children}
    </TraCuuHoSoSoHoaContext.Provider>
}