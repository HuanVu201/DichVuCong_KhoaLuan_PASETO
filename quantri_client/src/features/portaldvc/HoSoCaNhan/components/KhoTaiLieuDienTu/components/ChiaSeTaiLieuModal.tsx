import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "@/lib/antd/components"

import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { IKhoTaiLieuDienTu } from "../models/KhoTaiLieuDienTuModel"
import { useKhoTaiLieuDienTuContext } from "../contexts"
import { LoadingOutlined } from "@ant-design/icons"
import { KhoTaiLieuDienTuApi } from "../services/KhoTaiLieuDienTuService"
import { GiayToSoHoaChiaSeApi } from "../services/GiayToSoHoaChiaSeService"

export const ChiaSeTaiLieuModal = () => {
    const dispatch = useAppDispatch()
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuContext()
    const [form] = Form.useForm<IKhoTaiLieuDienTu>()
    const { data: user } = useAppSelector(state => state.user)
    const [dataKho, setDataKho] = useState<IKhoTaiLieuDienTu>()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = async () => {

        if (form.getFieldValue('soDinhDanhNguoiNhan')) {
            console.log(khoTaiLieuDienTuContext.giayToSoHoaItem)
            if (khoTaiLieuDienTuContext.giayToSoHoaItem && user) {
                if(form.getFieldValue('soDinhDanhNguoiNhan') == user.soDinhDanh){
                    toast.error("Không thể chia sẻ cho chính mình!")
                    return
                }
                (async () => {
                    setLoading(true)
                    var res = await GiayToSoHoaChiaSeApi.Create({
                        maDinhDanhChiaSe: form.getFieldValue('soDinhDanhNguoiNhan'),
                        giayToSoHoaId: khoTaiLieuDienTuContext.giayToSoHoaItem?.id,
                        soDinhDanh: user?.soDinhDanh
                    })
                    if (res.status == 201) {
                        toast.success('Chia sẻ thành công!')
                        khoTaiLieuDienTuContext.setReload(!khoTaiLieuDienTuContext.reload)
                        handleCancel()
                    }
                    else {
                        toast.error('Chia sẻ thất bại!')
                    }
                    setLoading(false)
                })()
            }
            else {
                toast.error('Không có thông tin giấy tờ!')
            }
        } else {
            toast.error("Vui lòng nhập số định danh người nhận")
        }


    }

    const handleCancel = () => {
        form.resetFields();
        khoTaiLieuDienTuContext.setChiaSeTaiLieuModalVisible(false)
    };

    return (
        <AntdModal title="Thông tin tài khoản nhận"
            visible={khoTaiLieuDienTuContext.chiaSeTaiLieuModalVisible} handlerCancel={handleCancel} width={600}
            footer={[
                <Space >
                    <AntdButton type="primary" onClick={onFinish} >
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form name='ChiaSeTaiLieuModal' layout="vertical" onFinish={onFinish} form={form}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>

                        <Col md={24} span={24}>
                            <Form.Item
                                label="Số định danh tài khoản nhận"
                                name="soDinhDanhNguoiNhan"
                            >
                                <Input placeholder="Nhập số định danh" />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Spin>
        </AntdModal>
    )
}