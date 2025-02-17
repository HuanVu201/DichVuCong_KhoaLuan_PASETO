import { Form, Input, Space, Row, Col, DatePicker } from "antd";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { ISearchService_Logs_Mgr } from "../models";

interface Service_Logs_MgrSearchProps {

    setSearchParams: (params: ISearchService_Logs_Mgr) => void;
}

export const Service_Logs_Mgr_Search = ({
    setSearchParams
}: Service_Logs_MgrSearchProps) => {
    const [form] = Form.useForm();

    // Hàm xử lý khi biểu mẫu được gửi
    const onFinish = (values: ISearchService_Logs_Mgr) => {
        setSearchParams({
            ...values,
            pageNumber: 1, // Reset pageNumber về 1 khi tìm kiếm
            pageSize: 10
        });

    };
    return (
        <Form
            name="Service_Logs_MgrSearch"
            layout="vertical"
            onFinish={onFinish}
            form={form}
            style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        >
               <Row justify="center" gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Nhập mã hồ sơ"
                        name="maHoSo"
                        style={{ marginBottom: '16px' }}
                        rules={[{ required: true, message: "Vui lòng nhập mã hồ sơ" }]}
                    >
                        <Input placeholder="Nhập mã hồ sơ" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Row justify="center">
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit">
                            Xác nhận
                        </AntdButton>
                    </Space>
                </Row>
            </Form.Item>
        </Form>
    );
};
