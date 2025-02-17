import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddThanhPhanThuTuc, GetThanhPhanThuTuc, UpdateThanhPhanThuTuc } from "../redux/action"
import { useThanhPhanThuTucContext } from "../contexts/ThanhPhanThuTucContext"
import { useTruongHopThuTucContext } from "@/features/truonghopthutuc/contexts/TruongHopThuTucContext"

import { resetData } from "@/features/thanhphanthutuc/redux/slice"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"

export const ThanhPhanThuTucDetail = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchThanhPhanThuTuc>> }) => {
    const dispatch = useAppDispatch()
    const { data: thanhPhanThuTuc } = useAppSelector(state => state.thanhphanthutuc)
    const { data: truonghopthutuc } = useAppSelector(state => state.truonghopthutuc)
    const thanhPhanThuTucContext = useThanhPhanThuTucContext()
    const truongHopThuTucContext = useTruongHopThuTucContext()
    const thuTucContext = useThuTucContext()
    const [form] = Form.useForm<IThanhPhanThuTuc>()
    const dinhKem = Form.useWatch("dinhKem", form)
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (thanhPhanThuTucContext?.thanhPhanThuTucId) {
            await dispatch(UpdateThanhPhanThuTuc({ id: thanhPhanThuTucContext.thanhPhanThuTucId, data: { ...formData, dinhKem: formData.dinhKem ? formData.dinhKem : null } } as any)).unwrap()
        } else {
            if (truongHopThuTucContext.truongHopThuTucId) {
                await dispatch(AddThanhPhanThuTuc({ ...formData, truongHopId: truonghopthutuc?.ma as any, thuTucId: thuTucContext.thuTucId as any })).unwrap()
            }
        }
        setSearchParams((curr) => ({ ...curr, truongHopId: truonghopthutuc?.ma as any }))
        handleCancel()
    }
  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    thanhPhanThuTucContext.setThanhPhanThuTucModalVisible(false);
    thanhPhanThuTucContext.setThanhPhanThuTucId(undefined);
  };
  useEffect(() => {
    if (thanhPhanThuTucContext.thanhPhanThuTucId) {
      dispatch(GetThanhPhanThuTuc(thanhPhanThuTucContext.thanhPhanThuTucId));
    }
  }, [thanhPhanThuTucContext.thanhPhanThuTucId]);

    useEffect(() => {
        if (thanhPhanThuTuc) {
            form.setFieldsValue({ ...thanhPhanThuTuc })
        }
    }, [thanhPhanThuTuc])
    return (
        <AntdModal title="Thêm mới thành phần thủ tục" visible={true} handlerCancel={handleCancel} footer={null}>
            <Form name='ThanhPhanThuTucDetail' layout="vertical" onFinish={onFinish} form={form} requiredMark={thanhPhanThuTucContext.thanhPhanThuTucId !== null}
                initialValues={{ batBuoc: false, soBanChinh: 0, soBanSao: 0 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên thành phần thủ tục"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên thành phần thủ tục' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã thành phần thủ tục"
                            name="ma"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã giấy tờ kho DVCQG"
                            name="maGiayToKhoQuocGia"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số bản chính"
                            name="soBanChinh"
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số bản sao"
                            name="soBanSao"
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="bắt buộc"
                            name="batBuoc"
                        >
                            <AntdSelect options={[{ label: "bắt buộc", value: true as any }, { label: "không bắt buộc", value: false as any }]} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đính kèm"
                            name="dinhKem"
                        >
                            <RegularUpload fieldName={"dinhKem"} folderName={"ThanhPhanThuTuc"} form={form} dinhKem={dinhKem}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Là thành phần chứa tờ khai"
                            name="choPhepThemToKhai"
                            valuePropName="checked"
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" htmlType="submit">
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
