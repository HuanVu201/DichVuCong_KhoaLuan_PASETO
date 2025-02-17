import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ThuTucThietYeuProvider, useThuTucThietYeuContext } from "../contexts"
import { ISearchThuTucThietYeu, IThuTucThietYeu } from "../model"
import { useColumn } from "../hooks/useColumn"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { thuTucThietYeuApi } from "../services"
import { toast } from "react-toastify"
import { ThuTucThietYeuSearch } from "./ThuTucThietYeuSearch"
import { ThuTucThietYeuDetail } from "./ThuTucThietYeuDetail"

const ThuTucThietYeuTable = () => {
    const dispatch = useAppDispatch()
    const thuTucThietYeuContext = useThuTucThietYeuContext()
    const [data, setData] = useState<IThuTucThietYeu[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const { columns } = useColumn({ pageNumber: thuTucThietYeuContext.searchParams.pageNumber, pageSize: thuTucThietYeuContext.searchParams.pageSize })

    useEffect(() => {
        (async () => {
            if (thuTucThietYeuContext.searchParams) {
                thuTucThietYeuContext.setLoading(true)
                const res = await thuTucThietYeuApi.Search({
                    ...thuTucThietYeuContext.searchParams
                })
                if (res.data.data)
                    setData(res.data.data)
                thuTucThietYeuContext.setLoading(false)
            }
        })()
    }, [thuTucThietYeuContext.searchParams])

    return (
        <>
            <Spin spinning={thuTucThietYeuContext.loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <AntdSpace direction="vertical" style={{ width: "100%" }}>
                    <ThuTucThietYeuSearch />
                    <p><b>Tổng: {data?.length || 0} thủ tục</b></p>
                    <AntdTable
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            total: data?.length || 0
                        }}
                        searchParams={thuTucThietYeuContext.searchParams}
                        setSearchParams={thuTucThietYeuContext.setSearchParams}
                        onSearch={(params) => { }}
                    />
                </AntdSpace>
                <ThuTucThietYeuDetail />
            </Spin>
        </>

    )
}
const ThuTucThietYeuTableWrapper = () => (<ThuTucThietYeuProvider>
    <ThuTucThietYeuTable />
</ThuTucThietYeuProvider>)
export default ThuTucThietYeuTableWrapper