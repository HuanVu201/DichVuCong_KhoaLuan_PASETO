import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IProcGroup_Mgr } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddProcGroup_Mgr, GetProcGroup_Mgr, UpdateProcGroup_Mgr } from "../redux/action"
import { useProcGroup_MgrContext } from "../contexts/ProcGroup_MgrContext"
import { resetData,resetDatas } from "@/features/proGruop_Mgr/redux/slice"

export const ProcGroup_MgrDetail = () => {
    const dispatch = useAppDispatch()
    const { data: procGroup_Mgr, datas: procGroup_Mgrs } = useAppSelector(state => state.procgroup_mgr)
    const procGroup_MgrContext = useProcGroup_MgrContext()
    const [form] = Form.useForm<IProcGroup_Mgr>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (procGroup_MgrContext?.procGroup_MgrId) {
            dispatch(UpdateProcGroup_Mgr({ id: procGroup_MgrContext.procGroup_MgrId, data: { ...formData, } }))
        } else {
            dispatch(AddProcGroup_Mgr({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        procGroup_MgrContext.setProcGroup_MgrModalVisible(false)
        procGroup_MgrContext.setProcGroup_MgrId(undefined)
    };
    useEffect(() => {
        if (procGroup_MgrContext.procGroup_MgrId) {
            dispatch(GetProcGroup_Mgr(procGroup_MgrContext.procGroup_MgrId))
        }
    }, [procGroup_MgrContext.procGroup_MgrId])

    useEffect(() => {
        if (procGroup_Mgr) {
            form.setFieldsValue({ ...procGroup_Mgr })
        }
    }, [procGroup_Mgr])

    // useEffect(() => {
    //     if (!loaiProcGroup_Mgrs?.length && !loading) {
    //         dispatch(SearchLoaiProcGroup_Mgr({}))
    //     }
    // }, [])

    return (
        <AntdModal title={procGroup_MgrContext.procGroup_MgrId ? `Sửa thông tin nhóm thủ tục` : `Thêm mới nhóm thủ tục`} visible={procGroup_MgrContext.procGroup_MgrModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='ProcGroup_Mgr' layout="vertical" onFinish={onFinish} form={form} requiredMark={procGroup_MgrContext.procGroup_MgrId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên nhóm thủ tục"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên lĩnh vực' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="icon"
                            name="icon"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Màu sắc"
                            name="mauSac"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đối tượng"
                            name="doiTuong"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <Input/>
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