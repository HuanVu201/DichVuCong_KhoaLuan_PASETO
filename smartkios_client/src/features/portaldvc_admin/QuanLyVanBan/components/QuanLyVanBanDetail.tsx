import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IQuanLyVanBan } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddQuanLyVanBan, GetQuanLyVanBan, UpdateQuanLyVanBan } from "../redux/action"
import { useQuanLyVanBanContext } from "../contexts/QuanLyVanBanContext"
import { resetData } from "../redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import dayjs from 'dayjs'
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"


export const QuanLyVanBanDetail = () => {
    const dispatch = useAppDispatch()
    const { data: QuanLyVanBan, datas: QuanLyVanBans } = useAppSelector(state => state.quanlyvanban)
    const { data: LinhVuc, datas: LinhVucs } = useAppSelector(state => state.linhvuc)

    const QuanLyVanBanContext = useQuanLyVanBanContext()
    const [form] = Form.useForm<IQuanLyVanBan>()
    const dinhKem = Form.useWatch("fileDinhKem", form)


    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (QuanLyVanBanContext?.maQuanLyVanBan) {
            dispatch(UpdateQuanLyVanBan({ id: QuanLyVanBanContext.maQuanLyVanBan, data: { ...formData, } }))
        } else {
            dispatch(AddQuanLyVanBan({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        QuanLyVanBanContext.setMaQuanLyVanBanModalVisible(false)
        QuanLyVanBanContext.setMaQuanLyVanBan(undefined)
    };
    useEffect(() => {
        if (QuanLyVanBanContext.maQuanLyVanBan) {
            dispatch(GetQuanLyVanBan(QuanLyVanBanContext.maQuanLyVanBan))
        }
    }, [QuanLyVanBanContext.maQuanLyVanBan])
    useEffect(() => {
        dispatch(SearchLinhVuc({}))
    }, [])

    useEffect(() => {
        if (QuanLyVanBan) {
            form.setFieldsValue({ ...QuanLyVanBan, ngaybanHanh: QuanLyVanBan?.ngaybanHanh ? dayjs(QuanLyVanBan?.ngaybanHanh) : null } as any)
        }
    }, [QuanLyVanBan])


    return (
        <AntdModal title={QuanLyVanBanContext.maQuanLyVanBan ? "Cập nhật quản lý văn bản" : "Thêm mới quản lý văn bản"} onOk={onFinish} visible={QuanLyVanBanContext.maQuanLyVanBanModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='QuanLyVanBan' layout="vertical" form={form} initialValues={{ thuTu: 1 }}>
                <div className="d-flex justify-content-around">
                    <Col className="custom-col">
                        <Form.Item
                            label="Công khai"
                            name="congKhai"
                            valuePropName="checked"
                        >
                            <Checkbox  ></Checkbox>
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item
                            label="File đính kèm"
                            name="fileDinhKem"
                        >
                            {/* <RegularUpload
                                dinhKem={dinhKem}
                                fieldName={"fileDinhKem"}
                                folderName={"FileDinhKem"}
                                maxCount={1}
                                form={form} /> */}
                            <AntdUploadPublicFile form={form} fieldName="fileDinhKem" folderName="QuanLyVanBan" dinhKem={dinhKem} />


                        </Form.Item>
                    </Col>
                </div>

                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số ký hiệu"
                            name="soKyHieu"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Cơ quan ban hành"
                            name="coQuanBanHanh"
                        >
                            <Input ></Input>
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Loại văn bản"
                            name="loaiVanBan"
                        >
                            <AntdSelect options={[
                                { value: 'tinh', label: 'Quyết định TTHC Cấp Tỉnh' },
                                { value: 'huyen-xa', label: 'Quyết định TTHC Cấp Huyện - Xã' },
                                { value: 'lien-thong', label: 'Quyết định TTHC Cấp Liên thông' },

                            ]}></AntdSelect>
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Lĩnh vực"
                            name="maLinhVuc"
                        >
                            <AntdSelect generateOptions={{ model: LinhVucs, value: "ma", label: "ten" }}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày ban hành"
                            name="ngaybanHanh"
                        >
                            <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }}></DatePicker>
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

                    <Col span={24}>
                        <Form.Item
                            label="Trích yếu"
                            name="trichYeu"
                        >
                            <Input.TextArea style={{ minHeight: '150px' }}></Input.TextArea>
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