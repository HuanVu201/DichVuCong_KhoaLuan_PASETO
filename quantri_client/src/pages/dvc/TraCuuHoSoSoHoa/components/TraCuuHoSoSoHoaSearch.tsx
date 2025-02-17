import { Form, Input, Space, Row, Col, DatePicker, SelectProps, Select } from "antd";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { ComponentProps, useCallback, useEffect, useId, useMemo, useState } from "react";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdModal, AntdSelect } from "@/lib/antd/components";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { filterOptions } from "@/utils";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { FormInstance } from "antd/lib";

import { Badge, Divider } from "antd";
import { deleteObjectKeyValues, parseJwt } from "@/utils/common";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { toast } from "react-toastify";
import { FileExcelOutlined } from "@ant-design/icons";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";
import { LOAICHUHOSO_OPTIONS, LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData";
import { SearchTraCuuHoSo } from "@/features/hoso/components/SearchTraCuuHoSo";
import { ISearchThongKeParams } from "@/features/thongKe/thongKeQD766/models/ThongKeQD766Search";
import { IParseUserToken } from "@/models";
import { userService } from "@/features/user/services";
import { IUserRole } from "@/features/user/models";
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
export const TraCuuHoSoSoHoaSearch = ({
  setSearchParams,
  resetSearchParams,
  extraElement,
  defaultFormValue,
  defaultVisible,
  showAdvanceSearchBtn,
  btnComfirmLoading,
  thongKeToanHeThong,
  setThongKeToanHeThong
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
  resetSearchParams?: () => void;
  defaultFormValue?: ISearchHoSo;
  extraElement?: (form: FormInstance<ISearchHoSo>) => React.ReactNode;
  defaultVisible: boolean;
  showAdvanceSearchBtn?: boolean;
  btnComfirmLoading?: boolean;
  thongKeToanHeThong?: boolean;
  setThongKeToanHeThong: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm<ISearchHoSo>();
  const [donVis, setDonVis] = useState<ICoCauToChuc[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<IParseUserToken>();
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);

  const { data: user } = useAppSelector((state) => state.user);
  const { publicModule } = useAppSelector(state => state.config)
  const { data: auth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const loaiTimKiem = Form.useWatch("loaiTimKiem", form)

  const onFinish = (values: ISearchThongKeParams) => {
    console.log(user);

    const formData: ISearchThongKeParams = {
      ...values,
      tuNgay: values.tuNgay
        ? dayjs(values.tuNgay).format()
        : undefined,
      denNgay: values.denNgay
        ? dayjs(values.denNgay).format()
        : undefined,
      maDonVi: thongKeToanHeThong ? undefined : user?.officeCode,
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

  useEffect(() => {
    if (auth) {
      var user = parseJwt(auth.token) as IParseUserToken;
      setUserData(user);
      (async () => {
        setLoadingRoles(true)
        var user = parseJwt(auth.token) as IParseUserToken;
        let getRoles = await userService.GetUserRoles(user.uid);
        if (getRoles?.data && getRoles?.data?.length > 0) {
          getRoles?.data.map((item: IUserRole) => {

            if ((item.roleName == 'Thống kê toàn hệ thống' && item.enabled) || (item.roleName == "Admin" && item.enabled)) {
              setThongKeToanHeThong(true)
              setLoadingRoles(false)
            }
          });
        }
        setLoadingRoles(false)

      })()
    }
  }, [auth]);

  useEffect(() => {
    if (thongKeToanHeThong) {
      setSearchParams(curr => ({ ...curr, maDonVi: undefined }));
    } else if (user) {
      setSearchParams(curr => ({ ...curr, maDonVi: user.officeCode }))
      form.setFieldValue("maDonVi", user.officeCode);
    }
  }, [user, thongKeToanHeThong])
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
              <Col span={8} hidden={!thongKeToanHeThong}>
                <Form.Item label="Đơn vị" name="maDonVi">
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
              {/* <Col md={6} span={24}>
                <Form.Item label="Loại tiếp nhận" name="kenhThucHien">
                  <AntdSelect
                    options={LOAITIEPNHAN_OPTIONS}
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col> */}
              {/* <Col md={6} span={24}>
                <Form.Item label="Loại thống kê" name="trangThaiTheoDoiHoSo">
                  <AntdSelect
                    options={LOAI_THONG_KE_OPTIONS}
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col> */}

              {/* <Col span={6}>
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

              </Col> */}
              {/* <Col span={6}>
                <Form.Item label="Nộp từ ngày" name="nopHoSoTuNgay">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Đến ngày" name="nopHoSoDenNgay">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col> */}

              <Col lg={8} md={12} span={24}>
                <Form.Item label="Tiếp nhận ngày" name="tuNgay">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} span={24}>
                <Form.Item label="Đến ngày" name="denNgay">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              {/* <Col lg={6} md={12} span={24}>
                <Form.Item label="Hẹn trả ngày" name="henTraFrom">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={12} span={24}>
                <Form.Item label="Đến ngày" name="henTraTo">
                  <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                </Form.Item>
              </Col> */}
            </Row>
            <Form.Item>
              <Row justify="space-around" className="mt-3">
                <Space >
                  <AntdButton key={2} type="primary" htmlType="submit" loading={btnComfirmLoading}>
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
const SDT_RULE = [{
  pattern: new RegExp(/^-?([0-9][0-9]*)(\.[0-9]*)?$/),
  message: "Vui lòng nhập đúng định dạng!"
}]

const TimKiemNangCao = ({ visible, setVisible, form, setSearchParams }: { setSearchParams: ComponentProps<typeof TraCuuHoSoSoHoaSearch>["setSearchParams"]; visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>>; form: FormInstance<ISearchHoSo> }) => {
  const onCancel = () => {
    setVisible(false);
  }
  const onOk = async () => {
    const formData = await form.validateFields()
    setSearchParams((curr: any) => ({ ...curr, ...formData }))
    setVisible(false);
  }
  return <AntdModal title="Tìm kiếm nâng cao" visible={visible} width={800} footer={
    <>
      <AntdButton key={1} onClick={onCancel}>Đóng</AntdButton>
      <AntdButton key={2} onClick={() => form.resetFields(["chuHoSo", "soDienThoaiChuHoSo", "nguoiUyQuyen", "soDienThoaiNguoiUyQuyen", "trichYeuHoSo"])}>Xóa bộ lọc</AntdButton>
      <AntdButton key={3} onClick={onOk} type="primary">Tìm kiếm</AntdButton>
    </>
  }>

    <Form layout="vertical" form={form} name={"SearchHoSo_"}>
      <Row gutter={[8, 0]}>
        <Col md={12} span={24}>
          <Form.Item label="Chủ hồ sơ" name="chuHoSo">
            <Input placeholder="Nhập họ và tên chủ hồ sơ" />
          </Form.Item>
        </Col>
        <Col md={12} span={24}>
          <Form.Item label="Số điện thoại chủ hồ sơ" name="soDienThoaiChuHoSo" rules={SDT_RULE}>
            <Input placeholder="Nhập số điện thoại chủ hồ sơ" />
          </Form.Item>
        </Col>
        <Col md={12} span={24}>
          <Form.Item label="Người được ủy quyền" name="nguoiUyQuyen">
            <Input placeholder="Nhập họ và tên người được ủy quyền" />
          </Form.Item>
        </Col>
        <Col md={12} span={24}>
          <Form.Item label="Số điện thoại người được ủy quyền" name="soDienThoaiNguoiUyQuyen" rules={SDT_RULE}>
            <Input placeholder="Nhập số điện thoại người được ủy quyền" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Nội dung hồ sơ" name="trichYeuHoSo">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </AntdModal>
}