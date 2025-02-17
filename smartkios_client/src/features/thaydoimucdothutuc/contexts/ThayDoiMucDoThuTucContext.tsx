import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ThayDoiMucDoThuTucContext = createContext<IThayDoiMucDoThuTucContext | null>(null)

export interface IThayDoiMucDoThuTucContext {
    maThayDoiMucDoThuTuc: string | undefined;
    setMaThayDoiMucDoThuTuc: React.Dispatch<React.SetStateAction<string | undefined>>;
    ThayDoiMucDoThuTucModalVisible: boolean;
    setThayDoiMucDoThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useThayDoiMucDoThuTucContext = () => {
    const context = useContext(ThayDoiMucDoThuTucContext)
    if (!context)
        throw new Error("ThayDoiMucDoThuTucContext must be used inside ThayDoiMucDoThuTucContext.Provider")
    return context
}

export const ThayDoiMucDoThuTucProvider = ({ children }: IWithChildren) => {
    const [maThayDoiMucDoThuTuc, setMaThayDoiMucDoThuTuc] = useState<string>()
    const [ThayDoiMucDoThuTucModalVisible, setThayDoiMucDoThuTucModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ThayDoiMucDoThuTucContext.Provider value={{
        maThayDoiMucDoThuTuc, setMaThayDoiMucDoThuTuc, ThayDoiMucDoThuTucModalVisible, setThayDoiMucDoThuTucModalVisible,
    }}>
        {children}
    </ThayDoiMucDoThuTucContext.Provider>
}