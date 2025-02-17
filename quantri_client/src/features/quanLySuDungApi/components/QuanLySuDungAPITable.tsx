import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "@/features/quanlymauphoi/hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IApiChiaSe, ISearchApiChiaSe } from "../models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { QuanLySuDungAPIProvider, useQuanLySuDungAPIContext } from "../contexts"
import { ApiChiaSe } from "../services"
import { toast } from "react-toastify"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useApiChiaSeColumn } from "../hooks"
import { ApiChiaSeDetail } from "./ApiChiaSeDetailModal"
import { LichSuApiChiaSeModal } from "./LichSuApiChiaSeModal"
import { FilterLichSuApiModal } from "./FilterApiChiaSeTableModal"

const QuanLySuDungApiTable = () => {
    const dispatch = useAppDispatch()
    const apiChiaSeContext = useQuanLySuDungAPIContext();
    const [searchParams, setSearchParams] = useState<ISearchApiChiaSe>({ pageNumber: 1, pageSize: 5 })
    const { columns } = useApiChiaSeColumn()
    const [apiChiaSes, setApiChiaSes] = useState<IApiChiaSe[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (searchParams && !apiChiaSeContext.apiDetailModalVisible) {
            (async () => {
                setLoading(true)
                const res = await ApiChiaSe.SearchApiChiaSe(searchParams)
                if (res.status == 200) {
                    setApiChiaSes(res.data.data)
                } else {
                    toast.error("Lấy danh sách API thất bại!")
                }
                setLoading(false)
            })()
        }
    }, [searchParams, apiChiaSeContext.reload])

    return (
        <>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <AntdSpace direction="vertical" style={{ width: "100%" }}>
                    <AntdTable
                        columns={columns}
                        dataSource={apiChiaSes as any}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={(params) => { }}
                    />
                </AntdSpace>
                <ApiChiaSeDetail />
                <LichSuApiChiaSeModal />
                <FilterLichSuApiModal />
            </Spin>
        </>

    )
}

const QuanLySuDungApiTableWrapper = () => (
    <QuanLySuDungAPIProvider>
        <QuanLySuDungApiTable />
    </QuanLySuDungAPIProvider>)
export default QuanLySuDungApiTableWrapper