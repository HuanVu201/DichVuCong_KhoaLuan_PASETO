import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMucNganhContext = createContext<IDanhMucNganhContext | null>(null)

export interface IDanhMucNganhContext{
    maDanhMucNganh: string | undefined;
    setMaDanhMucNganh: React.Dispatch<React.SetStateAction<string | undefined>>;
    maDanhMucNganhModalVisible: boolean;
    setMaDanhMucNganhModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMucNganhContext = () => {
    const context = useContext(DanhMucNganhContext)
    if(!context)
        throw new Error("DanhMucNganhContext must be used inside DanhMucNganhContext.Provider")
    return context
}

export const DanhMucNganhProvider = ({children}: IWithChildren) => {
    const [maDanhMucNganh, setMaDanhMucNganh] = useState<string>()
    const [maDanhMucNganhModalVisible, setMaDanhMucNganhModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMucNganhContext.Provider value={{maDanhMucNganh, setMaDanhMucNganh, maDanhMucNganhModalVisible, setMaDanhMucNganhModalVisible}}>
        {children}
    </DanhMucNganhContext.Provider> 
}