import { ISearchYeuCauThanhToan, IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models"
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action"
import { AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { useYeuCauThanhToanColumn } from "../hooks/useYeuCauThanhToanColumn"
import { GetHoSoParam } from "../services"
import { useButtonActionContext } from "../contexts/ButtonActionsContext"
import { ISearchHoSo } from "../models"
import { GetHoSo } from "../redux/action"

export const YeuCauThanhToan = ({yeuCauThanhToans}: {yeuCauThanhToans: IYeuCauThanhToan[] | undefined}) => {
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize:10  })
    const columns = useYeuCauThanhToanColumn({pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize})
    return <>
        <AntdTable 
            columns={columns} 
            dataSource={yeuCauThanhToans}
            onSearch={() => {}} 
            searchParams={searchParams} 
            setSearchParams={setSearchParams} 
        />
    </>
}