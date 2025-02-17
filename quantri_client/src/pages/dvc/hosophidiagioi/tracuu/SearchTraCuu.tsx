import { Form, Input, Space, Row, Col, DatePicker, Select } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { ComponentProps, useCallback, useEffect } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdModal, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { FormInstance } from "antd/lib";
import { deleteObjectKeyValues } from "@/utils/common";
import DonViPhiDiaGioi from "@/features/hoso/components/actions/themMoiHoSoPhiDiaGioi/DonViPhiDiaGioi";
import { downloadPhieuExcel } from "../../MauPhieu/ExportExcel/exportTableToExcel";
export const LOAITIMKIEM = [
  { value: "maHoSo", label: "Mã hồ sơ" },
  { value: "chuHoSo", label: "Chủ hồ sơ" },
  { value: "soDienThoaiChuHoSo", label: "SĐT chủ hồ sơ" },
  { value: "nguoiUyQuyen", label: "Người được ủy quyền" },
  { value: "soDienThoaiNguoiUyQuyen", label: "SĐT Người được ủy quyền" },
  { value: "trichYeuHoSo", label: "Nội dung hồ sơ" },
]
const SearchTraCuuPhiDiaGioi = ({
  setSearchParams,
  resetSearchParams,
  defaultFormValue,
  defaultVisible,
  btnComfirmLoading,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  resetSearchParams?: () => void;
  defaultFormValue?: ISearchHoSo;
  defaultVisible: boolean;
  btnComfirmLoading?: boolean
}) => {
  const [form] = Form.useForm<ISearchHoSo>();
  const loaiTimKiem = Form.useWatch("loaiTimKiem", form)
  const onFinish = async () => {
    const values = await form.getFieldsValue() as ISearchHoSo
    console.log(values);
    
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

  return (
    <div style={{ position: "relative" }}>
      <CollapseContent defaultVisible={defaultVisible} typeHoSo={true}>
        <Form
          name={"SearchHoSo_123sss"}
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className=""
          initialValues={{ loaiTimKiem: "maHoSo" }}
        >
          <div className="search-form-content">
            <Row gutter={[16, 5]}>
              <Col md={8} span={24}>
                <div className="mb-2"><label htmlFor="loaiTimKiemid">Tìm kiếm theo</label></div>
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <Form.Item  name="loaiTimKiem" id="loaiTimKiemid">
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
                    <Form.Item name={"searchData"}>
                      <Input placeholder="Nhập thông tin" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col md={8} span={24}>
                <Form.Item
                  label="Trạng thái"
                  name="trangThaiHoSoId"
                >
                  <AntdSelect
                    options={[
                      { value: '1', label: 'Mới đăng ký' },
                      { value: '2', label: 'Được tiếp nhận' },
                      { value: '3', label: 'Không được tiếp nhận' },
                      { value: '4', label: 'Đang xử lý' },
                      { value: '5', label: 'Yêu cầu bổ sung giấy tờ' },
                      { value: '6', label: 'Yêu cầu thực hiện nghĩa vụ tài chính' },
                      { value: '7', label: 'Công dân yêu cầu rút hồ sơ' },
                      { value: '8', label: 'Dừng xử lý' },
                      { value: '9', label: 'Đã xử lý xong' },
                      { value: '10', label: 'Đã trả kết quả' },
                    ]}
                  ></AntdSelect>
                </Form.Item>
              </Col>
              <Col md={8} span={24}>
                <Form.Item label="Số giấy tờ chủ hồ sơ" name="soGiayToChuHoSo">
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
              <Col span={24}>
                <DonViPhiDiaGioi form={form} requiredMark={false}/>
              </Col>
            </Row>
            <Form.Item>
              <Row justify="space-around" className="mt-3">
                <Space size="large">
                  <AntdButton key={2} type="primary" htmlType="submit" onClick={onFinish} loading={btnComfirmLoading}>
                    Xác nhận
                  </AntdButton>
                  {/* {showAdvanceSearchBtn ? <AntdButton key={1} onClick={() => setAdvanceSearchVisible(true)}>Tìm kiếm nâng cao</AntdButton> : null} */}
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
          {/* <TimKiemNangCao visible={advanceSearchVisible} setVisible={setAdvanceSearchVisible} setSearchParams={setSearchParams} form={form} /> */}
        </Form>
      </CollapseContent>
    </div>
  );
};

export default SearchTraCuuPhiDiaGioi