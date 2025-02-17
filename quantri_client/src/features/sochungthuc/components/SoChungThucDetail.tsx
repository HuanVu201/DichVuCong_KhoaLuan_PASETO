import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ISoChungThuc, ISearchSoChungThuc, SOCHUNGTHUC_LOAI } from "../models"
import React, { useEffect, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { AddSoChungThuc, GetSoChungThuc, SearchSoChungThuc, UpdateSoChungThuc } from "../redux/action"
import { useSoChungThucContext } from "../contexts/SoChungThucContext"
import { resetData } from "@/features/sochungthuc/redux/slice"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data"
import dayjs from 'dayjs'
import { coCauToChucService } from "@/features/cocautochuc/services"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { formatISOtoDate } from "@/utils"



export const SoChungThucDetail = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchSoChungThuc>> }) => {
    const dispatch = useAppDispatch()
    const { data: SoChungThuc } = useAppSelector(state => state.sochungthuc)
    const { data: user } = useAppSelector(state => state.user)

    const SoChungThucContext = useSoChungThucContext()
    const [form] = Form.useForm<ISoChungThuc>()
    const onFinish = async () => {
        const formData = await form.validateFields() as ISoChungThuc
        const formatFormData= {...formData, ngayBatDau: formatISOtoDate(formData.ngayBatDau as any), ngayDongSo: formData.ngayDongSo
                ? dayjs(formData.ngayDongSo).format("YYYY-MM-DDT23:59:59Z")
                : undefined }
        if (SoChungThucContext?.maSoChungThuc) {
            await dispatch(UpdateSoChungThuc({ id: SoChungThucContext.maSoChungThuc, data: formatFormData as any})).unwrap()
        } else {
            await dispatch(AddSoChungThuc(formatFormData as any)).unwrap()
        }
        setSearchParams((curr) => {
            console.log(curr);
            return {...curr}
        })
        handleCancel()
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        SoChungThucContext.setMaSoChungThuc(undefined)
        SoChungThucContext.setSoChungThucModalVisible(false)
    };
    useEffect(() => {
        if (SoChungThucContext.maSoChungThuc) {
            dispatch(GetSoChungThuc(SoChungThucContext.maSoChungThuc))
        }

    }, [SoChungThucContext.maSoChungThuc])

    useEffect(() => {
        if (SoChungThuc) {
            form.setFieldsValue({
                ...SoChungThuc, tenSo: SoChungThuc.tenSo, ngayBatDau: SoChungThuc.ngayBatDau ? dayjs(SoChungThuc.ngayBatDau) : undefined,
                ngayDongSo: SoChungThuc.ngayDongSo ? dayjs(SoChungThuc.ngayDongSo) : undefined
            })
        }
    }, [SoChungThuc])

    return (
        <AntdModal visible={SoChungThucContext.SoChungThucModalVisible} title="Thêm mới sổ chứng thực" handlerCancel={handleCancel} onOk={onFinish}>
            <Form name='SoChungThuc' layout="vertical" form={form} initialValues={{ trangThai: true }}>
                <Row gutter={[8, 8]}>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Tên sổ chứng thực"
                            name="tenSo"
                            rules={[{ required: true, message: "vui lòng nhập tên sổ chứng thực" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số tiếp theo"
                            name="soHienTai"
                            tooltip="Giá trị của số chưa được lấy (số hiện tại + 1)"
                            rules={[{ required: true, message: "vui lòng nhập số tiếp theo" }]}
                        >
                            <InputNumber min={0} />
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
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Số bắt đầu"
                            name="soBatDau"
                            rules={[{ required: true, message: "vui lòng chọn số bắt đầu" }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col> */}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày bắt đầu"
                            name="ngayBatDau"
                            rules={[{ required: true, message: "vui lòng chọn ngày bắt đầu" }]}
                        >
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }}></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày đóng sổ"
                            name="ngayDongSo"
                            rules={[{ required: true, message: "vui lòng chọn ngày đóng sổ" }]}

                        >
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }}></DatePicker>
                        </Form.Item>
                    </Col>
                    
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Loại"
                            name="loai"
                            rules={[{ required: true, message: "vui lòng chọn loại sổ chứng thực" }]}

                        >
                            <AntdSelect options={(Object.keys(SOCHUNGTHUC_LOAI) as Array<keyof typeof SOCHUNGTHUC_LOAI>).map((item) => ({
                                label: item,
                                value: item,
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