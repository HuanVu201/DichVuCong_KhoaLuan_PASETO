import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IFooter } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddFooter, GetFooter, UpdateFooter } from "../redux/action"
import { useFooterContext } from "../contexts/FooterContext"
import { resetData } from "../redux/slice"
import { MyCkEditor } from "@/lib/ckeditor/CkEditor5"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];
export const FooterDetail = () => {
    const dispatch = useAppDispatch()
    const { data: footer, datas: footers } = useAppSelector(state => state.footer)
    const FooterContext = useFooterContext()
    const editorRef = useRef<ClassicEditor | null>(null)
    const [form] = Form.useForm<IFooter>()

    const onFinish = async () => {
        const formData = form.getFieldsValue() // nội dung ở đây là giá trị khởi tạo lúc gọi api
        const noiDung = editorRef.current?.getData() // giá trị nội dung mới ở đây
        if (FooterContext?.maFooter) {
            dispatch(UpdateFooter({ id: FooterContext.maFooter, data: { ...formData, noiDung} }))
        } else {
            dispatch(AddFooter({ ...formData, noiDung : noiDung || ""}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        FooterContext.setMaFooterModalVisible(false)
        FooterContext.setMaFooter(undefined)
    };
    useEffect(() => {
        if (FooterContext.maFooter) {
            dispatch(GetFooter(FooterContext.maFooter))
        }
    }, [FooterContext.maFooter])

    useEffect(() => {
        if (footer) {
            form.setFieldsValue({ ...footer })
        }
    }, [footer])

    return (
        <AntdModal title="Thêm mới Footer" width={1000} visible={FooterContext.maFooterModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='footer' layout="vertical" onFinish={onFinish} form={form} requiredMark={FooterContext.maFooter === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                <Col md={12} span={24}>
                        <Form.Item
                            label="Tiêu đề"
                            name="tieuDe"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Đường dẫn ảnh"
                            name="imageUrl"
                        >
                            <AntdUpLoad formInstance={form} folderName="Footer" fieldName="imageUrl" accept="image/png, image/jpeg" listType="picture" />
                        </Form.Item>
                    </Col> */}
                    <Col span={24}>
                        <Form.Item  
                            label="Nội dung"
                            name="noiDung"
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