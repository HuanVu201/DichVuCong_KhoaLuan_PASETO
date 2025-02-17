import { AntdModal } from "@/lib/antd/components"
import { ITaiLieuLuuTruCongDan, ISearchTaiLieuLuuTruCongDan, Nguon_CongDanTaiLen } from "../models"
import { Button, Col, Form, Input, Row } from "antd"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppSelector } from "@/lib/redux/Hooks"
import { khoTaiLieuCongDanApi } from "../services"
import { fileApi } from "@/features/file/services"
import { bytesToMB } from "../../KhoTaiLieuDienTu/components/ThemGiayToVaoKhoModal"
import { toast } from "react-toastify"


export default function PullTaiLieuModal({ setViewFileLoading, setAddKhoTaiLieuModalVisiable, formPost, filePath, maLinhVuc }: {
    setViewFileLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setAddKhoTaiLieuModalVisiable: React.Dispatch<React.SetStateAction<boolean>>,
    formPost: string, filePath: string, maLinhVuc: string
}) {
    const [form] = Form.useForm<ITaiLieuLuuTruCongDan>()
    const onFinish = async () => {
        const formData: any = await form.validateFields()

        setViewFileLoading(true)

        let dungLuong: number = 0
        if (filePath) {
            const valueGetFile = await fileApi.GetFileByte({ path: filePath })
            if (valueGetFile) {
                dungLuong = bytesToMB(valueGetFile.data.size)
            } else {
                toast.error("Lỗi kiểm tra dung lượng file đính kèm!")
            }
        }

        if (dungLuong > 0) {
            const resAddGiayTo = await khoTaiLieuCongDanApi.AddTaiLieuVaoKho({
                duongDan: filePath,
                tenGiayTo: form.getFieldValue('tenGiayTo'),
                dungLuong: dungLuong,
                nguon: formPost, 
                maLinhVuc: maLinhVuc

            })
            if (resAddGiayTo.data.succeeded) {
                toast.success(resAddGiayTo.data.message)
                handleCancel()
            } else {
                toast.error(resAddGiayTo.data.message)
            }
        }

        setViewFileLoading(false)

    }


    const handleCancel = () => {
        form.resetFields();
        setAddKhoTaiLieuModalVisiable(false)

    }

    return (
        <AntdModal className="PullTaiLieuModal" title={"Thêm tài liệu vào kho cá nhân"} visible={filePath ? true : false} handlerCancel={handleCancel} width={500}
            footer={[
                <Button type="primary" onClick={onFinish} >
                    Xác nhận
                </Button>,
                <Button onClick={handleCancel} >
                    Hủy
                </Button>,

            ]}
        >
            <Form name='PullTaiLieu' layout="vertical" onFinish={onFinish} form={form}
                initialValues={{ uuTien: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên giấy tờ"
                            name="tenGiayTo"
                            rules={[{ required: true, message: 'Vui lòng nhập tên giấy tờ' }]}
                        >
                            <Input disabled={false} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </AntdModal>)
}