import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { ICauHoiPhoBien } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddCauHoiPhoBien, GetCauHoiPhoBien, UpdateCauHoiPhoBien } from "../redux/action"
import { useCauHoiPhoBienContext } from "../context/CauHoiPhoBienContext"
import { resetData } from "../redux/slice"
import { MyCkEditor } from "@/lib/ckeditor/CkEditor5"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"


export const CauHoiPhoBienDetail = () => {
    const dispatch = useAppDispatch()
    const { data: CauHoiPhoBien, datas: CauHoiPhoBiens } = useAppSelector(state => state.cauhoiphobien)
    const CauHoiPhoBienContext = useCauHoiPhoBienContext()
    const editorRef = useRef<ClassicEditor | null>(null)
    const [form] = Form.useForm<ICauHoiPhoBien>()

    const onFinish = async () => {
        const formData = form.getFieldsValue() // nội dung ở đây là giá trị khởi tạo lúc gọi api
        const noiDungCauHoiPhoBien = editorRef.current?.getData() // giá trị nội dung mới ở đây
        if (CauHoiPhoBienContext?.CauHoiPhoBienId) {
            dispatch(UpdateCauHoiPhoBien({ id: CauHoiPhoBienContext.CauHoiPhoBienId, data: { ...formData } }))
        } else {
            dispatch(AddCauHoiPhoBien({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        CauHoiPhoBienContext.setCauHoiPhoBienVisible(false)
        CauHoiPhoBienContext.setCauHoiPhoBienId(undefined)
    };
    useEffect(() => {
        if (CauHoiPhoBienContext.CauHoiPhoBienId) {
            dispatch(GetCauHoiPhoBien(CauHoiPhoBienContext.CauHoiPhoBienId))
        }
    }, [CauHoiPhoBienContext.CauHoiPhoBienId])

    useEffect(() => {
        if (CauHoiPhoBien) {
            form.setFieldsValue({ ...CauHoiPhoBien })
        }
    }, [CauHoiPhoBien])

    return (
        <AntdModal title="Thêm mới CauHoiPhoBien" width={1000} visible={CauHoiPhoBienContext.CauHoiPhoBienVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='CauHoiPhoBien' layout="vertical" onFinish={onFinish} form={form} requiredMark={CauHoiPhoBienContext.CauHoiPhoBienId === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Phân loại câu hỏi"
                            name="type"
                        >
                            <AntdSelect options={[
                                { value: 'cong-dan', label: 'Công dân' },
                                { value: 'doanh-nghiep', label: 'Doanh nghiệp' },
                            ]} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Tiêu đề"
                            name="tieuDe"
                        >
                            <Input.TextArea></Input.TextArea>
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="Nội dung câu hỏi"
                            name="noiDungCauHoi"
                        >
                            <Input.TextArea style={{height : '200px'}}></Input.TextArea>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Nội dung câu trả lời"
                            name="noiDungTraLoi"
                        >
                            <Input.TextArea style={{height : '200px'}}></Input.TextArea>
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