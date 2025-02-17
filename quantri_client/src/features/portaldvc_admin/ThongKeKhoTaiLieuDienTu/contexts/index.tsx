import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ISearchThongKeKhoTaiLieuDienTuParams } from "../models";

const ThongKeKhoTaiLieuContext = createContext<IThongKeKhoTaiLieuContext | null>(null)

export interface IThongKeKhoTaiLieuContext {
    soDinhDanh: string | undefined;
    setSoDinhDanh: React.Dispatch<React.SetStateAction<string | undefined>>;

    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;

    detailThongKeModalVisible: boolean;
    setDetailThongKeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    filterThongKeModalVisible: boolean;
    setFilterThongKeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    filterThongKeKhoTaiLieuParams: ISearchThongKeKhoTaiLieuDienTuParams;
    setFilterThongKeKhoTaiLieuParams: React.Dispatch<React.SetStateAction<ISearchThongKeKhoTaiLieuDienTuParams>>

    khoTaiLieuDienTuModalVisible: boolean;
    setKhoTaiLieuDienTuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;



}

export const useThongKeKhoTaiLieuContext = () => {
    const context = useContext(ThongKeKhoTaiLieuContext)
    if (!context)
        throw new Error("ThongKeKhoTaiLieuContext must be used inside ThongKeKhoTaiLieuContext.Provider")
    return context
}

export const ThongKeKhoTaiLieuProvider = ({ children }: IWithChildren) => {
    const [soDinhDanh, setSoDinhDanh] = useState<string>()
    const [reload, setReload] = useState<boolean>(false)
    const [khoTaiLieuDienTuModalVisible, setKhoTaiLieuDienTuModalVisible] = useState<boolean>(false)
    const [detailThongKeModalVisible, setDetailThongKeModalVisible] = useState<boolean>(false)
    const [filterThongKeModalVisible, setFilterThongKeModalVisible] = useState<boolean>(false)


    const [filterThongKeKhoTaiLieuParams, setFilterThongKeKhoTaiLieuParams] = useState<ISearchThongKeKhoTaiLieuDienTuParams>({
        pageNumber: 1, pageSize: 10
    })


    return <ThongKeKhoTaiLieuContext.Provider value={{
        soDinhDanh, setSoDinhDanh,
        reload, setReload,
        khoTaiLieuDienTuModalVisible, setKhoTaiLieuDienTuModalVisible,
        detailThongKeModalVisible, setDetailThongKeModalVisible,
        filterThongKeKhoTaiLieuParams, setFilterThongKeKhoTaiLieuParams,
        filterThongKeModalVisible, setFilterThongKeModalVisible,
    }}>
        {children}
    </ThongKeKhoTaiLieuContext.Provider>
}