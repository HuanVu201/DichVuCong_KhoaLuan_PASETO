import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdTable, AntdUpLoad, AntdUploadPublicFile, IAntdTabsProps } from "@/lib/antd/components"

import { toast } from "react-toastify"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { fileApi } from "@/features/file/services"
import { useKhoTaiLieuDienTuManagerContext } from "../../contexts/KhoTaiLieuDienTuManagerContext"
import { useAddGTHSManagerColumn } from "../../hooks/useColumnAddGTSHManager"
import { KhoTaiLieuDienTuApi } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/services/KhoTaiLieuDienTuService"
import { useThongKeKhoTaiLieuContext } from "../../contexts"

export const ThemGiayToVaoKhoModalManager = () => {
    const dispatch = useAppDispatch()
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuManagerContext()
    const [dataGTSHOutSide, setDataGTSHOutSide] = useState<IGiayToSoHoa[]>()
    const [reload, setReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 100, reFetch: true })
    const columns = useAddGTHSManagerColumn()

    const handleCancel = () => {
        khoTaiLieuDienTuContext.setThemGiayToVaoKhoModalVisible(false)
        khoTaiLieuDienTuContext.setReload(!khoTaiLieuDienTuContext.reload)
    };

    useEffect(() => {
        if (khoTaiLieuDienTuContext.soDinhDanh) {
            setSearchParams((curr) => ({ ...curr, maDinhDanh: khoTaiLieuDienTuContext.soDinhDanh }))
        }
    }, [khoTaiLieuDienTuContext.soDinhDanh, khoTaiLieuDienTuContext.themGiayToVaoKhoModalVisible])

    useEffect(() => {
        (async () => {
            setLoading(true)
            if (khoTaiLieuDienTuContext.soDinhDanh && khoTaiLieuDienTuContext.themGiayToVaoKhoModalVisible) {
                var res = await giayToSoHoaApi.SearchGTSHOutsideKhoTaiLieu(searchParams)
                if (res.data.data) {
                    setDataGTSHOutSide(res.data.data as any)
                }
            }
            setLoading(false)

        })()

    }, [searchParams, reload])

    function bytesToMB(bytes: number = 0) {
        var MB = bytes / (1024 * 1024);
        return MB;
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            const fileDinhKem = dataGTSHOutSide?.filter(x => x.id == khoTaiLieuDienTuContext.giayToVaoKhoId)[0].dinhKem
            let dungLuong: number = dataGTSHOutSide?.filter(x => x.id == khoTaiLieuDienTuContext.giayToVaoKhoId)[0].dungLuong || 0
            if (dungLuong <= 0) {
                if (fileDinhKem) {
                    const valueGetFile = await fileApi.GetFileByte({ path: fileDinhKem })
                    if (valueGetFile) {
                        dungLuong = bytesToMB(valueGetFile.data.size)
                    } else {
                        toast.error("Lỗi lấy dung lượng file đính kèm!")
                        khoTaiLieuDienTuContext.setReload(false)
                    }
                }
            }

            if (khoTaiLieuDienTuContext.themGiayToVaoKhoModalVisible) {

                var res = await giayToSoHoaApi.UpdateGTSHKhoTaiLieu({ //Cập nhật bảng GTSH
                    id: khoTaiLieuDienTuContext.giayToVaoKhoId,
                    data: {
                        khoTaiLieuDienTuId: khoTaiLieuDienTuContext.khoTaiLieuDienTuId,
                        dungLuong: dungLuong
                    }
                })

                if (res.status == 200) {

                    var res2 = await KhoTaiLieuDienTuApi.Update({
                        id: khoTaiLieuDienTuContext.khoTaiLieuDienTuId,
                        data: {
                            dungLuong: dungLuong,
                            soLuong: 1
                        }
                    }

                    )
                    if (res2.status == 200) {
                        toast.success('Cập nhật thành công!')
                        khoTaiLieuDienTuContext.setReload(!khoTaiLieuDienTuContext.reload)
                        setDataGTSHOutSide(undefined)

                    }
                    else {
                        toast.error('Cập nhật thông tin kho thất bại!')
                        setLoading(false)
                    }

                    // setReload(!reload)
                    setSearchParams({ ...searchParams, reFetch: true })
                } else {
                    setLoading(false)
                    toast.error('Có lỗi cập nhật giấy tờ số hóa!')
                }

                setLoading(false)
            }

        })()


    }, [khoTaiLieuDienTuContext.giayToVaoKhoId])


    return (
        <AntdModal title='Thêm tài liệu vào kho'
            visible={khoTaiLieuDienTuContext.themGiayToVaoKhoModalVisible} fullsizeScrollable handlerCancel={handleCancel} width={1000}
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
                    <AntdTable
                        bordered
                        className="tableSwapper"
                        columns={columns}
                        dataSource={dataGTSHOutSide}

                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={() => { }}
                    />
                </div>
            </Spin>

        </AntdModal>
    )
}