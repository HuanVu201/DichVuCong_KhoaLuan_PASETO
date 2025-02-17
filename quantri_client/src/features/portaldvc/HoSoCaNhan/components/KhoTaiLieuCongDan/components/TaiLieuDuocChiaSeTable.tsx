import { useEffect, useState } from "react"
import { ITaiLieuLuuTruCongDan, ISearchTaiLieuLuuTruCongDan } from "../models"
import { useAppSelector } from "@/lib/redux/Hooks"
import { useTaiLieuDuocChiaSeColumn } from "../hooks/useTaiLieuDuocChiaSeColumn"
import { khoTaiLieuCongDanApi } from "../services"
import { toast } from "react-toastify"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { Spin } from "antd"
import SearchKhoTaiLieu from "./SearchKhoTaiLieu"
import { LoadingOutlined } from "@ant-design/icons"

export default function TaiLieuDuocChiaSeTable() {
    const [data, setData] = useState<ITaiLieuLuuTruCongDan[]>()

    const [loading, setLoading] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<ISearchTaiLieuLuuTruCongDan>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useTaiLieuDuocChiaSeColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize, searchParams: searchParams, setSearchParams: setSearchParams })
    const { data: user } = useAppSelector(state => state.user)
    const [totalCount, setTotalCount] = useState<number>(0)

    useEffect(() => {
        (async () => {
            if (user?.soDinhDanh) {
                setLoading(true)
                const res = await khoTaiLieuCongDanApi.SearchTaiLieuDuocChiaSe({ ...searchParams })
                if (res.status == 200) {
                    setData(res.data.data)
                    setTotalCount(res.data.totalCount)
                }
                else {
                    toast.error("Lỗi lấy danh sách tài liệu được chia sẻ")
                }
                setLoading(false)
            }
        })()
    }, [user, searchParams])


    return (<>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >

                <AntdTable
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        total: totalCount
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => { }}
                    position={["bottomRight"]}
                />

            </Spin>
        </AntdSpace>
    </>)
}