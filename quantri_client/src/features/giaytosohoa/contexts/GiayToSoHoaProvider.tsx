import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "../models";
import { giayToSoHoaApi } from "../services";

const GiayToSoHoaContext = createContext<IGiayToSoHoaContext | null>(null)

const GiayToSoHoaViewMode = {
    "view" : "view",
    "edit" : "edit",
    "add" : "add",
} as const 
export type GiayToSoHoaViewMode = keyof typeof GiayToSoHoaViewMode


export interface IGiayToSoHoaContext {
    giayToSoHoaId: string | undefined;
    setGiayToSoHoaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    viewMode: GiayToSoHoaViewMode | undefined;
    setViewMode: React.Dispatch<React.SetStateAction<GiayToSoHoaViewMode | undefined>>;
    giayToSoHoas: IGiayToSoHoa[] | undefined;
    count: number | undefined;
    onSearch: (values: ISearchGiayToSoHoa) => Promise<void>;
    onDelete: (id: string, searchParams: ISearchGiayToSoHoa) => Promise<void>;
    onUpdate: (id: string, values: IGiayToSoHoa, searchParams: ISearchGiayToSoHoa) => Promise<void>;
    onAdd: (values: IGiayToSoHoa, searchParams: ISearchGiayToSoHoa) => Promise<void>;


}

export const useGiayToSoHoaContext = () => {
    const context = useContext(GiayToSoHoaContext)
    if (!context)
        throw new Error("giayToSoHoaContext must be used inside giayToSoHoaContext.Provider")
    return context
}

export const GiayToSoHoaProvider = ({ children }: IWithChildren) => {
    const [giayToSoHoaId, setGiayToSoHoaId] = useState<string>()
    const [viewMode, setViewMode] = useState<GiayToSoHoaViewMode>()
    const [giayToSoHoas, setgiayToSoHoas] = useState<IGiayToSoHoa[]>()
    const [count, setcount] = useState<number>()
    const onSearch = async (values: ISearchGiayToSoHoa) => {
        const res = await giayToSoHoaApi.Search(values)
        setgiayToSoHoas(res.data.data || [])
        setcount(res.data.totalCount)
    }
    const onDelete = async (id: string, searchParams: ISearchGiayToSoHoa) => {
        const res = await giayToSoHoaApi.Delete({id, forceDelete: false})
        if (res.data.succeeded) {
            onSearch(searchParams)
        }
    }
    const onUpdate = async (id: string, values: IGiayToSoHoa, searchParams: ISearchGiayToSoHoa) => {
        const res = await giayToSoHoaApi.Update({id, data: values})
        if (res.data.succeeded) {
            onSearch(searchParams)
        }
    }
    const onAdd = async (values: IGiayToSoHoa, searchParams: ISearchGiayToSoHoa) => {
        const res = await giayToSoHoaApi.Create(values)
        if (res.data.succeeded) {
            onSearch(searchParams)
        }
    }
    // thêm các hàm search cho các tabs ở đây
    return <GiayToSoHoaContext.Provider value={{ 
            giayToSoHoaId, 
            setGiayToSoHoaId, 
            viewMode, 
            setViewMode ,
            giayToSoHoas,
            count,
            onDelete,
            onSearch,
            onAdd,
            onUpdate
        }}>
        {children}
    </GiayToSoHoaContext.Provider>
}