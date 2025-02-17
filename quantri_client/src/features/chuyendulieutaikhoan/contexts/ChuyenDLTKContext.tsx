import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChuyenDLTKContext = createContext<IChuyenDLTKContext | null>(null)

export interface IChuyenDLTKContext {
    ChuyenDLTKLeftSideId: string | undefined;
    setChuyenDLTKLeftSideId: React.Dispatch<React.SetStateAction<string | undefined>>;

    ChuyenDLTKRightSideId: string | undefined;
    setChuyenDLTKRightSideId: React.Dispatch<React.SetStateAction<string | undefined>>;

    maHoSoChuyenDLTK: string[] | undefined;
    setMaHoSoChuyenDLTK: React.Dispatch<React.SetStateAction<string[] | undefined>>;

}

export const useChuyenDLTKContext = () => {
    const context = useContext(ChuyenDLTKContext)
    if (!context)
        throw new Error("ChuyenDLTKContext must be used inside ChuyenDLTKContext.Provider")
    return context
}

export const ChuyenDLTKProvider = ({ children }: IWithChildren) => {
    const [ChuyenDLTKLeftSideId, setChuyenDLTKLeftSideId] = useState<string>()
    const [ChuyenDLTKRightSideId, setChuyenDLTKRightSideId] = useState<string>()
    const [maHoSoChuyenDLTK, setMaHoSoChuyenDLTK] = useState<string[] | undefined>([])
    // thêm các hàm search cho các tabs ở đây
    return <ChuyenDLTKContext.Provider value={{ ChuyenDLTKLeftSideId, setChuyenDLTKLeftSideId, ChuyenDLTKRightSideId, setChuyenDLTKRightSideId, maHoSoChuyenDLTK, setMaHoSoChuyenDLTK }}>
        {children}
    </ChuyenDLTKContext.Provider>
}