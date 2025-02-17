import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"

import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"

import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { ISearchHoSo, ISearchTheoDoiHoSoChungThucParams } from "@/features/hoso/models"
import { TheoDoiHoSoChungThucProvider, useTheoDoiHoSoChungThucContext } from "../contexts/TheoDoiHoSoChungThucContext"
import { useTheoDoiHoSoChungThucColumn } from "../hooks/useTheoDoiHoSoChungThucColumn"
import { SearchTheoDoiHoSoChungThuc } from "@/features/hoso/redux/action"
import { TheoDoiHoSoChungThucSearch } from "./TheoDoiHoSoChungThucSearch"
import { resetDatas } from "@/features/hoso/redux/slice"
import { ScreenType } from "@/features/hoso/data"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { keys } from "highcharts"

const TheoDoiHoSoChungThucTable = ({
    maScreen,
    extraSearchParams,
}: {
    maScreen?: ScreenType;
    extraSearchParams?: ISearchTheoDoiHoSoChungThucParams;
}) => {
    const dispatch = useAppDispatch()
    const { theoDoiHoSoChungThucs: theoDoiHoSoChungThucs, count, loading } = useAppSelector(state => state.hoso)

    const TheoDoiHoSoChungThucContextContext = useTheoDoiHoSoChungThucContext()
    const [searchParams, setSearchParams] = useState<ISearchTheoDoiHoSoChungThucParams>({ pageNumber: 1, pageSize: 20, reFetch: true })
    const { columns } = useTheoDoiHoSoChungThucColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    // useEffect(() => {
    //     dispatch(resetDatas())
    // },[])
    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <TheoDoiHoSoChungThucSearch setSearchParams={setSearchParams} />
                <div style={{ color: 'red', fontWeight: '500' }}>Tìm thấy {count} kết quả</div>
                <AntdTable
                    rowKey={"key"}
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={theoDoiHoSoChungThucs?.map((item, index) => ({ ...item, key: item.id + index }))}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchTheoDoiHoSoChungThuc(params))}
                />
            </AntdSpace>
        </LazyActions>
    )
}
// const TheoDoiHoSoChungThucTableWrapper = () => (<TheoDoiHoSoChungThucProvider>
//     <TheoDoiHoSoChungThucContextTable />
// </TheoDoiHoSoChungThucProvider>)
export default TheoDoiHoSoChungThucTable