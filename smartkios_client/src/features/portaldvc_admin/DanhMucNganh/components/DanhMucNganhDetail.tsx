import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IDanhMucNganh } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { AddDanhMucNganh, GetDanhMucNganh, UpdateDanhMucNganh } from "../redux/action"
import { useDanhMucNganhContext } from "../contexts/DanhMucNganhContext"
import { resetData } from "../redux/slice"


const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];
export const DanhMucNganhDetail = () => {
    const dispatch = useAppDispatch()
    const { data: DanhMucNganh, datas: DanhMucNganhs } = useAppSelector(state => state.danhmucnganh)
    const DanhMucNganhContext = useDanhMucNganhContext()
    const [form] = Form.useForm<IDanhMucNganh>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (DanhMucNganhContext?.maDanhMucNganh) {
            dispatch(UpdateDanhMucNganh({ id: DanhMucNganhContext.maDanhMucNganh, data: { ...formData, type: 'danh-muc-nganh' } }))
        } else {
            dispatch(AddDanhMucNganh({ ...formData, type: 'danh-muc-nganh' }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        DanhMucNganhContext.setMaDanhMucNganhModalVisible(false)
        DanhMucNganhContext.setMaDanhMucNganh(undefined)
    };
    useEffect(() => {
        if (DanhMucNganhContext.maDanhMucNganh) {
            dispatch(GetDanhMucNganh(DanhMucNganhContext.maDanhMucNganh))
        }
    }, [DanhMucNganhContext.maDanhMucNganh])

    useEffect(() => {
        if (DanhMucNganh) {
            form.setFieldsValue({ ...DanhMucNganh, type: 'danh-muc-nganh' })
        }
    }, [DanhMucNganh])

    return (
        <AntdModal title="Thêm mới DanhMucNganh" visible={DanhMucNganhContext.maDanhMucNganhModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMucNganh' layout="vertical" onFinish={onFinish} form={form} requiredMark={DanhMucNganhContext.maDanhMucNganh === null} initialValues={{ thuTu: 1 }}>
                <Col md={12} >
                    <Form.Item
                        label="Sử dụng"
                        name="active"
                        valuePropName="checked"
                    >
                        <Checkbox  ></Checkbox>
                    </Form.Item>
                </Col>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên danh mục"
                            name="tenDanhMuc"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã danh mục"
                            name="code"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
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