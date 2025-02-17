import { Form, Input, Space, Row, Col, DatePicker, SelectProps, FormInstance, Badge, Select } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect, useId } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { LOAITIMKIEM } from "@/features/hoso/components/SearchHoSoComp";
import { deleteObjectKeyValues } from "@/utils/common";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";

const dangKyQuaBuuDienOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: "false" },
];

export const DaTraTTHCCSearch = ({
  setSearchParams,
  resetSearchParams,
  extraElement,
  defaultFormValue,
  defaultVisible,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  resetSearchParams?: () => void;
  defaultFormValue?: ISearchHoSo;
  extraElement?: (form: FormInstance<ISearchHoSo>) => React.ReactNode;
  defaultVisible: boolean;
}) => {
  const [form] = Form.useForm();
  const loaiTimKiem = Form.useWatch("loaiTimKiem", form)
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const { datas: donVis } = useAppSelector((state) => state.cocautochuc);
  const dispatch = useAppDispatch();
  const id = useId();

  const LOAI_THONG_KE_OPTIONS: SelectProps["options"] = [
    { label: "Hồ sơ chờ tiếp nhận", value: "cho-tiep-nhan" },
    {
      label: "Hồ sơ đủ điều kiện đã nộp phí, lệ phí chờ tiếp nhận",
      value: "da-nop-phi-cho-tiep-nhan",
    },
    {
      label: "Hồ sơ chưa đủ điều kiện tiếp nhận",
      value: "khong-du-dieu-kien-tiep-nhan",
    },
    {
      label: "Hồ sơ đủ điều kiện chờ nộp phí, lệ phí",
      value: "cho-nop-phi-thu-truoc-cho-tiep-nhan",
    },
    { label: "Hồ sơ đã tiếp nhận", value: "da-tiep-nhan" },
  ];
  const HINH_THUC_TRA_OPTIONS: SelectProps["options"] = [{
    label: "Qua BCCI",
    value: "1",
  },
  {
    label: "Trực tiếp",
    value: "0",
  },
  ]

  const onFinish = (values: ISearchHoSo) => {
    const formData: ISearchHoSo = {
      ...values,
      tiepNhanFrom: values.tiepNhanFrom
        ? dayjs(values.tiepNhanFrom).format()
        : undefined,
      tiepNhanTo: values.tiepNhanTo
        ? dayjs(values.tiepNhanTo).format("YYYY-MM-DDT23:59:59+07:00")
        : undefined,
      henTraFrom: values.henTraFrom
        ? dayjs(values.henTraFrom).format()
        : undefined,
      henTraTo: values.henTraTo ? dayjs(values.henTraTo).format("YYYY-MM-DDT23:59:59+07:00") : undefined,
      ngayTraFrom: values.ngayTraFrom
        ? dayjs(values.ngayTraFrom).format()
        : undefined,
      ngayTraTo: values.ngayTraTo ? dayjs(values.ngayTraTo).format("YYYY-MM-DDT23:59:59+07:00") : undefined,
    };
    setSearchParams((curr) => {
      const newSearchData = ({ ...curr, ...formData, [loaiTimKiem]: (formData as any)["searchData"] })
      const deleteKeys = LOAITIMKIEM.flatMap(x => x.value).filter(x => x != loaiTimKiem)
      deleteObjectKeyValues(newSearchData, deleteKeys as any)
      return newSearchData
    });
  };
  const clearSearch = useCallback(() => {
    resetSearchParams ? resetSearchParams() : null;
    // setSearchParams((curr) => ({ ...curr }));
    form.resetFields();
  }, []);
  useEffect(() => {
    if (defaultFormValue)
      (
        Object.keys(defaultFormValue) as Array<keyof typeof defaultFormValue>
      ).forEach((item) => {
        form.setFieldValue(item, defaultFormValue[item]);
      });
  }, [defaultFormValue]);

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
  useEffect(() => {
    if (user)
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 10000,
          donViQuanLy: user?.officeCode ? user?.officeCode : "",
          orderBy: ["MaDinhDanh"],
        })
      );
  }, [user]);
  return (
    <div style={{ position: "relative" }}>
     <Space direction="horizontal" className="noteColorHoSo">
        <Badge color="rgb(248, 121, 3)" text="Tới hạn" />
        <Badge color="rgb(233, 19, 19)" text="Quá hạn" />
        <Badge color="#333" text="Trong hạn" />
      </Space>
      <CollapseContent defaultVisible={defaultVisible} typeHoSo={true}>
        <Form
          name={"SearchHoSo_" + id}
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className=""
          initialValues={{ loaiTimKiem: "maHoSo" }}
        >
          <div className="search-form-content">
            <Row gutter={[16, 5]}>
              <Col md={6} span={24}>
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <Form.Item label="Tìm kiếm theo" name="loaiTimKiem">
                      <Select style={{ width: "100%" }} placeholder="" options={LOAITIMKIEM} onSelect={() => {
                        const inst = form.getFieldInstance("searchData")
                        try {
                          inst.focus()
                        } catch (error) {
                        }
                      }}></Select>
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item label=" " name={"searchData"}>
                      <Input placeholder="Nhập thông tin" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col md={6} span={24}>
                <Form.Item label="Đơn vị" name="groupCode">
                  <AntdSelect
                    generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                  />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item label="Lĩnh vực" name="maLinhVucChinh">
                  <AntdSelect
                    generateOptions={{
                      model: linhVucs,
                      label: "ten",
                      value: "ma",
                    }}
                    allowClear
                    showSearch
                    filterOption={filterOptions}
                    onFocus={() => {
                      dispatch(
                        SearchLinhVuc({
                          pageNumber: 1,
                          pageSize: 50,
                          reFetch: true,
                        })
                      );
                    }}
                    onSelect={onSelectLinhVuc}
                  />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
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

              <Col md={6} span={24}>
                <Form.Item label="Loại tiếp nhận" name="kenhThucHien">
                  <AntdSelect
                    options={LOAITIEPNHAN_OPTIONS}
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item label="Có đăng ký bưu điện" name="dangKyQuaBuuDien">
                  <AntdSelect
                    options={dangKyQuaBuuDienOptions}
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item label="Số ký hiệu, trích yếu" name="soKyHieuTrichYeu">
                  <Input />
                </Form.Item>
              </Col>
              <Col md={6} span={24}></Col>
              {extraElement ? extraElement(form) : null}
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Tiếp nhận ngày" name="tiepNhanFrom">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Đến ngày" name="tiepNhanTo">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Hẹn trả ngày" name="henTraFrom">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Đến ngày" name="henTraTo">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Trả kết quả ngày" name="ngayTraFrom">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Đến ngày" name="ngayTraTo">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Row justify="space-around" className="mt-3">
                <Space size="large">
                  <AntdButton type="primary" htmlType="submit">
                    Xác nhận
                  </AntdButton>
                  <AntdButton type="default" onClick={clearSearch}>
                    Tải lại
                  </AntdButton>
                  <AntdButton
                    type="primary"
                    onClick={() => {
                      downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
                    }}
                  >
                    In danh sách
                  </AntdButton>
                </Space>
              </Row>
            </Form.Item>
          </div>
        </Form>
      </CollapseContent>
    </div>
  );
};
