import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ThanhPhanThuTucContext = createContext<IThanhPhanThuTucContext | null>(null)

export interface IThanhPhanThuTucContext{
    thanhPhanThuTucId: string | undefined;
    setThanhPhanThuTucId: React.Dispatch<React.SetStateAction<string | undefined>>;
    thanhPhanThuTucModalVisible: boolean;
    setThanhPhanThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useThanhPhanThuTucContext = () => {
    const context = useContext(ThanhPhanThuTucContext)
    if(!context)
        throw new Error("ThanhPhanThuTucContext must be used inside ThanhPhanThuTucContext.Provider")
    return context
}

export const ThanhPhanThuTucProvider = ({children}: IWithChildren) => {
    const [thanhPhanThuTucId, setThanhPhanThuTucId] = useState<string>()
    const [thanhPhanThuTucModalVisible, setThanhPhanThuTucModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ThanhPhanThuTucContext.Provider value={{thanhPhanThuTucId, setThanhPhanThuTucId, thanhPhanThuTucModalVisible, setThanhPhanThuTucModalVisible}}>
        {children}
    </ThanhPhanThuTucContext.Provider> 
}