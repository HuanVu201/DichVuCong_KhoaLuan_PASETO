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
import { getCurrency } from "@/utils";
import { toast } from "react-toastify";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { DownOutlined, LoadingOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { userService } from "@/features/user/services";
import { IUserRole } from "@/features/user/models";
import { ISearchBaoCaoThuTuc } from "@/features/baocaotonghop/model";
import { useBaoCaoTongHopContext } from "../context/BaoCaoTongHopContext";

export const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
];

export const SearchThongKeTiepNhanBuuChinh = ({
  setSearchParams,
  resetSearchParams,
  loaiDonViThongKe,
  onFinish,
  items
}: {
  setSearchParams: any;
  resetSearchParams: () => void;
  onFinish: (value: ISearchBaoCaoThuTuc) => void;
  loaiDonViThongKe?: string;
  items: any
}) => {
  var ngayHienTai = new Date();


  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const dispatch = useAppDispatch();
  const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const [displayDate, setDisplayDate] = useState<string>("");
  const [maDinhDanh, setMaDinhDanh] = useState<string>();
  const { datas: coCauToChucs, loading } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm<any>();
  const quanHuyen = Form.useWatch("quanHuyen", form);
  const catalog = Form.useWatch("catalog", form);
  const [userData, setUserData] = useState<IParseUserToken>();

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
    if (auth) {
      var user = parseJwt(auth.token) as IParseUserToken;
      setUserData(user);
      (async () => {
        setLoadingRoles(true)
        var user = parseJwt(auth.token) as IParseUserToken;
        let getRoles = await userService.GetUserRoles(user.uid);
        if (getRoles?.data && getRoles?.data?.length > 0) {
          getRoles?.data.map((item: IUserRole) => {
            // console.log((item.roleName == 'Thống kê toàn hệ thống' && item.enabled))
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
    const now = new Date();
    var tuNgay = `01/01/${now.getFullYear()}`;
    var denNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    form.setFieldValue("tuNgay", tuNgay ? dayjs(tuNgay) : null);
    form.setFieldValue("denNgay", denNgay ? dayjs(denNgay) : null);
    if (!thongKeToanHeThong) {
      form.setFieldValue("MaDinhDanhCha", userData?.maDinhDanh);
    }
    form.setFieldValue("loaiDonViThongKe", loaiDonViThongKe ?? "toanbo");
    setSearchParams({
      maDinhDanhCha: userData?.maDinhDanh,
      maDinhDanh: form.getFieldValue("MaDinhDanh"),
      tuNgay: form.getFieldValue("tuNgay")
        ? dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
        : null,
      denNgay: form.getFieldValue("denNgay")
        ? dayjs(form.getFieldValue("denNgay")).format("YYYY-MM-DD")
        : null,
    });
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
    console.log(thongKeToanDonVi);

    tuNgayData = form.getFieldValue("tuNgay")
      ? dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
      : "";
    denNgayData = form.getFieldValue("denNgay")
      ? dayjs(form.getFieldValue("denNgay")).format("YYYY-MM-DD")
      : "";
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
            catalog: donViData ? undefined : form.getFieldValue("catalog"),
            maDinhDanhCha: donViData,
            maDinhDanh: form.getFieldValue("MaDinhDanhCha"),
            tuNgay: tuNgayData,
            denNgay: denNgayData,
            chiBaoGomDonViCon: undefined,
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
          }));
        }
      }
    }
  };
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
        <Row gutter={[8, 8]} style={{ display: 'flex' }}>
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
