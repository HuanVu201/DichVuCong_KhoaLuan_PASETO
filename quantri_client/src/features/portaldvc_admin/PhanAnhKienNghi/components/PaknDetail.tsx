import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IPhanAnhKienNghi, ISearchPhanAnhKienNghi } from "../../../portaldvc/PhanAnhKienNghi/models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddPhanAnhKienNghi, UpdatePhanAnhKienNghi, GetPhanAnhKienNghi, SearchPhanAnhKienNghi } from '../../../portaldvc/PhanAnhKienNghi/redux/action'
import { usePhanAnhKienNghiContext } from "../contexts/PhanAnhKienNghiContext"
import { resetData } from "../../../portaldvc/PhanAnhKienNghi/redux/slice"
import { MyCkEditor } from "@/lib/ckeditor/CkEditor5"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import dayjs from 'dayjs'
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import TextArea from "antd/es/input/TextArea"
import { toast } from "react-toastify"


export const PhanAnhKienNghiDetail = (params:any) => {
    const dispatch = useAppDispatch()
    const { data: PhanAnhKienNghi, datas: PhanAnhKienNghis } = useAppSelector(state => state.phanAnhKienNghi)
    const PhanAnhKienNghiContext = usePhanAnhKienNghiContext()
    const [form] = Form.useForm<IPhanAnhKienNghi>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (!form.getFieldValue('nguoiTraLoi') || !form.getFieldValue('noiDungTraLoi')) {
            toast.error("Vui lòng nhập đủ trường thông tin!")
        }
        else {
            const res: any = await dispatch(UpdatePhanAnhKienNghi({ id: PhanAnhKienNghiContext.PhanAnhKienNghiId, data: { ...formData, trangThai: '1' } }))
            if (res.payload.status == '200'){
                dispatch(SearchPhanAnhKienNghi(params.params))
            }
            handleCancel()
        }

    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        PhanAnhKienNghiContext.setPhanAnhKienNghiVisible(false)
        PhanAnhKienNghiContext.setPhanAnhKienNghiId(undefined)
    };
    useEffect(() => {
        if (PhanAnhKienNghiContext.PhanAnhKienNghiId) {
            dispatch(GetPhanAnhKienNghi(PhanAnhKienNghiContext.PhanAnhKienNghiId))
        }
    }, [PhanAnhKienNghiContext.PhanAnhKienNghiId])

    useEffect(() => {
        if (PhanAnhKienNghi) {
            form.setFieldsValue({ ...PhanAnhKienNghi, ngayGui: PhanAnhKienNghi.ngayGui ? dayjs(PhanAnhKienNghi.ngayGui) : null } as any)
        }
    }, [PhanAnhKienNghi])

    return (
        <AntdModal title="Thông tin phản ánh, kiến nghị" width={1000} visible={PhanAnhKienNghiContext.PhanAnhKienNghiVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='PhanAnhKienNghi' layout="vertical" onFinish={onFinish} form={form} requiredMark={PhanAnhKienNghiContext.PhanAnhKienNghiId === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Tên người/tổ chức phản ánh"
                            name="hoTen"
                        >
                            <Input disabled></Input>
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Số điện thoại"
                            name="soDienThoai"
                        >
                            <Input disabled></Input>
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input disabled></Input>
                        </Form.Item>
                    </Col>
                    <Col md={20} span={24}>
                        <Form.Item
                            label="Địa chỉ"
                            name="diaChi"
                        >
                            <Input.TextArea rows={1} disabled></Input.TextArea>
                        </Form.Item>
                    </Col>
                    <Col md={4} span={24}>
                        <Form.Item
                            label="Ngày gửi"
                            name="ngayGui"

                        >
                            <DatePicker format="DD/MM/YYYY" disabled style={{ width: '100%' }}></DatePicker>
                        </Form.Item>
                    </Col>


                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Công khai"
                            name="congKhai"
                        >
                            <AntdSelect options={[
                                { value: 'co', label: 'Có' },
                                { value: 'ko', label: 'Không' },
                            ]}></AntdSelect>
                        </Form.Item>
                    </Col> */}


                    <Col span={24}>
                        <Form.Item
                            label="Câu hỏi"
                            name="noiDung"
                        >
                            <Input.TextArea rows={3} disabled></Input.TextArea>
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
                    <Col span={24}>
                        <Form.Item
                            label="Trả lời"
                            name="noiDungTraLoi"
                        >
                            <Input.TextArea></Input.TextArea>
                        </Form.Item>
                    </Col>

                </Row>
                <Form.Item>
                    <Row gutter={[8, 8]}>
                        <Col md={24} span={24} style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <Space >
                                <AntdButton type="primary" onClick={onFinish}>
                                    Xác nhận
                                </AntdButton>
                                <AntdButton type="default" onClick={handleCancel}>
                                    Đóng
                                </AntdButton>
                            </Space>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}