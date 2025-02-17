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

export const ScanHoSoDienTuSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
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
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
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


  return (
    <CollapseContent defaultVisible={true}
    >
      <Form name='ScanHoSoDienTuSearch' layout="vertical" onFinish={onFinish} form={form} className="search-form" >
        <div className="search-form-content">
          <Row gutter={[8, 8]}>
            <Col md={12} span={24}>
              <Form.Item
                label="Scan"
                name="daKySo"
              >
                <AntdSelect options={[
                  { label: 'Đã Scan', value: true as any },
                  { label: 'Chưa Scan', value: false as any },
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