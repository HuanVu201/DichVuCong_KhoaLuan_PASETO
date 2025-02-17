import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdTable, AntdUpLoad, AntdUploadPublicFile } from "../../../lib/antd/components"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { IApiChiaSe, ISearchApiChiaSe } from "../models"
import { useQuanLySuDungAPIContext } from "../contexts"
import { ApiChiaSe } from "../services"
import { LoadingOutlined } from "@ant-design/icons"
import { useLichSuApiColumn } from "../hooks/useLichSuApiColumn"

export const LichSuApiChiaSeModal = () => {
    const dispatch = useAppDispatch()
    const apiChiaSeContext = useQuanLySuDungAPIContext();
    const [data, setData] = useState<IApiChiaSe[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const { columns } = useLichSuApiColumn()
    const [searchParams, setSearchParams] = useState<ISearchApiChiaSe>({ pageNumber: 1, pageSize: 10 })
    const handleCancel = () => {
        apiChiaSeContext.setApiId(undefined)
        apiChiaSeContext.setLichSuApiModalVisible(false)

    };

    useEffect(() => {
        if (apiChiaSeContext.apiId && apiChiaSeContext.lichSuApiModalVisible) {
            (async () => {
                const res = await ApiChiaSe.SearchLichSuApiChiaSe({
                    id: apiChiaSeContext.apiId
                })
                if (res) {
                    setData(res.data.data)
                } else {
                    toast.error('Lỗi lấy thông tin!')
                }
            })()
        }
    }, [apiChiaSeContext.apiId, apiChiaSeContext.lichSuApiModalVisible])


    return (
        <AntdModal title={"Thông tin API"} visible={apiChiaSeContext.lichSuApiModalVisible} handlerCancel={handleCancel} width={1000}
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
               <AntdTable
                        columns={columns}
                        dataSource={data as any}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={(params) => { }}
                    />
            </Spin>
        </AntdModal>
    )
}