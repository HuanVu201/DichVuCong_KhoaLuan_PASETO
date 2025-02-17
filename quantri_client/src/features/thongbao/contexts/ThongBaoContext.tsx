import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ThongBaoContext = createContext<IThongBaoContext | null>(null)

export interface IThongBaoContext{
    ThongBaoId: string | undefined;
    setThongBaoId: React.Dispatch<React.SetStateAction<string | undefined>>;
    ThongBaoModalVisible: boolean;
    setThongBaoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useThongBaoContext = () => {
    const context = useContext(ThongBaoContext)
    if(!context)
        throw new Error("ThongBaoContext must be used inside ThongBaoContext.Provider")
    return context
}

export const ThongBaoProvider = ({children}: IWithChildren) => {
    const [ThongBaoId, setThongBaoId] = useState<string>()
    const [ThongBaoModalVisible, setThongBaoModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ThongBaoContext.Provider value={{ThongBaoId, setThongBaoId, ThongBaoModalVisible, setThongBaoModalVisible}}>
        {children}
    </ThongBaoContext.Provider> 
}