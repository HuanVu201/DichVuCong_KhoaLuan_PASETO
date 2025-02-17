import { useEffect, useState } from "react"
import { AntdTable, AntdSpace, AntdModal, AntdButton } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { Space, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { IApiChiaSe, ISearchApiChiaSe } from "../models"
import { useLichSuApiColumn } from "../hooks/useLichSuApiColumn"
import { useQuanLySuDungAPIContext } from "../contexts"
import { ApiChiaSe } from "../services"
import { toast } from "react-toastify"
import { FilterApiChiaSeSearch } from "./FilterApiChiaSeSearch"

export const FilterLichSuApiModal = () => {
    const dispatch = useAppDispatch()
    const apiChiaSeContext = useQuanLySuDungAPIContext();
    const [data, setData] = useState<IApiChiaSe[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const { columns } = useLichSuApiColumn()
    const [searchParams, setSearchParams] = useState<ISearchApiChiaSe>({ pageNumber: 1, pageSize: 10 })

    const handleCancel = () => {
        apiChiaSeContext.setApiId(undefined)
        apiChiaSeContext.setFilterLichSuModalVisible(false)

    };

    useEffect(() => {
        console.log(apiChiaSeContext.apiId, apiChiaSeContext.filterLichSuModalVisible, searchParams)
        if (apiChiaSeContext.apiId && apiChiaSeContext.filterLichSuModalVisible) {
            (async () => {
                setLoading(true)
                const res = await ApiChiaSe.SearchLichSuApiChiaSe({
                    ...searchParams,
                    id: apiChiaSeContext.apiId
                })
                if (res) {
                    setData(res.data.data)
                } else {
                    toast.error('Lỗi lấy thông tin!')
                }
                setLoading(false)
            })()
        }
    }, [apiChiaSeContext.apiId, apiChiaSeContext.lichSuApiModalVisible, searchParams])


    return (
        <AntdModal title={"Thống kê lịch sử gọi API"} visible={apiChiaSeContext.filterLichSuModalVisible} handlerCancel={handleCancel} width={1000}
            footer={[
                <Space >
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <FilterApiChiaSeSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={data as any}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => { }}
                    style={{ margin: '15px 0' }}
                />

            </Spin>
        </AntdModal>
    )
}
