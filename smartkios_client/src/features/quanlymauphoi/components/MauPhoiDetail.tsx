import { Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IMauPhoi } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { AddMauPhoi, GetMauPhoi, UpdateMauPhoi } from "../redux/action"
import { useMauPhoiContext } from "../context/MauPhoiContext"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"

export const MauPhoiDetail = () => {
    const dispatch = useAppDispatch()
    const MauPhoiContext = useMauPhoiContext()
    const { data: mauphoi } = useAppSelector(state => state.mauphoi)
    const { datas: cocautochucs } = useAppSelector(state => state.cocautochuc)
    const { datas: linhvucs } = useAppSelector(state => state.linhvuc)
    const { datas: thutucs } = useAppSelector(state => state.thutuc)
    const [form] = Form.useForm<IMauPhoi>()

    let arrMaDonVi: any = []
    let strMaDonVi: any
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        arrMaDonVi = form.getFieldValue('maDonVi') || [];
        if(arrMaDonVi.length==0){
            strMaDonVi =  null;
        }
        else{
            strMaDonVi = arrMaDonVi.join('#')
        }
        if (!form.getFieldValue('loaiPhoi') || !form.getFieldValue('tenMauPhoi')) {
            toast.warning("Nhập đầy đủ thông tin yêu cầu!")
        }
        else {

            if (MauPhoiContext?.MauPhoiId) {
                dispatch(UpdateMauPhoi({
                    id: MauPhoiContext.MauPhoiId,
                    data: {
                        loaiPhoi: form.getFieldValue('loaiPhoi'),
                        tenMauPhoi: form.getFieldValue('tenMauPhoi'),
                        maDonVi: strMaDonVi,
                        maLinhVuc: form.getFieldValue('maLinhVuc') || null,
                        maThuTuc: form.getFieldValue('maThuTuc') || null,
                    }
                }))
                handleCancel()

            } else {
                dispatch(AddMauPhoi({ ...formData, maDonVi: strMaDonVi, maLinhVuc: form.getFieldValue('maLinhVuc'),  maThuTuc: form.getFieldValue('maThuTuc') }))
                handleCancel()

            }

        }

    }
    const handleCancel = () => {
        form.resetFields();
        arrMaDonVi = []
        form.setFieldsValue({
            maDonVi: arrMaDonVi,
            maLinhVuc: '',
            maThuTuc: ''
        })
        dispatch(resetData())
        MauPhoiContext.setMauPhoiModalVisible(false)
        MauPhoiContext.setMauPhoiId(undefined)
    };
    useEffect(() => {
        if (MauPhoiContext.MauPhoiId) {
            dispatch(GetMauPhoi(MauPhoiContext.MauPhoiId))
        }
    }, [MauPhoiContext.MauPhoiId])

    useEffect(() => {
        if (mauphoi) {
            form.setFieldsValue({
                ...mauphoi,
                maDonVi: mauphoi?.maDonVi!=null ? mauphoi?.maDonVi.split('#') : []
            })
        }
    }, [mauphoi])


    return (
        <AntdModal title={MauPhoiContext.MauPhoiId ? "Sửa thông tin mẫu phôi" : "Thêm mới mẫu phôi"} visible={MauPhoiContext.MauPhoiModalVisible} handlerCancel={handleCancel} footer={null} width={780}>
            <Form name='MauPhoi' layout="vertical" onFinish={onFinish} form={form} requiredMark={MauPhoiContext.MauPhoiId !== null}
                initialValues={{ uuTien: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            label="Loại phôi"
                            name="loaiPhoi"
                            rules={[{ required: true, message: 'Vui lòng nhập loại phôi' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên mẫu phôi"
                            name="tenMauPhoi"
                            rules={[{ required: true, message: 'Vui lòng nhập tên mẫu phôi' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Mã đơn vị"
                            name="maDonVi"
                        // rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
                        >
                            <AntdSelect
                                mode="tags"
                                // defaultValue={mauphoi?.maDonVi.split('#') || undefined}
                                virtual={true}
                                allowClear
                                generateOptions={{
                                    model: cocautochucs,
                                    label: "groupName",
                                    value: "groupCode",
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã lĩnh vực"
                            name="maLinhVuc"
                        >
                            <AntdSelect
                                defaultValue={mauphoi?.maLinhVuc}
                                showSearch
                                allowClear
                                virtual={true}
                                generateOptions={{
                                    model: linhvucs,
                                    label: "ten",
                                    value: "ma",
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã thủ tục"
                            name="maThuTuc"
                        >
                            <AntdSelect
                                defaultValue={mauphoi?.maThuTuc}
                                showSearch
                                allowClear
                                virtual={true}
                                generateOptions={{
                                    model: thutucs,
                                    label: "tenTTHC",
                                    value: "maTTHC",
                                }}
                            />
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