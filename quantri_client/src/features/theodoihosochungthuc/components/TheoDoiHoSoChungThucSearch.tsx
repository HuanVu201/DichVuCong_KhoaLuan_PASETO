import { Form, Input, Space, Row, Radio, Col, DatePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { useTheoDoiHoSoChungThucContext } from "../contexts/TheoDoiHoSoChungThucContext"
import { ISearchTheoDoiHoSoChungThucParams } from "@/features/hoso/models"
import dayjs from "dayjs";
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { filterOptions } from "@/utils"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"

export const TheoDoiHoSoChungThucSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTheoDoiHoSoChungThucParams>> }) => {
    const theoDoiHoSoChungThucContext = useTheoDoiHoSoChungThucContext()
    const dispatch = useAppDispatch()
    const firstDayOfCurrentYear = dayjs().startOf('year');
    const currentDay = dayjs();
    const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
    const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
    const [form] = Form.useForm()
    const onFinish = (values: ISearchTheoDoiHoSoChungThucParams) => {

        setSearchParams((curr) => (
            {
                ...curr, ...values,
                nopHoSoTuNgay: values.nopHoSoTuNgay ? dayjs(values.nopHoSoTuNgay).format() : undefined,
                nopHoSoDenNgay: values.nopHoSoDenNgay ? dayjs(values.nopHoSoDenNgay).format() : undefined,
                loaiDoiTuong: values.loaiDoiTuong ? values.loaiDoiTuong : "Công dân"
            }
        ))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 20, reFetch: true, loaiDoiTuong: "Công dân" })
        form.resetFields()
    }, [])
    useEffect(() => {
        dispatch(
            SearchThuTuc({
                pageNumber: 1,
                pageSize: 100,
                reFetch: true,
                laThuTucChungThuc: true
            })
        )
    }, [])

    useEffect(() => {
        if (thuTucs && thuTucs.length > 0) {
            form.setFieldValue('TTHC', thuTucs[0].maTTHC);
        }
        form.setFieldValue('nopHoSoTuNgay', dayjs(firstDayOfCurrentYear.format()))
        form.setFieldValue('nopHoSoDenNgay', dayjs(currentDay.format()))

    }, [thuTucs]);

    return (
        <CollapseContent defaultVisible={true}
        >
            <Form name='theoDoiHoSoChungThuc' layout="vertical" onFinish={onFinish} form={form} className="search-form" >
                <div className="search-form-content">
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item name="loaiDoiTuong" label="">
                                <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                                    <span style={{ fontSize: '15px', fontWeight: '500' }}>Tìm kiếm theo đối tượng</span>
                                    <Radio.Group name="loaiDoiTuong" defaultValue={"Công dân"} >
                                        <Radio value={"Công dân"}>Công dân</Radio>
                                        <Radio value={"Doanh nghiệp"}>Doanh nghiệp</Radio>
                                        <Radio value={"Đối tượng không có tài khoản DVCQG"}>Đối tượng không có tài khoản DVCQG</Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col md={8} span={24}>
                            <Form.Item
                                label="Mã hồ sơ"
                                name="maChungThuc"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={8} span={24}>
                            <Form.Item
                                label="Số chứng thực"
                                name="soChungThuc"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={8} span={24}>
                            <Form.Item
                                label="Tên đối tượng/Số CMT/CCCD"
                                name="searchKeys"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={8} span={24}>
                            <Form.Item
                                label="Trạng thái"
                                name="trangThaiHoSoId"
                            >
                                <AntdSelect
                                    options={[
                                        { value: '1', label: 'Mới đăng ký' },
                                        { value: '2', label: 'Được tiếp nhận' },
                                        { value: '3', label: 'Không được tiếp nhận' },
                                        { value: '4', label: 'Đang xử lý' },
                                        { value: '5', label: 'Yêu cầu bổ sung giấy tờ' },
                                        { value: '6', label: 'Yêu cầu thực hiện nghĩa vụ tài chính' },
                                        { value: '7', label: 'Công dân yêu cầu rút hồ sơ' },
                                        { value: '8', label: 'Dừng xử lý' },
                                        { value: '9', label: 'Đã xử lý xong' },
                                        { value: '10', label: 'Đã trả kết quả' },
                                    ]}
                                ></AntdSelect>
                            </Form.Item>
                        </Col>
                        <Col md={8} span={24}>
                            <Form.Item
                                label="Ngày nộp từ ngày"
                                name="nopHoSoTuNgay"
                            >
                                <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }}></DatePicker>
                            </Form.Item>
                        </Col>
                        <Col md={8} span={24}>
                            <Form.Item
                                label="Đến ngày"
                                name="nopHoSoDenNgay"
                            >
                                <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }}></DatePicker>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Thủ tục" name="TTHC" >
                                <AntdSelect
                                    generateOptions={{
                                        model: thuTucs,
                                        label: "tenTTHC",
                                        value: "maTTHC",
                                    }}
                                    allowClear
                                    showSearch
                                    filterOption={filterOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Row justify="space-around">
                            <Space size="large">
                                <AntdButton type="primary" htmlType="submit" >
                                    Xác nhận
                                </AntdButton>
                                <AntdButton type="default" onClick={resetSearchParams}>
                                    Tải lại
                                </AntdButton>
                            </Space>
                        </Row>
                    </Form.Item>
                </div>

            </Form>
        </CollapseContent>
    )
}