import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "@/lib/antd/components"

import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { ILienThongQLVB, INoiDungGoiTin } from "../../models"
import { useLienThongQLVBContext } from "../../context"
import axios from "axios"
import { HOST_PATH } from "@/data"
import { LoadingOutlined } from "@ant-design/icons"
import dayjs from 'dayjs'
import ReactJson from "react-json-view"

export const HoSoDetail = () => {
    const qlvbContext = useLienThongQLVBContext()
    const [hoSoDataDetail, setHoSoDataDetail] = useState<ILienThongQLVB>()
    const [form] = Form.useForm<ILienThongQLVB>()
    const [noiDungGoiTinData, setNoiDungGoiTinData] = useState<any>()


    const handleCancel = () => {
        form.resetFields();
        qlvbContext.setHoSoDetailModalVisible(false)
        setNoiDungGoiTinData(undefined)
        qlvbContext.setLienThongQLVBId(undefined)

    };
    useEffect(() => {
        if (qlvbContext.lienThongQLVBId) {
            (async () => {
                qlvbContext.setLoading(true)
                const axiosCustomQlvb = axios.create({
                    baseURL: HOST_PATH,
                    headers: {
                        'Authorization': `Bearer ${qlvbContext.configApiString?.token}`
                    },
                })

                try {
                    const response = await axiosCustomQlvb.get(`${qlvbContext.configApiString?.urlapi}/lienthonghsqlvb/DuLieus/${qlvbContext.lienThongQLVBId}`, {
                        headers: {}
                    });

                    if (response.data) {
                        setHoSoDataDetail(response.data.data)
                    }

                } catch (error) {
                    console.error('Error /lienthonghsqlvb/DuLieus/ID:', error);
                }
                qlvbContext.setLoading(false)
            })()

        }


    }, [qlvbContext.lienThongQLVBId])

    useEffect(() => {
        if (hoSoDataDetail) {
            form.setFieldsValue({
                ...hoSoDataDetail as any,
                ThoiGianXuLy: hoSoDataDetail.ThoiGianXuLy ? dayjs(hoSoDataDetail.ThoiGianXuLy).format('HH[:]mm[:]ss DD/MM/YYYY') : '',
                Created: hoSoDataDetail.Created ? dayjs(hoSoDataDetail.Created).format('HH[:]mm[:]ss DD/MM/YYYY') : '',
                NgayTiepNhan: hoSoDataDetail.NgayTiepNhan ? dayjs(hoSoDataDetail.NgayTiepNhan).format('HH[:]mm[:]ss DD/MM/YYYY') : '',
                NgayHenTra: hoSoDataDetail.NgayHenTra ? dayjs(hoSoDataDetail.NgayHenTra).format('HH[:]mm[:]ss DD/MM/YYYY') : '',

            })

        }
    }, [hoSoDataDetail])


    const openGoiTin = () => {
        (async () => {
            if (qlvbContext.configApiString && qlvbContext.lienThongQLVBId) {
                qlvbContext.setLoading(true)
                const axiosCustomQlvb = axios.create({
                    baseURL: HOST_PATH,
                    headers: {
                        'Authorization': `Bearer ${qlvbContext.configApiString?.token}`
                    },
                })

                const bodyRequest = {
                    maGoiTin: hoSoDataDetail?.DocId,
                    fullFilePath: hoSoDataDetail?.NoiDungGoiTin
                }

                try {
                    const response = await axiosCustomQlvb.post(`${qlvbContext.configApiString?.urlapi}/lienthonghsqlvb/XemNoiDungGoiTin`, bodyRequest, {
                        headers: {}
                    });

                    if (response.data) {
                        setNoiDungGoiTinData(response.data.data)
                    }

                } catch (error) {
                    console.error('Error /lienthonghsqlvb/XemNoiDungGoiTin:', error);
                }

                qlvbContext.setLoading(false)
            }
        })()
    }

    return (
        <AntdModal title="Thông tin hồ sơ" visible={qlvbContext.hoSoDetailModalVisible} handlerCancel={handleCancel} width={1200}
            footer={[
                <Space >
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >
            <Spin spinning={qlvbContext.loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form name='HoSoQLVB' layout="vertical" form={form} requiredMark={qlvbContext.lienThongQLVBId !== null}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>

                        <Col md={12} span={24}>
                            <Form.Item
                                label="Mã hồ sơ"
                                name="DocId"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Trạng thái"
                                name="TrangThai"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Đơn vị gửi"
                                name="DonViGui"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Đơn vị nhận"
                                name="DonViNhan"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Thời gian xử lý"
                                name="ThoiGianXuLy"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Loại kết quả"
                                name="LoaiKetQuaText"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Thời gian tạo"
                                name="Created"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Số lần xử lý"
                                name="SoLanXuLy"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Nội dung gói tin"
                                name="NoiDungGoiTin"
                            >
                                <Input disabled addonAfter={<span onClick={openGoiTin} style={{ cursor: "pointer" }}> Xem gói tin</span>} />
                            </Form.Item>
                        </Col>
                        {noiDungGoiTinData
                            ?
                            <div>
                                <p style={{ color: "rgba(0, 0, 0, 0.88", fontWeight: 500, fontSize: 14, }} >
                                    Dữ liệu Json
                                </p>
                                <ReactJson
                                    src={noiDungGoiTinData != undefined
                                        ? JSON.parse(noiDungGoiTinData)
                                        : {}
                                    }
                                />
                            </div>
                            : null
                        }
                    </Row>
                    
                </Form>


            </Spin>
        </AntdModal>
    )
}