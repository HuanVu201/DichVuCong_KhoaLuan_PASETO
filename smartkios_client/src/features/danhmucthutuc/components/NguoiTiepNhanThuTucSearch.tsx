import { Form, Input, Space, Row, Col } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton } from "../../../lib/antd/components";
import { INguoiTiepNhanThuTuc, ISearchNguoiTiepNhanThuTuc } from "../../thutuc/models";
import { useCallback } from "react";
import { useThuTucContext, ThuTucProvider } from "../../thutuc/contexts/ThuTucContext"



export const NguoiTiepNhanThuTucSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchNguoiTiepNhanThuTuc>>; }) => {
  const [form] = Form.useForm<INguoiTiepNhanThuTuc>()
  const onFinish = (values: ISearchNguoiTiepNhanThuTuc) => {
    setSearchParams((curr) => ({ ...curr, ...values }));

  };



  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true });
    form.resetFields();
  }, []);
  return (
    <CollapseContent>
      <Form className="mt-3" name='NguoiTiepNhanThuTucSearch' layout="horizontal" onFinish={onFinish} form={form}>
        <div style={{ justifyContent: 'center', display: 'flex' }} >
          <Row gutter={[8, 8]}>
            <Col md={12} span={24}>
              <Form.Item
                label="Mã TTHC"
                name="maTTHC"
              >
                <Input style={{ width: '300px' }} />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>

              <Form.Item
                label="Tên TTHC"
                name="tenTTHC"
              >
                <Input style={{ width: '300px' }} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit">
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

};
