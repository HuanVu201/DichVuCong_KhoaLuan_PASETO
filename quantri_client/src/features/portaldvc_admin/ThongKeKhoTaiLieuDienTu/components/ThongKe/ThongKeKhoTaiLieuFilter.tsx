import { useEffect, useState } from "react"
import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { useCallback } from "react"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { toast } from "react-toastify"
import { useThongKeKhoTaiLieuContext } from "../../contexts"
import { ISearchThongKeKhoTaiLieuDienTuParams } from "../../models"

const doiTuongs = [
    { label: 'Công dân', value: 'congDan' },
    { label: 'Tổ chức/Doanh nghiệp', value: 'toChucDoanhNghiep' }
]

export const ThongKeKhoTaiLieuFilter = () => {
    const thongKeKhoTaiLieuContext = useThongKeKhoTaiLieuContext()

    const [form] = Form.useForm()
    const onFinish = (values: ISearchThongKeKhoTaiLieuDienTuParams) => {
        thongKeKhoTaiLieuContext.setFilterThongKeKhoTaiLieuParams((curr) => ({
            ...curr, ...values,
            tuNgay: form.getFieldValue('tuNgay') ? form.getFieldValue('tuNgay').format('YYYY-MM-DD') : undefined,
            denNgay: form.getFieldValue('denNgay') ? form.getFieldValue('denNgay').format('YYYY-MM-DD') : undefined,

        }))
        thongKeKhoTaiLieuContext.setFilterThongKeModalVisible(true)
    }

    return (

        <Form name='QuanLyDinhDanhSearch' layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={[8, 8]}>

                <Col md={8} span={24}>
                    <Form.Item
                        label="Đối tượng:"
                        name="doiTuong"
                    >
                        <AntdSelect
                            virtual={true}
                            allowClear={true}
                            placeholder={'--Chọn đối tượng--'}
                            generateOptions={{
                                model: doiTuongs,
                                label: "label",
                                value: "value",
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col md={8} span={24}>
                    <Form.Item label="Từ ngày" name="tuNgay">
                        <DatePicker
                            style={{ width: "100%" }}
                            placeholder="Chọn ngày"
                            format={"DD/MM/YYYY"}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} span={24}>
                    <Form.Item label="Đến ngày" name="denNgay">
                        <DatePicker
                            style={{ width: "100%" }}
                            placeholder="Chọn ngày"
                            format={"DD/MM/YYYY"}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Row justify="space-around">
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit" >
                            Xem danh sách
                        </AntdButton>
                    </Space>
                </Row>
            </Form.Item>
        </Form>
    )

}