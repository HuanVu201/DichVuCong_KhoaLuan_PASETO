import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IHoiDap, ISearchHoiDap } from "../../../portaldvc/HoiDap/models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddHoiDap, UpdateHoiDap, GetHoiDap } from '../../../portaldvc/HoiDap/redux/action'
import { useHoiDapContext } from "../contexts/HoiDapContext"
import { resetData } from "../../../portaldvc/HoiDap/redux/slice"
import { MyCkEditor } from "@/lib/ckeditor/CkEditor5"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import dayjs from 'dayjs'
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"


export const HoiDapDetail = () => {
    const dispatch = useAppDispatch()
    const { data: HoiDap, datas: HoiDaps } = useAppSelector(state => state.hoidap)
    const HoiDapContext = useHoiDapContext()
    const [form] = Form.useForm<IHoiDap>()
    const dinhKem = Form.useWatch("dinhKem", form)

    const onFinish = async () => {
        const formData = form.getFieldsValue() // nội dung ở đây là giá trị khởi tạo lúc gọi api
        if (HoiDapContext?.hoiDapId) {
            dispatch(UpdateHoiDap({ id: HoiDapContext.hoiDapId, data: { ...formData } }))
        } else {
            
            dispatch(AddHoiDap({ ...formData, noiDungTraLoi: '' }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        HoiDapContext.setHoiDapVisible(false)
        HoiDapContext.sethoiDapId(undefined)
    };
    useEffect(() => {
        if (HoiDapContext.hoiDapId) {
            dispatch(GetHoiDap(HoiDapContext.hoiDapId))
        }
    }, [HoiDapContext.hoiDapId])
    const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
    useEffect(() => {
        dispatch(SearchCoCauToChuc({}))
    }, [])

    useEffect(() => {
        if (HoiDap) {
            form.setFieldsValue({ ...HoiDap, ngayGui: HoiDap.ngayGui ? dayjs(HoiDap.ngayGui) : null } as any)
        }
    }, [HoiDap])

    return (
        <AntdModal title="Thêm mới HoiDap" width={1000} visible={HoiDapContext.hoiDapVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='HoiDap' layout="vertical" onFinish={onFinish} form={form} requiredMark={HoiDapContext.hoiDapId === null} initialValues={{ thuTu: 1 }}>
                <div style={{ display: 'flex' }}>
                    <Col >
                        <Form.Item
                            label="Ngày gửi"
                            name="ngayGui"
                            style={{ marginRight: '50px' }}

                        >
                            <DatePicker></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col >

                        <Form.Item
                            label="File đính kèm"
                            name="dinhKem"
                        >
                            <RegularUpload
                                dinhKem={dinhKem}
                                fieldName={"dinhKem"}
                                folderName={"TepDinhKem"}
                                maxCount={1}
                                form={form} />
                        </Form.Item>
                    </Col>
                </div>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên người hỏi"
                            name="hoTen"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đơn vị nhận câu hỏi"
                            name="maDonVi"
                        >
                            <AntdSelect generateOptions={{ model: coCauToChucs, label: 'groupName', value: 'id' }} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số điện thoại"
                            name="soDienThoai"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Địa chỉ"
                            name="diaChi"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tiêu đề"
                            name="tieuDe"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã"
                            name="ma"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Người trả lời"
                            name="nguoiTraLoi"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Công khai"
                            name="congKhai"
                        >
                            <AntdSelect options={[
                                { value: 'co', label: 'Có' },
                                { value: 'ko', label: 'Không' },
                            ]}></AntdSelect>
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trạng thái"
                            name="trangThai"
                        >
                            <AntdSelect options={[
                                { value: 'da-giai-dap', label: 'Đã giải đáp' },
                                { value: 'chua-giai-dap', label: 'Chưa giải đáp' },
                            ]}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tiêu đề trả lời"
                            name="tieuDeTraLoi"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Câu hỏi"
                            name="noiDung"
                        >
                            <Input.TextArea></Input.TextArea>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Trả lời"
                            name="traLoi"
                        >
                            <Input.TextArea></Input.TextArea>
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