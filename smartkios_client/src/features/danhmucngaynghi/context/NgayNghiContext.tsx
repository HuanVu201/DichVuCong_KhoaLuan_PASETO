import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const NgayNghiContext = createContext<INgayNghiContext | null>(null)

export interface INgayNghiContext {
    ngayNghiId: string | undefined;
    setNgayNghiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    ngayNghiModalVisible: boolean;
    setNgayNghiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useNgayNghiContext = () => {
    const context = useContext(NgayNghiContext)
    if (!context)
        throw new Error("NgayNghiContext must be used inside NgayNghiContext.Provider")
    return context
}

export const NgayNghiProvider = ({ children }: IWithChildren) => {
    const [ngayNghiId, setNgayNghiId] = useState<string>()
    const [ngayNghiModalVisible, setNgayNghiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <NgayNghiContext.Provider value={{ ngayNghiId, setNgayNghiId, ngayNghiModalVisible, setNgayNghiModalVisible }}>
        {children}
    </NgayNghiContext.Provider>
}