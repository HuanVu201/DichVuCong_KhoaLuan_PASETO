import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSo } from "../models"
import { useCallback } from "react"
import { useDuThaoXuLyHoSoContext } from "../contexts/DuThaoXuLyHoSoContext"

export const DuThaoXuLyHoSoSearch = ({ setSearchParams, resetSearchParams }: {resetSearchParams:() => void; setSearchParams: React.Dispatch<React.SetStateAction<ISearchDuThaoXuLyHoSo>> }) => {
    const [form] = Form.useForm()
    const onFinish = (values: ISearchDuThaoXuLyHoSo) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const clearSearch = useCallback(() => {
        resetSearchParams();
        form.resetFields()
    }, [])
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)
    return (
        <CollapseContent
        >
            <Form name='diaBan' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đơn vị"
                            name="donVi"
                        >
                            <AntdSelect allowClear generateOptions={{ model: donVis, label: 'groupName', value: 'groupCode' }}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>

                        <Form.Item
                            label="Tên số chứng thực"
                            name="tenSo"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="space-around">
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit">
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={clearSearch}>
                            Tải lại
                        </AntdButton>
                    </Space>
                </Row>
            </Form>

        </CollapseContent>
    )
}