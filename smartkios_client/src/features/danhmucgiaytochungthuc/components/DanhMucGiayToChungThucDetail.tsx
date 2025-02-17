import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IDanhMucGiayToChungThuc, ISearchDanhMucGiayToChungThuc } from "../models"
import { useEffect } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { AddDanhMucGiayToChungThuc, GetDanhMucGiayToChungThuc, UpdateDanhMucGiayToChungThuc } from "../redux/action"
import { useDanhMucGiayToChungThucContext } from "../contexts/DanhMucGiayToChungThucContext"
import { resetData } from "@/features/danhmucgiaytochungthuc/redux/slice"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data"
import dayjs from 'dayjs'



export const DanhMucGiayToChungThucDetail = () => {
    const dispatch = useAppDispatch()
    const { data: DanhMucGiayToChungThuc } = useAppSelector(state => state.danhmucgiaytochungthuc)
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)

    const DanhMucGiayToChungThucContext = useDanhMucGiayToChungThucContext()
    const [form] = Form.useForm<IDanhMucGiayToChungThuc>()
    const onFinish = async () => {
        const formData = await form.validateFields()
        if (DanhMucGiayToChungThucContext?.maDanhMucGiayToChungThuc) {
            dispatch(UpdateDanhMucGiayToChungThuc({ id: DanhMucGiayToChungThucContext.maDanhMucGiayToChungThuc, data: formData }))
        } else {
            dispatch(AddDanhMucGiayToChungThuc(formData))
        }
        handleCancel()
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        DanhMucGiayToChungThucContext.setMaDanhMucGiayToChungThuc(undefined)
        DanhMucGiayToChungThucContext.setDanhMucGiayToChungThucModalVisible(false)
    };
    useEffect(() => {
        if (DanhMucGiayToChungThucContext.maDanhMucGiayToChungThuc) {
            dispatch(GetDanhMucGiayToChungThuc(DanhMucGiayToChungThucContext.maDanhMucGiayToChungThuc))
        }

    }, [DanhMucGiayToChungThucContext.maDanhMucGiayToChungThuc])

    useEffect(() => {
        if (DanhMucGiayToChungThuc) {
            form.setFieldsValue({ ...DanhMucGiayToChungThuc})
        }
    }, [DanhMucGiayToChungThuc])

    return (
        <AntdModal visible={DanhMucGiayToChungThucContext.danhMucGiayToChungThucModalVisible} title="Thêm mới sổ chứng thực" handlerCancel={handleCancel} onOk={onFinish}>
            <Form name='DanhMucGiayToChungThuc' layout="vertical" form={form} initialValues={{suDung: true}}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên giấy tờ"
                            name="ten"
                            rules={[{message:"Vui lòng nhập mã giấy tờ", required: true}]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã giấy tờ"
                            name="ma"
                            rules={[{message:"Vui lòng nhập mã giấy tờ", required: true}]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="suDung"
                            valuePropName="checked"
                            rules={[{message:"Vui lòng chọn trạng thái", required: true}]}
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </AntdModal>

    )
}