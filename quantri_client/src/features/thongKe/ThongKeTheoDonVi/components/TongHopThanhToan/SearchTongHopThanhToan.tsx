import { CollapseContent } from "@/components/common";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  Input,
  Space,
  Row,
  Col,
  DatePicker,
  SelectProps,
  Radio,
  Form,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import dayjs from "dayjs";

import { toast } from "react-toastify";
import { ICoCauToChuc } from "@/features/cocautochuc/models";

const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
];

const loaidonViThongKeOptions = [
  { label: "Đơn vị", value: "donvi" },
  { label: "Toàn bộ đơn vị con", value: "toanbo" },
];

export const SearchTongHopThanhToan = ({
  setSearchParams,
  resetSearchParams,
  loaiDonViThongKe,
}: {
  setSearchParams: any;
  resetSearchParams: () => void;
  loaiDonViThongKe?: string;
}) => {
  var ngayHienTai = new Date();

  const dispatch = useAppDispatch();

  const [maDinhDanh, setMaDinhDanh] = useState<string>();

  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm<any>();
  const catalog = Form.useWatch("catalog", form);
  const [userData, setUserData] = useState<IParseUserToken>();

  useEffect(() => {
    dispatch(
      SearchCoCauToChuc({
        type: "don-vi",
        pageNumber: 1,
        pageSize: 1100,
        cataLog: catalog,
        maDinhDanhCha:
          userData?.typeUser != "Admin" ? userData?.maDinhDanh : undefined,
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

  useEffect(() => {
    const now = new Date();
    var tuNgay = `${now.getMonth() + 1}/01/${now.getFullYear()}`;
    var denNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    form.setFieldValue("tiepNhanTuNgay", tuNgay ? dayjs(tuNgay) : null);
    form.setFieldValue("tiepNhanDenNgay", denNgay ? dayjs(denNgay) : null);
    if (userData?.typeUser != "Admin") {
      form.setFieldValue("MaDinhDanhCha", userData?.maDinhDanh);
    }
    form.setFieldValue("loaiDonViThongKe", loaiDonViThongKe ?? "toanbo");
    if (loaiDonViThongKe == "donvi") {
      setSearchParams({
        maDinhDanhCha: undefined,
        maDinhDanh: userData?.maDinhDanh,
        tiepNhanTuNgay: form.getFieldValue("tiepNhanTuNgay")
          ? dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
          : null,
        tiepNhanDenNgay: form.getFieldValue("tiepNhanTuNgay")
          ? dayjs(form.getFieldValue("tiepNhanDenNgay")).format("YYYY-MM-DD")
          : null,
      });
    } else {
      setSearchParams({
        maDinhDanhCha: userData?.maDinhDanh,
        maDinhDanh: undefined,
        tiepNhanTuNgay: form.getFieldValue("tiepNhanTuNgay")
          ? dayjs(form.getFieldValue("tiepNhanTuNgay")).format("YYYY-MM-DD")
          : null,
        tiepNhanDenNgay: form.getFieldValue("tiepNhanDenNgay")
          ? dayjs(form.getFieldValue("tiepNhanDenNgay")).format("YYYY-MM-DD")
          : null,
      });
    }
  }, [userData]);
  const sltCoCauToChucs = useMemo(() => {
    var tmp = [{ maDinhDanh: "", groupName: "Tất cả" }] as ICoCauToChuc[];

    if (coCauToChucs)
      if (userData?.typeUser == "Admin")
        return [...tmp, ...coCauToChucs.filter((x) => x.maDinhDanh)];
      else return coCauToChucs.filter((x) => x.maDinhDanh);

    return [];
  }, [coCauToChucs]);
  const setSearchValue = () => {
    const donViData: any = form.getFieldValue("MaDinhDanhCha") || maDinhDanh;
    const thongKeToanDonVi =
      form.getFieldValue("loaiDonViThongKe") || loaiDonViThongKe;
    let tiepNhanTuNgayData: string | undefined = undefined;
    let tiepNhanDenNgayData: string | undefined = undefined;

    tiepNhanTuNgayData = form.getFieldValue("tiepNhanTuNgay")
      ? dayjs(form.getFieldValue("tiepNhanTuNgay")).format("YYYY-MM-DD")
      : undefined;
    tiepNhanDenNgayData = form.getFieldValue("tiepNhanDenNgay")
      ? dayjs(form.getFieldValue("tiepNhanDenNgay")).format("YYYY-MM-DD")
      : undefined;
    let thanhToanTuNgayData: string | undefined = undefined;
    let thanhToanDenNgayData: string | undefined = undefined;

    thanhToanTuNgayData = form.getFieldValue("thanhToanTuNgay")
      ? dayjs(form.getFieldValue("thanhToanTuNgay")).format("YYYY-MM-DD")
      : undefined;
    thanhToanDenNgayData = form.getFieldValue("thanhToanDenNgay")
      ? dayjs(form.getFieldValue("thanhToanDenNgay")).format("YYYY-MM-DD")
      : undefined;

    if (
      tiepNhanTuNgayData &&
      tiepNhanDenNgayData &&
      (tiepNhanTuNgayData > tiepNhanDenNgayData ||
        tiepNhanTuNgayData > dayjs(ngayHienTai).format("YYYY-MM-DD"))
    ) {
      toast.warning("Ngày bắt đầu không hợp lệ!");
    } else {
      if (thongKeToanDonVi == "toanbo") {
        setSearchParams((curr: any) => ({
          ...curr,
          maDinhDanhCha: donViData,
          maDinhDanh: undefined,
          tiepNhanTuNgay: tiepNhanTuNgayData,
          tiepNhanDenNgay: tiepNhanDenNgayData,
          thanhToanTuNgay: thanhToanTuNgayData,
          thanhToanDenNgay: thanhToanDenNgayData,
          catalog: form.getFieldValue("catalog"),
        }));
      } else {
        setSearchParams((curr: any) => ({
          ...curr,
          maDinhDanhCha: undefined,
          maDinhDanh: donViData,
          tiepNhanTuNgay: tiepNhanTuNgayData,
          tiepNhanDenNgay: tiepNhanDenNgayData,
          thanhToanTuNgay: thanhToanTuNgayData,
          thanhToanDenNgay: thanhToanDenNgayData,
          catalog: form.getFieldValue("catalog"),
        }));
      }
    }
  };
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
          form.setFieldValue("MaDinhDanhCha", undefined);

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
        <Col md={12}>
          <Form.Item
            label="Loại"
            name="loaiDonViThongKe"
            style={{ display: loaiDonViThongKe ? "none" : undefined }}
          >
            <Radio.Group
              options={loaidonViThongKeOptions}
              defaultValue={loaiDonViThongKe ?? "toanbo"}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Col>
        <Col md={12}></Col>
        <Col hidden={userData?.typeUser == "Admin" ? false : true} md={12}>
          <Form.Item label="Cấp thực hiện" name="catalog">
            <AntdSelect
              options={CATALOG_OPTIONS}
              allowClear={false}
              defaultValue={undefined}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label="Đơn vị" name="MaDinhDanhCha">
            <AntdSelect
              generateOptions={{
                model: sltCoCauToChucs,
                value: "maDinhDanh",
                label: "groupName",
              }}
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col md={12}>
          <Form.Item label="Tiếp nhận từ ngày" name="tiepNhanTuNgay">
            <DatePicker
              placeholder="Chọn ngày"
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label="Tiếp nhận đến ngày" name="tiepNhanDenNgay">
            <DatePicker
              placeholder="Chọn ngày"
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label="Thanh toán từ ngày" name="thanhToanTuNgay">
            <DatePicker
              placeholder="Chọn ngày"
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label="Thanh toán đến ngày" name="thanhToanDenNgay">
            <DatePicker
              placeholder="Chọn ngày"
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      {/* </Row> */}
    </Form>
  );
};
