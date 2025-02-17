import { Form, Input, Space, Row, Col, DatePicker, SelectProps } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect, useId } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { FormInstance } from "antd/lib";

export const SearchHoSoComp = ({
  setSearchParams,
  resetSearchParams,
  extraElement,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  resetSearchParams?: () => void;
  extraElement?: (form: FormInstance<ISearchHoSo>) => React.ReactNode;
}) => {
  const [form] = Form.useForm<ISearchHoSo>();
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const dispatch = useAppDispatch();
  const id = useId();
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
  const clearSearch = useCallback(() => {
    resetSearchParams ? resetSearchParams() : null;
    // setSearchParams((curr) => ({ ...curr }));
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
      <Form
        name={"SearchHoSo_" + id}
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[8, 0]}>
          <Col span={24}>
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
          {extraElement ? extraElement(form) : null}
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
              <AntdButton type="default" onClick={clearSearch}>
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  );
};
