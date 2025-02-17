import { Form, Input, Space, Row, Col, SelectProps, Dropdown } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { IThuTuc, ISearchThuTuc } from "../models";
import { useCallback, useEffect } from "react";
import { ThuTucDetail } from "./ThuTucDetail";
import { useThuTucContext } from "../contexts/ThuTucContext";
import { filterOptions } from "@/utils";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { DownOutlined, PrinterOutlined } from "@ant-design/icons";

export const capThucHien = [
  { value: "", label: "--Chọn cấp thực hiện--" },
  { value: "CapTinh", label: "Cấp tỉnh" },
  { value: "CapHuyen", label: "Cấp huyện" },
  { value: "CapXa", label: "Cấp xã" },
];
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

export const ThuTucSearch = ({
  setSearchParams,
  items
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchThuTuc>>;
  items: any,
}) => {
  const dispatch = useAppDispatch();
  const ThuTucContext = useThuTucContext();
  const { datas: linhvucs } = useAppSelector((state) => state.linhvuc);
  const [form] = Form.useForm();
  const onFinish = (values: ISearchThuTuc) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };
  useEffect(() => {
    if ((linhvucs && linhvucs.length < 100) || linhvucs === undefined) {
      dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 1000, reFetch: true }));
    }
  }, [linhvucs]);
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 20, reFetch: true });
    form.resetFields()
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

          <Col md={6} span={24}>
            <Form.Item label="Từ khóa" name="tuKhoa">
              <Input placeholder="Nhập tên TTHC hoặc mã TTHC" />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Sử dụng" name="suDung">
              <AntdSelect allowClear options={suDungOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Cấp thực hiện" name="capThucHien">
              <AntdSelect allowClear options={capThucHien}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Lĩnh vực" name="maLinhVucChinh">
              <AntdSelect
                generateOptions={{ model: linhvucs, label: "ten", value: "ma" }}
                showSearch
                allowClear
                filterOption={filterOptions}
              />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item
              label="Mức độ"
              name="mucDo"
            >
              <AntdSelect allowClear options={mucDoOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item
              label="Phí lệ phí"
              name="trangThaiPhiLePhi"
            >
              <AntdSelect allowClear options={phiLePhiOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item
              label="Quyết định"
              name="quyetDinh"
            >
              <AntdSelect allowClear options={phiLePhiOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item
              label="Thực hiện tại bộ phận một cửa"
              name="thucHienTaiBoPhanMotCua"
            >
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
            <div className="btnXuatBaoCao" style={{ display: items.length > 0 ? '' : 'none' }}>

              <Dropdown menu={{ items }} trigger={["click"]}>
                <AntdButton type="primary" onClick={(e) => e.preventDefault()}>
                  <Space>
                    In danh sách
                    <DownOutlined />
                  </Space>
                </AntdButton>
              </Dropdown>
            </div>
          </Space>
        </Row>
      </Form>
    </CollapseContent>
  );
};
