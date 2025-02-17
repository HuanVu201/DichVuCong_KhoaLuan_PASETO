import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const BaoCaoMau01Context = createContext<IBaoCaoMau01Context | null>(null)

export interface IBaoCaoMau01Context{
    BaoCaoMau01Id: string | undefined;
    setBaoCaoMau01Id: React.Dispatch<React.SetStateAction<string | undefined>>;
    BaoCaoMau01ModalVisible: boolean;
    setBaoCaoMau01ModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useBaoCaoMau01Context = () => {
    const context = useContext(BaoCaoMau01Context)
    if(!context)
        throw new Error("BaoCaoMau01Context must be used inside BaoCaoMau01Context.Provider")
    return context
}

export const BaoCaoMau01Provider = ({children}: IWithChildren) => {
    const [BaoCaoMau01Id, setBaoCaoMau01Id] = useState<string>()
    const [BaoCaoMau01ModalVisible, setBaoCaoMau01ModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <BaoCaoMau01Context.Provider value={{BaoCaoMau01Id, setBaoCaoMau01Id, BaoCaoMau01ModalVisible, setBaoCaoMau01ModalVisible}}>
        {children}
    </BaoCaoMau01Context.Provider> 
}