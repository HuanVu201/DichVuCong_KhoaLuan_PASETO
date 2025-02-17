
import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { ISearchTaiLieuLuuTruCongDan, Nguon_CongDanTaiLen, Nguon_KetQuaGiaiQuyetHoSo, Nguon_ThanhPhanHoSo } from "../models"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useKhoTaiLieuCongDanContext } from "../contexts/KhoTaiLieuCongDanContext"
import { useCallback, useEffect, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { useAppSelector } from "@/lib/redux/Hooks"
import { ILinhVuc } from "@/features/linhvuc/models"
import { useEdges } from "reactflow"
import { linhVucApi } from "@/features/linhvuc/services"
import { tap } from "node:test/reporters"
import { toast } from "react-toastify"
import { combineReducers } from "@reduxjs/toolkit"

const loaiNguons = [
    { label: Nguon_CongDanTaiLen, value: Nguon_CongDanTaiLen },
    { label: Nguon_KetQuaGiaiQuyetHoSo, value: Nguon_KetQuaGiaiQuyetHoSo },
    { label: Nguon_ThanhPhanHoSo, value: Nguon_ThanhPhanHoSo },
]

export default function SearchThongKeKhoTaiLieu({ setSearchParams, setBlockCallApi, linhVucs }: {
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiLieuLuuTruCongDan>>
    setBlockCallApi: React.Dispatch<React.SetStateAction<boolean>>
    linhVucs: ILinhVuc[] | undefined
}) {
    const [form] = Form.useForm()

    const onFinish = (values: ISearchTaiLieuLuuTruCongDan) => {
        setBlockCallApi(false)
        setSearchParams((curr) => ({
            ...curr,
            ...values,
        }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })
        form.resetFields()
    }, [])

    return (
        <CollapseContent defaultVisible
            extraButtons={[]}
        >
            <Form name='KhoTaiLieuSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>

                    <Col md={6} span={24}>
                        <Form.Item label="Từ ngày" name="tuNgay">
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày"
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item label="Đến ngày" name="ngayKetThuc">
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày"
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Nguồn"
                            name="nguon"
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: loaiNguons,
                                    label: "label",
                                    value: "value",
                                }}
                                placeholder="Chọn nguồn giấy tờ"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="maLinhVuc" label="Lĩnh vực">
                            <AntdSelect
                                generateOptions={{
                                    model: linhVucs,
                                    value: "ma",
                                    label: "ten",
                                }}
                                allowClear
                                showSearch
                                placeholder="Chọn lĩnh vực"
                            />
                        </Form.Item>
                    </Col>

                </Row>
                <Form.Item>
                    <Row justify="space-around">
                        <Space size="large">
                            <AntdButton type="primary" htmlType="submit" >
                                Xác nhận
                            </AntdButton>
                            <AntdButton type="default" onClick={resetSearchParams}>
                                Tải lại
                            </AntdButton>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent>
    )
}