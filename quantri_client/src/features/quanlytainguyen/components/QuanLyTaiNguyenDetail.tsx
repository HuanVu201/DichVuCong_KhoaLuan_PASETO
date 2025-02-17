import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row } from "antd"
import { IQuanLyTaiNguyen, ISearchQuanLyTaiNguyen } from "../models"
import { useEffect, useState } from "react"
import { AntdModal } from "../../../lib/antd/components"
import { useQuanLyTaiNguyenContext } from "../contexts/QuanLyTaiNguyenProvider"
import { quanLyTaiNguyenService } from "../services"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"
import dayjs from 'dayjs'
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { toast } from "react-toastify"
import { getFileSize } from "@/utils/common"

export const QuanLyTaiNguyenDetail = ({ searchParams, isAdmin }: { isAdmin: boolean; searchParams: ISearchQuanLyTaiNguyen }) => {
    const QuanLyTaiNguyenContext = useQuanLyTaiNguyenContext()
    const { data: user } = useAppSelector(state => state.user)
    const [form] = Form.useForm<IQuanLyTaiNguyen>()
    const [QuanLyTaiNguyen, setQuanLyTaiNguyen] = useState<IQuanLyTaiNguyen>()
    const coQuanBanHanh = Form.useWatch("coQuanBanHanh", form)
    const dinhKem = Form.useWatch("dinhKem", form)
    const [fileSizes, setFileSizes] = useState();

    const onFinish = async () => {
        const formData = form.getFieldsValue() as IQuanLyTaiNguyen
        if (QuanLyTaiNguyenContext?.QuanLyTaiNguyenId) {
            await QuanLyTaiNguyenContext.onUpdate(QuanLyTaiNguyenContext.QuanLyTaiNguyenId, { ...formData, kichThuocTep: fileSizes as any }, searchParams)

        } else {
            await QuanLyTaiNguyenContext.onAdd({ ...formData, kichThuocTep: fileSizes as any }, searchParams)

        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        QuanLyTaiNguyenContext.setQuanLyTaiNguyenModalVisible(false)
        QuanLyTaiNguyenContext.setQuanLyTaiNguyenId(undefined)
    };
    useEffect(() => {
        (async () => {
            if (QuanLyTaiNguyenContext.QuanLyTaiNguyenId) {
                const res = await quanLyTaiNguyenService.Get(QuanLyTaiNguyenContext.QuanLyTaiNguyenId)
                const QuanLyTaiNguyen = res.data.data
                if (QuanLyTaiNguyen) {
                    setQuanLyTaiNguyen({
                        ...QuanLyTaiNguyen,
                    } as any)
                }
            } else {
                form.setFieldValue("coQuanBanHanh", user?.officeName)
            }
        })()

    }, [QuanLyTaiNguyenContext.QuanLyTaiNguyenId])

    useEffect(() => {
        if (QuanLyTaiNguyen) {
            form.setFieldsValue({
                ...QuanLyTaiNguyen,

            } as any)
        }
    }, [QuanLyTaiNguyen])
    useEffect(() => {
        const fetchSize = async () => {
            const dinhKem = QuanLyTaiNguyen?.dinhKem || form.getFieldValue("dinhKem");
            if (dinhKem) {
                const size = await getFileSize(dinhKem);
                setFileSizes(size);
            }
        }
        fetchSize();
    }, [QuanLyTaiNguyen, form.getFieldValue("dinhKem")]);

    return (
        <AntdModal title={QuanLyTaiNguyenContext.QuanLyTaiNguyenId ? "Chỉnh sửa tài nguyên chi tiết" : "Thêm mới tài nguyên"} width={1200} visible={true} handlerCancel={handleCancel} okText="Xác nhận" onOk={onFinish}>
            <Form name='QuanLyTaiNguyen' layout="vertical" onFinish={onFinish} form={form} requiredMark={QuanLyTaiNguyenContext.QuanLyTaiNguyenId !== null} >
                <Form.Item hidden name="maHoSo"><Input /></Form.Item>
                <Form.Item hidden name="kichThuocTep"><Input /></Form.Item>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col md={isAdmin ? 16 : 12} span={24}>
                        <Form.Item
                            label="Tên tài nguyên"
                            name="ten"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đính kèm"
                            name="dinhKem"
                        >
                            {<RegularUpload
                                kySoToken
                                dinhKem={dinhKem}
                                fieldName={"dinhKem"}
                                folderName={"QuanLyTaiNguyen"}
                                form={form} />}
                        </Form.Item>
                    </Col>
                    {isAdmin ? <Col md={8} span={24}>
                        <Form.Item
                            label="Là tài nguyên hệ thống"
                            name="public"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col> : null}

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="mota"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>


                    <Col md={12} span={24}>
                        <Form.Item
                            label=""
                            name="mota"
                        >
                            <div style={{ marginTop: '25px', fontWeight: '500' }}>
                                Lưu ý: Để lưu hình ảnh mẫu dấu, mẫu chữ ký người dùng thực hiện đóng dấu hoặc ký mẫu, xử lý ảnh mẫu dấu, mẫu chữ ký và lưu dưới định dạng .png. Tham khảo cách xử lý hình ảnh mẫu dấu, mẫu chữ ký để nền trong suốt (chuyển sang định dạng .png) tại đường dẫn <a target="_blank" href="https://www.remove.bg">https://www.remove.bg</a>
                            </div>
                        </Form.Item>
                    </Col>


                </Row>
            </Form>
        </AntdModal>
    )
}