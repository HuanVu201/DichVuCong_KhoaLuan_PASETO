import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const LeftSideChuyenDLtkContext = createContext<ILeftSideChuyenDLtkContext | null>(null)

export interface ILeftSideChuyenDLtkContext{
    LeftSideChuyenDLtkId: string | undefined;
    setLeftSideChuyenDLtkId: React.Dispatch<React.SetStateAction<string | undefined>>;

    LeftSideChuyenDLtkModalVisible: boolean;
    setLeftSideChuyenDLtkModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLeftSideChuyenDLtkContext = () => {
    const context = useContext(LeftSideChuyenDLtkContext)
    if(!context)
        throw new Error("LeftSideChuyenDLtkContext must be used inside LeftSideChuyenDLtkContext.Provider")
    return context
}

export const LeftSideChuyenDLtkProvider = ({children}: IWithChildren) => {
    const [LeftSideChuyenDLtkId, setLeftSideChuyenDLtkId] = useState<string>()
    const [LeftSideChuyenDLtkModalVisible, setLeftSideChuyenDLtkModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <LeftSideChuyenDLtkContext.Provider value={{LeftSideChuyenDLtkId, setLeftSideChuyenDLtkId, LeftSideChuyenDLtkModalVisible, setLeftSideChuyenDLtkModalVisible}}>
        {children}
    </LeftSideChuyenDLtkContext.Provider> 
}