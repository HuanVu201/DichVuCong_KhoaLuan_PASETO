import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { IBasePagination } from "@/models";
import { neacService } from "@/features/neac/services";
import { IKySoNEAC } from "@/features/neac/models";
import { useTaiLieuKySoNamDinhColumn } from "../hooks/useTaiLieuKySoColumn";

export default function TaiLieuKySoTable() {
    const { data: user } = useAppSelector(state => state.user)
    const [data, setData] = useState<IKySoNEAC[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const searchParamOrigins: IBasePagination = {
        pageNumber: 1, pageSize: 10
    }
    const [searchParams, setSearchParams] = useState<IBasePagination>({ ...searchParamOrigins })
    const { columns } = useTaiLieuKySoNamDinhColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    useEffect(() => {
        (async () => {
            if (user?.soDinhDanh) {
                setLoading(true)
                const res = await neacService.GetDatas({ ...searchParams })
                if (res.status == 200) {
                    setData(res.data.data)
                    setTotalCount(res.data.totalCount)
                }
                else {
                    toast.error("Lỗi lấy danh sách tài liệu")
                }
                setLoading(false)
            }
        })()
    }, [searchParams])

   

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
                    onSearch={() => { }}
                    position={["bottomRight"]}
                />
            </Spin>
        </AntdSpace>
    </>)
}