import { Col, Form, Input, InputNumber, Row, SelectProps, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useEffect } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { useBaoCaoMau01Context } from "../contexts/BaoCao01Context"
import { IPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { GetBaoCao1, GetPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action"



export const BaoCao01Detail = () => {
    const dispatch = useAppDispatch()
    const { data: baoCao01 } = useAppSelector(state => state.phieukhaosat)
    const { data: user } = useAppSelector(state => state.user)
    const BaoCao01Context = useBaoCaoMau01Context()
    const [form] = Form.useForm<IPhieuKhaoSat>()
  

    const handleCancel = () => {
        form.resetFields();
        BaoCao01Context.setBaoCaoMau01Id(undefined)
        BaoCao01Context.setBaoCaoMau01ModalVisible(false)
    };
    useEffect(() => {
        if (BaoCao01Context.BaoCaoMau01Id) {
            dispatch(GetBaoCao1(BaoCao01Context.BaoCaoMau01Id))
        }

    }, [BaoCao01Context.BaoCaoMau01Id])

    useEffect(() => {
        if (baoCao01) {
            form.setFieldsValue(baoCao01)
        }
    }, [baoCao01])

    return (
        <AntdModal visible={BaoCao01Context.BaoCaoMau01ModalVisible} title="Chi tiết đánh giá" handlerCancel={handleCancel} footer = {null}>
            <Form name='BaoCao01' layout="vertical" form={form}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Mã hồ sơ"
                            name="maHoSo"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Đơn vị"
                            name="donVi"
                        >
                            <Input defaultValue={user?.officeName} disabled />
                        </Form.Item>
                    </Col>

                    

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 1"
                            name="chiSo1"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 2"
                            name="chiSo2"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 3"
                            name="chiSo3"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 4"
                            name="chiSo4"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 5"
                            name="chiSo5"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 6"
                            name="chiSo6"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 7"
                            name="chiSo7"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 8"
                            name="chiSo8"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Câu 9"
                            name="chiSo9"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
                
            </Form>
        </AntdModal>

    )
}