import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IKieuNoiDung } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddKieuNoiDung, GetKieuNoiDung, UpdateKieuNoiDung } from "../redux/action"
import { useKieuNoiDungContext } from "../contexts/KieuNoiDungContext"
import { resetData } from "../redux/slice"

const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];
export const KieuNoiDungDetail = () => {
    const dispatch = useAppDispatch()
    const { data: KieuNoiDung, datas: KieuNoiDungs } = useAppSelector(state => state.kieunoidung)
    const KieuNoiDungContext = useKieuNoiDungContext()
    const [form] = Form.useForm<IKieuNoiDung>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (KieuNoiDungContext?.maKieuNoiDung) {
            dispatch(UpdateKieuNoiDung({ id: KieuNoiDungContext.maKieuNoiDung, data: { ...formData, } }))
        } else {
            dispatch(AddKieuNoiDung({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        KieuNoiDungContext.setMaKieuNoiDungModalVisible(false)
        KieuNoiDungContext.setMaKieuNoiDung(undefined)
    };
    useEffect(() => {
        if (KieuNoiDungContext.maKieuNoiDung) {
            dispatch(GetKieuNoiDung(KieuNoiDungContext.maKieuNoiDung))
        }
    }, [KieuNoiDungContext.maKieuNoiDung])

    useEffect(() => {
        if (KieuNoiDung) {
            form.setFieldsValue({ ...KieuNoiDung })
        }
    }, [KieuNoiDung])

    return (
        <AntdModal title="Thêm mới kiểu nội dung" visible={KieuNoiDungContext.maKieuNoiDungModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='KieuNoiDung' layout="vertical" onFinish={onFinish} form={form} requiredMark={KieuNoiDungContext.maKieuNoiDung === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên nội dung"
                            name="tenNoiDung"
                        // rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Cho phép nhập nội dung"
                            name="choPhepNhapNoiDung"
                            valuePropName="checked"
                        >
                            <Checkbox  ></Checkbox>

                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Cho phép nhập loại liên kết"
                            name="choPhepNhapLoaiLienKet"
                            valuePropName="checked"
                        >
                            <Checkbox  ></Checkbox>

                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Cho phép thêm tin bài"
                            name="choPhepThemTinBai"
                            valuePropName="checked"
                        >
                            <Checkbox  ></Checkbox>
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