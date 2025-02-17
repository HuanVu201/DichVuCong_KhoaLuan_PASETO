import { useCallback, useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ILogCSDLDanCuDoanhNghiep, ISearchLogCSDLDanCuDoanhNghiep } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchLogCSDLDanCuDoanhNghiep, StatisticLogCSDLDanCuDoanhNghiep } from "../redux/action"
import { TaiKhoanCSDLDanCuSearch } from "./LogTaiKhoanCSDLDanCuSearch"
import { LogTaiKhoanCSDLDanCuProvider, useLogTaiKhoanCSDLDanCuContext } from "../contexts/LogTaiKhoanCSDLDanCuContext"
import { TaiKhoanCSDLDanCuDetail } from "./LogTaiKhoanCSDLDanCuDetail"
import { useColumnStatistic } from "../hooks/useColumnStatistic"

const LogTaiKhoanCSDLDanCuTable = () => {
    const dispatch = useAppDispatch()
    const LogTaiKhoanCSDLDanCuContext = useLogTaiKhoanCSDLDanCuContext()
    const { datas: LogTaiKhoanCSDLDanCus, count: countLogTaiKhoanCSDL } = useAppSelector(state => state.logtaikhoancsdldancu)
    const [searchParams, setSearchParams] = useState<ISearchLogCSDLDanCuDoanhNghiep>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const { columnsStatistics } = useColumnStatistic({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const { datas: StatisticLogTaiKhoanCSDLDanCus, count: countStatisticLogTaiKhoanCSDL } = useAppSelector(state => state.statisticlogtaikhoancsdldancu)

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <TaiKhoanCSDLDanCuSearch setSearchParams={setSearchParams} searchParams={searchParams} />
                <AntdTable
                    columns={searchParams.donViId || searchParams.taiKhoan ? columns : columnsStatistics as any}
                    dataSource={searchParams.donViId || searchParams.taiKhoan ? LogTaiKhoanCSDLDanCus : StatisticLogTaiKhoanCSDLDanCus as any}
                    pagination={{
                        total: searchParams.donViId || searchParams.taiKhoan ? countLogTaiKhoanCSDL : countStatisticLogTaiKhoanCSDL
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => searchParams.donViId || searchParams.taiKhoan ? dispatch(SearchLogCSDLDanCuDoanhNghiep(params)) : dispatch(StatisticLogCSDLDanCuDoanhNghiep(params))
                    }
                />
            </AntdSpace>
        </>
    )
}
const LoaiLogTaiKhoanCSDLDanCuWrapper = () => (<LogTaiKhoanCSDLDanCuProvider>
    <LogTaiKhoanCSDLDanCuTable />
</LogTaiKhoanCSDLDanCuProvider>)
export default LoaiLogTaiKhoanCSDLDanCuWrapper