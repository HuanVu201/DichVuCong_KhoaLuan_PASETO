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
import { useChuKySoCaNhanContext } from "../context"
import { IChuKySoCaNhan } from "../model"
import { ChuKySoCaNhanApi } from "../service"

export const ChuKySoCaNhanDetail = () => {
    const dispatch = useAppDispatch()
    const chuKySoCaNhanContext = useChuKySoCaNhanContext()
    const [form] = Form.useForm<IChuKySoCaNhan>()
    const dinhKem = Form.useWatch("hinhAnh", form)
    const { publicModule: config } = useAppSelector(state => state.config)
    const { data: user } = useAppSelector(state => state.user)
    const [dataChuKy, setDataChuKy] = useState<IChuKySoCaNhan>()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = async () => {
        const formData = form.getFieldsValue()

        if (!form.getFieldValue('moTa') || !dinhKem) {
            toast.error('Không để trống thông tin!')
            return
        }

        if (chuKySoCaNhanContext.chuKySoCaNhanItem) {
            (async () => {
                if (user) {
                    setLoading(true)
                    var res = await ChuKySoCaNhanApi.Update({
                        id: chuKySoCaNhanContext.chuKySoCaNhanItem?.id,
                        data: {
                            ...form.getFieldsValue()
                        }
                    }

                    )
                    if (res.status == 200) {
                        toast.success('Cập nhật thành công!')
                        handleCancel()
                    }
                    else {
                        toast.error('Cập nhật thông tin thất bại!')
                    }
                    setLoading(false)
                }
            })()
        } else {
            (async () => {
                if (user) {
                    setLoading(true)
                    var res = await ChuKySoCaNhanApi.Create({
                        ...form.getFieldsValue(),
                        userName: user.userName,
                    })
                    if (res.status == 201) {
                        toast.success('Thêm mới thành công!')
                        handleCancel()
                    }
                    else {
                        toast.error('Thêm mới thất bại!')
                    }
                    setLoading(false)
                }
            })()
        }
    }

    const handleCancel = () => {
        form.resetFields();
        chuKySoCaNhanContext.setReload(!chuKySoCaNhanContext.reload)
        chuKySoCaNhanContext.setAddChuKyCaNhanModalVisible(false)
        chuKySoCaNhanContext.setChuKySoCaNhanItem(undefined)
    };

    useEffect(() => {
        if (chuKySoCaNhanContext.chuKySoCaNhanItem) {
            form.setFieldsValue({
                ...chuKySoCaNhanContext.chuKySoCaNhanItem
            })
        }

    }, [chuKySoCaNhanContext.chuKySoCaNhanItem])



    return (
        <AntdModal title={chuKySoCaNhanContext.chuKySoCaNhanItem ? "Sửa thông tin" : "Thêm mới chữ ký"}
            visible={chuKySoCaNhanContext.addChuKyCaNhanModalVisible} handlerCancel={handleCancel} width={780}
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
                <Form name='chuKySoCaNhan' layout="vertical" onFinish={onFinish} form={form}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>

                        <Col md={24} span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="moTa"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            >
                                <Input.TextArea showCount maxLength={1000} />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Hình ảnh"
                                name="hinhAnh"

                            >
                                <RegularUpload
                                    accept={"image/*"}
                                    dinhKem={dinhKem}
                                    fieldName={"hinhAnh"}
                                    folderName={"chuKySoCaNhan"}
                                    maxCount={1}
                                    form={form} />
                            </Form.Item>
                        </Col>



                    </Row>

                </Form>
            </Spin>
        </AntdModal>
    )
}