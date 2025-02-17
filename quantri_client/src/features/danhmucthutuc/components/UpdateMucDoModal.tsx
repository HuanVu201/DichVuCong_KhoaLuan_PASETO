import {
    AntdButton,
    AntdModal,
    AntdSelect,
    AntdSpace,
} from "@/lib/antd/components";
import { Col, Form, Row, SelectProps, Space, Spin } from "antd";
import { Suspense, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { useDonViContext } from "@/features/donvi/contexts/DonViContext";
import { IUpdateMultiDonViThuTuc } from "@/features/donvithutuc/models";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { donViThuTucApi } from "@/features/donvithutuc/services";
import { SearchNguoiTiepNhanThuTucs } from "@/features/thutuc/redux/action";

export const UpdateMucDoModal = ({ donViIds }: { donViIds: never[] }) => {
    const mucDoOptions: SelectProps["options"] = [
        { label: "Dịch vụ công", value: "2" },
        {
            label: "Dịch vụ công trực tuyến một phần",
            value: "3",
        },
        {
            label: "Dịch vụ công trực tuyến toàn trình",
            value: "4",
        },
    ];
    const dispatch = useAppDispatch();
    const donViThuTucContext = useThuTucContext();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const handleCancel = () => {
        donViThuTucContext.setUpdateMucDoModalVisible(false)
    }
    const handleSubmit = async () => {
        setLoading(true);
        var mucDo = form.getFieldValue("mucDo");
        if (mucDo) {
            const putData = {
                Ids: donViIds,
                MucDo: mucDo as string,
            } as IUpdateMultiDonViThuTuc;
            const res = await donViThuTucApi.UpdateMulti(putData);
            if (res.status === 200)
                dispatch(SearchNguoiTiepNhanThuTucs({ pageNumber: 1, pageSize: 50, reFetch: true }));
            toast.success("Cập nhật mức độ thành công");
            handleCancel();
            return res.data

        } else {
            toast.warning("Vui lòng chọn mức độ");
        }
    }
    return (
        <AntdModal
            footer={null}
            visible={donViThuTucContext.updateMucDoModalVisible}
            title="Chọn mức độ"
            handlerCancel={handleCancel}
        >
            <Spin spinning={loading}>
                <Form
                    name="ChonMucDo"
                    onFinish={handleSubmit}
                    layout="horizontal"
                    form={form}
                    requiredMark={true}
                >
                    <Col md={24} span={24}>
                        <Form.Item
                            name="mucDo"
                            rules={[{ required: true, message: "Vui lòng chọn mức độ" }]}
                        >
                            <AntdSelect options={mucDoOptions}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Form.Item>
                        <Row justify="space-around">
                            <Space size="large">
                                <AntdButton type="primary" htmlType="submit" >
                                    Xác nhận
                                </AntdButton>
                                <AntdButton type="default" onClick={handleCancel}>
                                    đóng
                                </AntdButton>
                            </Space>
                        </Row>
                    </Form.Item>
                </Form>
            </Spin>
        </AntdModal>
    );
}