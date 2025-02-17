import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IQuanLyTaiNguyen, ISearchQuanLyTaiNguyen } from "../models";
import { quanLyTaiNguyenService } from "../services";
import { toast } from "react-toastify";

const QuanLyTaiNguyenContext = createContext<IQuanLyTaiNguyenContext | null>(null)

export interface IQuanLyTaiNguyenContext {
    QuanLyTaiNguyenId: string | undefined;
    setQuanLyTaiNguyenId: React.Dispatch<React.SetStateAction<string | undefined>>;
    QuanLyTaiNguyenModalVisible: boolean;
    fileList : string[]| undefined;
    setFileList : React.Dispatch<React.SetStateAction<string[]>>;
    setQuanLyTaiNguyenModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    QuanLyTaiNguyens: IQuanLyTaiNguyen[] | undefined;
    count: number | undefined;
    onSearch: (values: ISearchQuanLyTaiNguyen) => Promise<void>;
    onDelete: (id: string, searchParams: ISearchQuanLyTaiNguyen) => Promise<void>;
    onUpdate: (id: string, values: IQuanLyTaiNguyen, searchParams: ISearchQuanLyTaiNguyen) => Promise<void>;
    onAdd: (values: IQuanLyTaiNguyen, searchParams: ISearchQuanLyTaiNguyen) => Promise<void>;


}

export const useQuanLyTaiNguyenContext = () => {
    const context = useContext(QuanLyTaiNguyenContext)
    if (!context)
        throw new Error("QuanLyTaiNguyenContext must be used inside QuanLyTaiNguyenContext.Provider")
    return context
}

export const QuanLyTaiNguyenProvider = ({ children }: IWithChildren) => {
    const [QuanLyTaiNguyenId, setQuanLyTaiNguyenId] = useState<string>()
    const [QuanLyTaiNguyenModalVisible, setQuanLyTaiNguyenModalVisible] = useState<boolean>(false)
    const [QuanLyTaiNguyens, setQuanLyTaiNguyens] = useState<IQuanLyTaiNguyen[]>()
    const [fileList, setFileList] = useState<string[]>([]);  

    const [count, setcount] = useState<number>()
    const onSearch = async (values: ISearchQuanLyTaiNguyen) => {
        const res = await quanLyTaiNguyenService.Search(values)
        setQuanLyTaiNguyens(res.data.data)
        setcount(res.data.totalCount)
    }
    const onDelete = async (id: string, searchParams: ISearchQuanLyTaiNguyen) => {
        const res = await quanLyTaiNguyenService.Delete(id)
        if (res.data.succeeded) {
            onSearch(searchParams)
            toast.success("Xóa thành công!");

        }
    }
    const onUpdate = async (id: string, values: IQuanLyTaiNguyen, searchParams: ISearchQuanLyTaiNguyen) => {
        const res = await quanLyTaiNguyenService.Update({id, data: values})
        if (res.data.succeeded) {
            onSearch(searchParams)
            toast.success("Cập nhật thành công!");

        }
    }
    const onAdd = async (values: IQuanLyTaiNguyen, searchParams: ISearchQuanLyTaiNguyen) => {
        const res = await quanLyTaiNguyenService.Create(values)
        if (res.data.succeeded) {
            onSearch(searchParams)
            toast.success("Thêm mới thành công!");

        }
    }
    // thêm các hàm search cho các tabs ở đây
    return <QuanLyTaiNguyenContext.Provider value={{ 
            QuanLyTaiNguyenId, 
            fileList,
            setFileList,
            setQuanLyTaiNguyenId, 
            QuanLyTaiNguyenModalVisible, 
            setQuanLyTaiNguyenModalVisible ,
            QuanLyTaiNguyens,
            count,
            onDelete,
            onSearch,
            onAdd,
            onUpdate
        }}>
        {children}
    </QuanLyTaiNguyenContext.Provider>
}