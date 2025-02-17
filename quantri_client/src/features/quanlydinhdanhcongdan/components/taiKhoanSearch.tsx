import { Form, Input, Space, Row, Col } from "antd"
import { useCallback } from "react"
import { ISearchQuanLyTaiKhoanDinhDanhParams } from "../models/QuanLyTaiKhoanModel"
import { useQuanLyDinhDanhContext } from "../context/quanLyDinhDanhCongDanContext"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { quanLyDinhDanhCongDanApi } from "../service"
import { FileExcelOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"

export const TaiKhoanSearch = ({ searchParams, setSearchParams }:
  {
    searchParams: ISearchQuanLyTaiKhoanDinhDanhParams,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchQuanLyTaiKhoanDinhDanhParams>>
  }) => {
  const QuanLyDinhDanhContext = useQuanLyDinhDanhContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchQuanLyTaiKhoanDinhDanhParams) => {
    setSearchParams((curr) => ({ ...curr, ...values }))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({
      ...searchParams,
      pageNumber: 1, pageSize: 10, reFetch: true
    })
    form.resetFields()
  }, [])

  const exportExcel = async () => {
    const resExcel = await quanLyDinhDanhCongDanApi.ExportExcelThongKeDinhDanh(searchParams)
    if (resExcel.data) {
      console.log(`${import.meta.env.VITE_HOST_PATH_FILE}${resExcel.data}`)
      try {
        let tab = window.open();
        if (tab) {
          tab.location.href = `${import.meta.env.VITE_HOST_PATH_FILE}${resExcel.data}`;

        }
      } catch (error) {
        console.error('Error:', error);
      }

    } else {
      toast.error("Có lỗi trong quá trình xuất thống kê!")
    }
  }


  return (
    <CollapseContent
      extraButtons={[
        <AntdButton
          style={{ backgroundColor: 'green', color: '#fff', display: 'flex', alignItems: 'center' }}
          onClick={() => exportExcel()}><FileExcelOutlined /> Xuất excel
        </AntdButton>
      ]}
    >
      <Form name='QuanLyDinhDanhSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Họ tên:"
              name="fullName"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Tài khoản:"
              name="userName"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Số điện thoại:"
              name="phoneNumber"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Email:"
              name="email"
            >
              <Input />
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
      </Form>
    </CollapseContent>
  )
}