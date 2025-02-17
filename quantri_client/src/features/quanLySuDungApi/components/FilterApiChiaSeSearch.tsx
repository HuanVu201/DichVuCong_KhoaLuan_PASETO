import { Form, Input, Space, Row, Col, DatePicker, TimePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback } from "react"
// import { LogAuthenDetail } from "./LogAuthenDetail"
import dayjs from "dayjs"
import { ISearchApiChiaSe } from "../models"
import { useQuanLySuDungAPIContext } from "../contexts"
import { toast } from "react-toastify"


export const FilterApiChiaSeSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchApiChiaSe>> }) => {
    const apiChiaSeContext = useQuanLySuDungAPIContext();
    const [form] = Form.useForm()
    const onFinish = (values: ISearchApiChiaSe) => {
        const ngayBatDau = form.getFieldValue('ngayBatDau') ? dayjs(form.getFieldValue('ngayBatDau')).format('YYYY-MM-DDT00:00:00') : undefined
        const ngayKetThuc = form.getFieldValue('ngayKetThuc') ? dayjs(form.getFieldValue('ngayKetThuc')).format('YYYY-MM-DDT23:59:59') : undefined
        if ((ngayBatDau && !ngayKetThuc) || (!ngayBatDau && ngayKetThuc)) {
            toast.error('Chọn đủ mốc thời gian!')
            return
        }

        setSearchParams((curr) => ({
            ...curr,
            id: apiChiaSeContext.apiId,
            tuNgay: ngayBatDau || undefined,
            denNgay: ngayKetThuc || undefined
        }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })
        form.resetFields()
    }, [])

    return (
        <CollapseContent>
            <Form name='LogAuthenSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item label="Từ ngày" name="ngayBatDau">
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày"
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item label="Đến ngày" name="ngayKetThuc">
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