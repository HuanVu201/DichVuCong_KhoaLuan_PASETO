import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IKetQuaLienQuan, ISearchKetQuaLienQuan } from "../models";
import { ketQuaLienQuanService } from "../services";

const KetQuaLienQuanContext = createContext<IKetQuaLienQuanContext | null>(null)

export interface IKetQuaLienQuanContext {
    ketQuaLienQuanId: string | undefined;
    setKetQuaLienQuanId: React.Dispatch<React.SetStateAction<string | undefined>>;
    ketQuaLienQuanModalVisible: boolean;
    setKetQuaLienQuanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    ketQuaLienQuans: IKetQuaLienQuan[] | undefined;
    count: number | undefined;
    onSearch: (values: ISearchKetQuaLienQuan) => Promise<void>;
    onDelete: (id: string, searchParams: ISearchKetQuaLienQuan) => Promise<void>;
    onUpdate: (id: string, values: IKetQuaLienQuan, searchParams: ISearchKetQuaLienQuan) => Promise<void>;
    onAdd: (values: IKetQuaLienQuan, searchParams: ISearchKetQuaLienQuan) => Promise<void>;


}

export const useKetQuaLienQuanContext = () => {
    const context = useContext(KetQuaLienQuanContext)
    if (!context)
        throw new Error("KetQuaLienQuanContext must be used inside KetQuaLienQuanContext.Provider")
    return context
}

export const KetQuaLienQuanProvider = ({ children }: IWithChildren) => {
    const [ketQuaLienQuanId, setKetQuaLienQuanId] = useState<string>()
    const [ketQuaLienQuanModalVisible, setKetQuaLienQuanModalVisible] = useState<boolean>(false)
    const [ketQuaLienQuans, setKetQuaLienQuans] = useState<IKetQuaLienQuan[]>()
    const [count, setcount] = useState<number>()
    const onSearch = async (values: ISearchKetQuaLienQuan) => {
        const res = await ketQuaLienQuanService.Search(values)
        setKetQuaLienQuans(res.data.data)
        setcount(res.data.totalCount)
    }
    const onDelete = async (id: string, searchParams: ISearchKetQuaLienQuan) => {
        const res = await ketQuaLienQuanService.Delete(id)
        if (res.data.succeeded) {
            onSearch(searchParams)
        }
    }
    const onUpdate = async (id: string, values: IKetQuaLienQuan, searchParams: ISearchKetQuaLienQuan) => {
        const res = await ketQuaLienQuanService.Update({id, data: values})
        if (res.data.succeeded) {
            onSearch(searchParams)
        }
    }
    const onAdd = async (values: IKetQuaLienQuan, searchParams: ISearchKetQuaLienQuan) => {
        const res = await ketQuaLienQuanService.Create(values)
        if (res.data.succeeded) {
            onSearch(searchParams)
        }
    }
    // thêm các hàm search cho các tabs ở đây
    return <KetQuaLienQuanContext.Provider value={{ 
            ketQuaLienQuanId, 
            setKetQuaLienQuanId, 
            ketQuaLienQuanModalVisible, 
            setKetQuaLienQuanModalVisible ,
            ketQuaLienQuans,
            count,
            onDelete,
            onSearch,
            onAdd,
            onUpdate
        }}>
        {children}
    </KetQuaLienQuanContext.Provider>
}