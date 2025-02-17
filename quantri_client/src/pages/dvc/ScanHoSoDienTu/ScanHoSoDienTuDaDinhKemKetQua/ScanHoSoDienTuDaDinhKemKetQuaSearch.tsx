import { Form, Input, Space, Row, Radio, Col, DatePicker } from "antd"
import { useCallback, useEffect, useState } from "react"
import { ISearchHoSo, ISearchTheoDoiHoSoChungThucParams } from "@/features/hoso/models"
import dayjs from "dayjs";
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { filterOptions } from "@/utils"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { CollapseContent } from "@/components/common";

export const ScanHoSoDienTuDaDinhKemKetQuaSearch = ({ setSearchParams, daKySo }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>, daKySo?: boolean }) => {
    const dispatch = useAppDispatch()
    const firstDayOfCurrentYear = dayjs().startOf('year');
    const currentDay = dayjs();
    const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
    const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
    const [form] = Form.useForm()
    const onFinish = (values: ISearchHoSo) => {
        const formData = form.getFieldsValue()

        setSearchParams((curr) => (
            {
                ...curr, ...values
            }
        ))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true,daKySo : true })
        form.resetFields()
    }, [])


    return (
        <CollapseContent defaultVisible={true}
        >
            <Form name='ScanHoSoDienTuSearch' layout="vertical" onFinish={onFinish} form={form} className="search-form" >
                <div className="search-form-content">
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item
                                label="Từ khóa"
                                name="searchKeys"
                            >
                                <Input></Input>
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