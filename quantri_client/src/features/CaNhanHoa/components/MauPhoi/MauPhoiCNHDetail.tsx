import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IMauPhoi, ISearchMauPhoi } from "@/features/quanlymauphoi/models"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "@/lib/antd/components"
import { AddMauPhoi, GetMauPhoi, SearchMauPhoi, UpdateMauPhoi } from "@/features/quanlymauphoi/redux/action"
import { useMauPhoiCNHContext } from "../../contexts/MauPhoiCNHContext"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { MauPhoiApi } from "@/features/quanlymauphoi/services"
import { IDanhMucChung } from "@/features/danhmucdungchung/models"
import { danhMucChungApi } from "@/features/danhmucdungchung/services"
import { LoadingOutlined } from "@ant-design/icons"
import { loaiPhois } from "@/features/quanlymauphoi/components/MauPhoiDetail"

export const MauPhoiCNHDetail = ({ searchParams, setSearchParams }: {
    searchParams: ISearchMauPhoi,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchMauPhoi>>
}) => {
    const dispatch = useAppDispatch()
    const mauPhoiContext = useMauPhoiCNHContext()
    const [maPhoiData, setMaPhoiData] = useState<IDanhMucChung[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [isPhoiPhieu, setIsPhoiPhieu] = useState<boolean>(false)
    const { data: mauphoi } = useAppSelector(state => state.mauphoi)
    const { data: user } = useAppSelector(state => state.user)
    const [form] = Form.useForm<IMauPhoi>()
    const dinhKem = Form.useWatch('urlMauPhoi', form)
    const dinhKemDefault = Form.useWatch('phoiDefault', form)
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

        if (!form.getFieldValue('loaiPhoi') || !form.getFieldValue('tenMauPhoi')) {
            toast.warning("Nhập đầy đủ thông tin yêu cầu!")
        }
        else {

            if (mauPhoiContext?.mauPhoiCNHId) {
                const res = await MauPhoiApi.Update({
                    id: mauPhoiContext.mauPhoiCNHId,
                    data: {
                        ...formData,
                        maDonVi: strMaDonVi,
                        maThuTuc: strMaThuTuc,
                        maLinhVuc: strMaLinhVuc,
                    }
                });
                if (res.status === 200) {
                    dispatch(SearchMauPhoi({ ...searchParams }))
                    toast.success("Cập nhật thành công!")
                    handleCancel()
                } else {
                    toast.error("Thao tác thất bại")
                }

            } else {
                const res = await MauPhoiApi.Create({
                    ...formData,
                    maDonVi: strMaDonVi,
                    maLinhVuc: strMaLinhVuc,
                    maThuTuc: strMaThuTuc,
                    customerId: user?.id
                });
                if (res.status === 201) {
                    dispatch(SearchMauPhoi({ ...searchParams }))
                    toast.success("Thêm mới mẫu phôi thành công!")
                    handleCancel()
                } else {
                    toast.error("Thao tác thất bại")
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
        mauPhoiContext.setMauPhoiCNHModalVisible(false)
        mauPhoiContext.setMauPhoiCNHId(undefined)
    };
    useEffect(() => {
        if (mauPhoiContext.mauPhoiCNHId) {
            dispatch(GetMauPhoi(mauPhoiContext.mauPhoiCNHId))
        }
    }, [mauPhoiContext.mauPhoiCNHId])

    useEffect(() => {
        (async () => {
            if (mauphoi) {
                if (mauphoi.loaiPhoi.includes('phieu'))
                    setIsPhoiPhieu(true)
                const res = await danhMucChungApi.Search({ type: mauphoi.loaiPhoi, pageNumber: 1, pageSize: 200 })
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
                getUrlPhoiDefault()
            }
        })()
    }, [mauphoi])

    const onChangeLoaiPhoi = async (value: string) => {
        if (value) {
            if (value.includes('phieu')) setIsPhoiPhieu(true)
            else setIsPhoiPhieu(false)
            form.setFieldValue('code', undefined)
            setLoading(true)
            const res = await danhMucChungApi.Search({ type: value, pageNumber: 1, pageSize: 200 })
            if (res)
                setMaPhoiData(res.data.data)
            else
                toast.error("Không có thông tin mã phôi")
            setLoading(false)
        }
    }

    const getUrlPhoiDefault = async () => {
        if (form.getFieldValue('loaiPhoi') && form.getFieldValue('code')) {
            setLoading(true)
            const res = await MauPhoiApi.GetUrlPhoiDefault({
                loaiPhoi: form.getFieldValue('loaiPhoi'),
                code: form.getFieldValue('code')
            })
            if (res.data) {
                console.log(res.data)
                form.setFieldValue('phoiDefault', res.data)
            } else {
                toast.error("Không có phôi mẫu!")
            }
            setLoading(false)
        }

    }

    return (
        <AntdModal title={mauPhoiContext.mauPhoiCNHId ? "Sửa thông tin mẫu phôi" : "Thêm mới mẫu phôi"} visible={mauPhoiContext.mauPhoiCNHModalVisible} handlerCancel={handleCancel} width={780}
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
                <Form name='MauPhoi' layout="vertical" onFinish={onFinish} form={form} requiredMark={mauPhoiContext.mauPhoiCNHId !== null}
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
                                    onChange={getUrlPhoiDefault}
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
                        {/* <Col md={24} span={24} hidden={!isPhoiPhieu}>
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
                        </Col> */}

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
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Phôi mẫu"
                                name="phoiDefault"
                                tooltip={`Phôi cá nhân hóa phải dựa trên phôi mẫu sẵn có! Mỗi mã phôi chỉ cá nhân hóa duy nhất 1 phiên bản!`}
                            >
                                {dinhKemDefault
                                    ?
                                    <RegularUpload
                                        hideUpload
                                        form={form}
                                        fieldName=""
                                        folderName=""
                                        dinhKem={dinhKemDefault}
                                        maxCount={1} />
                                    : <b><i>Không có thông tin!</i></b>
                                }


                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Spin>
        </AntdModal>
    )
}