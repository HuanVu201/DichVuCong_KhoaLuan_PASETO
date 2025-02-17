import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ISearchThuTucThietYeu } from "../model";

const ThuTucThietYeuContext = createContext<IThuTucThietYeuContext | null>(null)

export interface IThuTucThietYeuContext {
    thuTucThietYeuId: string | undefined;
    setThuTucThietYeuId: React.Dispatch<React.SetStateAction<string | undefined>>;
    thuTucThietYeuModalVisible: boolean;
    setThuTucThietYeuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    searchParams: ISearchThuTucThietYeu;
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchThuTucThietYeu>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useThuTucThietYeuContext = () => {
    const context = useContext(ThuTucThietYeuContext)
    if (!context)
        throw new Error("ThuTucThietYeuContext must be used inside ThuTucThietYeuContext.Provider")
    return context
}

export const ThuTucThietYeuProvider = ({ children }: IWithChildren) => {
    const [thuTucThietYeuId, setThuTucThietYeuId] = useState<string>()
    const [thuTucThietYeuModalVisible, setThuTucThietYeuModalVisible] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<ISearchThuTucThietYeu>({ pageNumber: 1, pageSize: 200 })
    const [loading, setLoading] = useState<boolean>(false)
    return <ThuTucThietYeuContext.Provider value={{
        thuTucThietYeuId, setThuTucThietYeuId,
        thuTucThietYeuModalVisible, setThuTucThietYeuModalVisible,
        loading, setLoading,
        searchParams, setSearchParams
    }}>
        {children}
    </ThuTucThietYeuContext.Provider>
}