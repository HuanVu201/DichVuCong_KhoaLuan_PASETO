import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IHuongDanSuDung } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddHuongDanSuDung, GetHuongDanSuDung, UpdateHuongDanSuDung } from "../redux/action"
import { useHuongDanSuDungContext } from "../context/HuongDanSuDungContext"
import { resetData } from "../redux/slice"
import { MyCkEditor } from "@/lib/ckeditor/CkEditor5"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"


export const HuongDanSuDungDetail = () => {
    const dispatch = useAppDispatch()
    const { data: HuongDanSuDung, datas: HuongDanSuDungs } = useAppSelector(state => state.huongdansudung)
    const HuongDanSuDungContext = useHuongDanSuDungContext()
    const editorRef = useRef<ClassicEditor | null>(null)
    const [form] = Form.useForm<IHuongDanSuDung>()

    const onFinish = async () => {
        const formData = form.getFieldsValue() // nội dung ở đây là giá trị khởi tạo lúc gọi api
        const noiDungHuongDanSuDung = editorRef.current?.getData() // giá trị nội dung mới ở đây
        if (HuongDanSuDungContext?.huongDanSuDungId) {
            dispatch(UpdateHuongDanSuDung({ id: HuongDanSuDungContext.huongDanSuDungId, data: { ...formData, noiDungHuongDanSuDung } }))
        } else {
            dispatch(AddHuongDanSuDung({ ...formData, noiDungHuongDanSuDung: noiDungHuongDanSuDung || "" }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        HuongDanSuDungContext.setHuongDanSuDungVisible(false)
        HuongDanSuDungContext.setHuongDanSuDungId(undefined)
    };
    useEffect(() => {
        if (HuongDanSuDungContext.huongDanSuDungId) {
            dispatch(GetHuongDanSuDung(HuongDanSuDungContext.huongDanSuDungId))
        }
    }, [HuongDanSuDungContext.huongDanSuDungId])

    useEffect(() => {
        if (HuongDanSuDung) {
            form.setFieldsValue({ ...HuongDanSuDung })
        }
    }, [HuongDanSuDung])

    return (
        <AntdModal title="Thêm mới HuongDanSuDung" width={1000} visible={HuongDanSuDungContext.huongDanSuDungVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='HuongDanSuDung' layout="vertical" onFinish={onFinish} form={form} requiredMark={HuongDanSuDungContext.huongDanSuDungId === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tiêu đề"
                            name="tenHuongDanSuDung"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24} >
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"

                        >
                            <InputNumber  width={200}></InputNumber>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Nội dung"
                            name="noiDungHuongDanSuDung"
                            valuePropName="data" // khởi tạo giá trị lấy từ api
                        >
                            <MyCkEditor ref={editorRef} />
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