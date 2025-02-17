import { useFolderContext } from "@/contexts/FolderContext"
import { AddOrUpdateVaiTro, AddVaiTro, GetVaiTro, UpdateVaiTro } from "@/features/vaitro/redux/action"
import { AntdButton, AntdModal, AntdSelect, AntdSpace, } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, Form, FormProps, Input, InputNumber, Row } from "antd"
import { SelectProps } from "antd/lib"
import { useEffect } from "react"
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext"
const INPUT_RULES = {
    name: [{ required: true, message: "Không được để trống!" }],
}
export const SuaVaiTro = ({ handlerClose, visible, folderId }: { handlerClose: () => void, visible: boolean, folderId: string }) => {
    const { datas: vaiTroes, data: vaiTro } = useAppSelector(state => state.vaitro)
    const [form] = Form.useForm()
    const vaiTroContext = useVaiTroModalContext()
    const dispatch = useAppDispatch()
    const onFinish: FormProps["onFinish"] = async (values) => {
        if (folderId) {
            await dispatch(AddOrUpdateVaiTro({ id: folderId, ...values }))
        }

        // vaiTroContext.setRoleId(undefined)
        handlerClose()
        form.resetFields()
    }
    const handleCancel = () => {
        form.resetFields()
        handlerClose()
    }

    useEffect(() => {
        if (folderId) {
            dispatch(GetVaiTro(folderId))
        }
    }, [folderId])

    useEffect(() => {
        if (vaiTro) {
            form.setFieldsValue(vaiTro)
        }
    }, [vaiTro])

    return (
        <AntdModal title="Sửa vai trò" handlerCancel={handleCancel} visible={visible} footer={null}
            // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
            destroyOnClose>
            <Form name='VaiTro' layout="vertical" onFinish={onFinish} form={form} requiredMark={true} >
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Row style={{ alignItems: 'center' }}>
                            <span style={{ fontSize: '15px', fontWeight: '500', marginRight: '10px' }}>Là quyền quản trị đơn vị</span>
                            <Form.Item
                                label=""
                                name="laQuyenQuanTriDonVi"
                                valuePropName="checked"
                                style={{ marginBottom: 0 }}
                            >
                                <Checkbox />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên vai trò"
                            name="name"
                            required
                            rules={INPUT_RULES['name']}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <Input />
                        </Form.Item>
                    </Col>


                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <AntdSpace >
                        <AntdButton type="primary" htmlType="submit">
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </AntdSpace>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}
