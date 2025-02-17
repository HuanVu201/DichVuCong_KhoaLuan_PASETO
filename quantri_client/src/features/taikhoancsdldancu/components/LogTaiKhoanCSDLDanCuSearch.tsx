import { Form, Input, Space, Row, DatePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ILogCSDLDanCuDoanhNghiep, ISearchLogCSDLDanCuDoanhNghiep } from "../models"
import { useCallback, useEffect, useMemo } from "react"
import { useLogTaiKhoanCSDLDanCuContext } from "../contexts/LogTaiKhoanCSDLDanCuContext"
import { SearchLogCSDLDanCuDoanhNghiep, StatisticLogCSDLDanCuDoanhNghiep } from "../redux/action"

export const TaiKhoanCSDLDanCuSearch = ({ setSearchParams, searchParams, }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLogCSDLDanCuDoanhNghiep>>, searchParams: ISearchLogCSDLDanCuDoanhNghiep }) => {
  const TaiKhoanCSDLDanCuContext = useLogTaiKhoanCSDLDanCuContext()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm<ILogCSDLDanCuDoanhNghiep>()
  const { datas: donVis } = useAppSelector(state => state.donvi)
  const getTenDonVi = useMemo(() => {
    const donViMap = new Map(donVis?.map(dv => [dv.groupName, dv.donViId]))
    return donViMap
  }, [donVis]);
  const donViOptions = Array.from(getTenDonVi, ([label, value]) => ({ label, value }));
  const onFinish = (values: ISearchLogCSDLDanCuDoanhNghiep) => {
    const formData = form.getFieldsValue()
    setSearchParams((curr) => ({ ...curr, ...formData }))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })

    form.resetFields()
  }, [])


  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { TaiKhoanCSDLDanCuContext.setLogTaiKhoanCSDLDanCuModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='TaiKhoanCSDLDanCuSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row justify="space-around">
          <Space size={12}>
            <Form.Item name='tuNgay'>
              <DatePicker placeholder="Từ ngày" format='DD/MM/YYYY' />
            </Form.Item>
            <Form.Item name='denNgay'>
              <DatePicker placeholder="Đến ngày" format='DD/MM/YYYY' />
            </Form.Item>
            <Form.Item name='donViId'>
              <AntdSelect style={{ width: '300px' }} options={donViOptions as any} placeholder='Chọn đơn vị' />
            </Form.Item>
            <Form.Item name='taiKhoan'>
              <Input placeholder="Nhập tài khoản"  ></Input>
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