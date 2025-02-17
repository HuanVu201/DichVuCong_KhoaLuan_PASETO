import { Form, Input, Space, Row, Col, DatePicker, SelectProps } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE, FORMAT_DATE_FORMIO, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import {
  DOT_TAC_THANH_TOAN,
  KENH_THUC_HIEN,
  LOAIPHILEPHI_PAYMENT_OPTIONS,
} from "@/features/hoso/data/formData";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
const { RangePicker } = DatePicker;
export const DaHoanPhiSearch = ({
  setSearchParams,
  buttons,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  buttons: any;
}) => {
  const [form] = Form.useForm();
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 50, reFetch: true }));
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 10000,

          donViQuanLy: user?.officeCode ? user?.officeCode : "",

          orderBy: ["MaDinhDanh"],
        })
      );
    }
  }, [user]);

  const kenhThucHienOptions = [
    { value: 1, label: KENH_THUC_HIEN["1"] },
    { value: 2, label: KENH_THUC_HIEN["2"] },
    { value: 3, label: KENH_THUC_HIEN["3"] },
  ];
  const hinhThucThuOptions = LOAIPHILEPHI_PAYMENT_OPTIONS;
  const onFinish = (values: any) => {
    const formData: any = {
      ...values,
      tiepNhanTuNgay:
        values.ngayTiepNhan && values.ngayTiepNhan.length > 0
          ? dayjs(values.ngayTiepNhan[0]).format(FORMAT_DATE_FORMIO)
          : undefined,
      tiepNhanDenNgay:
        values.ngayTiepNhan && values.ngayTiepNhan.length > 0
          ? dayjs(values.ngayTiepNhan[1]).format(FORMAT_DATE_FORMIO)
          : undefined,

      hoanPhiTuNgay:
        values.ngayHoanPhi && values.ngayHoanPhi.length > 0
          ? dayjs(values.ngayHoanPhi[0]).format(FORMAT_DATE_FORMIO)
          : undefined,
      hoanPhiDenNgay:
        values.ngayHoanPhi && values.ngayHoanPhi.length > 0
          ? dayjs(values.ngayHoanPhi[1]).format(FORMAT_DATE_FORMIO)
          : undefined,
      ngayTiepNhan: undefined,
      ngayHoanPhi: undefined,
    };

    setSearchParams((curr) => ({ ...curr, ...formData }));
  };
  const resetSearchParams = useCallback(() => {
    setSearchParams((curr) => ({ ...curr }));
    form.resetFields();
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
    <CollapseContent extraButtons={buttons}>
      <Form name="HoSoSearch" layout="vertical" onFinish={onFinish} form={form}>
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
            <Form.Item label="Đối tác thanh toán" name="doiTacThanhToan">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                options={DOT_TAC_THANH_TOAN}
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
            <Form.Item label="Ngày hoàn phí" name="ngayHoanPhi">
              <RangePicker
                format={FORMAT_DATE_WITHOUT_TIME}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
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
