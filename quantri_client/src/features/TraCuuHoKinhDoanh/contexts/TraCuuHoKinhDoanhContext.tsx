import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TraCuuHoKinhDoanhContext = createContext<ITraCuuHoKinhDoanhContext | null>(null)

export interface ITraCuuHoKinhDoanhContext{
    traCuuHoKinhDoanhId: string | undefined;
    setTraCuuHoKinhDoanhId: React.Dispatch<React.SetStateAction<string | undefined>>;
    traCuuHoKinhDoanhModalVisible: boolean;
    setTraCuuHoKinhDoanhModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    List_TypeOfProc_MgrModalVisible: boolean;
    setList_TypeOfProc_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTraCuuHoKinhDoanhContext = () => {
    const context = useContext(TraCuuHoKinhDoanhContext)
    if(!context)
        throw new Error("TraCuuHoKinhDoanhContext must be used inside TraCuuHoKinhDoanhContext.Provider")
    return context
}

export const TraCuuHoKinhDoanhProvider = ({children}: IWithChildren) => {
    const [traCuuHoKinhDoanhId, setTraCuuHoKinhDoanhId] = useState<string>()
    const [traCuuHoKinhDoanhModalVisible, setTraCuuHoKinhDoanhModalVisible] = useState<boolean>(false)
    const [List_TypeOfProc_MgrModalVisible, setList_TypeOfProc_MgrModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TraCuuHoKinhDoanhContext.Provider value={{traCuuHoKinhDoanhId, setTraCuuHoKinhDoanhId, traCuuHoKinhDoanhModalVisible, setTraCuuHoKinhDoanhModalVisible,List_TypeOfProc_MgrModalVisible,setList_TypeOfProc_MgrModalVisible}}>
        {children}
    </TraCuuHoKinhDoanhContext.Provider> 
}