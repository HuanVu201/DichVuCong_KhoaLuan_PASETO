import { Checkbox, Col, ColorPicker, Form, Input, InputNumber, Row, Select, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IAction, ISearchAction } from "../models"
import React, { useEffect, useState } from "react"
import { AntdButton, AntdModal, AntdSelect } from "../../../lib/antd/components"
import { AddAction, GetAction, UpdateAction } from "../redux/action"
import { useActionContext } from "../contexts/ActionContext"
import { Rule } from "antd/es/form"
import { IBaseExt } from "@/models"
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action"
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE } from "@/data"
import { resetData } from "../redux/slice"
import { ColorFormat } from "antd/es/color-picker/interface"
const INPUT_RULES: Record<keyof Omit<IAction, keyof IBaseExt | "iconName" | "colorCode" | "showInModal" | "showInTable">, Rule[]> = {
    ma: [{ required: true, message: "Không được để trống!" }],
    ten: [{ required: true, message: "Không được để trống!" }],
    quyen: [{ required: true, message: "Không được để trống!" }],
    thuTu: [{ required: true, message: "Không được để trống!" }],
    moTa: [{ required: true, message: "Không được để trống!" }],
}

export const ActionDetail = ({setSearchActionParams}: {setSearchActionParams: React.Dispatch<React.SetStateAction<ISearchAction>>}) => {
    const dispatch = useAppDispatch()
    const { data: Action } = useAppSelector(state => state.action)
    const { datas: dataPermissions } = useAppSelector(state => state.vaitro)
    const [form] = Form.useForm<IAction>()

    useEffect(() => {
        if(dataPermissions === undefined){
            dispatch(SearchPermissionsVaiTro({}))
        }
    }, [dataPermissions])
    const ActionContext = useActionContext()
    console.log(ID_SEPARATE);
    
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (ActionContext?.ActionId) {
            await dispatch(UpdateAction({ id: ActionContext.ActionId, data: { ...formData, quyen: formData.quyen ? (formData.quyen as unknown as string[]).join(ID_SEPARATE) : undefined} })).unwrap()
        } else {
            await dispatch(AddAction({ ...formData,quyen: (formData.quyen as unknown as string[]).join(ID_SEPARATE) })).unwrap()
        }
        setSearchActionParams((curr) => ({...curr}))
        handleCancel()
        // console.log(formData.quyen.join(ID_SEPARATE));

    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        ActionContext.setActionModalVisible(false)
        ActionContext.setActionId(undefined)
    };
    useEffect(() => {
        if (ActionContext.ActionId) {
            dispatch(GetAction(ActionContext.ActionId))
        }
    }, [ActionContext.ActionId])

    useEffect(() => {
        if (Action) {   
            form.setFieldsValue({ ...Action, quyen: Action.quyen ? Action.quyen.split("##").map(x => x) as any : undefined })
        }
    }, [Action])
    
    return (
        <AntdModal title={ActionContext.ActionId ? "Sửa action": "Thêm mới Action"} visible={ActionContext.ActionModalVisible} handlerCancel={handleCancel} footer={null} width={780}>
            <Form name='Action' layout="vertical" onFinish={onFinish} form={form} requiredMark={ActionContext.ActionId !== null}
                initialValues={{ uuTien: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên action"
                            name="ten"
                            hasFeedback
                            rules={INPUT_RULES["ten"]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Form.Item
                            label="Mã action"
                            name="ma"
                            hasFeedback
                            rules={INPUT_RULES["ten"]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                            hasFeedback
                            rules={INPUT_RULES["thuTu"]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị trên Modal"
                            name="showInModal"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị trên Table"
                            name="showInTable"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên Icon"
                            name="iconName"
                        >
                            <Select options={Object.keys(ICON_HOLDER_KEYS).map((key) => {
                                const icon = (ICON_HOLDER as any)[key]
                                return {
                                    value: key,
                                    label: <><span>{icon}</span> : <span>{key}</span></>,
                                }
                            })}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã Màu"
                            name="colorCode"
                        >
                            <ColorPicker showText onChange={(value) => form.setFieldValue("colorCode", value.toHexString())}/>
                        </Form.Item>
                    </Col>
                   
                    <Col span={24}>
                        <Form.Item
                            label="Quyền"
                            name="quyen"
                            hasFeedback
                            rules={INPUT_RULES["quyen"]}
                            
                        >
                            <AntdSelect
                                virtual={false}
                                mode="multiple"
                                
                                generateOptions={{
                                    model: dataPermissions,
                                    label: "claimValue",
                                    value: "claimValue",
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                            hasFeedback
                            rules={INPUT_RULES["moTa"]}
                        >
                            <Input.TextArea />
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