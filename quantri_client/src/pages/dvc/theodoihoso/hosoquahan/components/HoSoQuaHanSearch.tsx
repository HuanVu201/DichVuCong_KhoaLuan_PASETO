import { Form, Input, Space, Row, Col, DatePicker, SelectProps, Select, Radio } from "antd";
import { ISearchHoSo } from "@/features/hoso/models";
import { ComponentProps, useCallback, useEffect, useId, useState } from "react";
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
import { deleteObjectKeyValues } from "@/utils/common";
import { TRANG_THAI_HO_SOS } from "@/pages/dvc/tracuu/TatCaHoSo/components/TheoDoiTatCaHoSoTable";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { toast } from "react-toastify";
import { FileExcelOutlined } from "@ant-design/icons";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";
import { LOAICHUHOSO_OPTIONS, LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData";
import { userService } from "@/features/user/services";
import { IUserRole } from "@/features/user/models";
export const LOAITIMKIEM = [
  { value: "maHoSo", label: "Mã hồ sơ" },
  { value: "chuHoSo", label: "Chủ hồ sơ" },
  { value: "soDienThoaiChuHoSo", label: "SĐT chủ hồ sơ" },
  { value: "nguoiUyQuyen", label: "Người được ủy quyền" },
  { value: "soDienThoaiNguoiUyQuyen", label: "SĐT Người được ủy quyền" },
  { value: "trichYeuHoSo", label: "Nội dung hồ sơ" },
]
export const SearchHoSoQuaHan = ({
  enableFilterDonVi,
  setSearchParams,
  resetSearchParams,
  extraElement,
  defaultFormValue,
  defaultVisible,
  showAdvanceSearchBtn,
  btnComfirmLoading,
}: {
  enableFilterDonVi?: boolean
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
  const { data: user } = useAppSelector((state) => state.user);
  const { data: auth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const loaiTimKiem = Form.useWatch("loaiTimKiem", form)
  // useEffect(() => {
  //   if (user) {
  //     ;
  //   }
  // }, [user]);
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
      donViQuanLy: values.groupCode ? undefined : user?.officeCode,
      pageNumber: 1
      // henTraFrom: values.henTraFrom
      //   ? dayjs(values.henTraFrom).format()
      //   : undefined,
      // henTraTo: values.henTraTo ? dayjs(values.henTraTo).format() : undefined,
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
  const onChangeButton = (e: any) => {
    setSearchParams((cur) => ({ ...cur, hoSoToiHan: e.target.value, pageNumber: 1 }))
  }


  return (
    <div style={{ position: "relative" }}>
      <Form
        name={"SearchHoSo_"}
        layout="vertical"
        onFinish={onFinish}
        form={form}
        className=""
        initialValues={{ loaiTimKiem: "maHoSo" }}
      >
        <div className="search-form-content">
          <Row gutter={[8, 8]}>
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

            <Col span={8}>
              <Form.Item label="Đơn vị" name="groupCode2">
                <AntdSelect
                  allowClear
                  disabled={enableFilterDonVi}
                  defaultValue={user?.officeName}
                  generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
                  showSearch
                  filterOption={filterOptions}
                  loading={loading}
                  onClick={() => {
                    if (donVis?.length == 0) {
                      (async () => {
                        setLoading(true)
                        const res = await dispatch(SearchCoCauToChuc({ pageSize: 1500, donViQuanLy: user?.officeCode, getAllChildren: true, type: 'don-vi' })).unwrap()

                        if (res) {
                          var tmp = [{ groupCode: '', groupName: "Tất cả" }] as ICoCauToChuc[];
                          setDonVis([...tmp, ...res.data]);
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
            <Col md={8} span={24}>
              <Form.Item label="Số giấy tờ chủ hồ sơ" name="soGiayToChuHoSo">
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Loại tiếp nhận" name="kenhThucHien">
                <AntdSelect
                  options={LOAITIEPNHAN_OPTIONS}
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
          </Row>
          <Form.Item>
            <Row justify="space-around" className="mt-1">
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
    </div>
  );
};
const SDT_RULE = [{
  pattern: new RegExp(/^-?([0-9][0-9]*)(\.[0-9]*)?$/),
  message: "Vui lòng nhập đúng định dạng!"
}]

