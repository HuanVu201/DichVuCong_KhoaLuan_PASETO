import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IBanner } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddBanner, GetBanner, UpdateBanner } from "../redux/action"
import { useBannerContext } from "../contexts/BannerContext"
import { resetData } from "../redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"

const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];
export const BannerDetail = () => {
    const dispatch = useAppDispatch()
    const { data: banner, datas: banners } = useAppSelector(state => state.banner)
    const bannerContext = useBannerContext()
    const [form] = Form.useForm<IBanner>()
    const dinhKem = Form.useWatch('imageUrl',form)
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (bannerContext?.maBanner) {
            dispatch(UpdateBanner({ id: bannerContext.maBanner, data: { ...formData, } }))
        } else {
            dispatch(AddBanner({ ...formData }))
        }
        form.resetFields()
        bannerContext.setMaBannerModalVisible(false)
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        bannerContext.setMaBannerModalVisible(false)
        bannerContext.setMaBanner(undefined)
    };
    useEffect(() => {
        if (bannerContext.maBanner) {
            dispatch(GetBanner(bannerContext.maBanner))
        }
    }, [bannerContext.maBanner])

    useEffect(() => {
        if (banner) {
            form.setFieldsValue({ ...banner })
        }
    }, [banner])

    return (
        <AntdModal title="Thêm mới banner" visible={bannerContext.maBannerModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='banner' layout="vertical" onFinish={onFinish} form={form} requiredMark={bannerContext.maBanner === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đường dẫn ảnh"
                            name="imageUrl"
                        >
                             {/* <RegularUpload 
                                    dinhKem={dinhKem}
                                    fieldName={"imageUrl"} 
                                    folderName={"Banner"} 
                                    form={form}/> */}
                            <AntdUploadPublicFile form={form} fieldName="imageUrl" folderName="Banner" dinhKem={dinhKem}/>
                            {/* <AntdUpLoad editing={bannerContext.maBannerModalVisible !== undefined} formInstance={form} folderName="banner" fieldName="imageUrl" accept="image/png, image/jpeg" listType="picture" useDefaultCustomEvent/> */}
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="suDung"
                            valuePropName="checked"
                        >
                            <Checkbox  ></Checkbox>
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