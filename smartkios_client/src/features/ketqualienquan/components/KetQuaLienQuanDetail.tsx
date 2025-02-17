import { Col, DatePicker, Form, Input, Row } from "antd"
import { IKetQuaLienQuan, ISearchKetQuaLienQuan } from "../models"
import { useEffect, useState } from "react"
import { AntdModal } from "../../../lib/antd/components"
import { useKetQuaLienQuanContext } from "../contexts/KetQuaLienQuanProvider"
import { ketQuaLienQuanService } from "../services"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"
import dayjs from 'dayjs'
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"

export const KetQuaLienQuanDetail = ({maHoSo, searchParams}: {maHoSo: string, searchParams: ISearchKetQuaLienQuan}) => {
    const ketQuaLienQuanContext = useKetQuaLienQuanContext()
    const {data: user} = useAppSelector(state => state.user)
    const [form] = Form.useForm<IKetQuaLienQuan>()
    const [ketQuaLienQuan, setKetQuaLienQuan] = useState<IKetQuaLienQuan>()
    const coQuanBanHanh = Form.useWatch("coQuanBanHanh", form)
    const dinhKem = Form.useWatch("dinhKem", form)

    const onFinish = async () => {
        const formData = form.getFieldsValue() as IKetQuaLienQuan
        if (ketQuaLienQuanContext?.ketQuaLienQuanId) {
            await ketQuaLienQuanContext.onUpdate(ketQuaLienQuanContext.ketQuaLienQuanId, formData, searchParams)
        } else {
            await ketQuaLienQuanContext.onAdd(formData, searchParams)
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        ketQuaLienQuanContext.setKetQuaLienQuanModalVisible(false)
        ketQuaLienQuanContext.setKetQuaLienQuanId(undefined)
    };
    useEffect(() => {
        (async () => {
            if (ketQuaLienQuanContext.ketQuaLienQuanId) {
                const res = await ketQuaLienQuanService.Get(ketQuaLienQuanContext.ketQuaLienQuanId)
                const ketQuaLienQuan = res.data.data
                if(ketQuaLienQuan){
                    setKetQuaLienQuan({...ketQuaLienQuan, 
                        ngayKy: ketQuaLienQuan.ngayKy ? dayjs(ketQuaLienQuan.ngayKy) : undefined,
                        ngayCoHieuLuc: ketQuaLienQuan.ngayCoHieuLuc ? dayjs(ketQuaLienQuan.ngayCoHieuLuc) : undefined,
                        ngayHetHieuLuc: ketQuaLienQuan.ngayHetHieuLuc ? dayjs(ketQuaLienQuan.ngayHetHieuLuc) : undefined,
                        
                    } as any)
                }
            } else {
                form.setFieldValue("coQuanBanHanh", user?.officeName)
            }
        })()
        
    }, [ketQuaLienQuanContext.ketQuaLienQuanId])
    useEffect(() => {
        if (maHoSo){
            form.setFieldValue("maHoSo", maHoSo)
        }
        if (ketQuaLienQuan) {
            form.setFieldsValue({ ...ketQuaLienQuan})
        }
    }, [ketQuaLienQuan, maHoSo])

    return (
        <AntdModal title="Thêm mới kết quả liên quan" width={1200} visible={true} handlerCancel={handleCancel} okText="Xác nhận" onOk={onFinish}>
        <Form name='KetQuaLienQuan' layout="vertical" onFinish={onFinish} form={form} requiredMark={ketQuaLienQuanContext.ketQuaLienQuanId !== null} >
            <Form.Item hidden name="maHoSo"><Input/></Form.Item>
            <Row gutter={[8, 8]}>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Loại kết quả"
                        name="loaiKetQua"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Số ký hiệu"
                        name="soKyHieu"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Người ký"
                        name="nguoiKy"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Ngày ký"
                        name="ngayKy"
                    >
                        <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
                    </Form.Item>
                </Col>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Ngày có hiệu lực"
                        name="ngayCoHieuLuc"
                    >
                        <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
                    </Form.Item>
                </Col>
                <Col md={8} span={24}>
                    <Form.Item
                        label="Ngày hết hiệu lực"
                        name="ngayHetHieuLuc"
                    >
                        <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Cơ quan ban hành"
                        name="coQuanBanHanh"
                    >
                        <Input title={coQuanBanHanh}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Đính kèm"
                        name="dinhKem"
                    >
                        {maHoSo ? <RegularUpload 
                            kySoToken
                            dinhKem={dinhKem}
                            fieldName={"dinhKem"} 
                            folderName={maHoSo} 
                            form={form}/>: null}
                        
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Trích yếu"
                        name="trichYeu"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Col>
                {/* <Col md={12} span={24}>
                    <Form.Item
                        label="Trạng thái"
                        name="trangThai"
                    >
                        <Input/>
                    </Form.Item>
                </Col> */}
            </Row>
        </Form>
        </AntdModal>
    )
}