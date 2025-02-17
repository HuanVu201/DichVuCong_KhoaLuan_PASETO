import { Form, Input, Space, Row, Col, DatePicker, Select } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect, useState } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch} from "@/lib/redux/Hooks";
import { filterOptions } from "@/utils";
import { FormInstance } from "antd/lib";

import { deleteObjectKeyValues } from "@/utils/common";
import { TRANG_THAI_HO_SOS } from "@/pages/dvc/tracuu/TatCaHoSo/components/TheoDoiTatCaHoSoTable";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { toast } from "react-toastify";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";
import { LOAICHUHOSO_OPTIONS, LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData";
export const LOAITIMKIEM = [
  { value: "maHoSo", label: "Mã hồ sơ" },
  { value: "chuHoSo", label: "Chủ hồ sơ" },
  { value: "soDienThoaiChuHoSo", label: "SĐT chủ hồ sơ" },
  { value: "nguoiUyQuyen", label: "Người được ủy quyền" },
  { value: "soDienThoaiNguoiUyQuyen", label: "SĐT Người được ủy quyền" },
  { value: "trichYeuHoSo", label: "Nội dung hồ sơ" },
  { value: "soKyHieuKetQua", label: "Số ký hiệu" },
  { value: "maHoSoLienThong", label: "Mã hồ sơ liên thông" },
]
export const Search = ({
  setSearchParams,
  resetSearchParams,
  defaultFormValue,
  defaultVisible,
  btnComfirmLoading,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  resetSearchParams?: () => void;
  defaultFormValue?: ISearchHoSo;
  extraElement?: (form: FormInstance<ISearchHoSo>) => React.ReactNode;
  defaultVisible: boolean;
  showAdvanceSearchBtn?: boolean;
  btnComfirmLoading?: boolean
}) => {
  const [form] = Form.useForm<ISearchHoSo>();
  const [donVis, setDonVis] = useState<ICoCauToChuc[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch();
  const loaiTimKiem = Form.useWatch("loaiTimKiem", form)

  const onFinish = (values: ISearchHoSo) => {
    const formData: ISearchHoSo = {
      ...values,
      nopHoSoTuNgay: values.nopHoSoTuNgay
        ? dayjs(values.nopHoSoTuNgay).format("MM/DD/YYYY 00:00:01")
        : undefined,
      nopHoSoDenNgay: values.nopHoSoDenNgay
        ? dayjs(values.nopHoSoDenNgay).format("MM/DD/YYYY 23:59:59")
        : undefined,
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
    setSearchParams((curr) => {
      const newSearchData = ({ ...curr, ...formData, [loaiTimKiem]: (formData as any)["searchData"] })
      const deleteKeys = LOAITIMKIEM.flatMap(x => x.value).filter(x => x != loaiTimKiem)
      deleteObjectKeyValues(newSearchData, deleteKeys as any)
      return newSearchData
    });
  };

  const clearSearch = useCallback(() => {
    resetSearchParams ? resetSearchParams() : null;
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
  return (
    <div style={{ position: "relative" }}>
      <CollapseContent defaultVisible={defaultVisible} typeHoSo={true}>
        <Form

          name={"SearchHoSo_"}
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className=""
          initialValues={{ loaiTimKiem: "maHoSo" }}
        >
          <div className="search-form-content">
            <Row gutter={[16, 5]}>
              <Col md={8} span={24}>
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

              <Col md={8} span={24}>
                <Form.Item label="Số giấy tờ chủ hồ sơ" name="soGiayToChuHoSo">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Đơn vị" name="groupCode">
                  <AntdSelect
                    generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                    loading={loading}
                    onClick={() => {
                      if (donVis?.length == 0) {
                        (async () => {
                          setLoading(true)
                          const res = await dispatch(SearchCoCauToChuc({ pageSize: 15000, type: 'don-vi' })).unwrap()

                          if (res) {
                            setDonVis(res.data)
                          } else {
                            toast.error("Lỗi lấy thông tin cơ cấu tổ chức!")
                          }
                          setLoading(false)
                        })()
                      }
                    }}
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
              <Col span={6}>
                <Form.Item label="Trạng thái" name="trangThaiHoSoId">
                  <AntdSelect
                    generateOptions={{ model: TRANG_THAI_HO_SOS, label: "label", value: "value" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Đối tượng nộp hồ sơ" name="loaiDoiTuong">
                  <AntdSelect
                    generateOptions={{ model: LOAICHUHOSO_OPTIONS, label: "label", value: "value" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                  />
                </Form.Item>

              </Col>
              <Col span={6}>
                <Form.Item label="Nộp từ ngày" name="nopHoSoTuNgay">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Đến ngày" name="nopHoSoDenNgay">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col lg={6} md={12} span={24}>
                <Form.Item label="Tiếp nhận ngày" name="tiepNhanFrom">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Đến ngày" name="tiepNhanTo">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Hẹn trả ngày" name="henTraFrom">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Đến ngày" name="henTraTo">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Row justify="space-around" className="mt-3">
                <Space >
                  <AntdButton key={2} type="primary" htmlType="submit" loading={btnComfirmLoading}>
                    Xác nhận
                  </AntdButton>

                  <AntdButton key={3} type="default" onClick={clearSearch}>
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