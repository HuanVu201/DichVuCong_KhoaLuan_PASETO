import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback } from "react"
import { ISearchSoChungThuc } from "@/features/sochungthuc/models"
import { useSoChungThucContext } from "@/features/sochungthuc/contexts/SoChungThucContext"

export const SoChungThucDonViSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchSoChungThuc>> }) => {
    const SoChungThucContext = useSoChungThucContext()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchSoChungThuc) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ reFetch: true })
        form.resetFields()
    }, [])
    

    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { SoChungThucContext.setSoChungThucModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='soChungThuc' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col  span={24}>
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
                        <AntdButton type="default" onClick={resetSearchParams}>
                            Tải lại
                        </AntdButton>
                    </Space>
                </Row>
            </Form>

        </CollapseContent>
    )
}