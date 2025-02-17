import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { resetData } from "@/features/menuketquathutuc/redux/slice"
import { useMenuKetQuaThuTucContext } from "../contexts/MenuKetQuaThuTucContext"
import { IThuTuc } from "@/features/thutuc/models"
import { AddMenuKetQuaThuTuc, GetMenuKetQuaThuTuc, UpdateMenuKetQuaThuTuc } from "../redux/action"
import { IMenuKetQuaThuTuc } from "../models"
import { ICON_HOLDER, ICON_HOLDER_KEYS } from "@/data"
import { CATALOG_OPTIONS } from "@/features/cocautochuc/components/modals/AddGroupChild"
import { coCauToChucService } from "@/features/cocautochuc/services"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { menuKetQuaThuTucApi } from "../services"
import { thuTucApi } from "@/features/thutuc/services"
import { IKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { ketQuaThuTucService } from "@/features/ketquathutuc/services"

export const MenuKetQuaThuTucDetail = () => {
    const dispatch = useAppDispatch()
    const { data: menuKetQuaThuTuc, datas: menuKetQuaThuTucs } = useAppSelector(state => state.menuketquathutuc)
    const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
    const [form] = Form.useForm<IMenuKetQuaThuTuc>()
    const [ketQuaThuTucs, setKetQuaThuTucs] = useState<IKetQuaThuTuc[]>()

    useEffect(() => {
        (async () => {
            if(menuKetQuaThuTucContext.thuTucs === undefined){
                const res = await thuTucApi.Search({pageNumber:1, pageSize: 2500})
                menuKetQuaThuTucContext.setThuTucs(res.data.data)
            }
            if(menuKetQuaThuTucContext.coCauToChucs === undefined){
                const coCau = await coCauToChucService.Search({cataLog: "so-ban-nganh", pageNumber:1, pageSize: 1000})
                menuKetQuaThuTucContext.setCoCauToChucs(coCau.data.data)
            }
            if(menuKetQuaThuTucContext.rootMenuKetQuaThuTucs === undefined){
                const menu = await menuKetQuaThuTucApi.Search({pageNumber:1, pageSize: 1000, isRoot: true})
                menuKetQuaThuTucContext.setRootMenuKetQuaThuTucs(menu.data.menuKetQuaThuTucs.data)
            }
        })()
    }, [menuKetQuaThuTucContext.thuTucs, menuKetQuaThuTucContext.coCauToChucs, menuKetQuaThuTucContext.rootMenuKetQuaThuTucs])

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (menuKetQuaThuTucContext?.menuKetQuaThuTucId) {
            dispatch(UpdateMenuKetQuaThuTuc({ id: menuKetQuaThuTucContext.menuKetQuaThuTucId, data: { ...formData }}))
        } else {
            dispatch(AddMenuKetQuaThuTuc(formData))
        }
        handleCancel()
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        menuKetQuaThuTucContext.setMenuKetQuaThuTucModalVisible(false)
        menuKetQuaThuTucContext.setMenuKetQuaThuTucId(undefined)
    };

    const onThuTucChange = async (maTTHC: string) => {
        const res = await ketQuaThuTucService.Search({maTTHC, pageNumber: 1, pageSize: 100})
        setKetQuaThuTucs(res.data.data)
        form.setFieldValue("maKetQuaTTHC", undefined)
    }

    useEffect(() => {
        if (menuKetQuaThuTucContext.menuKetQuaThuTucId) {
            dispatch(GetMenuKetQuaThuTuc(menuKetQuaThuTucContext.menuKetQuaThuTucId))
        }
    }, [menuKetQuaThuTucContext.menuKetQuaThuTucId])

    useEffect(() => {
        if (menuKetQuaThuTuc) {
            form.setFieldsValue({ ...menuKetQuaThuTuc })
        }
    }, [menuKetQuaThuTuc])
    return (
        <AntdModal width={1280} title={`${menuKetQuaThuTucContext.menuKetQuaThuTucId ? 'Sửa' : "Thêm"} menu kết quả thủ tục`} visible={true} handlerCancel={handleCancel} footer={null}>
            <Form initialValues={{thuTuMenu: 1, active: true}} name='QuyTrinhXuLy' layout="vertical" onFinish={onFinish} form={form} requiredMark={menuKetQuaThuTucContext.menuKetQuaThuTucId === null} >
                <Row gutter={[8, 8]}>
                    <Col span={20}>
                        <Form.Item
                            label="Tên menu"
                            name="tenMenu"
                            rules={[{ required: true, message: 'Vui lòng nhập tên menu' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTuMenu"
                            rules={[{required: true, message:"Vui lòng nhập thứ tự"}]}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item
                            label="Tên Icon"
                            name="iconName"
                        >
                            <Select options={(Object.keys(ICON_HOLDER_KEYS) as Array<keyof typeof ICON_HOLDER_KEYS>).map((key) => {
                                const icon = (ICON_HOLDER)[key]
                                return {
                                    value: key,
                                    label: <><span>{icon}</span> : <span>{key}</span></>,
                                }
                            })} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            label="Sử dụng"
                            name="active"
                            valuePropName="checked"
                        >
                            <Checkbox ></Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Mã đơn vị"
                            name="maDonVi"
                        >
                            <AntdSelect generateOptions={{model: menuKetQuaThuTucContext.coCauToChucs, label : "groupName", value: "groupCode"}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Thủ tục"
                            name="maTTHC"
                        >
                            <AntdSelect onChange={onThuTucChange} generateOptions={{model: menuKetQuaThuTucContext.thuTucs, label : "tenTTHC", value: "maTTHC"}} showSearch/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Mã kết quả TTHC"
                            name="maKetQuaTTHC"
                        >
                            <AntdSelect generateOptions={{model: ketQuaThuTucs, label : "tenKetQua", value: "maKetQua"}} showSearch allowClear/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Thuộc cấp"
                            name="catalog"
                        >
                            <Select options={CATALOG_OPTIONS?.filter(x => x.value != "so-ban-nganh")}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Thuộc menu"
                            name="parentId"
                        >
                            <AntdSelect generateOptions={{model: menuKetQuaThuTucContext.rootMenuKetQuaThuTucs, label : "tenMenu", value: "id"}}  allowClear showSearch/>
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