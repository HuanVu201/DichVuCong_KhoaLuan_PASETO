import { CollapseContent } from "@/components/common";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Form, Input, Space, Row, Col, DatePicker, SelectProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import dayjs from "dayjs";
import { ISearchThongKeParams } from "../models/ThongKeQD766Search";
import { toast } from "react-toastify";
const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Quận huyện", value: "quan-huyen" },
  { label: "Xã phường", value: "xa-phuong" },
];
const loaiThoiGianThongKe = [
  { label: "Cố định", value: "codinh" },
  { label: "Bất kỳ", value: "batky" },
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
export const SearchThongKeTheoKhungTg = ({
  setSearchParams,
  resetSearchParams,
  onFinish,
}: {
  setSearchParams: any;
  resetSearchParams: () => void;
  onFinish: (value: ISearchThongKeParams) => void;
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [displayDonVi, setDisplayDonVi] = useState<string>("none");
  const [displayTQN, setDisplayTQN] = useState<string>("none");
  const [displayThang, setDisplayThang] = useState<string>("none");
  const [displayQuy, setDisplayQuy] = useState<string>("none");
  const [displayNam, setDisplayNam] = useState<string>("none");
  const [displayDate, setDisplayDate] = useState<string>("none");
  const [mdThoiGianThongKe, setMdThoiGianThongKe] = useState(24);
  const [strTuNgay, setStrTuNgay] = useState<string>();
  const [strDenNgay, setStrDenNgay] = useState<string>();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const catalog = Form.useWatch("catalog", form);
  const [userData, setUserData] = useState<IParseUserToken>();
  const onChangeLoai = (value: string) => {
    if (value == undefined) {
      setDisplayTQN("none");
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("none");
      setDisplayDate("none");
      setMdThoiGianThongKe(24);
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
      setMdThoiGianThongKe(9);
    }
    if (value == "batky") {
      setDisplayTQN("none");
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("none");
      setMdThoiGianThongKe(24);
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
      setMdThoiGianThongKe(9);
      form.setFieldValue("quy", undefined);
      form.setFieldValue("nam", undefined);
    }
    if (value == "quy") {
      setDisplayThang("none");
      setDisplayQuy("block");
      setDisplayNam("block");
      setMdThoiGianThongKe(9);
      form.setFieldValue("thang", undefined);
      form.setFieldValue("nam", undefined);
    }
    if (value == "nam") {
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("block");
      setMdThoiGianThongKe(14);
      form.setFieldValue("thang", undefined);
      form.setFieldValue("quy", undefined);
    }
    if (value == undefined) {
      setDisplayThang("none");
      setDisplayQuy("none");
      setDisplayNam("none");
      setMdThoiGianThongKe(9);
      form.setFieldValue("thang", undefined);
      form.setFieldValue("quy", undefined);
      form.setFieldValue("nam", undefined);
    }
  };

  useEffect(() => {
    dispatch(
      SearchCoCauToChuc({
        type: "don-vi",
        pageNumber: 1,
        pageSize: 1100,
        cataLog: catalog,
        maDinhDanhCha:
          userData?.typeUser != "Admin" ? userData?.maDinhDanh : "",
        orderBy: ["MaDinhDanh"],
      })
    );
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

    form.setFieldValue("TuNgay", tuNgay ? dayjs(tuNgay) : null);
    form.setFieldValue("DenNgay", denNgay ? dayjs(denNgay) : null);
    if (userData?.typeUser != "Admin") {
      form.setFieldValue("MaDinhDanhCha", userData?.maDinhDanh);
    }
    setSearchParams({
      MaDinhDanhCha: form.getFieldValue("MaDinhDanhCha") || null,
      TuNgay: form.getFieldValue("TuNgay")
        ? dayjs(form.getFieldValue("TuNgay")).format()
        : null,
      DenNgay: form.getFieldValue("DenNgay")
        ? dayjs(form.getFieldValue("DenNgay")).format()
        : null,
    });
    onFinish({
      maDinhDanhCha: form.getFieldValue("MaDinhDanhCha") || null,
      tuNgay: form.getFieldValue("TuNgay")
        ? dayjs(form.getFieldValue("TuNgay")).format()
        : undefined,
      denNgay: form.getFieldValue("DenNgay")
        ? dayjs(form.getFieldValue("DenNgay")).format()
        : undefined,
    });
  }, [userData]);
  const clearSearch = useCallback(() => {
    resetSearchParams();
    form.resetFields();
  }, []);
  return (
    <Form
      name="ThongKeSearch"
      layout="horizontal"
      onFieldsChange={(changedFields, allFields) => {
        if (
          changedFields[0] &&
          changedFields[0]["name"] &&
          changedFields[0]["name"][0] == "catalog"
        )
          form.setFieldValue("MaDinhDanhCha", null);

        setSearchParams({
          MaDinhDanhCha: form.getFieldValue("MaDinhDanhCha") || null,
          TuNgay: form.getFieldValue("TuNgay")
            ? dayjs(form.getFieldValue("TuNgay")).format()
            : null,
          DenNgay: form.getFieldValue("DenNgay")
            ? dayjs(form.getFieldValue("DenNgay")).format()
            : null,
        });
      }}
      form={form}
      style={{
        padding: "20px 180px",
        backgroundColor: "#f1f5f1",
        borderRadius: "5px",
        marginTop: "10px",
      }}
    >
      {/* <Row gutter={[8, 0]}> */}
      <Row gutter={[8, 8]}>
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
          <Form.Item label="Đơn vị:" name="MaDinhDanhCha">
            <AntdSelect
              generateOptions={{
                model: coCauToChucs,
                value: "maDinhDanh",
                label: "groupName",
              }}
              showSearch
              allowClear
            />
          </Form.Item>
        </Col>

        <Col md={mdThoiGianThongKe}>
          <Form.Item label="Thời gian thống kê" name="loaithoigianthongke">
            <AntdSelect
              onChange={onChangeLoai}
              generateOptions={{
                model: loaiThoiGianThongKe,
                value: "value",
                label: "label",
              }}
              defaultValue={"batky"}
              allowClear
              placeholder="Loại thời gian"
            />
          </Form.Item>
        </Col>
        <Col md={5} style={{ display: displayTQN }}>
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
        <Col md={5} style={{ display: displayThang }}>
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
        <Col md={5} style={{ display: displayQuy }}>
          <Form.Item name="quy">
            <AntdSelect
              generateOptions={{ model: quys, value: "value", label: "label" }}
              allowClear
              placeholder="Chọn quý"
            />
          </Form.Item>
        </Col>
        <Col md={5} style={{ display: displayNam }}>
          <Form.Item name="nam">
            <DatePicker picker="year" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col md={24} style={{ display: displayDate }}>
          <Form.Item label="Từ ngày" name="tuNgay">
            <DatePicker placeholder="Chọn ngày" format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item label="Đến ngày" name="denNgay">
            <DatePicker placeholder="Chọn ngày" format={"DD/MM/YYYY"} />
          </Form.Item>
        </Col>
      </Row>
      {/* </Row> */}
    </Form>
  );
};
