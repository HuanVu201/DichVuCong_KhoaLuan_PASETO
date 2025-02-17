import { Form, Input, Space, Row, Col, DatePicker, SelectProps } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";

export const XinRutSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 50, reFetch: true }));
    }
  }, [user]);

  const onFinish = (values: ISearchHoSo) => {
    const formData: ISearchHoSo = {
      ...values,
      tiepNhanFrom: values.tiepNhanFrom
        ? dayjs(values.tiepNhanFrom).format()
        : undefined,
      tiepNhanTo: values.tiepNhanTo
        ? dayjs(values.tiepNhanTo).format()
        : undefined,
      henTraFrom: values.henTraFrom
        ? dayjs(values.henTraFrom).format()
        : undefined,
      henTraTo: values.henTraTo ? dayjs(values.henTraTo).format() : undefined,
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
    <CollapseContent>
      <Form name="HoSoSearch" layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 0]}>
          <Col md={12} span={24}>
            <Form.Item label="Từ khóa" name="searchKeys">
              <Input placeholder="Nhập từ khóa" />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
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
          <Col md={12} span={24}>
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
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Tiếp nhận ngày" name="tiepNhanFrom">
              <DatePicker format={FORMAT_DATE} showTime />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Đến ngày" name="tiepNhanTo">
              <DatePicker format={FORMAT_DATE} showTime />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Hẹn trả ngày" name="henTraFrom">
              <DatePicker format={FORMAT_DATE} showTime />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Đến ngày" name="henTraTo">
              <DatePicker format={FORMAT_DATE} showTime />
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
