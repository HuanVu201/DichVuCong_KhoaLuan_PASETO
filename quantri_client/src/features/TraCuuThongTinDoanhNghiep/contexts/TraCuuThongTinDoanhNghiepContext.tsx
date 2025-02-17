import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TraCuuThongTinDoanhNghiepContext = createContext<ITraCuuThongTinDoanhNghiepContext | null>(null)

export interface ITraCuuThongTinDoanhNghiepContext{
    traCuuThongTinDoanhNghiepId: string | undefined;
    setTraCuuThongTinDoanhNghiepId: React.Dispatch<React.SetStateAction<string | undefined>>;
    traCuuThongTinDoanhNghiepModalVisible: boolean;
    setTraCuuThongTinDoanhNghiepModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    List_TypeOfProc_MgrModalVisible: boolean;
    setList_TypeOfProc_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTraCuuThongTinDoanhNghiepContext = () => {
    const context = useContext(TraCuuThongTinDoanhNghiepContext)
    if(!context)
        throw new Error("TraCuuThongTinDoanhNghiepContext must be used inside TraCuuThongTinDoanhNghiepContext.Provider")
    return context
}

export const TraCuuThongTinDoanhNghiepProvider = ({children}: IWithChildren) => {
    const [traCuuThongTinDoanhNghiepId, setTraCuuThongTinDoanhNghiepId] = useState<string>()
    const [traCuuThongTinDoanhNghiepModalVisible, setTraCuuThongTinDoanhNghiepModalVisible] = useState<boolean>(false)
    const [List_TypeOfProc_MgrModalVisible, setList_TypeOfProc_MgrModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TraCuuThongTinDoanhNghiepContext.Provider value={{traCuuThongTinDoanhNghiepId, setTraCuuThongTinDoanhNghiepId, traCuuThongTinDoanhNghiepModalVisible, setTraCuuThongTinDoanhNghiepModalVisible,List_TypeOfProc_MgrModalVisible,setList_TypeOfProc_MgrModalVisible}}>
        {children}
    </TraCuuThongTinDoanhNghiepContext.Provider> 
}