import { CollapseContent } from "@/components/common";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Form, Input, Space, Row, Col, DatePicker, SelectProps, Dropdown, Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import dayjs from "dayjs";
import { ISearchThongKeParams } from "../models/ThongKeQD766Search";
import { toast } from "react-toastify";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { DownOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { userService } from "@/features/user/services";
import { IUserRole } from "@/features/user/models";
const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
];
const STATUS_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "quahan" },
  { label: "Đã xử lý quá hạn", value: "daxulyquahan" },
  { label: "Đang xử lý quá hạn", value: "dangxulyquahan" },
];
export const SearchHoSoQuaHan = ({
  searchParams,
  setSearchParams,
  resetSearchParams,
  onFinish,
  items
}: {
  searchParams: ISearchThongKeParams,
  setSearchParams: any;
  resetSearchParams: () => void;
  onFinish: (value: ISearchThongKeParams) => void;
  items: any
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const catalog = Form.useWatch("catalog", form);
  const [userData, setUserData] = useState<IParseUserToken>();
  const quanHuyen = Form.useWatch("quanHuyen", form);
  const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  useEffect(() => {
    if (userData?.typeUser) {
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 10000,
          cataLog: catalog,
          maDinhDanhCha:
            !thongKeToanHeThong ? userData?.maDinhDanh : "",
          orderBy: ["MaDinhDanh"],
        })
      );
    }
  }, [catalog, userData]);
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

  useEffect(() => {
    const now = new Date();
    var tuNgay = `${now.getMonth() + 1}/01/${now.getFullYear()}`;
    var denNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    form.setFieldValue("TuNgay", tuNgay ? dayjs(tuNgay) : null);
    form.setFieldValue("DenNgay", denNgay ? dayjs(denNgay) : null);
    if (!thongKeToanHeThong) {
      form.setFieldValue("MaDinhDanhCha", userData?.maDinhDanh);
    }
    setSearchParams({
      TrangThaiXuLy: form.getFieldValue("TrangThaiXuLy") || "quahan",
      MaDinhDanhCha: form.getFieldValue("MaDinhDanhCha") || null,
      TuNgay: form.getFieldValue("TuNgay")
        ? dayjs(form.getFieldValue("TuNgay")).format()
        : null,
      DenNgay: form.getFieldValue("DenNgay")
        ? dayjs(form.getFieldValue("DenNgay")).format()
        : null,
    });
    onFinish({
      trangThaiXuLy: form.getFieldValue("TrangThaiXuLy") || null,
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
    <Spin spinning={loadingRoles}>
      <Form
        name="ThongKeSearch"
        layout="vertical"
        onFieldsChange={(changedFields, allFields) => {
          if (
            changedFields[0] &&
            changedFields[0]["name"] &&
            changedFields[0]["name"][0] == "catalog"
          )
            form.setFieldValue("MaDinhDanhCha", null);

          setSearchParams({
            TrangThaiXuLy: form.getFieldValue("TrangThaiXuLy") || "quahan",
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
          padding: "20px 20px",
          backgroundColor: "#f1f5f1",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        {/* <Row gutter={[8, 0]}> */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <Col style={{ flex: 1 }}>
            <Form.Item label="Trạng thái xử lý:" name="TrangThaiXuLy">
              <AntdSelect
                options={STATUS_OPTIONS}
                allowClear={false}
                defaultValue={"quahan"}
              />
            </Form.Item>
          </Col>
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
        </div>
        {/* <div style={{ display: "flex" }}> */}
        <Row gutter={[8, 0]}>
          <Col md={12}>
            <Form.Item label="Từ ngày:" name="TuNgay">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item label="Đến ngày:" name="DenNgay">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        {/* </div> */}

        <div className="headerThongKe">
          <div className="actionButtons">
            <button className="btnThongKe" onClick={() => onFinish(searchParams)}>
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
