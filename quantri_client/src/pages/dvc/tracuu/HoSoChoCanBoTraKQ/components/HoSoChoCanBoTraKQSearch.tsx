import { Form, Input, Space, Row, Col, DatePicker, SelectProps, Select } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { useCallback, useEffect, useMemo } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE, FORMAT_DATE_FORMIO, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc, SearchLinhVucTheoDonVi } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { SearchTrangThaiHoSo } from "@/features/trangthaihoso/redux/action";
import { LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData";
import { LOAITIMKIEM } from "@/features/hoso/components/SearchHoSoComp";
import { dangKyQuaBuuDienOptions } from "@/pages/dvc/traketqua/chotraketquatthcc/components/ChoTraKetQuaTTHCCSearch";
import { deleteObjectKeyValues } from "@/utils/common";

export const HoSoChoCanBoTraKQSearch = ({
  searchParams,
  setSearchParams,
  onSubmit

}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  onSubmit: (params: ISearchHoSo) => void;
  searchParams: ISearchHoSo
}) => {
  const [form] = Form.useForm();
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: groups } = useAppSelector((state) => state.cocautochuc);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const { datas: trangThais } = useAppSelector((state) => state.trangthaihoso);
  const loaiTimKiem = Form.useWatch("loaiTimKiem", form)
  const dispatch = useAppDispatch();
  var groupCode = Form.useWatch("groupCode", form);
  var maLinhVucChinh = Form.useWatch("maLinhVucChinh", form);
  useEffect(() => {
    if (user) {

      dispatch(
        SearchCoCauToChuc({ pageNumber: 1, pageSize: 10000, reFetch: true, type: "don-vi", donViQuanLy: user.officeCode })
      );
      dispatch(
        SearchTrangThaiHoSo({ pageNumber: 1, pageSize: 50, reFetch: true })
      );
    }
  }, [user]);
  useEffect(() => {
    if (user)
      dispatch(SearchLinhVucTheoDonVi({ pageNumber: 1, pageSize: 10000, donViId: groupCode, reFetch: true }));
  }, [user, groupCode])
  useEffect(() => {
    if (user)
      dispatch(SearchThuTuc({ pageNumber: 1, pageSize: 10000, maLinhVucChinh: maLinhVucChinh, reFetch: true }));
  }, [user, maLinhVucChinh])
  var trangThaiHoSos = useMemo(() => {

  }, [])
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
    };
    setSearchParams((curr) => {
      const newSearchData = ({ ...curr, ...formData, [loaiTimKiem]: (formData as any)["searchData"] })
      const deleteKeys = LOAITIMKIEM.flatMap(x => x.value).filter(x => x != loaiTimKiem)
      deleteObjectKeyValues(newSearchData, deleteKeys as any)
      return newSearchData
    });
    onSubmit({
      ...searchParams,
      ...formData
    });
  };
  const resetSearchParams = useCallback(() => {
    form.resetFields();

    setSearchParams((curr) => ({
      ...curr,
      maHoSo: undefined,
      chuHoSo: undefined,
      soDienThoaiChuHoSo: undefined,
      nguoiUyQuyen: undefined,
      soDienThoaiNguoiUyQuyen: undefined,
      trichYeuHoSo: undefined,
      tiepNhanFrom: undefined,
      tiepNhanTo: undefined,
      henTraFrom: undefined,
      henTraTo: undefined,
      dangKyQuaBuuDien: undefined,
      soKyHieuTrichYeu: undefined,
      soGiayToChuHoSo: undefined,
      thuTucId: undefined,
      maLinhVucChinh: undefined,
      groupCode: undefined,
      loaiTimKiem: undefined,
    }));
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

    <Form name="HoSoSearch" layout="vertical" onFinish={onFinish} form={form} initialValues={{ loaiTimKiem: "maHoSo" }} onValuesChange={(value: any) => {
      if (value?.maLinhVucChinh) {
        form.setFieldValue("maTTHC", undefined);

      }
    }}>
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
                    SearchLinhVucTheoDonVi({
                      pageNumber: 1,
                      pageSize: 50,
                      reFetch: true,
                      donViId: form.getFieldValue('groupCode')
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
            <Form.Item label="Số giấy tờ chủ hồ sơ" name="soGiayToChuHoSo">
              <Input />
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
      </div>
      {/* <Row gutter={[8, 0]}>
          <Col md={12} span={24}>
            <Form.Item label="Từ khóa" name="searchKeys">
              <Input placeholder="Nhập từ khóa" />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
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
          <Col md={12} span={24}>
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
          <Col md={12} span={24}>
            <Form.Item label="Lĩnh vực" name="maLinhVucChinh">
              <AntdSelect
                generateOptions={{ model: linhVucs, label: "ten", value: "ma" }}
                allowClear
                showSearch
                filterOption={filterOptions}
               
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Thủ tục" name="maTTHC">
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
          <Col md={12} span={24}></Col>
          <Col md={12} span={24}>
            <Form.Item label="Tiếp nhận ngày" name="tiepNhanFrom">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Đến ngày" name="tiepNhanTo">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Hẹn trả ngày" name="henTraFrom">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Đến ngày" name="henTraTo">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME}  />
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
        </Form.Item> */}
    </Form>

  );
};
