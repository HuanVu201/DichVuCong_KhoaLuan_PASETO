import { Suspense, useEffect, useState } from "react"
import { AntdTable, AntdSpace, AntdModal } from "@/lib/antd/components"
import { ISearchThongKeNguoiSuDungKho, IThongKeNguoiSuDungKho } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"
import { useDanhSachNguoiSuDungColumn } from "../../hooks/useDanhSachNguoiSuDungColumn"
import { khoTaiLieuCongDanApi } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services"
import { toast } from "react-toastify"
import { FilterDanhSachNguoiSuDung } from "./FilterDanhSachNguoiSuDung"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { lazy } from "@/utils/lazyLoading"
const ChiTietNguoiSuDungModal = lazy(() => import("./ChiTietNguoiSuDungModal"))

const DanhSachNguoiSuDungTable = () => {
    const [data, setData] = useState<IThongKeNguoiSuDungKho[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const [searchParams, setSearchParams] = useState<ISearchThongKeNguoiSuDungKho>({ pageNumber: 1, pageSize: 10 })
    const [detailModalVisible, setDetailModalVisible] = useState(false)
    const [isViewDetail, setIsViewDetail] = useState<boolean>(false)
    const [recordId, setRecordId] = useState<string>()

    const { columns } = useDanhSachNguoiSuDungColumn({ searchParams, setSearchParams, setDetailModalVisible, setRecordId, setIsViewDetail })
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const resSearch = await khoTaiLieuCongDanApi.DanhSachSuDungKhoTaiLieu({ ...searchParams })

                if (resSearch.status == 200) {
                    setData(resSearch.data.data)
                    setTotalCount(resSearch.data.totalCount)
                } else {
                    toast.error("Thống kê thất bại!")
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
            } finally {
                setLoading(false)
            }
        })()
    }, [searchParams])

    const onCloseDetailModal = () => {
        setRecordId(undefined);
        setDetailModalVisible(false)
    }

    return (
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <FilterDanhSachNguoiSuDung searchParams={searchParams} setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        total: totalCount
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                    style={{ marginTop: 10 }}
                />
                {detailModalVisible ?
                    <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
                        <ChiTietNguoiSuDungModal isViewDetail={isViewDetail} khoLuuTruId={recordId} onClose={onCloseDetailModal} />
                    </Suspense> : null}
            </Spin>
        </AntdSpace>
    )
}

export default DanhSachNguoiSuDungTable