import { CollapseContent } from "@/components/common";
import { FORMAT_DATE, FORMAT_DATE_ISO, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Form, Input, Space, Row, Col, DatePicker, SelectProps, Dropdown } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { SearchTrangThaiHoSo } from "@/features/trangthaihoso/redux/action";
import { filterOptions } from "@/utils";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { userService } from "@/features/user/services";
import { IUserRole } from "@/features/user/models";
import { DownOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { SearchUser } from "@/features/user/redux/Actions";
import { ISearchThongKeParams } from "@/features/thongKe/thongKeQD766/models/ThongKeQD766Search";
import { SearchLinhVucTheoDonVi } from "@/features/linhvuc/redux/action";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { useSearchParams } from "react-router-dom";
const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
];
const STATUS_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Đã xử lý quá hạn", value: "daxulyquahan" },
  { label: "Đang xử lý quá hạn", value: "dangxulyquahan" },
];
export const SearchThongKeHoSoPhiDiaGioi = ({
  setSearchParams,
  resetSearchParams,
  onFinish,
  searchParams,
  items
}: {
  setSearchParams: any;
  resetSearchParams: () => void;
  onFinish: (value: ISearchThongKeParams) => void;
  searchParams: ISearchThongKeParams,
  items: any,
}) => {
  const [form] = Form.useForm();
  const [parmas] = useSearchParams();
  const dispatch = useAppDispatch();
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const catalog = Form.useWatch("catalog", form);
  const { datas: trangThais } = useAppSelector((state) => state.trangthaihoso);
  const [userData, setUserData] = useState<IParseUserToken>();
  const quanHuyen = Form.useWatch("quanHuyen", form);
  const groupCode = Form.useWatch("groupCode", form);
  const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  useEffect(() => {
    if (userData?.typeUser) {
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 10000,

          // donViQuanLy:
          //   !thongKeToanHeThong ? userData?.officeCode : undefined,
          orderBy: ["GroupOrder", "MaDinhDanh"],
        })
      );
    }
  }, [catalog, userData, thongKeToanHeThong]);
  useEffect(() => {
    dispatch(
      SearchTrangThaiHoSo({ pageNumber: 1, pageSize: 50, reFetch: true })
    );
  }, []);
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
    var tmp = [{ groupCode: "", groupName: "Tất cả" }] as ICoCauToChuc[];

    if (coCauToChucs) {
      if (catalog == 'xa-phuong' && quanHuyen) {
        return [...tmp, ...coCauToChucs.filter((x: any) => x.groupCode && x.ofGroupCode == quanHuyen && x.catalog == 'xa-phuong')];
      }
      if (catalog) {
        if (thongKeToanHeThong)
          return [...tmp, ...coCauToChucs.filter((x) => x.groupCode && x.catalog == catalog)];
        else return coCauToChucs.filter((x) => x.groupCode && x.catalog == catalog);
      } else {
        if (thongKeToanHeThong)
          return [...tmp, ...coCauToChucs.filter((x) => x.groupCode)];
        else return coCauToChucs.filter((x) => x.groupCode);
      }

    }

    return [];
  }, [coCauToChucs, quanHuyen, catalog]);

  const tmpCoCauToChucHuyens = useMemo(() => {
    var tmp = [{ groupCode: "", groupName: "Tất cả" }] as ICoCauToChuc[];
    if (catalog == 'xa-phuong' && coCauToChucs) {
      if (thongKeToanHeThong)
        return [...tmp, ...coCauToChucs.filter((x) => x.groupCode && x.catalog == 'quan-huyen')];
      else return coCauToChucs.filter((x) => x.groupCode && x.catalog == 'quan-huyen');
    }
    return [];
  }, [catalog]);
  useEffect(() => {
    const now = new Date();
    var tuNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    var denNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    form.setFieldValue("TuNgay", tuNgay ? dayjs(tuNgay) : null);
    form.setFieldValue("DenNgay", denNgay ? dayjs(denNgay) : null);
    if (userData && thongKeToanHeThong) {
      form.setFieldValue("groupCode", userData?.groupCode);
    }
  }, [userData])
  const handleSubmit = () => {

    setSearchParams({
      ...searchParams,
      trangThaiHoSoId: form.getFieldValue("TrangThaiHoSoId") || undefined,
      trangThaiXuLy: form.getFieldValue("TrangThaiXuLy") || null,
      donViPhiDiaGioi: form.getFieldValue("groupCode") || null,
      maLinhVucChinh: form.getFieldValue("maLinhVucChinh") || null,
      maTTHC: form.getFieldValue("maTTHC") || null,
      tuNgay: form.getFieldValue("TuNgay")
        ? dayjs(form.getFieldValue("TuNgay")).format(FORMAT_DATE_ISO)
        : null,
      denNgay: form.getFieldValue("DenNgay")
        ? dayjs(form.getFieldValue("DenNgay")).format(FORMAT_DATE_ISO)
        : null,
      groupCode:
        !thongKeToanHeThong ? userData?.officeCode : undefined,
    });
    onFinish({
      ...searchParams,
      trangThaiHoSoId: form.getFieldValue("TrangThaiHoSoId") || undefined,
      trangThaiXuLy: form.getFieldValue("TrangThaiXuLy") || null,
      donViPhiDiaGioi: form.getFieldValue("groupCode") || null,
      maLinhVucChinh: form.getFieldValue("maLinhVucChinh") || null,
      maTTHC: form.getFieldValue("maTTHC") || null,
      tuNgay: form.getFieldValue("TuNgay")
        ? dayjs(form.getFieldValue("TuNgay")).format(FORMAT_DATE_ISO)
        : undefined,
      denNgay: form.getFieldValue("DenNgay")
        ? dayjs(form.getFieldValue("DenNgay")).format(FORMAT_DATE_ISO)
        : undefined,
      groupCode:
        !thongKeToanHeThong ? userData?.officeCode : undefined,
    });
  };
  const clearSearch = useCallback(() => {
    resetSearchParams();
    form.resetFields();
  }, []);
  useEffect(() => {
    if (groupCode) {
      form.setFieldValue("maTTHC", undefined)
      form.setFieldValue("maLinhVucChinh", undefined)
      dispatch(
        SearchLinhVucTheoDonVi({
          pageNumber: 1,
          pageSize: 1000,
          reFetch: true,
          donViId: groupCode
        })
      );
    }
  }, [groupCode])
  const onSelectLinhVuc = (maLinhVuc: string) => {
    form.setFieldValue("maTTHC", undefined)
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
    <Form
      name="ThongKeSearch"
      layout="horizontal"
      onFieldsChange={(changedFields, allFields) => {
        if (
          changedFields[0] &&
          changedFields[0]["name"] &&
          changedFields[0]["name"][0] == "catalog"
        ) {
          form.setFieldValue("groupCode", null);
          form.setFieldValue("maLinhVucChinh", null);
          form.setFieldValue("maTTHC", null);
        }

        setSearchParams({
          ...searchParams,
          trangThaiXuLy: form.getFieldValue("TrangThaiXuLy") || null,
          groupCode: form.getFieldValue("groupCode") || null,
          trangThaiHoSoId: form.getFieldValue("TrangThaiHoSoId") || undefined,
          nguoiNhanHoSo: form.getFieldValue("nguoiNhanHoSo"),
          tuNgay: form.getFieldValue("TuNgay")
            ? dayjs(form.getFieldValue("TuNgay")).format(FORMAT_DATE_ISO)
            : null,
          denNgay: form.getFieldValue("DenNgay")
            ? dayjs(form.getFieldValue("DenNgay")).format(FORMAT_DATE_ISO)
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
      <Row gutter={[8, 0]}>
        {/* <Col style={{ flex: 1 }}>
          <Form.Item label="Trạng thái" name="TrangThaiHoSoId">
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
        </Col> */}
        <Col md={8}>
          <Form.Item label="Cấp thực hiện" name="catalog">
            <AntdSelect
              options={CATALOG_OPTIONS}
              allowClear={false}
              defaultValue={""}
            />
          </Form.Item>
        </Col>
        <Col md={8} hidden={catalog == 'xa-phuong' ? false : true}>
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
        <Col md={8}>
          <Form.Item label={`${catalog != '' && catalog ? CATALOG_OPTIONS.find(x => x.value == catalog)?.label : 'Đơn vị'}`} name="groupCode">
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
      <Row gutter={[8, 0]}>
        <Col md={6} hidden={parmas.get('type') != null && parmas.get('type') == "don-vi"}>
          <Form.Item label={'Lĩnh vực'} name="maLinhVucChinh">
            <AntdSelect
              generateOptions={{
                model: linhVucs,
                label: "ten",
                value: "ma",
              }}
              allowClear
              showSearch
              filterOption={filterOptions}
              onSelect={onSelectLinhVuc}
            />
          </Form.Item>
        </Col>
        <Col md={6} hidden={parmas.get('type') != null && parmas.get('type') != "thu-tuc"}>
          <Form.Item label={'Thủ tục'} name="maTTHC">
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
        <Col md={6}>
          <Form.Item label="Từ ngày:" name="TuNgay">
            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col md={6}>
          <Form.Item label="Đến ngày:" name="DenNgay">
            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

      </Row >

      <div className="headerThongKe">

        <div className="actionButtons">
          <button className="btnThongKe" onClick={() => handleSubmit()}>
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
    </Form >
  );
};
