import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ThongKeDanhGiaHaiLongContext = createContext<IThongKeDanhGiaHaiLongContext | null>(null)

export interface IThongKeDanhGiaHaiLongContext{
    ThongKeDanhGiaHaiLongId: string | undefined;
    setThongKeDanhGiaHaiLongId: React.Dispatch<React.SetStateAction<string | undefined>>;
    ThongKeDanhGiaHaiLongModalVisible: boolean;
    setThongKeDanhGiaHaiLongModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useThongKeDanhGiaHaiLongContext = () => {
    const context = useContext(ThongKeDanhGiaHaiLongContext)
    if(!context)
        throw new Error("ThongKeDanhGiaHaiLongContext must be used inside ThongKeDanhGiaHaiLongContext.Provider")
    return context
}

export const ThongKeDanhGiaHaiLongProvider = ({children}: IWithChildren) => {
    const [ThongKeDanhGiaHaiLongId, setThongKeDanhGiaHaiLongId] = useState<string>()
    const [ThongKeDanhGiaHaiLongModalVisible, setThongKeDanhGiaHaiLongModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ThongKeDanhGiaHaiLongContext.Provider value={{ThongKeDanhGiaHaiLongId, setThongKeDanhGiaHaiLongId, ThongKeDanhGiaHaiLongModalVisible, setThongKeDanhGiaHaiLongModalVisible}}>
        {children}
    </ThongKeDanhGiaHaiLongContext.Provider> 
}