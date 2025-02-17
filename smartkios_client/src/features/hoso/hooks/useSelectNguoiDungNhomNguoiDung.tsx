import { INguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/models"
import { AntdSelect } from "@/lib/antd/components"
import { useCallback, useMemo } from "react"

export const useSelectNguoiDungNhomNguoiDung = ({nguoiDungs, setFilterNguoiDungs}: {nguoiDungs: INguoiDungNhomNguoiDung[]; setFilterNguoiDungs: React.Dispatch<React.SetStateAction<INguoiDungNhomNguoiDung[]>>}) => {
    const groupOptions = useMemo(() => {
        return [... new Map(nguoiDungs.map((nguoiDung) => [nguoiDung.officeCode, nguoiDung])).values()]
    }, [nguoiDungs])

    const onChange = useCallback((value: string) => {
        setFilterNguoiDungs((curr) => {
            if(value)
                return nguoiDungs.filter(nguoiDung => nguoiDung.officeCode == value)
            return nguoiDungs
        })
    }, [nguoiDungs])

    const SelectNhomNguoiDung = groupOptions.length > 1 ? <AntdSelect onChange={onChange} placeholder="Chọn nhóm người dùng" showSearch allowClear generateOptions={{model: groupOptions, value: "officeCode", label: "officeName"}} style={{width:"100%"}}/> : null
    return {SelectNhomNguoiDung}
}