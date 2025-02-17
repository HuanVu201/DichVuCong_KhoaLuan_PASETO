import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { IimportThuTuc } from "@/features/thutuc/models";
import { thuTucApi } from "@/features/thutuc/services";
import { AntdButton, AntdModal } from "@/lib/antd/components"
import { Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DongBoThuTucModal = () => {
    const [form] = Form.useForm<IimportThuTuc>();
    const [values, setValues] = useState([]);
    const thuTucContext = useThuTucContext();
    const handlerCancel = () => {
        thuTucContext.setDongBoThuTucModalVisible(false);
    };

    const onFinish = async () => {
        try {
            const res = await thuTucApi.ImportThuTucs({ lstMaTTTHC: values, message: 'string' });
            if (res.status === 201) {
                toast.success("Đồng bộ thủ tục thành công")
                thuTucContext.setDongBoThuTucModalVisible(false)
            }
            return res.data
        } catch (error) {
            toast.info("Đồng bộ thủ tục thất bại")
        }
    }
    const onValuesChange = (changedValues: any, allValues: any) => {
        const lstMaTTTHC = allValues.lstMaTTTHC.replace(/\s/g, ''); // Loại bỏ khoảng trắng
        const separatedValues = lstMaTTTHC.split(',').map((value: any) => value.trim());
        setValues(separatedValues);
    };

    return (
        <AntdModal
            footer={null}
            visible={true}
            title="Đồng bộ thủ tục"
            handlerCancel={handlerCancel}
            width={700}
        >
            <div style={{ marginBottom: '8px', color: 'red' }}>
                <i>Lưu ý: người dùng nhập tối đa 5 mã thủ tục, mỗi thủ tục cách nhau bởi dấu ","</i>
            </div>
            <Form
                name="DongBoThuTuc"
                layout="vertical"
                onFinish={onFinish}
                form={form}
                onValuesChange={onValuesChange}
            >
                <Form.Item
                    label="Nhập mã thủ tục"
                    name="lstMaTTTHC"
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Space>
                        <AntdButton type="primary" htmlType="submit">
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handlerCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item>

            </Form>

        </AntdModal>
    )
}