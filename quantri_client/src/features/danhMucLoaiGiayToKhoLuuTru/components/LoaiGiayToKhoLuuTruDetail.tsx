import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ILoaiGiayToKhoLuuTru, ISearchLoaiGiayToKhoLuuTru } from "../models"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile, UploadTable } from "../../../lib/antd/components"
import { useLoaiGiayToKhoLuuTruContext } from "../context/index"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { LoadingOutlined } from "@ant-design/icons"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { IDanhMucChung } from "@/features/danhmucdungchung/models"
import { danhMucChungApi } from "@/features/danhmucdungchung/services"
import { loaiGiayToKhoLuuTruApi } from "../services"
import { suDungs } from "./LoaiGiayToKhoLuuTruSearch"

export const LoaiGiayToKhoLuuTruDetail = ({ searchParams, setSearchParams }: {
    searchParams: ISearchLoaiGiayToKhoLuuTru | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchLoaiGiayToKhoLuuTru>>
}) => {
    const dispatch = useAppDispatch()
    const loaiGiayToKhoLuuTruContext = useLoaiGiayToKhoLuuTruContext()
    const [data, setData] = useState<ILoaiGiayToKhoLuuTru>()

    const [loading, setLoading] = useState<boolean>(false)

    const [form] = Form.useForm<ILoaiGiayToKhoLuuTru>()

    const onFinish = async () => {
        (async () => {
            const formData: any = await form.validateFields()

            setLoading(true)
            if (loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId) {
                const resUpdate = await loaiGiayToKhoLuuTruApi.Update({
                    id: loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId,
                    data: {
                        ...formData
                    }
                })
                if (resUpdate.data.succeeded) {
                    toast.success("Cập nhật thành công!")
                    setSearchParams({ ...searchParams, reFetch: true })
                    handleCancel()
                } else {
                    toast.error("Cập nhật thất bại!")
                }

            } else {
                const resAdd = await loaiGiayToKhoLuuTruApi.Create({
                    ...formData
                })
                if (resAdd.data.succeeded) {
                    toast.success("Thêm mới thành công!")
                    setSearchParams({ ...searchParams, reFetch: true })
                    handleCancel()
                } else {
                    toast.error("Thêm mới thất bại thất bại!")
                }
            }
            setLoading(false)
        })()
    }

    const handleCancel = () => {
        form.resetFields();
        loaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruModalVisible(false)
        loaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruId(undefined)
    };
    useEffect(() => {
        (async () => {
            if (loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId && loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruModalVisible) {
                const resGet = await loaiGiayToKhoLuuTruApi.Get(loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId)
                if(resGet.data.data){
                    form.setFieldsValue({...resGet.data.data})
                }else{
                    toast.error("Không có thông tin!")
                }
            }
        })()
    }, [loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId])

   
    return (
        <AntdModal title={loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId ? "Sửa thông tin loại giấy tờ" : "Thêm mới loại giấy tờ"} visible={loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruModalVisible} handlerCancel={handleCancel} width={780}
            footer={[
                <Button type="primary" onClick={onFinish} >
                    Xác nhận
                </Button>,
                <Button onClick={handleCancel} >
                    Hủy
                </Button>,

            ]}
        >
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form name='LoaiGiayToKhoLuuTru' layout="vertical" onFinish={onFinish} form={form} requiredMark={loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId !== null}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[32, 8]}>
                        <Col md={20} span={24}>
                            <Form.Item
                                label="Mã loại giấy tờ"
                                name="ma"
                                rules={[{ required: true, message: 'Vui lòng nhập mã' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col md={4} span={24}>
                            <Form.Item
                                label="Sử dụng"
                                name="suDung"
                                valuePropName="checked"
                            >
                                <Checkbox ></Checkbox>
                            </Form.Item>
                        </Col>

                        <Col md={24} span={24}>
                            <Form.Item
                                label="Tên loại giấy tờ"
                                name="ten"
                                rules={[{ required: true, message: 'Vui lòng nhập tên loại giấy tờ' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Spin>
        </AntdModal>
    )
}