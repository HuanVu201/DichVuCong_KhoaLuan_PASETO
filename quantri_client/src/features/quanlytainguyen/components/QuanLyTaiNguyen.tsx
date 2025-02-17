import { IQuanLyTaiNguyen, ISearchQuanLyTaiNguyen } from "@/features/quanlytainguyen/models"
import { quanLyTaiNguyenService } from "@/features/quanlytainguyen/services"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ComponentProps, useEffect, useState } from "react"
import { QuanLyTaiNguyenProvider, useQuanLyTaiNguyenContext } from "../contexts/QuanLyTaiNguyenProvider"
import { useColumn } from "../hooks/useColumn"
import { QuanLyTaiNguyenDetail } from "./QuanLyTaiNguyenDetail"
import { QuanLyTaiNguyenSearch } from "./QuanLyTaiNguyenSearch"
import { useAppSelector } from "@/lib/redux/Hooks"

const QuanLyTaiNguyen = ({ readOnlyMode, isAdmin, extraSearchParams }: { extraSearchParams?: ISearchQuanLyTaiNguyen; isAdmin: boolean; readOnlyMode?: boolean }) => {
    const [searchParams, setSearchParams] = useState<ISearchQuanLyTaiNguyen>({ pageNumber: 1, pageSize: 10 })
    const QuanLyTaiNguyenContext = useQuanLyTaiNguyenContext()
    const columns = useColumn({ searchParams, readOnlyMode })
    const { data: user } = useAppSelector(state => state.user)

    // useEffect(() => {
    //     setSearchParams((curr) => ({...curr,  ...extraSearchParams}))
    // }, [extraSearchParams])

    return <>
        {readOnlyMode ? null : <QuanLyTaiNguyenSearch setSearchParams={setSearchParams} />}
        <AntdTable
            bordered
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(values) => QuanLyTaiNguyenContext.onSearch(values)}
            columns={columns as any}
            pagination={{
                total: QuanLyTaiNguyenContext.count
            }}
            dataSource={QuanLyTaiNguyenContext.QuanLyTaiNguyens as any}
        />
        {QuanLyTaiNguyenContext.QuanLyTaiNguyenModalVisible ? <QuanLyTaiNguyenDetail isAdmin={isAdmin} searchParams={searchParams} /> : null}
    </>
}

export const QuanLyTaiNguyenWrapper = (props: ComponentProps<typeof QuanLyTaiNguyen>) => {
    return <QuanLyTaiNguyenProvider>
        <QuanLyTaiNguyen {...props} />
    </QuanLyTaiNguyenProvider>
}