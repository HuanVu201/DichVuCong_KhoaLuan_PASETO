import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdTable, AntdUpLoad, AntdUploadPublicFile, IAntdTabsProps } from "@/lib/antd/components"

import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { IKhoTaiLieuDienTu } from "../models/KhoTaiLieuDienTuModel"
import { useKhoTaiLieuDienTuContext } from "../contexts"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { KhoTaiLieuDienTuApi } from "../services/KhoTaiLieuDienTuService"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { useGiayToSoHoaTrongKhoColumn } from "../hooks/useColumnGiayToSoHoa"
import { SearchGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { ThemGiayToVaoKhoModal } from "./ThemGiayToVaoKhoModal";
import { TaiLieuDienTuTrongKhoDetail } from "./TaiLieuDienTuTrongKhoDetail"
import { PhienBanGiayToSoHoaTable } from "./PhienBanGiayToSoHoaTable"
import { ChiaSeTaiLieuModal } from "./ChiaSeTaiLieuModal"
import { GiayToSoHoaChiaSeApi } from "../services/GiayToSoHoaChiaSeService"
import { useColumnGiayToSoHoaDuocChiaSe } from "../hooks/useColumnGiayToSoHoaDuocChiaSe"
import { useColumnGiayToSoHoaDaChiaSe } from "../hooks/useColumnGiayToSoHoaDaChiaSe"
import { ISearchGiayToSoHoaChiaSe } from "../models/GiayToSoHoaChiaSeModel"

export const TaiLieuDaChiaSeModal = () => {
    const dispatch = useAppDispatch()
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuContext()
    const { data: user } = useAppSelector(state => state.user)
    const [dataGTSHDaChiaSe, setDataGTSHDaChiaSe] = useState<IGiayToSoHoa[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoaChiaSe>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const columns = useColumnGiayToSoHoaDaChiaSe()

    const handleCancel = () => {
        khoTaiLieuDienTuContext.setTaiLieuDaChiaSeModalVisible(false)
    };

    useEffect(() => {
        if (khoTaiLieuDienTuContext.taiLieuDaChiaSeModalVisible) {
            setSearchParams({
                ...searchParams,
                soDinhDanh: user?.soDinhDanh
            })
        }
    }, [khoTaiLieuDienTuContext.taiLieuDaChiaSeModalVisible])

    useEffect(() => {
        if (khoTaiLieuDienTuContext.taiLieuDaChiaSeModalVisible) {
            (async () => {
                setLoading(true)
                if (user) {
                    var res = await GiayToSoHoaChiaSeApi.Search(searchParams)
                    if (res.status == 200) {
                        setDataGTSHDaChiaSe(res.data.data as any)
                    }
                }
                setLoading(false)
            })()
        }
    }, [searchParams, khoTaiLieuDienTuContext.reload])

    useEffect(() => {
        if (khoTaiLieuDienTuContext.gtshThuHoiChiaSeId) {
            (async () => {
                setLoading(true)
                const res = await GiayToSoHoaChiaSeApi.Delete({
                    id: khoTaiLieuDienTuContext.gtshThuHoiChiaSeId,
                    forceDelete: true
                })
                
                if (res.status == 200) {
                    toast.success('Thu hồi chia sẻ thành công!')
                    setSearchParams({ ...searchParams, reFetch: true })
                } else {
                    toast.error('Thu hồi chia sẻ thất bại!')
                }
                setLoading(false)
            })()
        }
    }, [khoTaiLieuDienTuContext.gtshThuHoiChiaSeId])


    return (
        <AntdModal title='Kho tài liệu đã chia sẻ'
            visible={khoTaiLieuDienTuContext.taiLieuDaChiaSeModalVisible} fullsizeScrollable handlerCancel={handleCancel} width={1000}
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

                {searchParams.soDinhDanh ? <AntdTable
                    bordered
                    className="tableSwapper"
                    columns={columns}
                    dataSource={dataGTSHDaChiaSe}

                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                    position={["bottomRight"]}
                /> : null}

            </Spin>
            <TaiLieuDienTuTrongKhoDetail />
            <PhienBanGiayToSoHoaTable />
            <ChiaSeTaiLieuModal />
        </AntdModal>
    )
}