import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TheoDoiHoSoTNContext = createContext<ITheoDoiHoSoTNContext | null>(null)

export interface ITheoDoiHoSoTNContext{
    TheoDoiHoSoTNId: string | undefined;
    setTheoDoiHoSoTNId: React.Dispatch<React.SetStateAction<string | undefined>>;
    detailTheoDoiHoSoTNModalVisible: boolean;
    setDetailTheoDoiHoSoTNModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTheoDoiHoSoTNContext = () => {
    const context = useContext(TheoDoiHoSoTNContext)
    if(!context)
        throw new Error("TheoDoiHoSoTNContext must be used inside TheoDoiHoSoTNContext.Provider")
    return context
}

export const TheoDoiHoSoTNProvider = ({children}: IWithChildren) => {
    const [TheoDoiHoSoTNId, setTheoDoiHoSoTNId] = useState<string>()
    const [detailTheoDoiHoSoTNModalVisible, setDetailTheoDoiHoSoTNModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TheoDoiHoSoTNContext.Provider value={{TheoDoiHoSoTNId, setTheoDoiHoSoTNId, detailTheoDoiHoSoTNModalVisible, setDetailTheoDoiHoSoTNModalVisible}}>
        {children}
    </TheoDoiHoSoTNContext.Provider> 
}