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
import { IKhoTaiLieuDienTu } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/models/KhoTaiLieuDienTuModel"
import { useKhoTaiLieuDienTuManagerContext } from "../../contexts/KhoTaiLieuDienTuManagerContext"
import { useThongKeKhoTaiLieuContext } from "../../contexts"
import { KhoTaiLieuDienTuApi } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/services/KhoTaiLieuDienTuService"

export const KhoTaiLieuDienTuDetailManager = () => {
    const dispatch = useAppDispatch()
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuManagerContext()
    const [form] = Form.useForm<IKhoTaiLieuDienTu>()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [dataKho, setDataKho] = useState<IKhoTaiLieuDienTu>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (khoTaiLieuDienTuContext.soDinhDanh) {
            form.setFieldValue('chuSoHuu', `${khoTaiLieuDienTuContext.soDinhDanh}`)
        }
    }, [khoTaiLieuDienTuContext.soDinhDanh])
    
    const onFinish = async () => {
        const formData = form.getFieldsValue()

        if (khoTaiLieuDienTuContext.khoTaiLieuDienTuId) {
            (async () => {
                if (khoTaiLieuDienTuContext.soDinhDanh) {
                    var res = await KhoTaiLieuDienTuApi.Update({
                        id: khoTaiLieuDienTuContext.khoTaiLieuDienTuId,
                        data: {
                            tenKhoTaiLieu: form.getFieldValue('tenKhoTaiLieu'),
                            moTa: form.getFieldValue('moTa')
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
                if (khoTaiLieuDienTuContext.soDinhDanh) {
                    var res = await KhoTaiLieuDienTuApi.Create({
                        soDinhDanh: khoTaiLieuDienTuContext.soDinhDanh,
                        tenKhoTaiLieu: form.getFieldValue('tenKhoTaiLieu'),
                        moTa: form.getFieldValue('moTa')
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
        khoTaiLieuDienTuContext.setDetailKhoTaiLieuModalVisible(false)
        khoTaiLieuDienTuContext.setKhoTaiLieuDienTuId(undefined)
    };

    useEffect(() => {
        if (khoTaiLieuDienTuContext.khoTaiLieuDienTuId && khoTaiLieuDienTuContext.detailKhoTaiLieuModalVisible) {
            (async () => {
                setLoading(true)
                if (khoTaiLieuDienTuContext.soDinhDanh) {
                    var res = await KhoTaiLieuDienTuApi.Get(khoTaiLieuDienTuContext.khoTaiLieuDienTuId as any)
                    if (res.data.data) {
                        setDataKho(res.data.data)
                    }
                    else {
                        toast.error('Lỗi lấy thông tin!')
                    }
                }
                setLoading(false)
            })()
        }
    }, [khoTaiLieuDienTuContext.khoTaiLieuDienTuId])

    useEffect(() => {
        if (dataKho) {
            form.setFieldsValue({ ...dataKho })
        }
    }, [dataKho])

    return (
        <AntdModal title={khoTaiLieuDienTuContext.khoTaiLieuDienTuId ? "Sửa thông tin kho tài liệu" : "Thêm mới kho tài liệu"}
            visible={khoTaiLieuDienTuContext.detailKhoTaiLieuModalVisible} handlerCancel={handleCancel} width={780}
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
                <Form name='KhoTaiLieuDienTu' layout="vertical" onFinish={onFinish} form={form}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>

                        <Col md={12} span={24}>
                            <Form.Item
                                label="Tên kho tài liệu"
                                name="tenKhoTaiLieu"
                                rules={[{ required: true, message: 'Vui lòng nhập tên kho' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Số định danh tài khoản"
                                name="chuSoHuu"

                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="moTa"
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