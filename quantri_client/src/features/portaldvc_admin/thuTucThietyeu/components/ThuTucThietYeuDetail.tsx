import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IThuTucThietYeu } from "../model"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "@/lib/antd/components"
import { useThuTucThietYeuContext } from "../contexts"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { thuTucThietYeuApi } from "../services"

export const ThuTucThietYeuDetail = () => {
    const dispatch = useAppDispatch()
    const thuTucThietYeuContext = useThuTucThietYeuContext()
    const [data, setData] = useState<IThuTucThietYeu>()

    const [form] = Form.useForm<IThuTucThietYeu>()

    const { publicModule: config } = useAppSelector(state => state.config)

    const onFinish = async () => {
        (async () => {
            const formData = await form.validateFields()
            console.log(formData)
            if (formData) {
                if (thuTucThietYeuContext.thuTucThietYeuId) {
                    const res = await thuTucThietYeuApi.Update({
                        id: thuTucThietYeuContext.thuTucThietYeuId,
                        data: {
                            ...formData,
                            soThuTu: formData.soThuTu || 1
                        }
                    })
                    if (res.status == 200) {
                        toast.success("Cập nhật thành công!")
                        thuTucThietYeuContext.setSearchParams({
                            ...thuTucThietYeuContext.searchParams,
                            reFetch: true
                        })
                        handleCancel()
                    } else {
                        toast.error('Thao tác thất bại!')
                    }

                } else {
                    const res = await thuTucThietYeuApi.Create({
                        ...formData,
                        soThuTu: formData.soThuTu || 1
                    })
                    if (res.status == 201) {
                        toast.success("Thêm mới thành công!")
                        thuTucThietYeuContext.setSearchParams({
                            ...thuTucThietYeuContext.searchParams,
                            reFetch: true
                        })
                        handleCancel()
                    } else {
                        toast.error('Thao tác thất bại!')
                    }
                }

            } else {
                toast.error("Nhập đầy đủ các trường thông tin!")
                return
            }

        })()

    }
    const handleCancel = () => {
        form.resetFields();
        thuTucThietYeuContext.setThuTucThietYeuModalVisible(false)
        thuTucThietYeuContext.setThuTucThietYeuId(undefined)
    };


    useEffect(() => {
        (async () => {
            if (thuTucThietYeuContext.thuTucThietYeuId && thuTucThietYeuContext.thuTucThietYeuModalVisible) {
                thuTucThietYeuContext.setLoading(true)
                const res = await thuTucThietYeuApi.Get(thuTucThietYeuContext.thuTucThietYeuId)
                if (res.data.data) {
                    setData(res.data.data)
                } else {
                    toast.error("Lỗi lấy thông tin!")
                    thuTucThietYeuContext.setLoading(false)
                }
            }
        })()
    }, [thuTucThietYeuContext.thuTucThietYeuId])

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
            })
            thuTucThietYeuContext.setLoading(false)
        }
    }, [data])


    return (
        <AntdModal title={thuTucThietYeuContext.thuTucThietYeuId ? "Sửa thông tin DVC thiết yếu" : "Thêm mới DVC thiết yếu"} visible={thuTucThietYeuContext.thuTucThietYeuModalVisible} handlerCancel={handleCancel} width={780}
            footer={[
                <Space >
                    <AntdButton type="primary" onClick={onFinish}>
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >
            <Form name='ThuTucThietYeu' layout="vertical" onFinish={onFinish} form={form} requiredMark={thuTucThietYeuContext.thuTucThietYeuId !== null}
                initialValues={{ uuTien: 1 }}>
                <Row gutter={[8, 8]}>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã thủ tục"
                            name="maTTHC"
                            hasFeedback
                            rules={[{ required: true, message: 'Vui lòng nhập mã thủ tục' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên thủ tục"
                            name="tenTTHC"
                            hasFeedback
                            rules={[{ required: true, message: 'Vui lòng nhập tên thủ tục' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={20} span={24}>
                        <Form.Item
                            label="Đường dẫn DVC"
                            name="linkDVC"
                            hasFeedback
                            rules={[{ required: true, message: 'Vui lòng nhập tên đường dẫn' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            label="Thứ tự"
                            name="soThuTu"
                            hasFeedback
                        >
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </AntdModal>
    )
}