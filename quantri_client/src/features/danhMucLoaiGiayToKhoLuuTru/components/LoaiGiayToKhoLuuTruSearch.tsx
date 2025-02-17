import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ILoaiGiayToKhoLuuTru, ISearchLoaiGiayToKhoLuuTru } from "../models"
import { useCallback } from "react"
// import { LoaiGiayToKhoLuuTruDetail } from "./LoaiGiayToKhoLuuTruDetail"
import { useLoaiGiayToKhoLuuTruContext } from "../context/index"
import { Value } from "sass"

export const suDungs = [
    { label: 'Có', value: true },
    { label: 'Không', value: false },
]

export const LoaiGiayToKhoLuuTruSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLoaiGiayToKhoLuuTru>> }) => {
    const LoaiGiayToKhoLuuTruContext = useLoaiGiayToKhoLuuTruContext()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchLoaiGiayToKhoLuuTru) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })
        form.resetFields()
    }, [])
    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { LoaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='LoaiGiayToKhoLuuTruSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Mã loại giấy tờ"
                            name="ma"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Tên loại giấy tờ"
                            name="ten"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="suDung"
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: suDungs,
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