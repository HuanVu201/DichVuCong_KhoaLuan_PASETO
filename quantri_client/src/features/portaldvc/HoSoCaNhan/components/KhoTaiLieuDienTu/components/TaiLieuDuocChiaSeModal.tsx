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
import { IGiayToSoHoaChiaSe, ISearchGiayToSoHoaChiaSe } from "../models/GiayToSoHoaChiaSeModel"

export const TaiLieuDuocChiaSeModal = () => {
    const dispatch = useAppDispatch()
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuContext()
    const { data: user } = useAppSelector(state => state.user)
    const [dataGTSHDuocChiaSe, setDataGTSHDuocChiaSe] = useState<IGiayToSoHoa[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoaChiaSe>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const columns = useColumnGiayToSoHoaDuocChiaSe()

    const handleCancel = () => {
        khoTaiLieuDienTuContext.setTaiLieuDuocChiaSeModalVisible(false)
    };

    useEffect(() => {
        if (khoTaiLieuDienTuContext.taiLieuDuocChiaSeModalVisible) {
            setSearchParams({
                ...searchParams,
                maDinhDanhChiaSe: user?.soDinhDanh
            })
        }
    }, [khoTaiLieuDienTuContext.taiLieuDuocChiaSeModalVisible])

    useEffect(() => {
        if (khoTaiLieuDienTuContext.taiLieuDuocChiaSeModalVisible) {
            (async () => {
                setLoading(true)
                if (user) {
                    var res = await GiayToSoHoaChiaSeApi.Search(searchParams)
                    if (res.status == 200) {
                        setDataGTSHDuocChiaSe(res.data.data as any)
                    }
                }
                setLoading(false)
            })()
        }
    }, [searchParams, khoTaiLieuDienTuContext.reload])

    useEffect(() => {
        if (khoTaiLieuDienTuContext.giayToXoaKhoiKhoDuocChiaSeId && khoTaiLieuDienTuContext.taiLieuDuocChiaSeModalVisible) {
            (async () => {
                var res = await GiayToSoHoaChiaSeApi.Delete(
                    {
                        id: khoTaiLieuDienTuContext.giayToXoaKhoiKhoDuocChiaSeId,
                        forceDelete: false
                    }
                )
                if (res.status == 200) {
                    toast.success('Xóa thành công!')
                    khoTaiLieuDienTuContext.setReload(!khoTaiLieuDienTuContext.reload)
                }
                else {
                    toast.error('Thao tác thất bại!')
                }

            })()
        }

    }, [khoTaiLieuDienTuContext.giayToXoaKhoiKhoDuocChiaSeId])


    return (
        <AntdModal title='Kho tài liệu được chia sẻ'
            visible={khoTaiLieuDienTuContext.taiLieuDuocChiaSeModalVisible} fullsizeScrollable handlerCancel={handleCancel} width={1000}
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

                {searchParams.maDinhDanhChiaSe ? <AntdTable
                    bordered
                    className="tableSwapper"
                    columns={columns}
                    dataSource={dataGTSHDuocChiaSe}

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