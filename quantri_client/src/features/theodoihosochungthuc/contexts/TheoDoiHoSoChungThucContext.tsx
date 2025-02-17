import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TheoDoiHoSoChungThucContext = createContext<ITheoDoiHoSoChungThucContext | null>(null)

export interface ITheoDoiHoSoChungThucContext{
    TheoDoiHoSoChungThucId: string | undefined;
    setTheoDoiHoSoChungThucId: React.Dispatch<React.SetStateAction<string | undefined>>;
    TheoDoiHoSoChungThucModalVisible: boolean;
    setTheoDoiHoSoChungThucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTheoDoiHoSoChungThucContext = () => {
    const context = useContext(TheoDoiHoSoChungThucContext)
    if(!context)
        throw new Error("TheoDoiHoSoChungThucContext must be used inside TheoDoiHoSoChungThucContext.Provider")
    return context
}

export const TheoDoiHoSoChungThucProvider = ({children}: IWithChildren) => {
    const [TheoDoiHoSoChungThucId, setTheoDoiHoSoChungThucId] = useState<string>()
    const [TheoDoiHoSoChungThucModalVisible, setTheoDoiHoSoChungThucModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TheoDoiHoSoChungThucContext.Provider value={{TheoDoiHoSoChungThucId, setTheoDoiHoSoChungThucId, TheoDoiHoSoChungThucModalVisible, setTheoDoiHoSoChungThucModalVisible}}>
        {children}
    </TheoDoiHoSoChungThucContext.Provider> 
}