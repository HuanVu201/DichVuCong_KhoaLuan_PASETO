import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IPhiLePhi, ISearchPhiLePhi } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddPhiLePhi, GetPhiLePhi, UpdatePhiLePhi } from "../redux/action"
import { usePhiLePhiContext } from "../contexts/PhiLePhiContext"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"

import { resetData } from "../redux/slice"


export const PhiLePhiDetail = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchPhiLePhi>> }) => {
    const dispatch = useAppDispatch()
    const { data: phiLePhi, datas: phiLePhis } = useAppSelector(state => state.phiLePhi)
    const phiiLePhiContext = usePhiLePhiContext()
    const thuTucContext = useThuTucContext()
    const [form] = Form.useForm<IPhiLePhi>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (phiiLePhiContext?.maPhiLePhi) {
            await dispatch(UpdatePhiLePhi({ id: phiiLePhiContext.maPhiLePhi, data: { ...formData, } })).unwrap()
        } else {
            if (thuTucContext.thuTucId) {
                await dispatch(AddPhiLePhi({ ...formData, thuTucId: thuTucContext.thuTucId })).unwrap()
            }
        }
        setSearchParams(cur => ({ ...cur, thuTucId: thuTucContext.thuTucId }))
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        phiiLePhiContext.setPhiLePhiModalVisible(false)
        phiiLePhiContext.setMaPhiLePhi(undefined)
    };
    useEffect(() => {
        if (phiiLePhiContext.maPhiLePhi) {
            dispatch(GetPhiLePhi(phiiLePhiContext.maPhiLePhi))
        }
    }, [phiiLePhiContext.maPhiLePhi])

    useEffect(() => {
        if (phiLePhi) {
            form.setFieldsValue({ ...phiLePhi })
        }
    }, [phiLePhi])

    return (
        <AntdModal title="Thêm mới phí, lệ phí" visible={true} handlerCancel={handleCancel} footer={null}>
            <Form name='philephi' layout="vertical" onFinish={onFinish} form={form} requiredMark={phiiLePhiContext.maPhiLePhi !== null}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Loại"
                            name="loai"
                        >
                            <AntdSelect options={[
                                { value: 'Phí', label: 'Phí' },
                                { value: 'Lệ phí', label: 'Lệ phí' },
                            ]}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số tiền"
                            name="soTien"
                        >
                            <InputNumber style={{width : '100%'}} />
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Đơn vị"
                            name="donVi"
                        >
                            <Input />
                        </Form.Item>
                    </Col> */}
                    <Col span={24}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                        >
                            <Input.TextArea />
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