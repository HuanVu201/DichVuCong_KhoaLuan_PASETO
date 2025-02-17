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
  Spin,
  Dropdown,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import dayjs from "dayjs";
import { filterOptions, getCurrency } from "@/utils";
import { toast } from "react-toastify";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { DownOutlined, LoadingOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { userService } from "@/features/user/services";
import { IUserRole } from "@/features/user/models";

import { ISearchBaoCaoThuTuc } from "@/features/baocaotonghop/model";
import { LaDuLieuThongKeCacNamOptions, LOAICHUHOSO_OPTIONS, LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData";
import { useBaoCaoTongHopContext } from "../../context/BaoCaoTongHopContext";
import { SearchThuTuc } from "@/features/thutuc/redux/action";

const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
];
const MUCDO_OPTIONS: SelectProps["options"] = [
  { label: "Dịch vụ cung cấp thông tin trực tuyến", value: "2" },
  {
    label: "Dịch vụ công trực tuyến một phần",
    value: "3",
  },
  {
    label: "Dịch vụ công trực tuyến toàn trình",
    value: "4",
  },
];
const loaiThoiGianThongKe = [
  { label: "Cố định", value: "codinh" },
  { label: "Bất kỳ", value: "batky" },
];
const loaidonViThongKeOptions = [
  { label: "Đơn vị cấp trên", value: "donvi" },
  { label: "Đơn vị trực thuộc", value: "donvicon" },
  { label: "Toàn bộ", value: "toanbo" },
];
const hinhThucThongKes = [
  { label: "Có", value: '1' },
  { label: "Không", value: '0' },
];
const thoiGianThongKes = [
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
export const SearchBaoCaoTongHopTheoTruongHop = ({
  setSearchParams,
  resetSearchParams,
  loaiDonViThongKe,
  setThongKeToanBo,
  onFinish,
  items
}: {
  setSearchParams: any;
  resetSearchParams: () => void;
  loaiDonViThongKe?: string;
  setThongKeToanBo: (value: boolean) => void;
  onFinish: (value: ISearchBaoCaoThuTuc) => void;
  items: any
}) => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const dispatch = useAppDispatch();
  const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const [displayTQN, setDisplayTQN] = useState<string>("none");
  const [displayThang, setDisplayThang] = useState<string>("none");
  const [displayQuy, setDisplayQuy] = useState<string>("none");
  const [displayNam, setDisplayNam] = useState<string>("none");
  const [displayDate, setDisplayDate] = useState<string>("");
  const [loaiThoiGianTk, SetLoaiThoiGianTk] = useState<string>("batky");
  const [arrDonViThongKe, setArrDonViThongKe] = useState<number[]>([12, 12, 0]);

  const [strtuNgay, setStrtuNgay] = useState<string>();
  const [maDinhDanh, setMaDinhDanh] = useState<string>();
  const [strdenNgay, setStrdenNgay] = useState<string>();
  const { datas: coCauToChucs, loading } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm<any>();
  const quanHuyen = Form.useWatch("quanHuyen", form);

  const catalog = Form.useWatch("catalog", form);
  const { publicModule: config } = useAppSelector(state => state.config)
  const [maTinh, setMaTinh] = useState<string>();
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh') {
        setMaTinh(item.content)
      }
    })
  }, [config])
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

  useEffect(() => {
    if (userData?.typeUser) {
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 10000,
          maDinhDanhCha:
            !thongKeToanHeThong ? userData?.maDinhDanh : "",
          orderBy: ["MaDinhDanh"],
        })
      );
    }
  }, [userData]);
  useEffect(() => {
    form.setFieldValue("laDuLieuThongKeCacNam", true)
  }, [])
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
    if (!thongKeToanHeThong) {
      form.setFieldValue("MaDinhDanhCha", userData?.maDinhDanh);
    }
    form.setFieldValue("loaiDonViThongKe", loaiDonViThongKe ?? "toanbo");
    if (loaiDonViThongKe == "donvi") {
      setSearchParams({
        maDinhDanhCha: undefined,
        maDinhDanh: userData?.maDinhDanh,
        tuNgay: form.getFieldValue("tuNgay")
          ? dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
          : null,
        denNgay: form.getFieldValue("denNgay")
          ? dayjs(form.getFieldValue("denNgay")).format("YYYY-MM-DD")
          : null,
        laDuLieuThongKeCacNam: form.getFieldValue("laDuLieuThongKeCacNam")
      });
    } else {
      setSearchParams({
        maDinhDanhCha: userData?.maDinhDanh,
        maDinhDanh: undefined,
        tuNgay: form.getFieldValue("tuNgay")
          ? dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
          : null,
        denNgay: form.getFieldValue("denNgay")
          ? dayjs(form.getFieldValue("denNgay")).format("YYYY-MM-DD")
          : null,
        laDuLieuThongKeCacNam: form.getFieldValue("laDuLieuThongKeCacNam")
      });
    }
  }, [userData]);
  const sltCoCauToChucs = useMemo(() => {
    var tmp = [{ maDinhDanh: "", groupName: "Tất cả" }] as ICoCauToChuc[];

    if (coCauToChucs) {
      if (catalog == 'xa-phuong' && quanHuyen) {
        return [...tmp, ...coCauToChucs.filter((x: any) => x.maDinhDanh && x.ofGroupCode == quanHuyen && x.catalog == 'xa-phuong')];
      }
      if (catalog) {
        if (thongKeToanHeThong)
          return [...tmp, ...coCauToChucs.filter((x) => x.maDinhDanh && x.catalog == catalog)];
        else return coCauToChucs.filter((x) => x.maDinhDanh && x.catalog == catalog);
      } else {
        if (thongKeToanHeThong)
          return [...tmp, ...coCauToChucs.filter((x) => x.maDinhDanh)];
        else return coCauToChucs.filter((x) => x.maDinhDanh);
      }

    }

    return [];
  }, [coCauToChucs, quanHuyen, catalog]);

  const tmpCoCauToChucHuyens = useMemo(() => {
    var tmp = [{ maDinhDanh: "", groupName: "Tất cả" }] as ICoCauToChuc[];
    if (catalog == 'xa-phuong' && coCauToChucs) {
      if (thongKeToanHeThong)
        return [...tmp, ...coCauToChucs.filter((x) => x.maDinhDanh && x.catalog == 'quan-huyen')];
      else return coCauToChucs.filter((x) => x.maDinhDanh && x.catalog == 'quan-huyen');
    }
    return [];
  }, [catalog]);


  const setSearchValue = () => {
    const donViData: any = form.getFieldValue("MaDinhDanhCha") || maDinhDanh;
    const thongKeToanDonVi =
      form.getFieldValue("loaiDonViThongKe") || loaiDonViThongKe;

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
        if (!form.getFieldValue("nam")) {
          // toast.warning("Chưa chọn năm!");
        } else {
          tuNgayData = getFirstDayOfMonth(form.getFieldValue("nam")?.$y, 1);
          tuNgayData = getFirstDayOfMonth(form.getFieldValue("nam")?.$y, 12);
        }
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

        if (thongKeToanDonVi == "toanbo") {

          setSearchParams((curr: any) => ({
            ...curr,
            maDinhDanhCha: donViData,
            maDinhDanh: undefined,
            tuNgay: tuNgayData,
            denNgay: denNgayData,
            catalog: donViData ? undefined : form.getFieldValue("catalog"),
            chiBaoGomDonViCon: undefined,
            mucDo: form.getFieldValue("mucDo") ?? undefined,
            kenhThucHien: form.getFieldValue("kenhThucHien") ?? undefined,
            loaiDoiTuong: form.getFieldValue("loaiDoiTuong") ?? undefined,
            maTTHC: form.getFieldValue("maTTHC") ?? undefined,
            laDuLieuThongKeCacNam: form.getFieldValue("laDuLieuThongKeCacNam")
          }));
        } else if (thongKeToanDonVi == "donvicon") {

          setSearchParams((curr: any) => ({
            ...curr,
            maDinhDanhCha: donViData,
            maDinhDanh: undefined,
            chiBaoGomDonViCon: true,
            tuNgay: tuNgayData,
            denNgay: denNgayData,
            catalog: donViData ? undefined : form.getFieldValue("catalog"),
            mucDo: form.getFieldValue("mucDo") ?? undefined,
            kenhThucHien: form.getFieldValue("kenhThucHien") ?? undefined,
            loaiDoiTuong: form.getFieldValue("loaiDoiTuong") ?? undefined,
            maTTHC: form.getFieldValue("maTTHC") ?? undefined,
            laDuLieuThongKeCacNam: form.getFieldValue("laDuLieuThongKeCacNam")
          }));
        } else {

          setSearchParams((curr: any) => ({
            ...curr,
            maDinhDanhCha: undefined,
            maDinhDanh: donViData,
            tuNgay: tuNgayData,
            denNgay: denNgayData,
            catalog: donViData ? undefined : form.getFieldValue("catalog"),
            chiBaoGomDonViCon: undefined,
            mucDo: form.getFieldValue("mucDo") ?? undefined,
            kenhThucHien: form.getFieldValue("kenhThucHien") ?? undefined,
            loaiDoiTuong: form.getFieldValue("loaiDoiTuong") ?? undefined,
            maTTHC: form.getFieldValue("maTTHC") ?? undefined,
            laDuLieuThongKeCacNam: form.getFieldValue("laDuLieuThongKeCacNam")
          }));
        }
      }
    }
  };
  useEffect(() => {
    var donViData = coCauToChucs?.find(x => x.maDinhDanh == form.getFieldValue("MaDinhDanhCha") || maDinhDanh)
    dispatch(
      SearchThuTuc({
        pageNumber: 1,
        pageSize: 100,
        reFetch: true,
        donVi: donViData?.groupCode,
      })
    );
  }, [
    form.getFieldValue("MaDinhDanhCha")
  ])
  const clearSearch = useCallback(() => {
    resetSearchParams();
    form.resetFields();
  }, []);

  return (
    <Spin spinning={loading || loadingRoles}
      indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
    >
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
          if (
            changedFields[0] &&
            changedFields[0]["name"] &&
            changedFields[0]["name"][0] == "MaDinhDanhCha"
          )
            form.setFieldValue("maTTHC", undefined);
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
        <Row gutter={[8, 8]} style={{ display: 'flex' }}>
          <Col md={8} span={12}>
            <Form.Item label="Loại thời gian" name="loaiThoiGianThongKe">
              <Radio.Group
                options={loaiThoiGianThongKe}
                onChange={(value) => onChangeLoai(value.target.value)}
                defaultValue={loaiThoiGianTk}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Col>
          {maTinh != "38" ? <Col md={8} span={12}>
            <Form.Item
              label="Loại hình tiếp nhận"
              name="loaiThongKe"

            >
              <Radio.Group
                options={hinhThucThongKes}
                onChange={((e: any) => {
                  if (e.target.value == '1') {
                    setThongKeToanBo(true)
                  } else {
                    setThongKeToanBo(false)
                  }
                })}
                defaultValue={'0'}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Col> : null}

          {maTinh == "38" ? <Col md={6} span={12} >
            <Form.Item
              label="Loại dữ liệu thống kê"
              name="laDuLieuThongKeCacNam"

            >
              <Radio.Group
                options={LaDuLieuThongKeCacNamOptions}
                defaultValue={true}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Col> : null}
        </Row>
        <Row gutter={[8, 8]} style={{ display: 'flex' }}>
          <Col hidden={thongKeToanHeThong ? false : true} style={{ flex: '1' }}>
            <Form.Item label="Cấp thực hiện" name="catalog">
              <AntdSelect
                options={CATALOG_OPTIONS}
                allowClear={false}
                defaultValue={""}
              />
            </Form.Item>
          </Col>
          <Col style={{ flex: '1' }} hidden={catalog == 'xa-phuong' ? false : true}>
            <Form.Item name="quanHuyen"
              label={`Quận huyện`}
            >
              <AntdSelect
                generateOptions={{
                  model: tmpCoCauToChucHuyens,
                  value: "groupCode",
                  label: "groupName",
                }}
                showSearch
              />
            </Form.Item>
          </Col>
          <Col style={{ flex: '1' }}>
            <Form.Item label={`${catalog != '' && catalog ? CATALOG_OPTIONS.find(x => x.value == catalog)?.label : 'Đơn vị'}`} name="MaDinhDanhCha">
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

        <Row gutter={[8, 8]} style={{ display: 'flex' }}>
          <Col style={{ display: displayTQN, flex: 1 }}>
            <Form.Item name="thoigianthongketheo">
              <AntdSelect
                onChange={onChangeTQN}
                generateOptions={{
                  model: thoiGianThongKes,
                  value: "value",
                  label: "label",
                }}
                allowClear
                placeholder="Tháng/Quý/Năm"
              />
            </Form.Item>
          </Col>
          <Col style={{ display: displayThang, flex: 1 }}>
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
          <Col style={{ display: displayQuy, flex: 1 }}>
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
          <Col style={{ display: displayNam, flex: 1 }}>
            <Form.Item name="nam">
              <DatePicker picker="year" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col style={{ display: displayDate, flex: 1 }}>
            <Form.Item label="Từ ngày" name="tuNgay">
              <DatePicker
                placeholder="Chọn ngày"
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col style={{ display: displayDate, flex: 1 }}>
            <Form.Item label="Đến ngày" name="denNgay">
              <DatePicker
                placeholder="Chọn ngày"
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* </Row> */}
        <div className="headerThongKe">
          <div className="title"></div>
          <div className="actionButtons">
            <button
              className="btnThongKe"
              onClick={() => onFinish(thongKeHoSoContext.searchBaoCaoThuTuc)}
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
      </Form>
    </Spin>
  );
};
