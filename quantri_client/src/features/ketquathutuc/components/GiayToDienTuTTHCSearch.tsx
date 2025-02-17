import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models"
import { useCallback, useEffect } from "react"
import { useKetQuaThuTucContext } from "../contexts/KetQuaThuTucProvider"
import { filterOptions } from "@/utils"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"

export const GiayToDienTuTTHCSearch = ({ setSearchParams, resetSearch }: { resetSearch: () => void; setSearchParams: React.Dispatch<React.SetStateAction<ISearchKetQuaThuTuc>> }) => {
  const ketQuaThuTucContext = useKetQuaThuTucContext()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch();
  const onFinish = (values: ISearchKetQuaThuTuc) => {

    setSearchParams((curr) => ({ ...curr, ...values }))
  }
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const resetSearchParams = useCallback(() => {
    resetSearch()
    form.resetFields()
  }, [])
  useEffect(() => {

    dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 5000, reFetch: true }));

  }, []);
  const onSelectLinhVuc = (maLinhVuc: string) => {
    dispatch(
      SearchThuTuc({
        pageNumber: 1,
        pageSize: 100,
        reFetch: true,
        maLinhVucChinh: maLinhVuc,
      })
    );
  };
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { ketQuaThuTucContext.setKetQuaThuTucModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='KetQuaThuTucSearch' layout="vertical" onFinish={onFinish} form={form} onFieldsChange={(fieldChange: any) => {
        if (fieldChange && fieldChange[0]) {
          if (
            fieldChange[0].name[0] == "maLinhVucChinh"
          ) {

            form.setFieldValue("thuTucId", undefined);
          }
        }
      }}>
        <Row gutter={[8, 8]}>
          <Col md={8} span={24}>
            <Form.Item
              label="Tên kết quả"
              name="tenKetQua"
            >
              <Input />
            </Form.Item>
          </Col>


          <Col md={8} span={24}>
            <Form.Item label="Lĩnh vực" name="maLinhVucChinh">
              <AntdSelect
                generateOptions={{ model: linhVucs, label: "ten", value: "ma" }}
                allowClear
                showSearch
                filterOption={filterOptions}
                onSelect={onSelectLinhVuc}
              />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Thủ tục" name="maTTHC">
              <AntdSelect
                generateOptions={{
                  model: thuTucs,
                  label: "tenTTHC",
                  value: "maTTHC",
                }}
                allowClear
                showSearch
                filterOption={filterOptions}
              />
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