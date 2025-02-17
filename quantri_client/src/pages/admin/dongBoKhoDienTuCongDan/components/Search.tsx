import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { useCallback, useState } from "react"
import { useDanhSachGiayToContext } from "../contexts/DanhSachGiayToProvider"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import dayjs from 'dayjs'

export const Search = ({ setSearchParams, resetSearch, loading }: {loading: boolean; resetSearch: () => void; setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiayToSoHoa>> }) => {
  const danhSachGiayToContext = useDanhSachGiayToContext()
  const [form] = Form.useForm()
  const onFinish = (values: IGiayToSoHoa) => {
    console.log(values);
    
    setSearchParams((curr) => {
      return ({...curr, ...values, createdOn: values.createdOn ? dayjs(values.createdOn).format() : undefined})
    })
  }

  const resetSearchParams = useCallback(() => {
    resetSearch()
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={danhSachGiayToContext.hideThemMoi ? undefined:  [<AntdButton onClick={() => {danhSachGiayToContext.setViewMode("add")}}>Thêm mới</AntdButton>]}
    >
      <Form name='Search' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={8}>
          <Col md={8} span={24}>
            <Form.Item
              label="Tên giấy tờ"
              name="tenGiayTo"
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="CCCD"
              name="soGiayToChuHoSo"
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Đồng bộ từ ngày"
              name="createdOn"
            >
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit" loading={loading}>
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams} loading={loading}>
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  )
}