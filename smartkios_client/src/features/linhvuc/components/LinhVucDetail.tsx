import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ILinhVuc } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddLinhVuc, GetLinhVuc, UpdateLinhVuc } from "../redux/action"
import { useLinhVucContext } from "../contexts/LinhVucContext"
import { resetData } from "@/features/linhvuc/redux/slice"

export const LinhVucDetail = () => {
    const dispatch = useAppDispatch()
    const { data: linhVuc, datas: linhVucs } = useAppSelector(state => state.linhvuc)
    const linhVucContext = useLinhVucContext()
    const [form] = Form.useForm<ILinhVuc>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (linhVucContext?.linhVucId) {
            dispatch(UpdateLinhVuc({ id: linhVucContext.linhVucId, data: { ...formData,} }))
        } else {
            dispatch(AddLinhVuc({ ...formData}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        linhVucContext.setLinhVucModalVisible(false)
        linhVucContext.setLinhVucId(undefined)
    };
    useEffect(() => {
        if (linhVucContext.linhVucId) {
            dispatch(GetLinhVuc(linhVucContext.linhVucId))
        }
    }, [linhVucContext.linhVucId])

    useEffect(() => {
        if (linhVuc) {
            form.setFieldsValue({ ...linhVuc})
        }
    }, [linhVuc])

    // useEffect(() => {
    //     if (!loaiLinhVucs?.length && !loading) {
    //         dispatch(SearchLoaiLinhVuc({}))
    //     }
    // }, [])

    return (
        <AntdModal title="Thêm mới lĩnh vực" visible={linhVucContext.linhVucModalVisible} handlerCancel={handleCancel} footer={null}>
        <Form name='LinhVuc' layout="vertical" onFinish={onFinish} form={form} requiredMark={linhVucContext.linhVucId !== null} 
            initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    <Form.Item
                        label="Tên lĩnh vực"
                        name="ten"
                        rules={[{ required: true, message: 'Vui lòng nhập tên lĩnh vực' }]}
                        
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Mã lĩnh vực"
                        name="ma"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Mã ngành"
                        name="maNganh"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số lượng thủ tục"
                        name="soLuongThuTuc"
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số lượng thủ tục cấp tỉnh"
                        name="soLuongThuTucCapTinh"
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số lượng thủ tục cấp huyện"
                        name="soLuongThuTucCapHuyen"
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số lượng thủ tục cấp xã"
                        name="soLuongThuTucCapXa"
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space >
                    <AntdButton type="primary" onClick={onFinish}>
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            </Form.Item>
        </Form>
        </AntdModal>
    )
}