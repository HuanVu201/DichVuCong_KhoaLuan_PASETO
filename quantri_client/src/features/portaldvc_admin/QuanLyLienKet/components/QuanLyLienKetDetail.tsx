import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IQuanLyLienKet } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddQuanLyLienKet, GetQuanLyLienKet, UpdateQuanLyLienKet } from "../redux/action"
import { useQuanLyLienKetContext } from "../contexts/QuanLyLienKetContext"
import { resetData } from "../redux/slice"

const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];
export const QuanLyLienKetDetail = () => {
    const dispatch = useAppDispatch()
    const { data: QuanLyLienKet, datas: QuanLyLienKets } = useAppSelector(state => state.quanlylienket)
    const QuanLyLienKetContext = useQuanLyLienKetContext()
    const [form] = Form.useForm<IQuanLyLienKet>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (QuanLyLienKetContext?.maQuanLyLienKet) {
            dispatch(UpdateQuanLyLienKet({ id: QuanLyLienKetContext.maQuanLyLienKet, data: { ...formData, } }))
        } else {
            dispatch(AddQuanLyLienKet({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        QuanLyLienKetContext.setMaQuanLyLienKetModalVisible(false)
        QuanLyLienKetContext.setMaQuanLyLienKet(undefined)
    };
    useEffect(() => {
        if (QuanLyLienKetContext.maQuanLyLienKet) {
            dispatch(GetQuanLyLienKet(QuanLyLienKetContext.maQuanLyLienKet))
        }
    }, [QuanLyLienKetContext.maQuanLyLienKet])

    useEffect(() => {
        if (QuanLyLienKet) {
            form.setFieldsValue({ ...QuanLyLienKet })
        }
    }, [QuanLyLienKet])
    
    return (
        <AntdModal title="Thêm mới QuanLyLienKet" onOk={onFinish} visible={QuanLyLienKetContext.maQuanLyLienKetModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='QuanLyLienKet' layout="vertical" form={form} initialValues={{ thuTu: 1 }}>
                <Col>
                    <Form.Item
                        label="Sử dụng"
                        name="suDung"
                        valuePropName="checked"
                    >
                        <Checkbox></Checkbox>
                    </Form.Item>
                </Col>


                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Link liên kết"
                            name="linkLienKet"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã liên kết"
                            name="ma"
                        >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <InputNumber style={{ width: '100%' }}></InputNumber>
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