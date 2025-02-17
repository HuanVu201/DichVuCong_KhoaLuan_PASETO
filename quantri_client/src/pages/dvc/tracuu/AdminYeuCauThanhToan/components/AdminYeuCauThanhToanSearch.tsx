import { Form, Input, Space, Row, Col, DatePicker, SelectProps } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { HINH_THUC_THANH_TOAN, KENH_THUC_HIEN, LOAIPHILEPHI_PAYMENT_OPTIONS } from "@/features/hoso/data/formData";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
const { RangePicker } = DatePicker;
export const AdminYeuCauThanhToanSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 50, reFetch: true }));
    }
  }, [user]);
  const kenhThucHienOptions = [
    { value: 1, label: KENH_THUC_HIEN["1"] },
    { value: 2, label: KENH_THUC_HIEN["2"] },
    { value: 3, label: KENH_THUC_HIEN["3"] },
  ];
  const CATALOG_OPTIONS: SelectProps["options"] = [
    { label: "Sở ban ngành", value: "so-ban-nganh" },
    { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
    { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  ];
  const hinhThucThuOptions = LOAIPHILEPHI_PAYMENT_OPTIONS;
  const onFinish = (values: any) => {
    const formData: any = {
      ...values,
      tiepNhanTuNgay:
        values.ngayTiepNhan && values.ngayTiepNhan.length > 0
          ? dayjs(values.ngayTiepNhan[0]).format('YYYY-MM-DD')
          : undefined,
      tiepNhanDenNgay:
        values.ngayTiepNhan && values.ngayTiepNhan.length > 0
          ? dayjs(values.ngayTiepNhan[1]).format('YYYY-MM-DD')
          : undefined,

      thanhToanTuNgay:
        values.ngayThuPhi && values.ngayThuPhi.length > 0
          ? dayjs(values.ngayThuPhi[0]).format('YYYY-MM-DD')
          : undefined,
      thanhToanDenNgay:
        values.ngayThuPhi && values.ngayThuPhi.length > 0
          ? dayjs(values.ngayThuPhi[1]).format('YYYY-MM-DD')
          : undefined,
      ngayTiepNhan: undefined,
      ngayThuPhi: undefined,
    };

    setSearchParams((curr) => ({ ...curr, ...formData }));
  };
  const resetSearchParams = useCallback(() => {
    setSearchParams((curr) => ({ ...curr }));
    form.resetFields();
  }, []);
  const catalog = Form.useWatch("catalog", form);

  useEffect(() => {
    if (user) {
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 10000,
          cataLog: catalog,
          donViQuanLy: user?.officeCode ? user?.officeCode : "",

          orderBy: ["MaDinhDanh"],
        })
      );
    }
  }, [catalog, user]);

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
    <CollapseContent >
      <Form
        name="HoSoSearch"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        onFieldsChange={(changedFields, allFields) => {
          if (
            changedFields[0] &&
            changedFields[0]["name"] &&
            changedFields[0]["name"][0] == "catalog"
          )
            form.setFieldValue("donVi", undefined);
        }}
      >
        <Row gutter={[8, 0]}>
          <Col md={8} span={24}>
            <Form.Item label="Từ khóa" name="tuKhoa">
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Đơn vị" name="donVi">
              <AntdSelect
                generateOptions={{
                  model: coCauToChucs,
                  value: "groupCode",
                  label: "groupName",
                }}
                showSearch
                allowClear
              />
            </Form.Item>
          </Col>
          {/* <Col md={8} span={24}>
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
            <Form.Item label="Thủ tục" name="thuTucId">
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
          </Col> */}
          <Col md={8} span={24}>
            <Form.Item label="Hình thức nộp hồ sơ" name="kenhThucHien">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                options={kenhThucHienOptions}
              />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Hình thức thu" name="hinhThucThu">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                options={hinhThucThuOptions}
              />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Hình thức thanh toán" name="hinhThucThanhToan">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                options={HINH_THUC_THANH_TOAN}
              />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Ngày tiếp nhận" name="ngayTiepNhan">
              <RangePicker
                format={FORMAT_DATE_WITHOUT_TIME}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Ngày thu phí" name="ngayThuPhi">
              <RangePicker
                format={FORMAT_DATE_WITHOUT_TIME}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* <Col md={12} span={24}>
            <Form.Item label="Hẹn trả ngày" name="henTraFrom">
              <DatePicker format={FORMAT_DATE} showTime />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Đến ngày" name="henTraTo">
              <DatePicker format={FORMAT_DATE} showTime />
            </Form.Item>
          </Col> */}
        </Row>
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
  );
};
