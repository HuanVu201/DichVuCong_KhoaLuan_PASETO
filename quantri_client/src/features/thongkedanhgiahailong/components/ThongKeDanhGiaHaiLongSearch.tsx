import { Form, Input, Space, Row, DatePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback } from "react"
import { useThongKeDanhGiaHaiLongContext } from "../contexts/ThongKeDanhGiaHaiLongContext"
import { ISearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { filterOptions } from "@/utils"

export const ThongKeDanhGiaHaiLongSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchPhieuKhaoSat>> }) => {
  const ThongKeDanhGiaHaiLongContext = useThongKeDanhGiaHaiLongContext()
  const [form] = Form.useForm()
  const { data: user } = useAppSelector(state => state.user)
  const { datas: donVis } = useAppSelector(state => state.cocautochuc)

  const onFinish = (values: ISearchPhieuKhaoSat) => {
    console.log(form.getFieldValue("donVi"));
    setSearchParams((curr) => ({ ...curr, ...values, donVi: form.getFieldValue("donVi") ? form.getFieldValue("donVi") : user?.officeCode }))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true, donVi: user?.officeCode })
    form.resetFields()
  }, [])
  return (

    <Form name='ThongKeDanhGiaHaiLongSearch' layout="vertical" onFinish={onFinish} form={form}>

      <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>
        <Row style={{ alignItems: 'inherit', }}>
          <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px', marginTop: '3px' }}>Đơn vị : </span>
          <Form.Item
            name="donVi"
          >
            <AntdSelect
              defaultValue={user?.officeName}
              generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
              showSearch
              allowClear
              filterOption={filterOptions}
              style={{ width: '400px' }}
            />            </Form.Item>
        </Row>
        <Row style={{ alignItems: 'inherit', }}>
          <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px' }}>Từ ngày :</span>
          <Form.Item
            name="tuNgay"
          >
            <DatePicker format={FORMAT_DATE_WITHOUT_TIME}></DatePicker>
          </Form.Item>
        </Row>
        <Row style={{ alignItems: 'inherit', }}>
          <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px' }}>Đến ngày :</span>
          <Form.Item
            name="denNgay"
          >
            <DatePicker format={FORMAT_DATE_WITHOUT_TIME}></DatePicker>
          </Form.Item>
        </Row>
      </div>
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
  )
}