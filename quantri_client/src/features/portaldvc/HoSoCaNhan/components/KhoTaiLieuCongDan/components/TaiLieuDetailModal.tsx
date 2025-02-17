import { AntdButton, AntdModal, AntdSelect } from "@/lib/antd/components"
import { useKhoTaiLieuCongDanContext } from "../contexts/KhoTaiLieuCongDanContext"
import { ITaiLieuLuuTruCongDan, ISearchTaiLieuLuuTruCongDan, Nguon_CongDanTaiLen } from "../models"
import { Button, Col, Form, Input, Row, Spin } from "antd"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppSelector } from "@/lib/redux/Hooks"
import { khoTaiLieuCongDanApi } from "../services"
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
import { lazy } from "@/utils/lazyLoading"

const ThongTinGiayToDVCQG = lazy(() => import("../../../../../../features/QuanLySuDungKhoTaiLieu/components/DanhSachSuDung/ThongTinGiayToDVCQG"))

export default function TaiLieuDetailModal({ searchParams, setSearchParams }: {
    searchParams: ISearchTaiLieuLuuTruCongDan | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiLieuLuuTruCongDan>>,
}) {
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const [form] = Form.useForm<ITaiLieuLuuTruCongDan>()
    const dinhKem = Form.useWatch('duongDan', form)
    const [loaiTaiLieus, setLoaiTaiLieus] = useState<ILoaiGiayToKhoLuuTru[]>()
    const [formType, setFormType] = useState('form')
    const [eForm, setEForm] = useState({ display: formType });
    const [hasEForm, setHasEForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [eFormData, setEFormData] = useState<any>()
    const [data, setData] = useState<ITaiLieuLuuTruCongDan>()
    const [dongBoDVCQGVisible, setDongBoDVCQGVisible] = useState(false)
    const [typeGiayTo, setTypeGiayTo] = useState<string>()

    useEffect(() => {
        (async () => {
            if (khoTaiLieuContext.detailTaiLieuCongDanModalVisible) {
                setLoading(true)
                const resLoaiTaiLieu = await loaiGiayToKhoLuuTruApi.Search({
                    pageNumber: 1,
                    pageSize: 1000,
                    orderByReq: 'CreatedOn ASC',
                    suDung: true
                })
                if (resLoaiTaiLieu.data.data) {
                    setLoaiTaiLieus(resLoaiTaiLieu.data.data)
                } else {
                    toast.error('Không có thông tin loại giấy tờ!')
                }
                setLoading(false)
            }
        })()
    }, [khoTaiLieuContext.detailTaiLieuCongDanModalVisible])

    useEffect(() => {
        (async () => {
            if (loaiTaiLieus && khoTaiLieuContext.taiLieuId) {
                const resGetDetail = await khoTaiLieuCongDanApi.GetTaiLieu(khoTaiLieuContext.taiLieuId)
                if (resGetDetail.data.data) {
                    setData({ ...resGetDetail.data.data })
                    form.setFieldsValue({ ...resGetDetail.data.data })
                    onChangeLoaiTaiLieu(resGetDetail.data.data.loaiGiayToId || '')
                    setTypeGiayTo(resGetDetail.data.data.type ?? '')
                    if (resGetDetail.data.data.type?.toLowerCase() == 'loại giấy tờ') {
                        form.setFieldValue('loaiGiayToCaNhan', resGetDetail.data.data.loaiNhomGiayToCaNhanId)
                    }
                    if (resGetDetail.data.data.type?.toLowerCase() == 'nhóm giấy tờ') {
                        form.setFieldValue('nhomGiayToCaNhan', resGetDetail.data.data.loaiNhomGiayToCaNhanId)
                    }


                } else {
                    toast.error("Lỗi lấy thông tin tài liệu!")
                }
            } else if (loaiTaiLieus) {
                form.setFieldValue('loaiGiayToId', loaiTaiLieus[0].id)
                onChangeLoaiTaiLieu(loaiTaiLieus[0].id || '')
            }
        })()
    }, [loaiTaiLieus])

    const onFinish = async () => {
        const formData: any = await form.validateFields()
        const eFormDataValid = await form.getFieldValue("eFormDataValid")
        // if (!eFormDataValid && hasEForm) {
        //     toast.error(<>Vui lòng nhập đầy đủ thông tin các trường được đánh dấu (<span style={{ color: "red" }}>*</span>)</>)
        //     return
        // }

        let dungLuong: number = 0
        if (formData.duongDan) {
            const valueGetFile = await fileApi.GetFileByte({ path: formData.duongDan })
            if (valueGetFile) {
                dungLuong = bytesToMB(valueGetFile.data.size)
            } else {
                toast.error("Lỗi kiểm tra dung lượng file đính kèm!")
            }

        }

        if (dungLuong > 0) {
            // console.log(Object.getOwnPropertyNames(eFormData.data).length)
            if (khoTaiLieuContext.taiLieuId) {
                const resUpdateTaiLieu = await khoTaiLieuCongDanApi.UpdateTaiLieu({
                    id: khoTaiLieuContext.taiLieuId,
                    data: {
                        ...formData,
                        dungLuong: dungLuong,
                        eformData: hasEForm && Object.getOwnPropertyNames(eFormData.data).length > 0 ? JSON.stringify(eFormData.data) : undefined,
                        type: typeGiayTo,
                        loaiNhomGiayToCaNhanId: form.getFieldValue('loaiGiayToCaNhan') || form.getFieldValue('nhomGiayToCaNhan')
                    }
                })
                if (resUpdateTaiLieu.data.succeeded) {
                    toast.success(resUpdateTaiLieu.data.message)
                    setSearchParams({
                        ...searchParams,
                        reFetch: true
                    })
                    handleCancel()
                } else {
                    toast.error(resUpdateTaiLieu.data.message)
                }
            } else {
                const resAddGiayTo = await khoTaiLieuCongDanApi.AddTaiLieuVaoKho({
                    duongDan: form.getFieldValue('duongDan'),
                    tenGiayTo: form.getFieldValue('tenGiayTo'),
                    dungLuong: dungLuong,
                    nguon: Nguon_CongDanTaiLen,
                    loaiGiayToId: formData.loaiGiayToId,
                    eformData: hasEForm && Object.getOwnPropertyNames(eFormData.data).length > 0 ? JSON.stringify(eFormData.data) : undefined,
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
            }
        }

        setLoading(false)

    }


    const handleCancel = () => {
        form.resetFields();
        setEForm(null as any)
        khoTaiLieuContext.setTaiLieuId(undefined)
        khoTaiLieuContext.setDetailTaiLieuCongDanModalVisible(false)
        setHasEForm(false)
        setEForm(undefined as any)
        setEFormData(undefined as any)
        setData(undefined)

    }

    const onChangeLoaiTaiLieu = async (typeId: string) => {
        setLoading(true)
        setData(undefined)
        const resGetEForm = await loaiGiayToKhoLuuTruApi.Get(typeId)
        if (resGetEForm.status == 200) {
            const eform = JSON.parse(resGetEForm.data.data.eform as any);
            setHasEForm(eform ? true : false)
            setEForm(eform);
            if (resGetEForm.data.data.eform && !khoTaiLieuContext.taiLieuId)
                toast.info("Nhập thông tin tờ khai điện tử!")
        } else {
            toast.error("Lỗi lấy thông tin EForm!")
        }
        setLoading(false)
    }
    const onOkHandler = async (dinhKem: string) => {
        if (!dinhKem) {
            toast.error("Có lỗi xảy ra khi lấy tệp đính kèm")
            return;
        }
        form.setFieldValue("duongDan", dinhKem)
    }
    return (
        <AntdModal className="AddKhoTaiLieuModal" title={khoTaiLieuContext.taiLieuId ? "Cập nhật thông tin tài liệu:" : "Thêm mới tài liệu vào kho:"} visible={khoTaiLieuContext.detailTaiLieuCongDanModalVisible} handlerCancel={handleCancel} fullsizeScrollable={hasEForm} width={hasEForm ? 3000 : 900}

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
                                label="Loại giấy tờ cá"
                                name="loaiGiayToId"
                                rules={[{ required: true, message: 'Vui lòng chọn loại giấy tờ' }]}
                            >
                                <AntdSelect
                                    virtual={true}
                                    generateOptions={{
                                        model: loaiTaiLieus,
                                        label: "ten",
                                        value: "id",
                                    }}
                                    onChange={onChangeLoaiTaiLieu}
                                    // defaultValue={loaiTaiLieus ? loaiTaiLieus[0].id : undefined} 
                                    disabled={khoTaiLieuContext.taiLieuId ? true : false}
                                />
                            </Form.Item>
                        </Col>
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
                                label="Loại giấy tờ cá nhân"
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
                                        setTypeGiayTo('Loại giấy tờ')
                                        form.setFieldValue('nhomGiayToCaNhan', undefined)
                                    }}
                                    placeholder="Chọn loại/nhóm giấy tờ của tài liệu"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Nhóm giấy tờ cá nhân"
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
                                        setTypeGiayTo('Nhóm giấy tờ')
                                        form.setFieldValue('loaiGiayToCaNhan', undefined)
                                    }}
                                    placeholder="Chọn loại/nhóm giấy tờ của tài liệu"
                                    allowClear
                                />
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
                                    extraElement={(loading) => (<AntdButton loading={loading} onClick={() => setDongBoDVCQGVisible(true)}>
                                        Chọn giấy tờ từ DVCQG
                                    </AntdButton>)} />

                            </Form.Item>
                        </Col>
                        {hasEForm ? (
                            <Col span={24}>
                                <Eform
                                    form={eForm}
                                    onChange={(schema: any) => {
                                        setEFormData(schema);
                                    }}
                                    submission={
                                        data?.eformData ? { data: JSON.parse(data.eformData) } : undefined
                                    }
                                // antdForm={form}
                                />
                            </Col>
                        ) : null}

                    </Row>
                </Form>
            </Spin>
            {dongBoDVCQGVisible ? <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
                <ThongTinGiayToDVCQG onOkHandler={onOkHandler} onCloseModal={() => setDongBoDVCQGVisible(false)} />
            </Suspense> : null}
        </AntdModal>)
}