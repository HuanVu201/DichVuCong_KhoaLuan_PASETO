import { Form, Input, Space, Row, Col } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { INguoiTiepNhanThuTuc, ISearchNguoiTiepNhanThuTuc } from "../../thutuc/models";
import { useCallback, useEffect, useState } from "react";
import { useThuTucContext, ThuTucProvider } from "../../thutuc/contexts/ThuTucContext"
import { mucDo } from "@/features/portaldvc/DanhMucThuTuc/components/HeaderContainerTTHC";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { SearchLinhVucTheoDonVi } from "@/features/linhvuc/redux/action";



export const NguoiTiepNhanThuTucSearch = ({ searchParams, setSearchParams }: {
  searchParams: ISearchNguoiTiepNhanThuTuc | undefined
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchNguoiTiepNhanThuTuc>>;
}) => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector(state => state.user)
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const [donVi, setDonVi] = useState<string>()
  const [form] = Form.useForm<INguoiTiepNhanThuTuc>()
  const onFinish = (values: ISearchNguoiTiepNhanThuTuc) => {

    setSearchParams((curr) => ({
      ...curr,
      ...values,
      donViId: values.donViId || user?.officeCode
    }));

  };

  useEffect(() => {
    if (!coCauToChucs && searchParams?.donViId) {
      dispatch(SearchCoCauToChuc({
        donViQuanLy: searchParams?.donViId,
        type: 'don-vi',
        pageNumber: 1,
        pageSize: 2000
      }));
    }
  }, [searchParams?.donViId])

  useEffect(() => {
    dispatch(SearchLinhVucTheoDonVi({ pageNumber: 1, pageSize: 10000, donViId: donVi || undefined, }));
  }, [donVi]);

  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true, donViId: user?.officeCode });
    form.resetFields();
  }, []);
  return (
    <CollapseContent>
      <Form className="mt-3" name='NguoiTiepNhanThuTucSearch' layout="horizontal" onFinish={onFinish} form={form}>
        <div style={{ justifyContent: 'center', display: 'flex' }} >
          <Row gutter={[8, 8]}>
            <Col md={12} span={24}>
              <Form.Item
                label="Đơn vị"
                name="donViId"
              >
                <AntdSelect
                  generateOptions={{
                    model: coCauToChucs,
                    value: "groupCode",
                    label: "groupName",
                  }}
                  allowClear={true}
                  showSearch
                  placeholder="Chọn đơn vị thực hiện"
                  onChange={(value) => setDonVi(value)}
                />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="maLinhVucChinh" label="Lĩnh vực">
                <AntdSelect
                  generateOptions={{
                    model: linhVucs,
                    value: "ma",
                    label: "ten",
                  }}
                  allowClear
                  showSearch
                  placeholder="Chọn lĩnh vực"
                />
              </Form.Item>
            </Col>
            <Col md={8} span={24}>
              <Form.Item
                label="Mã TTHC"
                name="maTTHC"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={8} span={24}>
              <Form.Item
                label="Tên TTHC"
                name="tenTTHC"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col md={8} span={24}>
              <Form.Item
                label="Mức độ"
                name="mucDo"
              >
                <AntdSelect
                  generateOptions={{
                    model: mucDo,
                    value: "value",
                    label: "label",
                  }}
                  allowClear={true}
                  showSearch
                  placeholder="Chọn mức độ"
                />
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
