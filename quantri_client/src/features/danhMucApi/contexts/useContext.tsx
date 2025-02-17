import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DanhMucApiContext = createContext<IDanhMucApiContext | null>(null)

export interface IDanhMucApiContext {
    danhMucApiId: string | undefined;
    setDanhMucApiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMucApiModalVisible: boolean;
    setDanhMucApiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMucApiContext = () => {
    const context = useContext(DanhMucApiContext)
    if (!context)
        throw new Error("DanhMucApiContext must be used inside DanhMucApiContext.Provider")
    return context
}

export const DanhMucApiProvider = ({ children }: IWithChildren) => {
    const [danhMucApiId, setDanhMucApiId] = useState<string>()
    const [danhMucApiModalVisible, setDanhMucApiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMucApiContext.Provider value={{
        danhMucApiId, setDanhMucApiId,
        danhMucApiModalVisible, setDanhMucApiModalVisible
    }}>
        {children}
    </DanhMucApiContext.Provider>
}