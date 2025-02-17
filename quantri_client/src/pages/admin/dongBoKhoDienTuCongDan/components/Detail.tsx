import { AntdButton, AntdModal, AntdSelect } from "@/lib/antd/components"
import { Button, Col, Form, Input, Row, Spin } from "antd"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppSelector } from "@/lib/redux/Hooks"
import { fileApi } from "@/features/file/services"
import { toast } from "react-toastify"
import { Suspense, useEffect, useState } from "react"
import { loaiGiayToKhoLuuTruApi } from "@/features/danhMucLoaiGiayToKhoLuuTru/services"
import { ILoaiGiayToKhoLuuTru } from "@/features/danhMucLoaiGiayToKhoLuuTru/models"
import { FormBuilder } from '@formio/react'
import { Eform, EformProps } from "@/lib/eform";
import "formiojs/dist/formio.full.css";
import { LoadingOutlined } from "@ant-design/icons"
import { lazy } from "@/utils/lazyLoading"
import { AdminAddTaiLieuVaoKho, khoTaiLieuCongDanApi, SearchDanhSachTaiLieuCongDan } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services"
import { useDanhSachGiayToContext } from "../contexts/DanhSachGiayToProvider"
import { ITaiLieuLuuTruCongDan, Nguon_CongDanTaiLen } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"
import { bytesToMB } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/components/ThemGiayToVaoKhoModal"


export function Detail({ searchParams, setSearchParams }: {
    searchParams: SearchDanhSachTaiLieuCongDan | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<SearchDanhSachTaiLieuCongDan>>,
}) {
    const khoTaiLieuContext = useDanhSachGiayToContext()
    const [form] = Form.useForm<AdminAddTaiLieuVaoKho>()
    const dinhKem = Form.useWatch('duongDan', form)
    const [hasEForm, setHasEForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            if (khoTaiLieuContext.giayToSoHoaId) {
                const resGetDetail = await khoTaiLieuCongDanApi.GetTaiLieu(khoTaiLieuContext.giayToSoHoaId)
                if (resGetDetail.data.data) {
                    form.setFieldsValue({ ...resGetDetail.data.data })
                } else {
                    toast.error("Lỗi lấy thông tin tài liệu!")
                }
            }
        })()
    }, [khoTaiLieuContext.giayToSoHoaId])

    const onFinish = async () => {
        const formData = await form.validateFields();
        const resAddGiayTo = await khoTaiLieuCongDanApi.AdminAddTaiLieuVaoKho({
            duongDan: formData.duongDan,
            tenGiayTo: formData.tenGiayTo,
            nguon: Nguon_CongDanTaiLen,
            soGiayToChuHoSo: "123"
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
        khoTaiLieuContext.setGiayToSoHoaId(undefined)
        khoTaiLieuContext.setViewMode(undefined)
        setHasEForm(false)

    }
    const title = khoTaiLieuContext.viewMode == "add" ?  "Thêm mới tài liệu vào kho:" : khoTaiLieuContext.viewMode == "view" ? "Chi tiết tài liệu" : "";
    return (
        <AntdModal className="AddKhoTaiLieuModal" title={title} visible={khoTaiLieuContext.viewMode != undefined} handlerCancel={handleCancel} 
            fullsizeScrollable={hasEForm} width={hasEForm ? 3000 : 900}
            footer={khoTaiLieuContext.viewMode == "view" ? null: [
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
                    initialValues={{ uuTien: 1 }} disabled={khoTaiLieuContext.viewMode == "view"}>
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
                        <Col md={24} span={24}>
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
                                    maxCount={1} 
                                    hideUpload={khoTaiLieuContext.viewMode == "view"}
                                    />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                
            </Spin>
        </AntdModal>)
}