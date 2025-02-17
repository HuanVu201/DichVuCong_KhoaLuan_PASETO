import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IDSTaiLieuHDSD } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { AddDSTaiLieuHDSD, GetDSTaiLieuHDSD, UpdateDSTaiLieuHDSD } from "../redux/action"
import { useDSTaiLieuHDSDContext } from "../contexts/DSTaiLieuHDSDContext"
import { resetData } from "../redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import dayjs from 'dayjs'


export const DSTaiLieuHDSDDetail = () => {
    const dispatch = useAppDispatch()
    const { data: DSTaiLieuHDSD, datas: DSTaiLieuHDSDs } = useAppSelector(state => state.dstailieuhdsd)
    const DSTaiLieuHDSDContext = useDSTaiLieuHDSDContext()
    const [form] = Form.useForm<IDSTaiLieuHDSD>()
    const dinhKem = Form.useWatch("tepDinhKem", form)

    const onFinish = async () => {
        const formData = form.getFieldsValue() // nội dung ở đây là giá trị khởi tạo lúc gọi api
        if (DSTaiLieuHDSDContext?.DSTaiLieuHDSDId) {
            dispatch(UpdateDSTaiLieuHDSD({ id: DSTaiLieuHDSDContext.DSTaiLieuHDSDId, data: { ...formData } }))
        } else {
            dispatch(AddDSTaiLieuHDSD({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        DSTaiLieuHDSDContext.setDSTaiLieuHDSDVisible(false)
        DSTaiLieuHDSDContext.setDSTaiLieuHDSDId(undefined)
    };
    useEffect(() => {
        if (DSTaiLieuHDSDContext.DSTaiLieuHDSDId) {
            dispatch(GetDSTaiLieuHDSD(DSTaiLieuHDSDContext.DSTaiLieuHDSDId))
        }
    }, [DSTaiLieuHDSDContext.DSTaiLieuHDSDId])

    useEffect(() => {
        if (DSTaiLieuHDSD) {
            form.setFieldsValue({ ...DSTaiLieuHDSD, ngayDang: DSTaiLieuHDSD.ngayDang ? dayjs(DSTaiLieuHDSD.ngayDang) : null } as any)
        }
    }, [DSTaiLieuHDSD])
    console.log(dinhKem);
    
    return (
        <AntdModal title="Thêm mới DSTaiLieuHDSD" width={1000} visible={DSTaiLieuHDSDContext.DSTaiLieuHDSDVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DSTaiLieuHDSD' layout="vertical" onFinish={onFinish} form={form} requiredMark={DSTaiLieuHDSDContext.DSTaiLieuHDSDId === null} initialValues={{ thuTu: 1 }}>
                <div style={{ display: 'flex' }}>
                    <Col >
                        <Form.Item
                            label="Ngày đăng"
                            name="ngayDang"
                            style={{ marginRight: '50px' }}

                        >
                            <DatePicker></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                            style={{ marginRight: '50px' }}
                        >
                            <InputNumber></InputNumber>
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item
                            label="File đính kèm"
                            name="tepDinhKem"
                        >
                            <RegularUpload
                                dinhKem={dinhKem}
                                fieldName={"tepDinhKem"}
                                folderName={"TepDinhKem"}
                                maxCount={1}
                                form={form} />
                        </Form.Item>
                    </Col>
                 
                </div>


                <Row gutter={[8, 8]}>

                    <Col span={24}>
                        <Form.Item
                            label="Tên tài liệu"
                            name="tenTaiLieu"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                        >
                            <Input.TextArea></Input.TextArea>
                        </Form.Item>
                    </Col>



                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish}>
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}