import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IProcGroup_Mgr, ISearchProcGroup_Mgr } from "../models"
import { useCallback } from "react"
import { ProcGroup_MgrDetail } from "./ProcGroup_MgrDetail"
import { useProcGroup_MgrContext } from "../contexts/ProcGroup_MgrContext"

export const ProcGroup_MgrSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchProcGroup_Mgr>> }) => {
  const procGroup_MgrContext = useProcGroup_MgrContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchProcGroup_Mgr) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { procGroup_MgrContext.setProcGroup_MgrModalVisible(true) }}>Thêm mới</AntdButton>]}
    >  
      <Form name='ProcGroup_MgrSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên"
              name="ten"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Icon"
              name="icon"
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