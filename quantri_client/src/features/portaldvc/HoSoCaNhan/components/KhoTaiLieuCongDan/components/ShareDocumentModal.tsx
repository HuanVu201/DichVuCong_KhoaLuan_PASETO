import { AntdModal } from "@/lib/antd/components";
import { useKhoTaiLieuCongDanContext } from "../contexts/KhoTaiLieuCongDanContext";
import { Button, Col, Form, Input } from "antd";
import { ITaiLieuLuuTruCongDan } from "../models";
import { khoTaiLieuCongDanApi } from "../services";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/redux/Hooks";


export default function ShareDocumnetModal({ setLoading }: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const [form] = Form.useForm<{ soDinhDanh: string }>()
    const { data: user } = useAppSelector(state => state.user)
    const onFinish = async () => {
        const formData: any = await form.validateFields()
        if (form.getFieldValue('SoDinhDanhNhan') == user?.soDinhDanh) {
            toast.error("Không thể chia sẻ cho chính mình!")
            return
        }

        if (khoTaiLieuContext.taiLieuId) {
            setLoading(true)
            const res = await khoTaiLieuCongDanApi.AddChiaSeTaiLieu({
                soDinhDanhNhan: form.getFieldValue('SoDinhDanhNhan'),
                taiLieuLuuTruId: khoTaiLieuContext.taiLieuId
            })
            
            if (res.data.succeeded) {
                toast.success(res.data.message)
                handleCancel()
            } else {
                toast.error(res.data.message)
            }
        }

        setLoading(false)
    }

    const handleCancel = () => {
        form.resetFields();
        khoTaiLieuContext.setChiaSeTaiLieuCongDanModalVisible(false)
        khoTaiLieuContext.setTaiLieuId(undefined)
    }

    return (<>
        <AntdModal className="ShareDomcument" title={"Chia sẻ tài liệu"} visible={khoTaiLieuContext.chiaSeTaiLieuCongDanModalVisible} handlerCancel={handleCancel} width={500}
            footer={[
                <Button type="primary" onClick={onFinish} >
                    Xác nhận
                </Button>,
                <Button onClick={handleCancel} >
                    Hủy
                </Button>,

            ]}
        >
            <Form name='ShareDomcument' layout="vertical" onFinish={onFinish} form={form}
                initialValues={{ uuTien: 1 }}>
                <Col span={24}>
                    <Form.Item
                        label="Số định danh người nhận"
                        name="SoDinhDanhNhan"
                        rules={[{ required: true, message: 'Vui lòng nhập số định danh người nhận' }]}
                    >
                        <Input placeholder="Nhập số định danh " />
                    </Form.Item>
                </Col>
            </Form>

        </AntdModal>
    </>)
}