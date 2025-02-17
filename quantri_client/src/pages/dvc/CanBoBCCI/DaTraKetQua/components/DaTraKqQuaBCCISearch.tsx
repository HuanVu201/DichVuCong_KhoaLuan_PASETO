import { Form, Input, Space, Row, Col, DatePicker, SelectProps, Select } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { SearchTrangThaiHoSo } from "@/features/trangthaihoso/redux/action";
import { KENH_THUC_HIEN } from "@/features/hoso/data/formData";
const kenhThucHienOptions = [
  { value: 1, label: KENH_THUC_HIEN["1"] },
  { value: 2, label: KENH_THUC_HIEN["2"] },
  { value: 3, label: KENH_THUC_HIEN["3"] },
];
const traKqVoiItemCodeOptions = [
  { value: true, label: "Có" },
  { value: false, label: "Không" },
  
];

import { deleteObjectKeyValues } from "@/utils/common";
const LOAITIMKIEM = [
  {value:"searchKeys", label:"Mã hồ sơ"},
  {value:"chuHoSo", label:"Chủ hồ sơ"},
  {value:"soDienThoaiChuHoSo", label:"SĐT chủ hồ sơ"},
  {value:"nguoiUyQuyen", label:"Người được ủy quyền"},
  {value:"soDienThoaiNguoiUyQuyen", label:"SĐT Người được ủy quyền"},
  {value:"trichYeuHoSo", label:"Nội dung hồ sơ"},
]
export const DaTraKqQuaBCCISearch = ({
  setSearchParams,
  showAdvanceSearchBtn,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  showAdvanceSearchBtn?: boolean;
}) => {
  const [form] = Form.useForm();
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: groups } = useAppSelector((state) => state.cocautochuc);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const { datas: trangThais } = useAppSelector((state) => state.trangthaihoso);
  const loaiTimKiem = Form.useWatch("loaiTimKiem", form)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 50, reFetch: true }));
      dispatch(
        SearchCoCauToChuc({
          pageNumber: 1,
          pageSize: 1000,
          reFetch: true,
          cataLog: "so-ban-nganh",
        })
      );
      dispatch(
        SearchTrangThaiHoSo({ pageNumber: 1, pageSize: 50, reFetch: true })
      );
    }
  }, [user]);

  const onFinish = (values: ISearchHoSo) => {
    const newSearchData = values
    const deleteKeys = LOAITIMKIEM.flatMap(x => x.value).filter(x => x != loaiTimKiem)
    deleteObjectKeyValues(newSearchData, deleteKeys as any)
    const formData: ISearchHoSo = {
      ...newSearchData,
      tiepNhanFrom: values.tiepNhanFrom
        ? dayjs(values.tiepNhanFrom).format()
        : undefined,
      tiepNhanTo: values.tiepNhanTo
        ? dayjs(values.tiepNhanTo).format("YYYY-MM-DDT23:59:59+07:00")
        : undefined,
      henTraFrom: values.henTraFrom
        ? dayjs(values.henTraFrom).format()
        : undefined,
      henTraTo: values.henTraTo
        ? dayjs(values.henTraTo).format("YYYY-MM-DDT23:59:59+07:00")
        : undefined,
      traKqBuuDienTuNgay: values.traKqBuuDienTuNgay
        ? dayjs(values.traKqBuuDienTuNgay).format()
        : undefined,
      traKqBuuDienDenNgay: values.traKqBuuDienDenNgay
        ? dayjs(values.traKqBuuDienDenNgay).format("YYYY-MM-DDT23:59:59+07:00")
        : undefined,
        dangKyBuuDienTuNgay: values.dangKyBuuDienTuNgay
        ? dayjs(values.dangKyBuuDienTuNgay).format()
        : undefined,
      dangKyBuuDienDenNgay: values.dangKyBuuDienDenNgay
        ? dayjs(values.dangKyBuuDienDenNgay).format("YYYY-MM-DDT23:59:59+07:00")
        : undefined,
    };
    setSearchParams((curr) => {
      const newSearchData = ({ ...curr, ...formData })
      const deleteKeys = LOAITIMKIEM.flatMap(x => x.value).filter(x => x != loaiTimKiem)
      deleteObjectKeyValues(newSearchData, deleteKeys as any)
      return newSearchData
    });
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
    
      <Form name="HoSoSearch" layout="vertical" onFinish={onFinish} form={form} initialValues={{loaiTimKiem:"searchKeys"}}>
        <Row gutter={[8, 0]}>
        <Col md={12} span={24}>
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <Form.Item label="Tìm kiếm theo" name="loaiTimKiem">
                      <Select style={{ width: "100%" }} placeholder="" options={LOAITIMKIEM} onChange={() => form.setFieldValue(loaiTimKiem, undefined)}></Select>
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item label=" " name={loaiTimKiem}>
                      <Input placeholder="Nhập thông tin" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
          <Col md={6} span={24}>
            <Form.Item label="Đơn vị" name="groupCode">
              <AntdSelect
                generateOptions={{
                  model: groups,
                  label: "groupName",
                  value: "groupCode",
                }}
                allowClear
                showSearch
                filterOption={filterOptions}
              />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Trạng thái" name="maTrangThai">
              <AntdSelect
                generateOptions={{
                  model: trangThais,
                  label: "ten",
                  value: "ma",
                }}
                allowClear
                showSearch
                filterOption={filterOptions}
              />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Trả với itemcode" name="TraKqWithItemCode">
              <AntdSelect
                generateOptions={{
                  model: traKqVoiItemCodeOptions,
                  label: "label",
                  value: "value",
                }}
                allowClear
                showSearch
                filterOption={filterOptions}
              />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Hình thức nộp hồ sơ" name="kenhThucHien">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                options={kenhThucHienOptions}
              />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Tiếp nhận ngày" name="tiepNhanFrom">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{width:"100%"}} />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Đến ngày" name="tiepNhanTo">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  style={{width:"100%"}} />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Hẹn trả ngày" name="henTraFrom">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  style={{width:"100%"}}/>
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Đến ngày" name="henTraTo">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{width:"100%"}} />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Ngày đăng ký" name="dangKyBuuDienTuNgay">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  style={{width:"100%"}}/>
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Đến ngày" name="dangKyBuuDienDenNgay">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  style={{width:"100%"}} />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Ngày trả BCCI" name="traKqBuuDienTuNgay">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  style={{width:"100%"}} />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item label="Đến ngày" name="traKqBuuDienDenNgay">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}   style={{width:"100%"}}/>
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
