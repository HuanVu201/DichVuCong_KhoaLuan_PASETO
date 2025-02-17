import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const LogThongKeDGHLCongDanContext = createContext<ILogThongKeDGHLCongDanContext | null>(null)

export interface ILogThongKeDGHLCongDanContext{
    LogThongKeDGHLCongDanId: string | undefined;
    setLogThongKeDGHLCongDanId: React.Dispatch<React.SetStateAction<string | undefined>>;
    LogThongKeDGHLCongDanModalVisible: boolean;
    setLogThongKeDGHLCongDanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLogThongKeDGHLCongDanContext = () => {
    const context = useContext(LogThongKeDGHLCongDanContext)
    if(!context)
        throw new Error("LogThongKeDGHLCongDanContext must be used inside LogThongKeDGHLCongDanContext.Provider")
    return context
}

export const LogThongKeDGHLCongDanProvider = ({children}: IWithChildren) => {
    const [LogThongKeDGHLCongDanId, setLogThongKeDGHLCongDanId] = useState<string>()
    const [LogThongKeDGHLCongDanModalVisible, setLogThongKeDGHLCongDanModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <LogThongKeDGHLCongDanContext.Provider value={{LogThongKeDGHLCongDanId, setLogThongKeDGHLCongDanId, LogThongKeDGHLCongDanModalVisible, setLogThongKeDGHLCongDanModalVisible}}>
        {children}
    </LogThongKeDGHLCongDanContext.Provider> 
}