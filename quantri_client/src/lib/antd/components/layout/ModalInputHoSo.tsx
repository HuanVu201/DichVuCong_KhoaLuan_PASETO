import { Col, Form, Input, Row } from "antd"
import { AntdModal } from "../modal/Modal"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { setMaHoSoTheoDonViQuery } from "@/features/hoso/redux/slice";
import { useEffect, useRef } from "react";


export const ModalInputHoSo = ({ closeModal }: { closeModal: () => void }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    let [searchQuerys, setSearchQuerys] = useSearchParams();
    const [form] = Form.useForm<any>()
    const inputRef = useRef<any>(null);
    const handleCancel = () => {
        closeModal()
    };

    const onFinish = () => {
        const maHoSo = form.getFieldValue("maHoSo")
        // window.location.href = '/dvc/tra-cuu/ho-so-theo-don-vi';
        navigate("/dvc/tra-cuu/ho-so-theo-don-vi");

        dispatch(setMaHoSoTheoDonViQuery(maHoSo))
        closeModal()
    }
    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

    }, []);
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onFinish();
        }
    };
    return (
        <AntdModal visible={true} title="" handlerCancel={handleCancel} onOk={onFinish}>
            <Form name='config' layout="vertical" form={form}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Mã hồ sơ"
                            name="maHoSo"
                        >
                            <Input placeholder="Nhập mã hồ sơ" onKeyPress={handleKeyPress}  ref={inputRef} />
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space >
                    <AntdButton type="primary" onClick={onFinish} >
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            </Form.Item> */}
            </Form>
        </AntdModal>
    )
}