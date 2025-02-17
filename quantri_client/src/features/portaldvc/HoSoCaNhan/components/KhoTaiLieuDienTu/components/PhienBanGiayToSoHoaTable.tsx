import { AntdButton, AntdModal, AntdTable } from "@/lib/antd/components"
import { useForm } from "antd/es/form/Form"
import { IGiayToSoHoa } from "@/features/giaytosohoa/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, DatePicker, Form, Input, Row, Space, Spin, Typography } from "antd"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import ReactJson from "react-json-view";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { resetData } from "@/features/giaytosohoa/redux/slice"
import { toast } from "react-toastify"
import { LOAIKETQUA_GIAYTOSOHOA_FROM_CODE } from "@/features/giaytosohoa/data/format"
import { useKhoTaiLieuDienTuContext } from "../contexts"
import { LoadingOutlined } from "@ant-design/icons"
import { PhienBanGiayToSoHoaKhoTaiLieuDienTuApi } from "../services/PhienBanGiayToSoHoaKhoTaiLieuDienTuService"
import { IPhienBanGiayToSoHoaKhoTaiLieuDienTu, ISearchPhienBanGiayToSoHoaKhoTaiLieuDienTu } from "../models/PhienBanGiayToSoHoaKhoTaiLieuDienTuModel"
import { usePhienBanGiayToColumn } from "../hooks/useColumnPhienBanGiayToSoHoaKhoTaiLieuDienTu"

export const PhienBanGiayToSoHoaTable = () => {
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuContext()
    const { data: user } = useAppSelector(state => state.user)
    const [loading, setLoading] = useState<boolean>(false)
    const [dataPhienBan, setDataPhienBan] = useState<IPhienBanGiayToSoHoaKhoTaiLieuDienTu[]>()
    const [searchParams, setSearchParams] = useState<IPhienBanGiayToSoHoaKhoTaiLieuDienTu>()
    const columns = usePhienBanGiayToColumn()


    const handlerCancel = () => {
        khoTaiLieuDienTuContext.setGiayToSoHoaItem(undefined)
        khoTaiLieuDienTuContext.setDetailVersionModalVisible(false)
    }

    useEffect(() => {
        console.log(khoTaiLieuDienTuContext.detailKhoTaiLieuModalVisible)
        console.log(khoTaiLieuDienTuContext.giayToSoHoaItem)
        console.log(user)
        if (khoTaiLieuDienTuContext.detailVersionModalVisible && khoTaiLieuDienTuContext.giayToSoHoaItem && user) {
            (async () => {
                setLoading(true)
                var res = await PhienBanGiayToSoHoaKhoTaiLieuDienTuApi.Search({
                    soDinhDanh: user?.soDinhDanh,
                    khoTaiLieuDienTuId: khoTaiLieuDienTuContext.khoTaiLieuDienTuId,
                    maHoSo: khoTaiLieuDienTuContext.giayToSoHoaItem?.maHoSo,
                    maGiayTo: khoTaiLieuDienTuContext.giayToSoHoaItem?.maGiayTo

                })
                if (res.data.data) {
                    setDataPhienBan(res.data.data)
                } else {
                    toast.error("Có lỗi lấy thông tin các phiên bản!")
                }
                setLoading(false)


            })()
        }
    }, [khoTaiLieuDienTuContext.detailVersionModalVisible])


    return (
        <AntdModal visible={khoTaiLieuDienTuContext.detailVersionModalVisible} title={"Các phiên bản của giấy tờ"} handlerCancel={handlerCancel} fullsizeScrollable
            footer={[
                <Space >
                    <AntdButton type="default" onClick={handlerCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >

            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >


                <AntdTable
                    bordered
                    className="tableSwapper"
                    columns={columns}
                    dataSource={dataPhienBan}
                    searchParams={searchParams as any}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => { }}
                />


            </Spin>

        </AntdModal >
    )
}