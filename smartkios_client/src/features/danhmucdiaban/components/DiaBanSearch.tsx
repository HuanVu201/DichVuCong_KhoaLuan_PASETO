import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IDanhMucDiaBan, ISearchDanhMucDiaBan } from "../models"
import { useCallback } from "react"
import { useDiaBanContext } from "../contexts/DiaBanContext"

export const DiaBanSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMucDiaBan>> }) => {
    const diaBanContext = useDiaBanContext()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchDanhMucDiaBan) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({  reFetch: true })
        form.resetFields()
    }, [])
    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { diaBanContext.setDiaBanModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='diaBan' layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    label="Tên địa bàn"
                    name="tenDiaBan"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mã địa bàn"
                    name="maDiaBan"
                >
                    <Input />
                </Form.Item>
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