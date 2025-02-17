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
import { bytesToMB, ThemGiayToVaoKhoModal } from "./ThemGiayToVaoKhoModal";
import { TaiLieuDienTuTrongKhoDetail } from "./TaiLieuDienTuTrongKhoDetail"
import { PhienBanGiayToSoHoaTable } from "./PhienBanGiayToSoHoaTable"
import { ChiaSeTaiLieuModal } from "./ChiaSeTaiLieuModal"
import { fileApi } from "@/features/file/services"
import { khoTaiLieuCongDanApi } from "../../KhoTaiLieuCongDan/services"

export const DanhSachGiayToTrongKhoModal = () => {
    const dispatch = useAppDispatch()
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuContext()
    const { data: user } = useAppSelector(state => state.user)
    const [dataGTSHWithKhoId, setDataGTSHWithKhoId] = useState<IGiayToSoHoa[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const columns = useGiayToSoHoaTrongKhoColumn()

    const handleCancel = () => {
        khoTaiLieuDienTuContext.setKhoTaiLieuDienTuId(undefined)
        khoTaiLieuDienTuContext.setDanhSachGiayToTrongKhoModalVisible(false)
    };

    useEffect(() => {
        if (khoTaiLieuDienTuContext.khoTaiLieuDienTuId) {
            setSearchParams({
                ...searchParams,
                khoTaiLieuDienTuId: khoTaiLieuDienTuContext.khoTaiLieuDienTuId,
                maDinhDanh: user?.soDinhDanh
            })
        }
    }, [khoTaiLieuDienTuContext.khoTaiLieuDienTuId])

    useEffect(() => {
        if (khoTaiLieuDienTuContext.danhSachGiayToTrongKhoModalVisible && !khoTaiLieuDienTuContext.themGiayToVaoKhoModalVisible) {
            (async () => {
                setLoading(true)
                if (user) {
                    var res = await giayToSoHoaApi.Search(searchParams)
                    if (res.status == 200) {
                        setDataGTSHWithKhoId(res.data.data as any)
                    }
                }
                setLoading(false)
                khoTaiLieuDienTuContext.setReload(false)

            })()
        }
    }, [searchParams, khoTaiLieuDienTuContext.reload])

    const AddGTSHVaoKhoHandeler = () => {
        khoTaiLieuDienTuContext.setThemGiayToVaoKhoModalVisible(true)
    }

    useEffect(() => {
        if (khoTaiLieuDienTuContext.giayToXoaKhoiKhoId) {
            (async () => {
                setLoading(true)
                var res = await giayToSoHoaApi.UpdateGTSHKhoTaiLieu({
                    id: khoTaiLieuDienTuContext.giayToXoaKhoiKhoId,
                    data: {
                        khoTaiLieuDienTuId: null as any,
                    }
                })
                if (res.status == 200) {
                    const dungLuong = dataGTSHWithKhoId?.filter(x => x.id == khoTaiLieuDienTuContext.giayToXoaKhoiKhoId)[0].dungLuong || 0
                    var res2 = await KhoTaiLieuDienTuApi.Update({
                        id: khoTaiLieuDienTuContext.khoTaiLieuDienTuId,
                        data: {
                            dungLuong: -dungLuong,
                            soLuong: -1
                        }
                    }

                    )
                    if (res2.status == 200) {
                        toast.success('Xóa thành công!')
                        khoTaiLieuDienTuContext.setReload(true)
                        khoTaiLieuDienTuContext.setGiayToXoaKhoiKhoId(undefined)
                    }
                    else {
                        toast.error('Cập nhật thông tin kho thất bại!')
                        setLoading(false)
                    }

                } else {
                    toast.error("Xóa thất bại!")
                    setLoading(false)
                }
            })()
        }
    }, [khoTaiLieuDienTuContext.giayToXoaKhoiKhoId])

    return (
        <AntdModal title='Thông tin kho tài liệu'
            visible={khoTaiLieuDienTuContext.danhSachGiayToTrongKhoModalVisible} fullsizeScrollable handlerCancel={handleCancel} width={1000}
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
                <div className="content">
                    <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'right', gap: 10 }}>
                        <div className="buttonAddKho" onClick={() => AddGTSHVaoKhoHandeler()}>
                            <PlusOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Thêm mới giấy tờ
                        </div>
                    </div>
                    <AntdTable
                        bordered
                        className="tableSwapper"
                        columns={columns}
                        dataSource={dataGTSHWithKhoId}

                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={() => { }}
                        position={["bottomRight"]}
                    />
                </div>
            </Spin>
            <TaiLieuDienTuTrongKhoDetail />
            <PhienBanGiayToSoHoaTable />
            <ChiaSeTaiLieuModal />
        </AntdModal>
    )
}