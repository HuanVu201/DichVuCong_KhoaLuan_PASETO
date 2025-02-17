import { IHoSo } from "@/features/hoso/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { NavigateOptions, SetURLSearchParams, useSearchParams } from "react-router-dom";

const TraCuuHccContext = createContext<ITraCuuHccContext | null>(null)

export interface ITraCuuHccContext {
    data: IHoSo | undefined
    setData: React.Dispatch<React.SetStateAction<IHoSo | undefined>>;
    datas: IHoSo[] | undefined
    setDatas: React.Dispatch<React.SetStateAction<IHoSo[] | undefined>>;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    handleUrlQueryStringChange: (formData: Record<string, string>, navOpts?: NavigateOptions) => void;

}

export const useTraCuuHccContext = () => {
    const context = useContext(TraCuuHccContext)
    if (!context)
        throw new Error("TraCuuHccContext must be used inside TraCuuHccContext.Provider")
    return context
}

export const TraCuuHccProvider = ({ children }: IWithChildren) => {
    const [data, setData] = useState<IHoSo>()
    const [datas, setDatas] = useState<IHoSo[]>()
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState<boolean>(false)
    const handleUrlQueryStringChange = (formData: Record<string, string>, navOpts?: NavigateOptions) => {
        setSearchParams((curr) => {
            const urlQuery: Record<string, string> = {}
            curr.forEach((value, key) => {
                if (value !== undefined) {
                    urlQuery[key] = value
                }
            });

            Object.keys(formData).map((key) => {
                if (formData[key]) {
                    if (["maTinh", "maHuyen", "maXa"].includes(key)) {
                        urlQuery["donVi"] = formData[key]
                    } else {
                        urlQuery[key] = formData[key]
                    }
                } else {
                    delete urlQuery[key]
                }
            })
            return { ...urlQuery }
        }, navOpts)
    }
    return <TraCuuHccContext.Provider value={{
        data, setData,
        datas, setDatas,
        searchParams, setSearchParams,
        handleUrlQueryStringChange,
        loading, setLoading,
    }}>
        {children}
    </TraCuuHccContext.Provider>
}