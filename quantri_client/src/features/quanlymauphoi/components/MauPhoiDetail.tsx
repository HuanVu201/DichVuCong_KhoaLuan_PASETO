import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IMauPhoi, ISearchMauPhoi } from "../models"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile, UploadTable } from "../../../lib/antd/components"
import { AddMauPhoi, GetMauPhoi, SearchMauPhoi, UpdateMauPhoi } from "../redux/action"
import { useMauPhoiContext } from "../context/MauPhoiContext"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { LoadingOutlined } from "@ant-design/icons"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { IDanhMucChung } from "@/features/danhmucdungchung/models"
import { danhMucChungApi } from "@/features/danhmucdungchung/services"
import { MauPhoiApi } from "../services"

export const loaiPhois = [
    { label: 'Mẫu phôi xuất phiếu', value: 'mau-phoi-phieu' },
    { label: 'Mẫu phôi thống kê excel', value: 'mau-phoi-excel' },
    { label: 'Mẫu phôi thống kê word', value: 'mau-phoi-word' },
]

export const MauPhoiDetail = ({ searchParams, setSearchParams }: {
    searchParams: ISearchMauPhoi | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchMauPhoi>>
}) => {
    const dispatch = useAppDispatch()
    const MauPhoiContext = useMauPhoiContext()
    const { data: mauphoi } = useAppSelector(state => state.mauphoi)
    // const { datas: danhMucChungs, loading } = useAppSelector((state) => state.danhmucdungchung);

    const [maPhoiData, setMaPhoiData] = useState<IDanhMucChung[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [isPhoiPhieu, setIsPhoiPhieu] = useState<boolean>(false)
    const { datas: cocautochucs } = useAppSelector(state => state.cocautochuc)
    const { datas: linhvucs } = useAppSelector(state => state.linhvuc)
    const { datas: thutucs } = useAppSelector(state => state.thutuc)
    const [form] = Form.useForm<IMauPhoi>()
    const dinhKem = Form.useWatch('urlMauPhoi', form)
    const { publicModule: config } = useAppSelector(state => state.config)
    const maTinh = config?.filter(x => x.code == 'ma-tinh')[0].content

    let arrMaDonVi: any = []
    let strMaDonVi: any
    let arrMaLinhVuc: any = []
    let strMaLinhVuc: any
    let arrMaThuTuc: any = []
    let strMaThuTuc: any
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        arrMaDonVi = form.getFieldValue('maDonVi') || [];
        if (arrMaDonVi.length == 0) {
            strMaDonVi = null;
        }
        else {
            strMaDonVi = arrMaDonVi.join('#')
        }

        arrMaLinhVuc = form.getFieldValue('maLinhVuc') || [];
        if (arrMaLinhVuc.length == 0) {
            strMaLinhVuc = null;
        }
        else {
            strMaLinhVuc = arrMaLinhVuc.join('#')
        }

        arrMaThuTuc = form.getFieldValue('maThuTuc') || [];
        if (arrMaThuTuc.length == 0) {
            strMaThuTuc = null;
        }
        else {
            strMaThuTuc = arrMaThuTuc.join('#')
        }

        if (!form.getFieldValue('code') || !form.getFieldValue('tenMauPhoi')) {
            toast.warning("Nhập đầy đủ thông tin yêu cầu!")
        }
        else {
            if (MauPhoiContext?.MauPhoiId) {
                const res = await MauPhoiApi.Update({
                    id: MauPhoiContext.MauPhoiId,
                    data: {
                        ...formData,
                        maDonVi: strMaDonVi,
                        maThuTuc: strMaThuTuc,
                        maLinhVuc: strMaLinhVuc,
                    }
                });
                if (res.status === 200) {
                    toast.success("Cập nhật thành công!")
                    dispatch(SearchMauPhoi({ ...searchParams, reFetch: true }))
                    handleCancel()
                } else {
                    toast.error('Thao tác thất bại!')
                }

            } else {
                const res = await MauPhoiApi.Create({ ...formData, maDonVi: strMaDonVi, maLinhVuc: strMaLinhVuc, maThuTuc: strMaThuTuc });
                if (res.status === 201) {
                    toast.success("Thêm mới thành công!")
                    dispatch(SearchMauPhoi({ ...searchParams, reFetch: true }))
                    handleCancel()
                } else {
                    toast.error('Thao tác thất bại!')
                }
            }
        }
    }

    const handleCancel = () => {
        form.resetFields();
        arrMaDonVi = []
        form.setFieldsValue({
            maDonVi: arrMaDonVi,
            maLinhVuc: arrMaLinhVuc,
            maThuTuc: arrMaThuTuc
        })
        dispatch(resetData())
        MauPhoiContext.setMauPhoiModalVisible(false)
        MauPhoiContext.setMauPhoiId(undefined)
    };
    useEffect(() => {
        if (MauPhoiContext.MauPhoiId) {
            dispatch(GetMauPhoi(MauPhoiContext.MauPhoiId))
        }
    }, [MauPhoiContext.MauPhoiId])

    useEffect(() => {
        (async () => {
            if (mauphoi) {
                if (mauphoi.loaiPhoi.includes('phieu'))
                    setIsPhoiPhieu(true)
                const res = await danhMucChungApi.Search({ type: 'mau-phoi', pageNumber: 1, pageSize: 200 })
                if (res)
                    setMaPhoiData(res.data.data)
                else
                    toast.error("Không có thông tin mã phôi")

                form.setFieldsValue({
                    ...mauphoi,
                    maDonVi: mauphoi?.maDonVi != null ? mauphoi?.maDonVi.split('#') : [],
                    maLinhVuc: mauphoi?.maLinhVuc != null ? mauphoi?.maLinhVuc.split('#') : [],
                    maThuTuc: mauphoi?.maThuTuc != null ? mauphoi?.maThuTuc.split('#') : [],
                })
            }
        })()
    }, [mauphoi])

    const onChangeLoaiPhoi = async (value: string) => {
        if (value) {
            if (value.includes('phieu')) setIsPhoiPhieu(true)
            else setIsPhoiPhieu(false)

            const res = await danhMucChungApi.Search({ type: value, pageNumber: 1, pageSize: 200 })
            if (res)
                setMaPhoiData(res.data.data)
            else
                toast.error("Không có thông tin mã phôi")
        }
    }

    return (
        <AntdModal title={MauPhoiContext.MauPhoiId ? "Sửa thông tin mẫu phôi" : "Thêm mới mẫu phôi"} visible={MauPhoiContext.MauPhoiModalVisible} handlerCancel={handleCancel} width={780}
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
                <Form name='MauPhoi' layout="vertical" onFinish={onFinish} form={form} requiredMark={MauPhoiContext.MauPhoiId !== null}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Loại phôi"
                                name="loaiPhoi"
                                rules={[{ required: true, message: 'Vui lòng chọn loại phôi' }]}
                            >
                                <AntdSelect
                                    virtual={true}
                                    generateOptions={{
                                        model: loaiPhois,
                                        label: "label",
                                        value: "value",
                                    }}
                                    onChange={onChangeLoaiPhoi}
                                    disabled={mauphoi ? true : false}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Mã phôi"
                                name="code"
                                rules={[{ required: true, message: 'Vui lòng chọn mã phôi' }]}
                            >
                                <AntdSelect
                                    virtual={true}
                                    generateOptions={{
                                        model: maPhoiData,
                                        label: "tenDanhMuc",
                                        value: "code",
                                    }}
                                    onClick={() => {
                                        if (!maPhoiData)
                                            toast.error("Vui lòng chọn loại phôi trước!")
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Tên mẫu phôi"
                                name="tenMauPhoi"
                                rules={[{ required: true, message: 'Vui lòng nhập tên mẫu phôi' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24} hidden={!isPhoiPhieu}>
                            <Form.Item
                                label="Đơn vị"
                                name="maDonVi"
                            >
                                <AntdSelect
                                    mode="tags"
                                    virtual={true}
                                    allowClear
                                    generateOptions={{
                                        model: cocautochucs,
                                        label: "groupName",
                                        value: "groupCode",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24} hidden={!isPhoiPhieu}>
                            <Form.Item
                                label="Lĩnh vực"
                                name="maLinhVuc"
                            >
                                <AntdSelect
                                    mode="tags"
                                    virtual={true}
                                    allowClear
                                    generateOptions={{
                                        model: linhvucs,
                                        label: "ten",
                                        value: "ma",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24} hidden={!isPhoiPhieu}>
                            <Form.Item
                                label="Thủ tục"
                                name="maThuTuc"
                            >
                                <AntdSelect
                                    mode="tags"
                                    virtual={true}
                                    allowClear
                                    generateOptions={{
                                        model: thutucs,
                                        label: "tenTTHC",
                                        value: "maTTHC",
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col md={12} span={24}>
                            <Form.Item
                                label="Mẫu phôi"
                                name="urlMauPhoi"
                                rules={[{ required: true, message: 'Vui lòng chọn phôi' }]}
                            >
                                <RegularUpload
                                    form={form}
                                    fieldName="urlMauPhoi"
                                    folderName={`MauPhoi${maTinh}`}
                                    dinhKem={dinhKem}
                                    maxCount={1} />

                            </Form.Item>
                        </Col>
                        {/* <Col span={24}>
                            <Form.Item
                                label="HTML phôi"
                                name="htmlPhoi"
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col> */}
                        {/* <Col md={12} span={24}>
                            <Form.Item
                                label="Là phôi email"
                                name="laPhoiEmail"
                                valuePropName="checked"
                            >
                                <Checkbox  ></Checkbox>
                            </Form.Item>
                        </Col> */}
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Là phôi mặc định"
                                name="laPhoiMacDinh"
                                valuePropName="checked"
                            >
                                <Checkbox ></Checkbox>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Spin>
        </AntdModal>
    )
}