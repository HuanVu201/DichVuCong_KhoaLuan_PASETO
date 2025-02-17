import { useEffect, useState } from "react"
import { useQuanLyDinhDanhContext } from "../../context/quanLyDinhDanhCongDanContext"
import { ISearchQuanLyTaiKhoanDinhDanhParams } from "../../models/QuanLyTaiKhoanModel"
import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { useCallback } from "react"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { toast } from "react-toastify"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"

const loaiDinhDanhs = [
    { label: 'Đã định danh', value: true },
    { label: 'Chưa định danh', value: false }
]
const doiTuongs = [
    { label: 'Công dân', value: 'congDan' },
    { label: 'Tổ chức/Doanh nghiệp', value: 'toChucDoanhNghiep' }
]
const doTuois = [
    { label: 'Dưới 18 tuổi', value: '0##17' },
    { label: 'Từ 18 đến 30', value: '18##30' },
    { label: 'Từ 31 đến 40', value: '31##40' },
    { label: 'Từ 41 đến 50', value: '41##50' },
    { label: 'Trên 50 tuổi', value: '51##1000' },
]
const gioiTinhs = [
    { label: 'Nam', value: '1' },
    { label: 'Nữ', value: '2' },
]

export const TaiKhoanFilter = () => {
    const quanLyDinhDanhContext = useQuanLyDinhDanhContext()

    const [form] = Form.useForm()
    const onFinish = (values: ISearchQuanLyTaiKhoanDinhDanhParams) => {
        if (values.daDinhDanh == true || values.daDinhDanh == false) {
            quanLyDinhDanhContext.setFilterTaiKhoanParams((curr) => ({ 
                ...curr,
                 ...values,
                tuNgay: form.getFieldValue('tuNgay') ? form.getFieldValue('tuNgay').format('YYYY-MM-DD') : undefined,
                denNgay: form.getFieldValue('denNgay') ? form.getFieldValue('denNgay').format('YYYY-MM-DD') : undefined,
                }))
            quanLyDinhDanhContext.setFilterThongKeModalVisible(true)
        }
        else {
            toast.error('Vui lòng chọn loại định danh!')
        }
    }

    return (

        <Form name='QuanLyDinhDanhSearch' layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={[8, 8]}>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Loại định danh:"
                        name="daDinhDanh"
                        required
                    >
                        <AntdSelect
                            virtual={true}
                            placeholder={'--Chọn loại định danh--'}
                            generateOptions={{
                                model: loaiDinhDanhs,
                                label: "label",
                                value: "value",
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Từ ngày"
                        name="tuNgay"
                    >
                        <DatePicker style={{ width: '100%' }} format={FORMAT_DATE_WITHOUT_TIME} ></DatePicker>
                    </Form.Item>
                </Col>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Đến ngày"
                        name="denNgay"
                    >
                        <DatePicker style={{ width: '100%' }} format={FORMAT_DATE_WITHOUT_TIME}  ></DatePicker>
                    </Form.Item>
                </Col>

                <Col md={8} span={24}>
                    <Form.Item
                        label="Đối tượng:"
                        name="doiTuong"
                    >
                        <AntdSelect
                            virtual={true}
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
                    <Form.Item
                        label="Độ tuổi:"
                        name="doTuoi"
                    >
                        <AntdSelect
                            virtual={true}
                            placeholder={'--Chọn độ tuổi--'}
                            generateOptions={{
                                model: doTuois,
                                label: "label",
                                value: "value",
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col md={8} span={24}>
                    <Form.Item
                        label="Giới tính:"
                        name="gioiTinh"
                    >
                        <AntdSelect
                            virtual={true}
                            placeholder={'--Chọn giới tính--'}
                            generateOptions={{
                                model: gioiTinhs,
                                label: "label",
                                value: "value",
                            }}
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