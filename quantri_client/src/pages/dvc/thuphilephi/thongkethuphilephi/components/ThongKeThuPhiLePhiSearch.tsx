import { Form, Input, Space, Row, Col, DatePicker, SelectProps } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { IParseUserToken } from "@/models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import {
  DOT_TAC_THANH_TOAN,
  HINH_THUC_THANH_TOAN,
  KENH_THUC_HIEN,
  LOAIPHILEPHI_PAYMENT_OPTIONS,
} from "@/features/hoso/data/formData";
import { PageSize } from "@formio/react";
import { IThuTuc } from "@/features/thutuc/models";
import { useMenu } from "@/lib/antd/components/menu/hooks/useMenu";
import { ILinhVuc } from "@/features/linhvuc/models";
const { RangePicker } = DatePicker;
export const ThongKeThuPhiLePhiSearch = ({
  setSearchParams,
  extraButtons,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  extraButtons: React.ReactNode[];
}) => {
  const [form] = Form.useForm();
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const dispatch = useAppDispatch();
  const kenhThucHienOptions = [
    { value: 1, label: KENH_THUC_HIEN["1"] },
    { value: 2, label: KENH_THUC_HIEN["2"] },
    { value: 3, label: KENH_THUC_HIEN["3"] },
  ];
  const catalog = Form.useWatch("catalog", form);
  const selectedLinhVuc = Form.useWatch("maLinhVucChinh", form)
  const selectedDonVi = Form.useWatch("donVi", form)
  const hinhThucThuOptions = LOAIPHILEPHI_PAYMENT_OPTIONS;
  useEffect(() => {
    if (user) {

      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 1100,
          cataLog: catalog,
          donViQuanLy: user?.officeCode ? user?.officeCode : "",

          orderBy: ["MaDinhDanh"],
        })
      );
      dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 15000, reFetch: true }));

    }
  }, [catalog, user]);
  const donVis = useMemo(() => {
    var tmpCoCaus = coCauToChucs?.filter((x) => x.maDinhDanh);
    if (tmpCoCaus && tmpCoCaus.find(x => x.groupCode == user?.officeCode))
      form.setFieldValue("donVi", user?.officeCode)
    return tmpCoCaus;
  }, [coCauToChucs]);
  useEffect(() => {
    (async () => {

      dispatch(SearchThuTuc({ pageNumber: 1, pageSize: 15000, reFetch: true, donVi: selectedDonVi })).unwrap();



    })()

  }, [selectedDonVi]);
  useEffect(() => {
    dispatch(SearchDanhMucChung({ type: "nhom-co-cau" }));
  }, []);
  const { datas: danhMucChungs, data: danhMucChung } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  const [groupOptions] = useMemo(() => {
    return [danhMucChungs?.filter((e) => e.type === "nhom-co-cau")];
  }, [danhMucChungs]);
  const onFinish = (values: any) => {
    const formData: any = {
      ...values,
      hinhThucThu: values.hinhThucThu,
      khacHinhThucThus: values.hinhThucThu ? null : ["Đối tượng miễn phí"],
      tiepNhanTuNgay:
        values.tiepNhanTuNgay && values.tiepNhanTuNgay.length > 0
          ? dayjs(values.tiepNhanTuNgay[0]).format("YYYY-MM-DD")
          : undefined,
      tiepNhanDenNgay:
        values.tiepNhanTuNgay && values.tiepNhanTuNgay.length > 0
          ? dayjs(values.tiepNhanTuNgay[1]).format("YYYY-MM-DD")
          : undefined,
      thanhToanTuNgay:
        values.thuTuNgay && values.thuTuNgay.length > 0
          ? dayjs(values.thuTuNgay[0]).format("YYYY-MM-DD")
          : undefined,
      thanhToanDenNgay:
        values.thuTuNgay && values.thuTuNgay.length > 0
          ? dayjs(values.thuTuNgay[1]).format("YYYY-MM-DD")
          : undefined,
      pageNumber: 1,
      thuTuNgay: undefined
    };

    setSearchParams((curr) => ({ ...curr, ...formData }));
  };
  const resetSearchParams = useCallback(() => {
    setSearchParams((curr) => ({ ...curr }));
    form.resetFields();
  }, []);
  const danhSachLinhVucs = useMemo(() => {
    if (thuTucs && thuTucs.length > 0 && linhVucs && linhVucs.length > 0) {


      return linhVucs.filter(linhVuc => thuTucs.find(thuTuc => thuTuc.maLinhVucChinh == linhVuc.ma))

    }

    return []
  }, [thuTucs, linhVucs])

  var danhSachThuTucs = useMemo(() => {


    if (thuTucs && thuTucs.length > 0)
      if (!selectedLinhVuc) return thuTucs;
    return thuTucs?.filter((x: IThuTuc) => x.maLinhVucChinh == selectedLinhVuc)
  }, [selectedLinhVuc, thuTucs])
  return (
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
          form.setFieldValue("maDinhDanhCha", undefined);
      }}
    >
      <Row gutter={[8, 0]}>
        <Col md={8} span={24}>
          <Form.Item label="Từ khóa" name="tuKhoa">
            <Input />
          </Form.Item>
        </Col>
        <Col md={8} span={24} hidden={user?.maDinhDanh ? true : false}>
          <Form.Item label="Nhóm" name="catalog">
            <AntdSelect
              generateOptions={{
                model: groupOptions,
                value: "code",
                label: "tenDanhMuc",
              }}
              showSearch
              allowClear
            />
          </Form.Item>
        </Col>
        <Col md={8} span={24}>
          <Form.Item label="Đơn vị" name="donVi">
            <AntdSelect
              generateOptions={{
                model: donVis,
                value: "groupCode",
                label: "groupName",
              }}
              showSearch
              allowClear
            />
          </Form.Item>
        </Col>

        <Col md={8} span={24}>
          <Form.Item label="Lĩnh vực" name="maLinhVucChinh">
            <AntdSelect
              generateOptions={{ model: danhSachLinhVucs, label: "ten", value: "ma" }}
              allowClear
              showSearch
              filterOption={filterOptions}

            />
          </Form.Item>
        </Col>
        <Col md={8} span={24}>
          <Form.Item label="Thủ tục" name="thuTucId">
            <AntdSelect
              generateOptions={{
                model: danhSachThuTucs,
                label: "tenTTHC",
                value: "maTTHC",
              }}
              allowClear
              showSearch
              filterOption={filterOptions}
            />
          </Form.Item>
        </Col>
        <Col md={8} span={24}>
          <Form.Item label="Loại tiếp nhận" name="kenhThucHien">
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
          <Form.Item label="Ngày tiếp nhận" name="tiepNhanTuNgay">
            <RangePicker
              format={FORMAT_DATE_WITHOUT_TIME}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col md={8} span={24}>
          <Form.Item label="Ngày thu" name="thuTuNgay">
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
  );
};
