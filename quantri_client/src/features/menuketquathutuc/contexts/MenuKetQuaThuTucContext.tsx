import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { IThuTuc } from "@/features/thutuc/models";
import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";
import { IMenuKetQuaThuTuc } from "../models";

const MenuKetQuaThuTucContext = createContext<IMenuKetQuaThuTucContext | null>(null)

const MenuKetQuaThuTucViewMode = {
    "view" : "view",
    "edit" : "edit",
    "add" : "add",
} as const 
export type MenuKetQuaThuTucViewMode = keyof typeof MenuKetQuaThuTucViewMode

export interface IMenuKetQuaThuTucContext{
    menuKetQuaThuTucId: string | undefined;
    setMenuKetQuaThuTucId: React.Dispatch<React.SetStateAction<string | undefined>>;
    menuKetQuaThuTucModalVisible: boolean;
    setMenuKetQuaThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    addMenuKetQuaThuTucModalVisible: boolean;
    setAddMenuKetQuaThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    thuTucs: IThuTuc[] | undefined;
    setThuTucs: React.Dispatch<React.SetStateAction<IThuTuc[] | undefined>>;

    coCauToChucs: ICoCauToChuc[] | undefined;
    setCoCauToChucs: React.Dispatch<React.SetStateAction<ICoCauToChuc[] | undefined>>;

    rootMenuKetQuaThuTucs: IMenuKetQuaThuTuc[] | undefined;
    setRootMenuKetQuaThuTucs: React.Dispatch<React.SetStateAction<IMenuKetQuaThuTuc[] | undefined>>;

    giayToSoHoaId: string | undefined;
    setGiayToSoHoaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    viewMode: MenuKetQuaThuTucViewMode | undefined;
    setViewMode: React.Dispatch<React.SetStateAction<MenuKetQuaThuTucViewMode | undefined>>;
}

export const useMenuKetQuaThuTucContext = () => {
    const context = useContext(MenuKetQuaThuTucContext)
    if(!context)
        throw new Error("MenuKetQuaThuTucContext must be used inside MenuKetQuaThuTucContext.Provider")
    return context
}

export const MenuKetQuaThuTucProvider = ({children}: IWithChildren) => {
    const [thuTucs, setThuTucs] = useState<IThuTuc[]>()
    const [coCauToChucs, setCoCauToChucs] = useState<ICoCauToChuc[]>()
    const [rootMenuKetQuaThuTucs, setRootMenuKetQuaThuTucs] = useState<IMenuKetQuaThuTuc[]>()
    const [menuKetQuaThuTucId, setMenuKetQuaThuTucId] = useState<string>()
    const [giayToSoHoaId, setGiayToSoHoaId] = useState<string>()
    const [viewMode, setViewMode] = useState<MenuKetQuaThuTucViewMode>()
    const [menuKetQuaThuTucModalVisible, setMenuKetQuaThuTucModalVisible] = useState<boolean>(false)
    const [addMenuKetQuaThuTucModalVisible, setAddMenuKetQuaThuTucModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <MenuKetQuaThuTucContext.Provider value={{
            viewMode,
            setViewMode,
            giayToSoHoaId,
            setGiayToSoHoaId,
            thuTucs,
            setThuTucs,
            coCauToChucs,
            setCoCauToChucs,
            rootMenuKetQuaThuTucs,
            setRootMenuKetQuaThuTucs,
            menuKetQuaThuTucId, 
            setMenuKetQuaThuTucId, 
            menuKetQuaThuTucModalVisible, 
            setMenuKetQuaThuTucModalVisible,
            addMenuKetQuaThuTucModalVisible,
            setAddMenuKetQuaThuTucModalVisible,
        }}>
        {children}
    </MenuKetQuaThuTucContext.Provider> 
}