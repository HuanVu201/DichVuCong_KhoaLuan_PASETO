import { Form, Input, Space, Row, Col, SelectProps, DatePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IThayDoiMucDoThuTuc, ISearchThayDoiMucDoThuTuc } from "../models"
import { useCallback } from "react"
import { useThayDoiMucDoThuTucContext } from "../contexts/ThayDoiMucDoThuTucContext"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"


const mucDoOptions: SelectProps["options"] = [
  { label: "Dịch vụ công", value: "2" },
  {
    label: "Dịch vụ công trực tuyến một phần",
    value: "3",
  },
  {
    label: "Dịch vụ công trực tuyến toàn trình",
    value: "4",
  },
];


export const ThayDoiMucDoThuTucSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchThayDoiMucDoThuTuc>> }) => {
  const ThayDoiMucDoThuTucContext = useThayDoiMucDoThuTucContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchThayDoiMucDoThuTuc) => {
    setSearchParams((curr) => ({ ...curr, ...values }))
  }
  const { datas: donVis } = useAppSelector((state) => state.cocautochuc);

  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 30, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
    >
      <Form name='ThayDoiMucDoThuTucSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Thủ tục"
              name="thuTuc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Đơn vị"
              name="donVi"
            >
              <AntdSelect allowClear generateOptions={{ model: donVis, label: 'groupName', value: 'groupCode' }}></AntdSelect>
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item
              label="Mức độ cũ"
              name="mucDoCu"
            >
              <AntdSelect allowClear options={mucDoOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mức độ mới"
              name="mucDoMoi"
            >
              <AntdSelect allowClear options={mucDoOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>

            <Form.Item
              label="Từ ngày"
              name="tuNgay"
            >
              <DatePicker  style={{ width: '100%' }} allowClear format={FORMAT_DATE_WITHOUT_TIME} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>

            <Form.Item
              label="Đến ngày"
              name="denNgay"
            >
              <DatePicker style={{ width: '100%' }} allowClear format={FORMAT_DATE_WITHOUT_TIME} />
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