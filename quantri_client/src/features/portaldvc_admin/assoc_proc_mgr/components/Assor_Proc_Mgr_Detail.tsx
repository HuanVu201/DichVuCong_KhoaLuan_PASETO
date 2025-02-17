import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IAssor_Proc_Mgr } from "../model"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "@/lib/antd/components"
import { useAssor_Proc_Mgr_Context } from "../contexts"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { assor_Proc_Mgr_Api } from "../services"

export const Assor_Proc_Mgr_Detail = () => {
    const dispatch = useAppDispatch()
    const assor_Proc_MgrContext = useAssor_Proc_Mgr_Context()
    const [data, setData] = useState<IAssor_Proc_Mgr>()

    const [form] = Form.useForm<IAssor_Proc_Mgr>()
    const { datas: ThuTucs, data:ThuTuc } = useAppSelector((state) => state.thutuc);
    const { datas: Assor_Proc_Mgrs, data:Assor_Proc_Mgr } = useAppSelector((state) => state.assor_proc_mgr);
    const onFinish = async () => {
        (async () => {
            const formData = await form.validateFields()
            console.log(formData)
            if (formData) {
                if (assor_Proc_MgrContext.assor_Proc_MgrId) {
                    const res = await assor_Proc_Mgr_Api.Update({
                        id: assor_Proc_MgrContext.assor_Proc_MgrId,
                        data: {
                            ...formData
                        }
                    })
                    if (res.status == 200) {
                        toast.success("Cập nhật thành công!")
                        assor_Proc_MgrContext.setSearchParams({
                            ...assor_Proc_MgrContext.searchParams,
                            reFetch: true
                        })
                        handleCancel()
                    } else {
                        toast.error('Thao tác thất bại!')
                    }

                } else {
                    const res = await assor_Proc_Mgr_Api.Create({
                        ...formData
                    })
                    if (res.status == 201) {
                        toast.success("Thêm mới thành công!")
                        assor_Proc_MgrContext.setSearchParams({
                            ...assor_Proc_MgrContext.searchParams,
                            reFetch: true
                        })
                        handleCancel()
                    } else {
                        toast.error('Thao tác thất bại!')
                    }
                }

            } else {
                toast.error("Nhập đầy đủ các trường thông tin!")
                return
            }

        })()

    }
    const handleCancel = () => {
        form.resetFields();
        assor_Proc_MgrContext.setAssor_Proc_Mgr_ModalVisible(false)
        assor_Proc_MgrContext.setAssor_Proc_Mgr_Id(undefined)
    };


    useEffect(() => {
        (async () => {
            if (assor_Proc_MgrContext.assor_Proc_MgrId && assor_Proc_MgrContext.assor_Proc_MgrModalVisible) {
                assor_Proc_MgrContext.setLoading(true)
                const res = await assor_Proc_Mgr_Api.Get(assor_Proc_MgrContext.assor_Proc_MgrId)
                if (res.data.data) {
                    setData(res.data.data)
                } else {
                    toast.error("Lỗi lấy thông tin!")
                    assor_Proc_MgrContext.setLoading(false)
                }
            }
        })()
    }, [assor_Proc_MgrContext.assor_Proc_MgrId])

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
            })
            assor_Proc_MgrContext.setLoading(false)
        }
    }, [data])

    useEffect(() => {
        dispatch(
            SearchThuTuc({
              pageNumber: 1,
              pageSize: 100,
              reFetch: true,
            })
          );
    },[])

    return (
        <AntdModal title={assor_Proc_MgrContext.assor_Proc_MgrId ? "Sửa thông tin DVC liên quan" : "Thêm mới DVC liên quan"} visible={assor_Proc_MgrContext.assor_Proc_MgrModalVisible} handlerCancel={handleCancel} width={780}
            footer={[
                <Space >
                    <AntdButton type="primary" onClick={onFinish}>
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >
            <Form name='Assor_Proc_Mgr' layout="vertical" onFinish={onFinish} form={form} requiredMark={assor_Proc_MgrContext.assor_Proc_MgrId !== null}
                initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>

                <Col xs={24} md={24}>
                    <Form.Item
                        label="Thủ tục"
                        name="thuTucid"
                        style={{ marginBottom: '16px' }}
                        rules={[{ required: true, message: 'Vui lòng chọn thủ tục' }]}
                    >
                        <AntdSelect
                            defaultValue={Assor_Proc_Mgr?.thuTucId}
                            placeholder="Chọn thủ tục"
                            allowClear
                            generateOptions={{ model: ThuTucs, label: 'tenTTHC', value: 'id' }}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item
                        label="Thủ tục liên quan"
                        name="thuTucLienQuanId"
                        style={{ marginBottom: '16px' }}
                        rules={[{ required: true, message: 'Vui lòng chọn thủ tục liên quan' }]}
                    >
                        <AntdSelect
                            defaultValue={Assor_Proc_Mgr?.thuTucLienQuanId}
                            placeholder="Chọn thủ tục"
                            allowClear
                            generateOptions={{ model: ThuTucs, label: 'tenTTHC', value: 'id' }}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                    <Col span={4}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                            hasFeedback
                            rules={[{ required: true, message: 'Vui lòng nhập thứ tự' }]}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </AntdModal>
    )
}