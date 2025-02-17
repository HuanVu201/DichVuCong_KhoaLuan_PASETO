import { Checkbox, Col, Divider, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useSearchParams } from "react-router-dom"
import { IApiChiaSe, ISearchApiChiaSe } from "@/features/quanLySuDungApi/models"
import { useLichSuApiColumn } from "@/features/quanLySuDungApi/hooks/useLichSuApiColumn"
import { useDanhMucLichSuApiColumn } from "../hooks/useColumn"
import { DanhMucApiProvider } from "../contexts/useContext"
import { ApiChiaSe } from "@/features/quanLySuDungApi/services"
import { toast } from "react-toastify"
import { LoadingOutlined } from "@ant-design/icons"
import { triangle } from "highcharts"
import { LichSuApiChiaSeTable } from "./LichSuTruyCapTable"
import { QuanLySuDungAPIProvider } from "@/features/quanLySuDungApi/contexts"

const DanhMucApiTable = () => {
    let [searchRouterParams] = useSearchParams()
    const [typeApi, setTypeApi] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [dataApi, setDataApi] = useState<IApiChiaSe>()
    const [dataLichSu, setDataLichSu] = useState<IApiChiaSe[]>()
    const [totalCountLS, setTotalCountLS] = useState<number>()
    const [searchLichSuParams, setSearchLichSuParams] = useState<ISearchApiChiaSe>({ pageNumber: 1, pageSize: 10 })
    const [form] = Form.useForm<IApiChiaSe>()
    const [searchParams, setSearchParams] = useState<ISearchApiChiaSe>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useDanhMucLichSuApiColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })


    useEffect(() => {
        if (searchRouterParams.get("type"))
            setTypeApi(searchRouterParams.get("type") || '')
    }, [searchRouterParams, typeApi])

    useEffect(() => {
        (async () => {
            if (typeApi) {
                setLoading(true)
                const res = await ApiChiaSe.GetApiByMa({ maApi: typeApi })
                if (res.data.data) {
                    setDataApi(res.data.data)
                    setDataLichSu(undefined)
                    setTotalCountLS(0)
                    form.setFieldsValue({ ...res.data.data, })
                } else {
                    form.resetFields()
                    setDataApi(undefined)
                    toast.error(res.data.message)
                }
                setLoading(false)
            }
        })()
    }, [typeApi])

    useEffect(() => {
        (async () => {
            if (dataApi?.id) {


                setLoading(true)
                const res = await ApiChiaSe.SearchLichSuApiChiaSe({
                    ...searchLichSuParams,
                    id: dataApi.id
                })
                if (res) {
                    setDataLichSu(res.data.data)
                    setTotalCountLS(res.data.totalCount)
                } else {
                    setDataLichSu(undefined)
                    toast.error('Lỗi lấy thông tin lịch sử gọi!')
                }
                setLoading(false)
            }
        })()
    }, [dataApi, searchLichSuParams])


    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    <Divider style={{ borderColor: '#1677ff', color: '#1677ff' }} orientation="left">Thông tin API</Divider>
                    <Form name='MauPhoi' layout="vertical" form={form}
                        initialValues={{ uuTien: 1 }}>
                        <Row gutter={[8, 8]}>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Mã API chia sẻ"
                                    name="maApiChiaSe"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Tên"
                                    name="tenApiChiaSe"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Đường dẫn"
                                    name="duongDan"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Giới hạn (lần/ngày)"
                                    name="gioiHan"

                                >
                                    <InputNumber style={{ width: '100%' }} disabled />
                                </Form.Item>
                            </Col>
                            <Col md={24} span={24}>
                                <Form.Item
                                    label="Nội dung"
                                    name="noiDung"
                                >
                                    <Input.TextArea disabled rows={1} />
                                </Form.Item>
                            </Col>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Tham số đầu vào"
                                    name="thamSoDauVao"
                                >
                                    <Input.TextArea disabled rows={1} />
                                </Form.Item>
                            </Col>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Tham số đầu ra"
                                    name="thamSoDauRa"
                                >
                                    <Input.TextArea disabled rows={1} />
                                </Form.Item>
                            </Col>
                            <Col md={24} span={24}>
                                <Form.Item
                                    label="Hướng dẫn gọi API"
                                    name="huongDanGoi"
                                >
                                    <Input.TextArea disabled rows={1} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                    <Divider style={{ borderColor: '#1677ff', color: '#1677ff' }} orientation="left">Lịch sử truy cập</Divider>
                    {dataApi
                        ? <LichSuApiChiaSeTable dataLichSu={dataLichSu} totalCountLS={totalCountLS || 0} searchLichSuParams={searchLichSuParams} setSearchLichSuParams={setSearchLichSuParams} />
                        : null
                    }

                </Spin>
            </AntdSpace>
        </>

    )
}
const DanhMucApiTableWrapper = () => (<DanhMucApiProvider>
    <QuanLySuDungAPIProvider>
        <DanhMucApiTable />
    </QuanLySuDungAPIProvider>
</DanhMucApiProvider>)
export default DanhMucApiTableWrapper