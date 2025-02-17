import { CollapseContent } from "@/components/common";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  Form,
  Input,
  Space,
  Row,
  Col,
  DatePicker,
  SelectProps,
  Radio,
  Dropdown,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import dayjs from "dayjs";
import { ISearchThongKeParams } from "../models/ThongKeQD766Search";
import { toast } from "react-toastify";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { DownOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { SearchDonDocThanhToanTrucTuyen } from "../redux/action";
import { useThanhToanTrucTuyenContext } from "../context/ThongKeQD766Context";
const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
];
const loaiThoiGianThongKe = [
  { label: "Cố định", value: "codinh" },
  { label: "Bất kỳ", value: "batky" },
];
const loaiThongKe = [
  { label: "Đơn vị", value: false },
  { label: "Toàn bộ đơn vị con", value: true },
];
const thoiGianThongKe = [
  { label: "Theo tháng", value: "thang" },
  { label: "Theo quý", value: "quy" },
  { label: "Theo năm", value: "nam" },
];
const thangs = [
  { label: "Tháng 1", value: "thang1" },
  { label: "Tháng 2", value: "thang2" },
  { label: "Tháng 3", value: "thang3" },
  { label: "Tháng 4", value: "thang4" },
  { label: "Tháng 5", value: "thang5" },
  { label: "Tháng 6", value: "thang6" },
  { label: "Tháng 7", value: "thang7" },
  { label: "Tháng 8", value: "thang8" },
  { label: "Tháng 9", value: "thang9" },
  { label: "Tháng 10", value: "thang10" },
  { label: "Tháng 11", value: "thang11" },
  { label: "Tháng 12", value: "thang12" },
];

const quys = [
  { label: "Quý 1", value: "quy1" },
  { label: "Quý 2", value: "quy2" },
  { label: "Quý 3", value: "quy3" },
  { label: "Quý 4", value: "quy4" },
];
export const SearchThongKeThanhToanTheoHinhThucThanhToan = ({
  items,
  setSearchParams,
  resetSearchParams,
}: {
  items: any,
  setSearchParams: any;
  resetSearchParams: () => void;
}) => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const thongKeHoSoContext = useThanhToanTrucTuyenContext();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [displayDonVi, setDisplayDonVi] = useState<string>("none");
  const [displayTQN, setDisplayTQN] = useState<string>("none");
  const [displayThang, setDisplayThang] = useState<string>("none");
  const [displayQuy, setDisplayQuy] = useState<string>("none");
  const [displayNam, setDisplayNam] = useState<string>("none");
  const [displayDate, setDisplayDate] = useState<string>("");
  const [loaiThoiGianTk, SetLoaiThoiGianTk] = useState<string>("batky");
  // const [loaiDonViTk, setLoaiDon]
  const [tkToanDonVi, setTkToanDonVi] = useState<boolean>(true);
  const [strtuNgay, setStrtuNgay] = useState<string>();
  const [maDinhDanh, setMaDinhDanh] = useState<string>();
  const [strdenNgay, setStrdenNgay] = useState<string>();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const catalog = Form.useWatch("catalog", form);
  const [userData, setUserData] = useState<IParseUserToken>();
  const onChangeLoai = (value: string) => {
    SetLoaiThoiGianTk(value);
    if (value == undefined) {
      setDisplayTQN("none");
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("none");
      setDisplayDate("none");

      form.setFieldValue("thoigianthongketheo", undefined);
      form.setFieldValue("thang", undefined);
      form.setFieldValue("quy", undefined);
      form.setFieldValue("nam", undefined);
    }
    if (value == "codinh") {
      setDisplayTQN("block");
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("none");
      setDisplayDate("none");
    }
    if (value == "batky") {
      setDisplayTQN("none");
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("none");

      setDisplayDate("block");
      form.setFieldValue("thoigianthongketheo", undefined);
      form.setFieldValue("thang", undefined);
      form.setFieldValue("quy", undefined);
      form.setFieldValue("nam", undefined);
    }
  };

  const onChangeTQN = (value: string) => {
    if (value == "thang") {
      setDisplayThang("block");
      setDisplayQuy("none");
      setDisplayNam("block");

      form.setFieldValue("quy", undefined);
      form.setFieldValue("nam", undefined);
    }
    if (value == "quy") {
      setDisplayThang("none");
      setDisplayQuy("block");
      setDisplayNam("block");

      form.setFieldValue("thang", undefined);
      form.setFieldValue("nam", undefined);
    }
    if (value == "nam") {
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("block");

      form.setFieldValue("thang", undefined);
      form.setFieldValue("quy", undefined);
    }
    if (value == undefined) {
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("none");

      form.setFieldValue("thang", undefined);
      form.setFieldValue("quy", undefined);
      form.setFieldValue("nam", undefined);
    }
  };
  const sltCoCauToChucs = useMemo(() => {
    var tmp = [{ groupCode: "", groupName: "Tất cả" }] as ICoCauToChuc[];
    if (coCauToChucs) return [...tmp, ...coCauToChucs];
    return [];
  }, [coCauToChucs]);
  useEffect(() => {
    if (userData?.typeUser) {
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 1100,
          cataLog: catalog,
          donViQuanLy:
            userData?.typeUser != "Admin" ? userData?.officeCode : "",
          orderBy: ["MaDinhDanh"],
        })
      );
    }
  }, [catalog, userData]);
  useEffect(() => {
    if (auth) {
      var user = parseJwt(auth.token) as IParseUserToken;

      setUserData(user);
    }
  }, [auth]);
  function getFirstDayOfMonth(year: any, month: any) {
    const firstDay: string = new Date(year, month - 1, 2)
      .toISOString()
      .split("T")[0]
      .toString();
    return firstDay;
  }
  function getLastDayOfMonth(year: any, month: any) {
    const lastDay: string = new Date(year, month, 1)
      .toISOString()
      .split("T")[0]
      .toString();
    return lastDay;
  }

  function getFirstAndLastDayOfQuarter(year: any, quarter: any) {
    const firstMonth = (quarter - 1) * 3 + 1;
    const firstDay = new Date(year, firstMonth - 1, 2)
      .toISOString()
      .split("T")[0]
      .toString();
    const lastDay = new Date(year, firstMonth + 2, 1)
      .toISOString()
      .split("T")[0]
      .toString();
    return { firstDay, lastDay };
  }

  useEffect(() => {
    const now = new Date();
    var tuNgay = `01/01/${now.getFullYear()}`;
    var denNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    form.setFieldValue("tuNgay", tuNgay ? dayjs(tuNgay) : null);
    form.setFieldValue("denNgay", denNgay ? dayjs(denNgay) : null);
    if (userData?.typeUser != "Admin") {
      form.setFieldValue("DonViQuanLy", userData?.maDinhDanh);
    }
    setSearchParams({
      catalog: form.getFieldValue("catalog"),
      DonViQuanLy: userData?.officeCode,
      tuNgay: form.getFieldValue("tuNgay")
        ? dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
        : null,
      denNgay: form.getFieldValue("denNgay")
        ? dayjs(form.getFieldValue("denNgay")).format("YYYY-MM-DD")
        : null,
    });
  }, [userData]);
  const setSearchValue = () => {
    const donViData: any = form.getFieldValue("DonViQuanLy") || maDinhDanh;
    let tuNgayData: string = "";
    let denNgayData: string = "";
    if (loaiThoiGianTk == "codinh") {
      if (form.getFieldValue("thoigianthongketheo") == "thang") {
        if (form.getFieldValue("thang") && form.getFieldValue("nam")?.$y) {
          const thang: string = form.getFieldValue("thang");
          tuNgayData = getFirstDayOfMonth(
            form.getFieldValue("nam")?.$y,
            thang.replace("thang", "")
          );
          denNgayData = getLastDayOfMonth(
            form.getFieldValue("nam")?.$y,
            thang.replace("thang", "")
          );
        }
      }
      if (form.getFieldValue("thoigianthongketheo") == "quy") {
        if (form.getFieldValue("quy") && form.getFieldValue("nam")?.$y) {
          const quy: string = form.getFieldValue("quy");
          tuNgayData = getFirstAndLastDayOfQuarter(
            form.getFieldValue("nam")?.$y,
            quy.replace("quy", "")
          ).firstDay;
          denNgayData = getFirstAndLastDayOfQuarter(
            form.getFieldValue("nam")?.$y,
            quy.replace("quy", "")
          ).lastDay;
        }
      }
      if (form.getFieldValue("thoigianthongketheo") == "nam") {
        tuNgayData = getFirstDayOfMonth(form.getFieldValue("nam")?.$y, 1);
        tuNgayData = getFirstDayOfMonth(form.getFieldValue("nam")?.$y, 12);
      }
    } else {
      tuNgayData = form.getFieldValue("tuNgay")
        ? dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
        : "";
      denNgayData = form.getFieldValue("denNgay")
        ? dayjs(form.getFieldValue("denNgay")).format("YYYY-MM-DD")
        : "";
    }
    if (
      tuNgayData > denNgayData ||
      tuNgayData > dayjs(ngayHienTai).format("YYYY-MM-DD")
    ) {
      toast.warning("Ngày bắt đầu không hợp lệ!");
    } else {
      if (tuNgayData && denNgayData) {
        if (tkToanDonVi) {
          setSearchParams((curr: any) => ({
            ...curr,
            donViQuanLy: donViData,
            tuNgay: tuNgayData,
            denNgay: denNgayData,

          }));
        } else {
          setSearchParams((curr: any) => ({
            ...curr,
            maDinhDanh: donViData,
            tuNgay: tuNgayData,
            denNgay: denNgayData,

          }));
        }
      }
    }
  };
  const clearSearch = useCallback(() => {
    resetSearchParams();
    form.resetFields();
  }, []);

  const onFinish = (value: any) => {
    dispatch(SearchDonDocThanhToanTrucTuyen(value));
  };


  return (
    <Form
      name="ThongKeSearch"
      layout="vertical"
      onFieldsChange={(changedFields, allFields) => {
        if (
          changedFields[0] &&
          changedFields[0]["name"] &&
          changedFields[0]["name"][0] == "catalog"
        )
          form.setFieldValue("DonViQuanLy", undefined);

        setSearchValue();
      }}
      form={form}
      style={{
        padding: "20px 20px",
        backgroundColor: "#f1f5f1",
        borderRadius: "5px",
        marginTop: "10px",
      }}
    >
      {/* <Row gutter={[8, 0]}> */}
      <Row gutter={[8, 8]}>
        <Col md={24}>
          <Form.Item label="Loại thời gian" name="loaiThoiGianThongke">
            <Radio.Group
              options={loaiThoiGianThongKe}
              onChange={(value) => onChangeLoai(value.target.value)}
              defaultValue={loaiThoiGianTk}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col>
        {/* <Col md={24}>
          <Form.Item label="Loại " name="loaiDonViThongKe">
            <Radio.Group
              options={loaiThoiGianThongKe}
              onChange={(value) => onChangeLoai(value.target.value)}
              defaultValue={loaiThoiGianTk}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col> */}
        {/* <Col md={12}>
          <Form.Item label="Loại" name="loại thời gian">
            <Radio.Group
              options={loaiThongKe}
              onChange={(value) => setTkToanDonVi(value.target.value)}
              value={tkToanDonVi}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col> */}
        <Col hidden={userData?.typeUser == "Admin" ? false : true} md={12}>
          <Form.Item label="Cấp thực hiện:" name="catalog">
            <AntdSelect
              options={CATALOG_OPTIONS}
              allowClear={false}
              defaultValue={""}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label="Đơn vị:" name="DonViQuanLy">
            <AntdSelect
              generateOptions={{
                model: sltCoCauToChucs,
                value: "groupCode",
                label: "groupName",
              }}
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col md={8} style={{ display: displayTQN }}>
          <Form.Item name="thoigianthongketheo">
            <AntdSelect
              onChange={onChangeTQN}
              generateOptions={{
                model: thoiGianThongKe,
                value: "value",
                label: "label",
              }}
              allowClear
              placeholder="Tháng/Quý/Năm"
            />
          </Form.Item>
        </Col>
        <Col md={8} style={{ display: displayThang }}>
          <Form.Item name="thang">
            <AntdSelect
              generateOptions={{
                model: thangs,
                value: "value",
                label: "label",
              }}
              allowClear
              placeholder="Chọn tháng"
            />
          </Form.Item>
        </Col>
        <Col md={8} style={{ display: displayQuy }}>
          <Form.Item name="quy">
            <AntdSelect
              generateOptions={{
                model: quys,
                value: "value",
                label: "label",
              }}
              allowClear
              placeholder="Chọn quý"
            />
          </Form.Item>
        </Col>
        <Col md={8} style={{ display: displayNam }}>
          <Form.Item name="nam">
            <DatePicker picker="year" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col md={12} style={{ display: displayDate }}>
          <Form.Item label="Từ ngày" name="tuNgay">
            <DatePicker
              placeholder="Chọn ngày"
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col md={12} style={{ display: displayDate }}>
          <Form.Item label="Đến ngày" name="denNgay">
            <DatePicker
              placeholder="Chọn ngày"
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="headerThongKe">
        <div className="actionButtons">
          <button
            className="btnThongKe"
            onClick={() => onFinish(thongKeHoSoContext.search)}
          >
            <span className="icon">
              <SearchOutlined />
            </span>
            <span>Thống kê</span>
          </button>
          <div className="btnXuatBaoCao" style={{ display: items.length > 0 ? '' : 'none' }}>
            <span className="icon">
              <PrinterOutlined />
            </span>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  In báo cáo
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* </Row> */}
    </Form>
  );
};
