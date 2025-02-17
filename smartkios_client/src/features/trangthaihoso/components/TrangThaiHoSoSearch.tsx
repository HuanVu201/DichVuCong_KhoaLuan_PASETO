import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { ITrangThaiHoSo, ISearchTrangThaiHoSo } from "../models"
import { useCallback } from "react"
import { TrangThaiHoSoDetail } from "./TrangThaiHoSoDetail"
import { useTrangThaiHoSoContext } from "../contexts/TrangThaiHoSoContext"

export const TrangThaiHoSoSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTrangThaiHoSo>> }) => {
  const TrangThaiHoSoContext = useTrangThaiHoSoContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchTrangThaiHoSo) => {
    console.log(values);
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 10, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {TrangThaiHoSoContext.setTrangThaiHoSoModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='TrangThaiHoSoSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên trạng thái"
          name="ten"
        >
          <Input />
        </Form.Item>
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