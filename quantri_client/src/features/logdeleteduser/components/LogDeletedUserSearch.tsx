import { Form, Input, Space, Row, DatePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback, useEffect, useMemo } from "react"
import { ISearchUser, IUser } from "@/features/user/models"

export const LogDeletedUserSearch = ({ setSearchParams, searchParams, }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchUser>>, searchParams: ISearchUser }) => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm<IUser>()
  const onFinish = (values: IUser) => {
    const formData = form.getFieldsValue()
    setSearchParams((curr) => ({ ...curr, ...formData }))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 30, reFetch: true })

    form.resetFields()
  }, [])


  return (
    <CollapseContent
    >
      <Form name='LogDeletedUserSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row justify="space-around">
          <Space size={12}>
            <Form.Item name='tuNgay'>
              <DatePicker placeholder="Từ ngày" format='DD/MM/YYYY' />
            </Form.Item>
            <Form.Item name='denNgay'>
              <DatePicker placeholder="Đến ngày" format='DD/MM/YYYY' />
            </Form.Item>
            <Form.Item style={{ width: '400px' }} name='id'>
              <Input  placeholder="Nhập id"  ></Input>
            </Form.Item>
            <Form.Item  name='userName'>
              <Input placeholder="Nhập tài khoản" ></Input>
            </Form.Item>
          </Space>
        </Row>

        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit" >
                Tra cứu
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams}>
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent >
  )
}