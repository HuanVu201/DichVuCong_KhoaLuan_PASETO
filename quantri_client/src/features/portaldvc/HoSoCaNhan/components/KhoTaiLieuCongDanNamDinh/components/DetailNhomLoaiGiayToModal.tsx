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
import { LoadingOutlined } from "@ant-design/icons"
import { useKhoTaiLieuCongDanNamDinhContext } from "../contexts"
import { ILoaiNhomGiayToCaNhan } from "../models"
import { LoaiNhomGiayToCaNhanApi } from "../services/LoaiNhomGiayToCaNhanService"
import { useKhoTaiLieuCongDanContext } from "../../KhoTaiLieuCongDan/contexts/KhoTaiLieuCongDanContext"

export const DetailNhomLoaiGiayToModal = () => {
    const dispatch = useAppDispatch()
    const khoTaiLieuDienTuContext = useKhoTaiLieuCongDanContext()
    const [form] = Form.useForm<ILoaiNhomGiayToCaNhan>()
    const { data: user } = useAppSelector(state => state.user)
    const [dataLoaiNhom, setDataLoaiNhom] = useState<ILoaiNhomGiayToCaNhan>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (user) {
            form.setFieldValue('chuSoHuu', `${user.fullName} (${user.soDinhDanh})`)
        }
    }, [user, khoTaiLieuDienTuContext.detailLoaiNhomGiayToModalVisible])
    const onFinish = async () => {
        const formData = form.getFieldsValue()

        if (khoTaiLieuDienTuContext.loaiNhomId) {
            (async () => {
                if (user) {
                    var res = await LoaiNhomGiayToCaNhanApi.Update({
                        id: khoTaiLieuDienTuContext.loaiNhomId,
                        data: {
                            ten: form.getFieldValue('ten'),
                            ghiChu: form.getFieldValue('ghiChu'),
                            loai: khoTaiLieuDienTuContext.typeLoaiNhom
                        }
                    }

                    )
                    if (res.status == 200) {
                        toast.success('Cập nhật thành công!')
                        khoTaiLieuDienTuContext.setReload(!khoTaiLieuDienTuContext.reload)
                        handleCancel()
                    }
                    else {
                        toast.error('Cập nhật thông tin thất bại!')
                    }
                }
            })()
        } else {
            (async () => {
                if (user) {
                    var res = await LoaiNhomGiayToCaNhanApi.Create({
                        soDinhDanh: user.soDinhDanh,
                        ten: form.getFieldValue('ten'),
                        ghiChu: form.getFieldValue('ghiChu'),
                        loai: khoTaiLieuDienTuContext.typeLoaiNhom
                    })
                    if (res.status == 201) {
                        toast.success('Thêm mới thành công!')
                        khoTaiLieuDienTuContext.setReload(!khoTaiLieuDienTuContext.reload)
                        handleCancel()
                    }
                    else {
                        toast.error('Thêm mới thất bại!')
                    }
                }
            })()
        }
    }

    const handleCancel = () => {
        form.resetFields();
        khoTaiLieuDienTuContext.setDetailLoaiNhomGiayToModalVisible(false)
        khoTaiLieuDienTuContext.setLoaiNhomId(undefined)
    };

    useEffect(() => {
        if (khoTaiLieuDienTuContext.loaiNhomId && khoTaiLieuDienTuContext.detailLoaiNhomGiayToModalVisible) {
            (async () => {
                setLoading(true)
                if (user) {
                    var res = await LoaiNhomGiayToCaNhanApi.Get(khoTaiLieuDienTuContext.loaiNhomId as any)
                    if (res.data.data) {
                        setDataLoaiNhom(res.data.data)
                    }
                    else {
                        toast.error('Lỗi lấy thông tin!')
                    }
                }
                setLoading(false)
            })()
        }
    }, [khoTaiLieuDienTuContext.loaiNhomId])

    useEffect(() => {
        if (dataLoaiNhom) {
            form.setFieldsValue({ ...dataLoaiNhom })
        }
    }, [dataLoaiNhom])

    return (
        <AntdModal title={khoTaiLieuDienTuContext.loaiNhomId ? `Sửa thông tin ${khoTaiLieuDienTuContext.typeLoaiNhom?.toLowerCase()} cá nhân` : `Thêm mới ${khoTaiLieuDienTuContext.typeLoaiNhom?.toLowerCase()} cá nhân`}
            visible={khoTaiLieuDienTuContext.detailLoaiNhomGiayToModalVisible && khoTaiLieuDienTuContext.typeLoaiNhom ? true : false} handlerCancel={handleCancel} width={780}
            footer={[
                <Space >
                    <AntdButton type="primary" onClick={onFinish} loading={loading}>
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
                <Form name='KhoTaiLieuDienTu' layout="vertical" onFinish={onFinish} form={form}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>

                        <Col md={12} span={24}>
                            <Form.Item
                                label={`Tên ${khoTaiLieuDienTuContext.typeLoaiNhom?.toLowerCase()} cá nhân`}
                                name="ten"
                                rules={[{ required: true, message: `Vui lòng nhập tên ${khoTaiLieuDienTuContext.typeLoaiNhom}` }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Chủ sở hữu"
                                name="chuSoHuu"

                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="ghiChu"
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>


                    </Row>

                </Form>
            </Spin>
        </AntdModal>
    )
}