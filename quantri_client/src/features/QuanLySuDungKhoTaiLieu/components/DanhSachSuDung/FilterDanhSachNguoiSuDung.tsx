
import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { ISearchThongKeNguoiSuDungKho, IThongKeNguoiSuDungKho } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import dayjs from 'dayjs'


export const FilterDanhSachNguoiSuDung = ({ searchParams, setSearchParams }: { searchParams: ISearchThongKeNguoiSuDungKho, setSearchParams: React.Dispatch<React.SetStateAction<ISearchThongKeNguoiSuDungKho>> }) => {
    const [form] = Form.useForm()

    const onFinish = async (values: ISearchThongKeNguoiSuDungKho) => {
        if (values) {
            setSearchParams({...searchParams, ...values, 
                tuNgay: values.tuNgay ? dayjs(values.tuNgay).format() : undefined,
                denNgay: values.denNgay ? dayjs(values.denNgay).format() : undefined
            })
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
                                setSearchParams({ pageNumber: 1, pageSize: 10 })
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