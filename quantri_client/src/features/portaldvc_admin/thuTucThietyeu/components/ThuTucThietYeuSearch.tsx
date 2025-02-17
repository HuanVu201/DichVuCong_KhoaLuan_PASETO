import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common/CollapseContent"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IThuTucThietYeu, ISearchThuTucThietYeu } from "../model"
import { useCallback } from "react"
// import { ThuTucThietYeuDetail } from "./ThuTucThietYeuDetail"
import { useThuTucThietYeuContext } from "../contexts"

export const ThuTucThietYeuSearch = () => {
    const thuTucThietYeuContext = useThuTucThietYeuContext()

    const [form] = Form.useForm()
    const onFinish = (values: ISearchThuTucThietYeu) => {
        thuTucThietYeuContext.setSearchParams((curr) => ({ ...curr, ...values }))
        

    }
    const resetSearchParams = useCallback(() => {
        thuTucThietYeuContext.setSearchParams({ pageNumber: 1, pageSize: 200, reFetch: true })
        form.resetFields()
    }, [])

    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { thuTucThietYeuContext.setThuTucThietYeuModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='ThuTucThietYeuSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>

                    <Col md={8} span={24}>
                        <Form.Item
                            label="Mã thủ tục"
                            name="maTTHC"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Tên thủ tục"
                            name="tenTTHC"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Đường dẫn DVC"
                            name="linkDVC"
                        >
                            <Input />
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