import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ITruongHopThuTuc, ISearchTruongHopThuTuc } from "../models"
import { useCallback } from "react"
import { TruongHopThuTucDetail } from "./TruongHopThuTucDetail"
import { useTruongHopThuTucContext } from "../contexts/TruongHopThuTucContext"

export const TruongHopThuTucSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTruongHopThuTuc>> }) => {
  const TruongHopThuTucContext = useTruongHopThuTucContext()
  const [form] = Form.useForm()
  const { data: user } = useAppSelector((state) => state.user);
  const onFinish = (values: ISearchTruongHopThuTuc) => {
    setSearchParams({ pageNumber: 0, pageSize: 50, reFetch: true, ...values })
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])


  return (
    <CollapseContent
      extraButtons={[user && user?.typeUser == 'Admin' ? <AntdButton onClick={() => { TruongHopThuTucContext.setTruongHopThuTucModalVisible(true) }}>Thêm mới</AntdButton> : <></>]}
    >
      <Form name='TruongHopThuTucSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên trường hợp"
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