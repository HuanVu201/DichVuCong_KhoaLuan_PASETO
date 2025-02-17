import { Form, Input, Space, Row, Radio, Col, DatePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { ISearchHoSo, ISearchTheoDoiHoSoChungThucParams } from "@/features/hoso/models"
import dayjs from "dayjs";
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { filterOptions } from "@/utils"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"

export const HoSoTheoTrangThai10Search = ({ setSearchParams,daKySo  }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>,daKySo ? : boolean }) => {
    const dispatch = useAppDispatch()
    const firstDayOfCurrentYear = dayjs().startOf('year');
    const currentDay = dayjs();
    const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
    const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
    const [form] = Form.useForm()
    const onFinish = (values: ISearchHoSo) => {
        const formData = form.getFieldsValue()
        console.log(formData);
        
        setSearchParams((curr) => (
            {
                ...curr, ...values
            }
        ))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true, trangThaiHoSoId: '10',daKySo : daKySo })
        form.resetFields()
    }, [])

    useEffect(() => {
        dispatch(
            SearchThuTuc({
                pageNumber: 1,
                pageSize: 3000,
                reFetch: true,
            })
        )
    }, [])

    useEffect(() => {
        if(daKySo != undefined)
            form.setFieldValue("daKySo",daKySo)
    },[daKySo])

    return (
        <CollapseContent defaultVisible={true}
        >
            <Form name='theoDoiHoSoChungThuc' layout="vertical" onFinish={onFinish} form={form} className="search-form" >
                <div className="search-form-content">
                    <Row gutter={[8, 8]}>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Ký số"
                                name="daKySo"
                            >
                                <AntdSelect disabled = {daKySo != undefined? true : false} options={[
                                    { label: 'Đã ký số', value: true as any },
                                    { label: 'Chưa ký số', value: false as any },
                                ]}></AntdSelect>
                            </Form.Item>
                        </Col>

                        <Col md={12} span={24}>
                            <Form.Item label="Thủ tục" name="thuTucId" >
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