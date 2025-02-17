import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ITypeOfProc_Mgr } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddTypeOfProc_Mgr, GetTypeOfProc_Mgr, SearchTypeOfProc_Mgr, UpdateTypeOfProc_Mgr } from "../redux/action"
import { useTypeOfProc_MgrContext } from "../contexts/TypeOfProc_MgrContext"
import { resetData,resetDatas } from "@/features/proGruop_Mgr/redux/slice"
import { useProcGroup_MgrContext } from "@/features/proGruop_Mgr/contexts/ProcGroup_MgrContext"

export const TypeOfProc_MgrDetail = () => {
    const dispatch = useAppDispatch()
    const { data: typeOfProc_Mgr, datas: typeOfProc_Mgrs } = useAppSelector(state => state.typeofproc_mgr)
    const typeOfProc_MgrContext = useTypeOfProc_MgrContext()
    const ProcGroup_MgrContext = useProcGroup_MgrContext();
    const [form] = Form.useForm<ITypeOfProc_Mgr>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (typeOfProc_MgrContext?.typeOfProc_MgrId) {
            dispatch(UpdateTypeOfProc_Mgr({ id: typeOfProc_MgrContext.typeOfProc_MgrId, data: { ...formData,nhomthutucid: ProcGroup_MgrContext.procGroup_MgrId,} }))
        } else {
            try{
                const resultAdd =  await  dispatch(AddTypeOfProc_Mgr({ ...formData,nhomthutucid: ProcGroup_MgrContext.procGroup_MgrId }))
                if (AddTypeOfProc_Mgr.fulfilled.match(resultAdd)) {
                    const { succeeded } = resultAdd.payload;
                    if (succeeded === true) {
                      dispatch(SearchTypeOfProc_Mgr({  pageNumber: 1, pageSize: 50, nhomthutucid: ProcGroup_MgrContext.procGroup_MgrId, }));
                    }
                  }
            }
            catch(error)
            {
                console.error('Error:', error);
            }
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        typeOfProc_MgrContext.setTypeOfProc_MgrModalVisible(false)
        typeOfProc_MgrContext.setTypeOfProc_MgrId(undefined)
    };
    useEffect(() => {
        if (typeOfProc_MgrContext.typeOfProc_MgrId) {
            dispatch(GetTypeOfProc_Mgr(typeOfProc_MgrContext.typeOfProc_MgrId))
        }
    }, [typeOfProc_MgrContext.typeOfProc_MgrId])

    useEffect(() => {
        if (typeOfProc_Mgr) {
            form.setFieldsValue({ ...typeOfProc_Mgr })
        }
    }, [typeOfProc_Mgr])

    // useEffect(() => {
    //     if (!loaiTypeOfProc_Mgrs?.length && !loading) {
    //         dispatch(SearchLoaiTypeOfProc_Mgr({}))
    //     }
    // }, [])

    return (
        <AntdModal title={typeOfProc_MgrContext.typeOfProc_MgrId ? `Sửa thông tin loại thủ tục` : `Thêm mới loại thủ tục`} visible={typeOfProc_MgrContext.typeOfProc_MgrModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='TypeOfProc_Mgr' layout="vertical" onFinish={onFinish} form={form} requiredMark={typeOfProc_MgrContext.typeOfProc_MgrId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên loại thủ tục "
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
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <Input />
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