import { AntdModal, AntdSpace } from "@/lib/antd/components"
import { Checkbox, Col, Form, Input, Row } from "antd"
import { useEffect, useState } from "react"
import { IQuaTrinhTraoDoiCongDan, ISearchQuaTrinhTraoDoiCongDan } from "../models"
import { useQuaTrinhTraoDoiCongDanContext } from "../contexts/QuaTrinhTraoDoiCongDanProvider"
import { quaTrinhTraoDoiCongDanService } from "../services"
import { useAppSelector } from "@/lib/redux/Hooks"
import { toast } from "react-toastify"


export const QuaTrinhTraoDoiCongDanDetail = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchQuaTrinhTraoDoiCongDan>> }) => {
    const quaTrinhTraoDoiCongDanContext = useQuaTrinhTraoDoiCongDanContext()
    const [form] = Form.useForm<IQuaTrinhTraoDoiCongDan>()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    // const [quaTrinhTraoDoiCongDan, setQuaTrinhTraoDoiCongDan] = useState<IQuaTrinhTraoDoiCongDan>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if(!formData.email && !formData.sms && !formData.zalo){
            toast.warn("Vui lòng chọn ít nhất một hình thức gửi")
            return
        }
        await quaTrinhTraoDoiCongDanService.Create({...formData, maHoSo: hoSo?.maHoSo})
        setSearchParams(cur => ({ ...cur}))
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        quaTrinhTraoDoiCongDanContext.setQuaTrinhTraoDoiCongDanModalVisible(false)
        quaTrinhTraoDoiCongDanContext.setMaQuaTrinhTraoDoiCongDan(undefined)
    };
    // useEffect(() => {
    //     (async () => {
    //         if (quaTrinhTraoDoiCongDanContext.maQuaTrinhTraoDoiCongDan) {
    //             const res = await quaTrinhTraoDoiCongDanService.Get(quaTrinhTraoDoiCongDanContext.maQuaTrinhTraoDoiCongDan)
    //             setQuaTrinhTraoDoiCongDan(res.data.data)
    //         }
    //     })()
    // }, [quaTrinhTraoDoiCongDanContext.maQuaTrinhTraoDoiCongDan])

    // useEffect(() => {
    //     if (QuaTrinhTraoDoiCongDan) {
    //         form.setFieldsValue({ ...QuaTrinhTraoDoiCongDan })
    //     }
    // }, [QuaTrinhTraoDoiCongDan])

    return (
        <>
            <AntdModal title="Thêm mới" visible={true} handlerCancel={handleCancel} okText="Thêm mới" onOk={onFinish}>
                <Form name='quaTrinhTraoDoiCongDanDetail' layout="vertical" form={form} requiredMark={quaTrinhTraoDoiCongDanContext.maQuaTrinhTraoDoiCongDan !== null}
                    initialValues={{ thoiHanMacDinh: 6, loaiThoiHan: "month" }} disabled={false}>
                    <Form.Item
                        name="maHoSo"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Row gutter={[8, 8]}>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Nội dung trao đổi"
                                name="noiDungTraoDoi"
                            >
                                <Input.TextArea rows={4} maxLength={2000} showCount />
                            </Form.Item>
                        </Col>
                        <AntdSpace direction="horizontal">
                            <Form.Item
                                label="Gửi qua Email"
                                name="email"
                                valuePropName="checked"
                            >
                                <Checkbox />
                            </Form.Item>
                            <Form.Item
                                label="Gửi qua SMS"
                                name="sms"
                                valuePropName="checked"
                            >
                                <Checkbox />
                            </Form.Item>
                            <Form.Item
                                label="Gửi qua Zalo"
                                name="zalo"
                                valuePropName="checked"
                            >
                                <Checkbox />
                            </Form.Item>
                        </AntdSpace>
                    </Row>
                </Form>
            </AntdModal>
        </>
    )
}