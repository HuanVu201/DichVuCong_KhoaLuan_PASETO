import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { ILoaiPhiLePhi, ISearchLoaiPhiLePhi } from "../models"
import { useCallback } from "react"
import { LoaiPhiLePhiDetail } from "./LoaiPhiLePhiDetail"
import { useLoaiPhiLePhiContext } from "../contexts/LoaiPhiLePhiContext"

export const LoaiPhiLePhiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLoaiPhiLePhi>> }) => {
  const loaiPhiLePhiContext = useLoaiPhiLePhiContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchLoaiPhiLePhi) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {loaiPhiLePhiContext.setMaPhiLePhiModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='loaiPhiLePhiSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên phí,lệ phí"
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