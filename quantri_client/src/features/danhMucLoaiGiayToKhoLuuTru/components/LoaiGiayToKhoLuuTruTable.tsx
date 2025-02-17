import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hook/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { LoaiGiayToKhoLuuTruProvider } from "../context/index"
import { ILoaiGiayToKhoLuuTru, ISearchLoaiGiayToKhoLuuTru } from "../models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { loaiGiayToKhoLuuTruApi } from "../services"
import { LoaiGiayToKhoLuuTruSearch } from "./LoaiGiayToKhoLuuTruSearch"
import { LoaiGiayToKhoLuuTruDetail } from "./LoaiGiayToKhoLuuTruDetail"
import EditEFormGiayToModal from "./EditEFormGiayToModal"

const LoaiGiayToKhoLuuTruTable = () => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<ILoaiGiayToKhoLuuTru[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<ISearchLoaiGiayToKhoLuuTru>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, setSearchParams: setSearchParams })

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await loaiGiayToKhoLuuTruApi.Search({ ...searchParams })
            if (res.data) {
                setData(res.data.data)
            }

            setLoading(false)
        })()
    }, [searchParams])

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <LoaiGiayToKhoLuuTruSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        total: data?.length
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                />
            </AntdSpace>
            <LoaiGiayToKhoLuuTruDetail searchParams={searchParams} setSearchParams={setSearchParams} />
            <EditEFormGiayToModal />

        </>

    )
}
const LoaiGiayToKhoLuuTruTableWrapper = () => (<LoaiGiayToKhoLuuTruProvider>
    <LoaiGiayToKhoLuuTruTable />
</LoaiGiayToKhoLuuTruProvider>)
export default LoaiGiayToKhoLuuTruTableWrapper