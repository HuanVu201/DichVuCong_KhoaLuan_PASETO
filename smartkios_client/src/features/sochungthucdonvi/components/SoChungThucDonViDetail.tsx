import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useEffect } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { resetData } from "@/features/sochungthuc/redux/slice"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data"
import dayjs from 'dayjs'
import { useSoChungThucContext } from "@/features/sochungthuc/contexts/SoChungThucContext"
import { ISoChungThuc, SOCHUNGTHUC_LOAI } from "@/features/sochungthuc/models"
import { AddSoChungThuc, GetSoChungThuc, SearchSoChungThuc, UpdateSoChungThuc } from "@/features/sochungthuc/redux/action"



export const SoChungThucDonViDetail = () => {
    const dispatch = useAppDispatch()
    const { data: SoChungThuc } = useAppSelector(state => state.sochungthuc)
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)
    const { data: user } = useAppSelector(state => state.user)

    const SoChungThucContext = useSoChungThucContext()
    const [form] = Form.useForm<ISoChungThuc>()
    const onFinish = async () => {
        const formData = await form.validateFields()
        if (SoChungThucContext?.maSoChungThuc) {
            const reponseUpdate = await dispatch(UpdateSoChungThuc({ id: SoChungThucContext.maSoChungThuc, data: { ...formData, donVi: user?.officeCode } })).unwrap()
            if (reponseUpdate.succeeded)
                dispatch(SearchSoChungThuc({ reFetch: true, donVi: user?.officeCode }))
        } else {
            const responseAdd = await dispatch(AddSoChungThuc({ ...formData, donVi: user?.officeCode as any })).unwrap()
            if (responseAdd.succeeded)
                dispatch(SearchSoChungThuc({ reFetch: true, donVi: user?.officeCode }))
        }
        handleCancel()
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        SoChungThucContext.setMaSoChungThuc(undefined)
        SoChungThucContext.setSoChungThucModalVisible(false)
    }
    useEffect(() => {
        if (SoChungThucContext.maSoChungThuc) {
            dispatch(GetSoChungThuc(SoChungThucContext.maSoChungThuc))
        }

    }, [SoChungThucContext.maSoChungThuc])

    useEffect(() => {
        if (SoChungThuc) {
            form.setFieldsValue({
                ...SoChungThuc,
                ngayBatDau: SoChungThuc.ngayBatDau ? dayjs(SoChungThuc.ngayBatDau) : undefined,
                ngayDongSo: SoChungThuc.ngayDongSo ? dayjs(SoChungThuc.ngayDongSo) : undefined,
                donVi: user?.officeName
            })
        }
    }, [SoChungThuc])

    return (
        <AntdModal visible={SoChungThucContext.SoChungThucModalVisible} title="Thêm mới sổ chứng thực" handlerCancel={handleCancel} onOk={onFinish}>
            <Form name='SoChungThuc' layout="vertical" form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên sổ chứng thực"
                            name="tenSo"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đơn vị"
                            name="donVi"
                        >
                            <Input disabled defaultValue={user?.officeName}></Input>
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số bắt đầu"
                            name="soBatDau"
                            rules={[{ required: true, message: "vui lòng chọn số bắt đầu" }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số hiện tại"
                            name="soHienTai"
                            rules={[{ required: true, message: "vui lòng chọn số hiện tại" }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày bắt đầu"
                            name="ngayBatDau"
                        >
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }}></DatePicker>
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày đóng sổ"
                            name="ngayDongSo"
                        >
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }}></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Trạng thái"
                            name="trangThai"
                        >
                            <AntdSelect options={[
                                { value: true as any, label: 'Đang mở' },
                                { value: false, label: 'Đã đóng' },
                            ]} allowClear></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Loại"
                            name="loai"
                        >
                            <AntdSelect options={(Object.keys(SOCHUNGTHUC_LOAI) as Array<keyof typeof SOCHUNGTHUC_LOAI>).map((item) => ({
                                label: item,
                                value:item,
                            }))} allowClear></AntdSelect>
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish} >
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item> */}
            </Form>
        </AntdModal>

    )
}