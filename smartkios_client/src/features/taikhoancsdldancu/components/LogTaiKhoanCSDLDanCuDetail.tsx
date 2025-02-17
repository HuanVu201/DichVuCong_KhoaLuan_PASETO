import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ISearchLogCSDLDanCuDoanhNghiep, ILogCSDLDanCuDoanhNghiep } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddLogCSDLDanCuDoanhNghiep, GetLogCSDLDanCuDoanhNghiep, UpdateLogCSDLDanCuDoanhNghiep } from "../redux/action"
import { useLogTaiKhoanCSDLDanCuContext } from "../contexts/LogTaiKhoanCSDLDanCuContext"
import { resetData } from "@/features/taikhoancsdldancu/redux/slice"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"

export const TaiKhoanCSDLDanCuDetail = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLogCSDLDanCuDoanhNghiep>> }) => {
    const dispatch = useAppDispatch()
    const { data: TaiKhoanCSDLDanCu } = useAppSelector(state => state.logtaikhoancsdldancu)
    const { datas: DonVis } = useAppSelector(state => state.donvithutuc)
    const { datas: CoCauToChucs } = useAppSelector(state => state.cocautochuc)
    const TaiKhoanCSDLDanCuContext = useLogTaiKhoanCSDLDanCuContext()
    const [form] = Form.useForm<ILogCSDLDanCuDoanhNghiep>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (TaiKhoanCSDLDanCuContext?.maLogTaiKhoanCSDLDanCu) {
            dispatch(UpdateLogCSDLDanCuDoanhNghiep({ id: TaiKhoanCSDLDanCuContext.maLogTaiKhoanCSDLDanCu, data: { ...formData, } }))
        } else {
            dispatch(AddLogCSDLDanCuDoanhNghiep({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        TaiKhoanCSDLDanCuContext.setLogTaiKhoanCSDLDanCuModalVisible(false)
        TaiKhoanCSDLDanCuContext.setMaLogTaiKhoanCSDLDanCu(undefined)
    };
    useEffect(() => {
        if (TaiKhoanCSDLDanCuContext.maLogTaiKhoanCSDLDanCu) {
            dispatch(GetLogCSDLDanCuDoanhNghiep(TaiKhoanCSDLDanCuContext.maLogTaiKhoanCSDLDanCu))
        }
    }, [TaiKhoanCSDLDanCuContext.maLogTaiKhoanCSDLDanCu])

    useEffect(() => {
        if (TaiKhoanCSDLDanCu) {
            form.setFieldsValue({ ...TaiKhoanCSDLDanCu })
        }
    }, [TaiKhoanCSDLDanCu])

    useEffect(() => {
        if (!CoCauToChucs?.length) {
            dispatch(SearchCoCauToChuc({ type: 'don-vi', pageSize: 1100, pageNumber: 1 }))
        }
    }, [])

    return (
        <AntdModal title="Thêm mới tài khoản thụ hưởng" visible={TaiKhoanCSDLDanCuContext.LogTaiKhoanCSDLDanCuModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form  autoComplete="off" name='TaiKhoanCSDLDanCu' layout="vertical" onFinish={onFinish} form={form} requiredMark={TaiKhoanCSDLDanCuContext.maLogTaiKhoanCSDLDanCu !== null }
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