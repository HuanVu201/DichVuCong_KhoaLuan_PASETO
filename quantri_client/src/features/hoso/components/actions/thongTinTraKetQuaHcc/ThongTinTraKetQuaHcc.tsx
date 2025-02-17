import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdModal } from "@/lib/antd/components"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CURRENTTIME, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { LoadingOutlined } from "@ant-design/icons";
import { hoSoApi } from "@/features/hoso/services";
import { IHoSo } from "@/features/hoso/models";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import dayjs from 'dayjs'
import { fileApi } from "@/features/file/services";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { loaiNguoiNhanKetQuas } from "@/pages/dvc/traketqua/chotraketquatthcc/components/ChoTraKetQuaTTHCCTable";

const ThongTinTraKetQuaHCCModal = () => {
    const buttonActionContext = useButtonActionContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<IHoSo>()
    const [form] = Form.useForm<IHoSo>()
    const dispatch = useAppDispatch();
    const [chuKyNguoiNhanKetQua, setChuKyNguoiNhanKetQua] = useState<Blob>()
    const dinhKemKetQua = Form.useWatch('dinhKemKetQua', form)
    const dinhKemNhanKetQua = Form.useWatch('dinhKemNhanKetQua', form)

    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length) {
                setLoading(true)
                const res = await hoSoApi.GetThongTinTraKetQuaHcc({ id: buttonActionContext.selectedHoSos[0] as string })
                if (res.data.data) {
                    setData(res.data.data)
                }
                setLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        if (data) {
            let doiTuongNhanKetQua: any = ''
            if (data.loaiNguoiNhanKetQua) {
                doiTuongNhanKetQua = loaiNguoiNhanKetQuas.find(x => x.value == data.loaiNguoiNhanKetQua)?.label
            }
            form.setFieldsValue({
                ...data,
                trangThaiHoSoId: TRANGTHAIHOSO[data.trangThaiHoSoId],
                ngayTra: data?.ngayTra ? dayjs(data.ngayTra).format("HH") + " giờ " + dayjs(data.ngayTra).format("mm") + " phút, ngày " + dayjs(data.ngayTra).format(FORMAT_DATE_WITHOUT_TIME) : "",
                loaiNguoiNhanKetQua: doiTuongNhanKetQua
            })
            if (data.chuKyNguoiNhanKetQua) {
                const valueGetDocx = fileApi.GetFileByte({ path: data?.chuKyNguoiNhanKetQua || '' })
                valueGetDocx.then(function (result) {
                    console.log(result.data)
                    setChuKyNguoiNhanKetQua(result.data)
                }).catch(function (error) {
                    toast.error("Có lỗi khi đọc Chữ ký điện tử")
                    console.log(error);
                });
            }
        }
    }, [data])


    return (
        <div style={{width: '50%', margin: 'auto', minWidth: 700}}>
            <Spin
                spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form name='ThongTinTraKetQua' layout="vertical" form={form} style={{ marginBottom: '30px' }} >
                    <Row gutter={[8, 8]}>
                        <Col md={12} span={24} >
                            <Form.Item
                                label="Trạng thái"
                                name="trangThaiHoSoId"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24} >
                            <Form.Item
                                label="Thời gian trả"
                                name="ngayTra"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24} >
                            <Form.Item
                                label="Đối tượng nhận kết quả"
                                name="loaiNguoiNhanKetQua"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24} >
                            <Form.Item
                                label="Họ tên người nhận"
                                name="hoTenNguoiNhanKetQua"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item
                                label="Trích yếu kết quả"
                                name="trichYeuKetQua"
                            >
                                <Input.TextArea rows={3} disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24} >
                            <Form.Item
                                label="Bản gốc thu lại"
                                name="banGocThuLai"
                                hidden={data?.banGocThuLai ? false : true}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24} >
                            <Form.Item
                                label="Số lượng bản gốc thu lại"
                                name="soLuongBanGocThuLai"
                                hidden={data?.banGocThuLai ? false : true}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24} >
                            {data?.dinhKemKetQua ? (
                                <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                                    <RegularUpload
                                        hideUpload={true}
                                        dinhKem={dinhKemKetQua}
                                        fieldName={''}
                                        folderName={''}
                                        form={form}
                                    />
                                </Form.Item>
                            ) : null}
                        </Col>
                        <Col md={12} span={24} >
                            {data?.dinhKemNhanKetQua ? (
                                <Form.Item label="Đính kèm nhận kết quả" name="dinhKemNhanKetQua" >
                                    <RegularUpload
                                        hideUpload={true}
                                        dinhKem={dinhKemNhanKetQua}
                                        fieldName={''}
                                        folderName={''}
                                        form={form}
                                    />
                                </Form.Item>
                            ) : null}
                        </Col>
                        <Col span={24} >
                            <Form.Item
                                label="Hình ảnh chữ ký người nhận kết quả"
                                name="chuKyNguoiNhanKetQua"
                            >
                                <div style={{
                                    border: '1px solid #333', borderRadius: '8px', display: 'flex',
                                    justifyContent: 'center', alignItems: 'center', minHeight: '100px'
                                }}>
                                    {chuKyNguoiNhanKetQua ?
                                        <img
                                            src={URL.createObjectURL(chuKyNguoiNhanKetQua as any || "")} alt="Chữ ký điện tử nhận kết quả"
                                            style={{ margin: 'auto', maxHeight: '180px', objectFit: 'contain' }}
                                        />
                                        : <center><b>(Không có)</b></center>}
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </div>
    )
}



export default ThongTinTraKetQuaHCCModal