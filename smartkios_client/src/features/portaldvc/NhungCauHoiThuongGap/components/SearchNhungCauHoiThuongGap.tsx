import { AntdButton } from "@/lib/antd/components"
import { Form, Input, Row, Space } from "antd"

export const SearchNhungCauHoiThuongGap = () => {
    const [form] = Form.useForm()

    const onFinish = () => {

    }
    return (
        <Form name='loaiPhiLePhiSearch' layout="vertical" onFinish={onFinish} form={form}>
            <Row justify="center">
                <Form.Item
                    name="noiDungCauHoi"
                    style={{ width: '600px', marginRight: '15px' }}
                >
                    <Input placeholder="Nhập nội dung cần tìm" />
                </Form.Item>
                <Form.Item
                    name="noiDungCauHoi"
                    style={{ width: '300px', marginRight: '15px' }}

                >
                    <Input placeholder="Câu hỏi theo cơ quan" />
                </Form.Item>
                <Form.Item >
                    <Space size="large" >
                            <AntdButton htmlType="submit" style={{ backgroundColor: '#ce7a58', color: '#fff'}}>
                                Tìm kiếm
                            </AntdButton>
                    </Space>
                </Form.Item>
            </Row>

        </Form>
    )
}