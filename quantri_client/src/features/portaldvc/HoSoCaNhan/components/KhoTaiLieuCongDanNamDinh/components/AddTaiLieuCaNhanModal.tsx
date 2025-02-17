import { AntdButton, AntdModal, AntdSelect } from "@/lib/antd/components"
import { Button, Col, Form, Input, Row, Spin } from "antd"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppSelector } from "@/lib/redux/Hooks"
import { fileApi } from "@/features/file/services"
import { bytesToMB } from "../../KhoTaiLieuDienTu/components/ThemGiayToVaoKhoModal"
import { toast } from "react-toastify"
import { Suspense, useEffect, useState } from "react"
import { loaiGiayToKhoLuuTruApi } from "@/features/danhMucLoaiGiayToKhoLuuTru/services"
import { ILoaiGiayToKhoLuuTru } from "@/features/danhMucLoaiGiayToKhoLuuTru/models"
import { FormBuilder } from '@formio/react'
import { Eform, EformProps } from "@/lib/eform";
import "formiojs/dist/formio.full.css";
import { LoadingOutlined } from "@ant-design/icons"
import { ISearchTaiLieuGiayToCaNhan, ITaiLieuGiayToCaNhan } from "../models"
import { useKhoTaiLieuCongDanNamDinhContext } from "../contexts"
import { LoaiNhomGiayToCaNhanApi } from "../services/LoaiNhomGiayToCaNhanService"
import { TaiLieuGiayToCaNhanApi } from "../services/TaiLieuGiayToCaNhanService"
import ThongTinGiayToDVCQG from "@/features/QuanLySuDungKhoTaiLieu/components/DanhSachSuDung/ThongTinGiayToDVCQG"

export default function AddTaiLieuCaNhanModal({ searchParams, setSearchParams }: {
    searchParams: ISearchTaiLieuGiayToCaNhan | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiLieuGiayToCaNhan>>,
}) {
    const khoTaiLieuContext = useKhoTaiLieuCongDanNamDinhContext()
    const [form] = Form.useForm<ITaiLieuGiayToCaNhan>()
    const dinhKem = Form.useWatch('duongDan', form)
    const [hasEForm, setHasEForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [typeGiayTo, setTypeGiayTo] = useState<string>()
    const [dongBoDVCQGVisible, setDongBoDVCQGVisible] = useState(false)

    const onFinish = async () => {
        const formData: any = await form.validateFields()
        if (!form.getFieldValue('loaiGiayToCaNhan') && !form.getFieldValue('nhomGiayToCaNhan')) {
            toast.error("Chọn loại/nhóm giấy tờ")
            return
        }
        if (!typeGiayTo) {
            toast.error("Không có thông tin loại/nhóm giấy tờ")
            return
        }
        const resAddGiayTo = await TaiLieuGiayToCaNhanApi.Create({
            duongDan: form.getFieldValue('duongDan'),
            tenGiayTo: form.getFieldValue('tenGiayTo'),
            type: typeGiayTo,
            loaiNhomGiayToCaNhanId: form.getFieldValue('loaiGiayToCaNhan') || form.getFieldValue('nhomGiayToCaNhan')

        })
        if (resAddGiayTo.data.succeeded) {
            toast.success(resAddGiayTo.data.message)
            setSearchParams({
                ...searchParams,
                reFetch: true
            })
            handleCancel()
        } else {
            toast.error(resAddGiayTo.data.message)
        }


        setLoading(false)

    }

    const handleCancel = () => {
        form.resetFields();
        khoTaiLieuContext.setAddGiayToModalVisible(false)

    }

    const onOkHandler = async (dinhKem: string) => {
        if(!dinhKem){
            toast.error("Có lỗi xảy ra khi lấy tệp đính kèm")
            return;
        }
        form.setFieldValue("duongDan", dinhKem)
    }


    return (
        <AntdModal className="AddKhoTaiLieuModal" title={`Thêm mới tài liệu`} visible={khoTaiLieuContext.addGiayToModalVisible} handlerCancel={handleCancel} fullsizeScrollable={hasEForm} width='70vw'

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
                <Form name='khoTaiLieu' layout="vertical" onFinish={onFinish} form={form}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>

                        <Col md={12} span={24}>
                            <Form.Item
                                label="Tên giấy tờ"
                                name="tenGiayTo"
                                rules={[{ required: true, message: 'Vui lòng nhập tên giấy tờ' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="File giấy tờ (.PDF)"
                                name="duongDan"
                                rules={[{ required: true, message: 'Vui lòng chọn giấy tờ' }]}
                            >
                                <RegularUpload
                                    form={form}
                                    fieldName={"duongDan"}
                                    folderName={`KhoTaiLieuCaNhan`}
                                    dinhKem={dinhKem}
                                    accept="application/pdf"
                                    maxCount={1} extraElement={(loading) => (<AntdButton loading={loading} onClick={() => setDongBoDVCQGVisible(true)}>
                                    Chọn giấy tờ từ DVCQG
                                </AntdButton>)}/>

                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Loại giấy tờ"
                                name="loaiGiayToCaNhan"
                            >
                                <AntdSelect
                                    virtual={true}
                                    generateOptions={{
                                        model: khoTaiLieuContext.loaiGiayTos,
                                        label: "ten",
                                        value: "id",
                                    }}
                                    onChange={(e) => {
                                        setTypeGiayTo('loại giấy tờ')
                                        form.setFieldValue('nhomGiayToCaNhan', undefined)
                                    }}
                                    placeholder="Chọn loại/nhóm giấy tờ của tài liệu"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Nhóm giấy tờ"
                                name="nhomGiayToCaNhan"
                            >
                                <AntdSelect
                                    virtual={true}
                                    generateOptions={{
                                        model: khoTaiLieuContext.nhomGiayTos,
                                        label: "ten",
                                        value: "id",
                                    }}
                                    onChange={(e) => {
                                        setTypeGiayTo('nhóm giấy tờ')
                                        form.setFieldValue('loaiGiayToCaNhan', undefined)
                                    }}
                                    placeholder="Chọn loại/nhóm giấy tờ của tài liệu"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
            {dongBoDVCQGVisible ? <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
            <ThongTinGiayToDVCQG onOkHandler={onOkHandler} onCloseModal={() => setDongBoDVCQGVisible(false)}/>
            </Suspense>: null}
        </AntdModal>)
}