import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ISearchTaiKhoanThuHuong, ITaiKhoanThuHuong } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddTaiKhoanThuHuong, GetTaiKhoanThuHuong, UpdateTaiKhoanThuHuong } from "../redux/action"
import { useTaiKhoanThuHuongContext } from "../contexts/TaiKhoanThuHuongContext"
import { resetData } from "@/features/taikhoanthuhuong/redux/slice"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"

export const TaiKhoanThuHuongDetail = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiKhoanThuHuong>> }) => {
    const dispatch = useAppDispatch()
    const { data: TaiKhoanThuHuong } = useAppSelector(state => state.taikhoanthuhuong)
    const { datas: DonVis } = useAppSelector(state => state.donvithutuc)
    const { datas: CoCauToChucs } = useAppSelector(state => state.cocautochuc)
    const TaiKhoanThuHuongContext = useTaiKhoanThuHuongContext()
    const [form] = Form.useForm<ITaiKhoanThuHuong>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (TaiKhoanThuHuongContext?.maTaiKhoanThuHuong) {
            dispatch(UpdateTaiKhoanThuHuong({ id: TaiKhoanThuHuongContext.maTaiKhoanThuHuong, data: { ...formData, } }))
        } else {
            dispatch(AddTaiKhoanThuHuong({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        TaiKhoanThuHuongContext.setTaiKhoanThuHuongModalVisible(false)
        TaiKhoanThuHuongContext.setMaTaiKhoanThuHuong(undefined)
    };
    useEffect(() => {
        if (TaiKhoanThuHuongContext.maTaiKhoanThuHuong) {
            dispatch(GetTaiKhoanThuHuong(TaiKhoanThuHuongContext.maTaiKhoanThuHuong))
        }
    }, [TaiKhoanThuHuongContext.maTaiKhoanThuHuong])

    useEffect(() => {
        if (TaiKhoanThuHuong) {
            form.setFieldsValue({ ...TaiKhoanThuHuong })
        }
    }, [TaiKhoanThuHuong])

    useEffect(() => {
        if (!CoCauToChucs?.length) {
            dispatch(SearchCoCauToChuc({ type: 'don-vi', pageSize: 1100, pageNumber: 1 }))
        }
    }, [])

    return (
        <AntdModal title="Thêm mới tài khoản thụ hưởng" visible={TaiKhoanThuHuongContext.TaiKhoanThuHuongModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form  autoComplete="off" name='TaiKhoanThuHuong' layout="vertical" onFinish={onFinish} form={form} requiredMark={TaiKhoanThuHuongContext.maTaiKhoanThuHuong !== null }
            >
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tài khoản thụ hưởng"
                            name="tkThuHuong"
                            rules={[{ required: true, message: 'Vui lòng nhập Tài khoản thụ hưởng' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã ngân hàng thụ hưởng"
                            name="maNHThuHuong"
                            rules={[{ required: true, message: 'Vui lòng nhập Mã ngân hàng thụ hưởng' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên tài khoản thụ hưởng"
                            name="tenTKThuHuong"
                            rules={[{ required: true, message: 'Vui lòng nhập Tên tài khoản thụ hưởng' }]}
                            required
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đơn vị"
                            name="donViId"
                            rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
                        >
                            <AntdSelect generateOptions={{ model: CoCauToChucs, label: 'groupName', value: 'groupCode' }}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                        >
                            <Input.TextArea rows={5} />
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