import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IDanhMucGiayToChungThuc, ISearchDanhMucGiayToChungThuc } from "../models"
import { useCallback } from "react"
import { useDanhMucGiayToChungThucContext } from "../contexts/DanhMucGiayToChungThucContext"

export const DanhMucGiayToChungThucSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMucGiayToChungThuc>> }) => {
    const DanhMucGiayToChungThucContext = useDanhMucGiayToChungThucContext()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchDanhMucGiayToChungThuc) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ reFetch: true })
        form.resetFields()
    }, [])
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)

    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { DanhMucGiayToChungThucContext.setDanhMucGiayToChungThucModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='diaBan' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                <Col span={24}>
                        <Form.Item
                            label="Tên giấy tờ"
                            name="ten"
                            rules={[{message:"Vui lòng nhập mã giấy tờ", required: true}]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã giấy tờ"
                            name="ma"
                            rules={[{message:"Vui lòng nhập mã giấy tờ", required: true}]}
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