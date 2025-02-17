import { Form, Input, Space, Row, Col, SelectProps } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { useCallback, useEffect } from "react";
import { filterOptions } from "@/utils";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { ISearchThuTuc } from "@/features/thutuc/models";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";

const suDungOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: "false" },
];
const mucDoOptions: SelectProps["options"] = [
  { label: "Dịch vụ công", value: "2" },
  {
    label: "Dịch vụ công trực tuyến một phần",
    value: "3",
  },
  {
    label: "Dịch vụ công trực tuyến toàn trình",
    value: "4",
  },
];
const phiLePhiOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: "false" },
];

export const ThuTucCanBoMotCuaSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchThuTuc>>;
}) => {
  const dispatch = useAppDispatch();
  const { datas: linhvucs } = useAppSelector((state) => state.linhvuc);
  const [form] = Form.useForm();
  const onFinish = (values: ISearchThuTuc) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };
  useEffect(() => {
    if ((linhvucs && linhvucs.length < 100) || linhvucs === undefined) {
      dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 250, reFetch: true }));
    }
  }, [linhvucs]);
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 20, reFetch: true });
    form.resetFields();
  }, []);
  return (
    <CollapseContent
      defaultVisible={true}
      // extraButtons={[<AntdButton onClick={() => {ThuTucContext.setThuTucModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form
        name="ThuTucSearch"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col md={8} span={24}>
            <Form.Item label="Từ khóa" name="tuKhoa">
              <Input placeholder="Nhập tên TTHC hoặc mã TTHC" />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Sử dụng" name="suDung">
              <AntdSelect allowClear options={suDungOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Lĩnh vực" name="maLinhVucChinh">
              <AntdSelect
                generateOptions={{ model: linhvucs, label: "ten", value: "ma" }}
                showSearch
                allowClear
                filterOption={filterOptions}
              />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Mức độ" name="mucDo">
              <AntdSelect allowClear options={mucDoOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Phí lệ phí" name="trangThaiPhiLePhi">
              <AntdSelect allowClear options={phiLePhiOptions}></AntdSelect>
            </Form.Item>
          </Col>
        </Row>
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
      </Form>
    </CollapseContent>
  );
};
