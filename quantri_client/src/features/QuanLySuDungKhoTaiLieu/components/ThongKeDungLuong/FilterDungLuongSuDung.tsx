import { useEffect, useState } from "react"
import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { useCallback } from "react"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { toast } from "react-toastify"
import { IThongKeDungLuongFilter } from "./ThongKeDungLuongSwapper"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"



export const FilterDungLuongSuDung = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<IThongKeDungLuongFilter | undefined>> }) => {
    const [form] = Form.useForm()

    const onFinish = async (values: IThongKeDungLuongFilter) => {
        if (values) {
            setSearchParams(values)
        }
    }

    return (
        <CollapseContent textButton="Thống kê chi tiết">
            <Form name='FilterDungLuongSuDung' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số định danh"
                            name="soDinhDanh"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Từ ngày"
                            name="tuNgay"
                        >
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đến ngày"
                            name="denNgay"
                        >
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Row justify="space-around">
                        <Space size="large">
                            <AntdButton type="primary" htmlType="submit" >
                                Xem thống kê
                            </AntdButton>
                            <AntdButton onClick={() => { 
                                setSearchParams(undefined)
                                form.resetFields()
                             }} >
                                Tải lại
                            </AntdButton>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent>
    )

}