import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IThongBao } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddThongBao, GetThongBao, UpdateThongBao } from "../redux/action"
import { useThongBaoContext } from "../contexts/ThongBaoContext"
import { resetData } from "@/features/thongbao/redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
const options = [
    { label: 'True', value: true as any },
    { label: 'False', value: false as any },
];
export const ThongBaoDetail = () => {
    const dispatch = useAppDispatch()
    const { data: thongBao, datas: thongBaos } = useAppSelector(state => state.thongbao)
    const ThongBaoContext = useThongBaoContext()
    const [form] = Form.useForm<IThongBao>()
    const dinhKem = Form.useWatch("tepDinhKem", form)
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (ThongBaoContext?.ThongBaoId) {
            dispatch(UpdateThongBao({ id: ThongBaoContext.ThongBaoId, data: { ...formData, } }))
        } else {
            dispatch(AddThongBao({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData)
        ThongBaoContext.setThongBaoModalVisible(false)
        ThongBaoContext.setThongBaoId(undefined)
    };
    useEffect(() => {
        if (ThongBaoContext.ThongBaoId) {
            dispatch(GetThongBao(ThongBaoContext.ThongBaoId))
        }
    }, [ThongBaoContext.ThongBaoId])

    useEffect(() => {
        if (thongBao) {
            form.setFieldsValue({ ...thongBao, })
        }
    }, [thongBao])

    return (
        <AntdModal title="Thêm mới thông báo" visible={ThongBaoContext.ThongBaoModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='ThongBao' layout="vertical" onFinish={onFinish} form={form} requiredMark={ThongBaoContext.ThongBaoId === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tiêu đề"
                            name="tieuDe"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Nội dung"
                            name="noiDung"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đơn vị"
                            name="donViId"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Toàn hệ thống"
                            name="toanHeThong"
                        >
                            <AntdSelect options={options}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Quan trọng"
                            name="quanTrong"
                        >
                            <AntdSelect options={options}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="suDung"
                        >
                            <AntdSelect options={options}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tệp đính kèm"
                            name="tepDinhKem"
                        >
                            <RegularUpload fieldName={"tepDinhKem"} folderName={"ThongBao"} form={form} dinhKem={dinhKem}/>
                            {/* <AntdUpLoad editing = {ThongBaoContext.ThongBaoModalVisible !== undefined} formInstance={form} folderName="ThongBao" fieldName="imageUrl" accept="image/png, image/jpeg" listType="picture" /> */}
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