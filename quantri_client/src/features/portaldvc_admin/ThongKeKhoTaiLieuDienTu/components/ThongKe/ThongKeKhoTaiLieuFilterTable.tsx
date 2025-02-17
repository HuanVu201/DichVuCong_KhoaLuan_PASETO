import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useEffect, useState } from "react"
import { Spin, Button } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useThongKeFilterColumn } from "../../hooks/useThongKeFilterColumn"
import { useThongKeKhoTaiLieuContext } from "../../contexts"
import { thongKeKhoTaiLieuApi } from "../../services"
import { IThongKeKhoTaiLieuDienTu } from "../../models"
import { toast } from "react-toastify"
import { ThongKeKhoTaiLieuSearch } from "./ThongKeKhoTaiLieuSearch"
import KhoTaiLieuDienTuTabeleManager from "../EditKhoOfUsers/KhoTaiLieuDienTuTableManager"


export const ThongKeKhoTaiLieuFilterTable = () => {
    const dispatch = useAppDispatch()
    const thongKeKhoTaiLieuContext = useThongKeKhoTaiLieuContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [thongKeKhoData, setThongKeKhoData] = useState<IThongKeKhoTaiLieuDienTu[]>()
    const [title, setTitle] = useState<string>()

    const { columns } = useThongKeFilterColumn({
        pageNumber: thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams.pageNumber,
        pageSize: thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams.pageSize
    })

    const handleCancel = () => {
        thongKeKhoTaiLieuContext.setFilterThongKeModalVisible(false)
        thongKeKhoTaiLieuContext.setFilterThongKeKhoTaiLieuParams({
            ...thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams,
            fullName: undefined,
            userName: undefined,
        })
    }

    useEffect(() => {
        if (thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams && thongKeKhoTaiLieuContext.filterThongKeModalVisible) {
            (async () => {
                setLoading(true)
                const res = await thongKeKhoTaiLieuApi.FilterThongKeKhoTaiLieu(thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams)
                console.log(res.data.data)
                if (res) {
                    setThongKeKhoData(res.data.data)
                } else {
                    toast.error('Có lỗi trong quá trình lấy thông tin!')
                }
                setLoading(false)
            })()
        }

    }, [thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams])


    return (<>
       <AntdModal title={`Danh sách sử dụng kho tài liệu`} visible={thongKeKhoTaiLieuContext.filterThongKeModalVisible} handlerCancel={handleCancel} fullsizeScrollable
         footer={[
            <Button key="back" onClick={handleCancel}>
                Đóng
            </Button>
        ]}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }} >
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    <ThongKeKhoTaiLieuSearch />
                    <AntdTable
                        loading={loading}
                        columns={columns}
                        dataSource={thongKeKhoData}
                        pagination={{
                            total: thongKeKhoData?.length
                        }}
                        searchParams={thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams}
                        setSearchParams={thongKeKhoTaiLieuContext.setFilterThongKeKhoTaiLieuParams}
                        onSearch={(params) => { }}
                        style={{ margin: '20px 0' }}
                    />
                 
                    <KhoTaiLieuDienTuTabeleManager
                        soDinhDanh={thongKeKhoTaiLieuContext.soDinhDanh}
                        setSoDinhDanh={(value) => thongKeKhoTaiLieuContext.setSoDinhDanh(value)}
                        khoTaiLieuDienTuModalVisible={thongKeKhoTaiLieuContext.khoTaiLieuDienTuModalVisible}
                        setKhoTaiLieuDienTuModalVisible={(value: boolean) => thongKeKhoTaiLieuContext.setKhoTaiLieuDienTuModalVisible(value)}
                    />
                </Spin>
            </AntdSpace>
        </AntdModal>
    </>)
}