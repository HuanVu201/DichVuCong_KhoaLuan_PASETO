import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch } from "../../../../lib/redux/Hooks"
import { IDanhMucNganh, ISearchDanhMucNganh } from "../models"
import { useCallback } from "react"
import { useDanhMucNganhContext } from "../contexts/DanhMucNganhContext"

export const DanhMucNganhSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMucNganh>> }) => {
  const danhMucNganhContext = useDanhMucNganhContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMucNganh) => {
    setSearchParams((curr: any) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {danhMucNganhContext.setMaDanhMucNganhModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMucNganhSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên danh mục"
          name="tenDanhMuc"
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