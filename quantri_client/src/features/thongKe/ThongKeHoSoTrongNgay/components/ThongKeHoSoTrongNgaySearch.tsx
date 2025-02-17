import { CollapseContent } from "@/components/common"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { ThongKeTheoDoiTrangThaiHSAction } from "@/features/hoso/redux/action"
import { ThongKeHSLTParams } from "@/features/hoso/services"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Form, Input, Space, Row, Col, DatePicker, Dropdown, MenuProps } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import dayjs from 'dayjs'
import { IParseUserToken } from "@/models"
import { parseJwt } from "@/utils/common"
import { userService } from "@/features/user/services"
import { IUserRole } from "@/features/user/models"
import { CATALOG_OPTIONS } from "../../ThongKeTheoDonVi/components/SearchThongKeTiepNhanBuuChinh"
import { LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData"
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord"
import { DownOutlined, FileExcelOutlined, FileWordOutlined } from "@ant-design/icons"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"

export const ThongKeHoSoTrongNgaySearch = ({ setSearchParams, onFinish, searchParams }: { searchParams?: ThongKeHSLTParams, onFinish: (value: ThongKeHSLTParams) => void; setSearchParams: React.Dispatch<React.SetStateAction<ThongKeHSLTParams>> }) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { datas: cocautochucs } = useAppSelector(state => state.cocautochuc)
  const { data: user } = useAppSelector(state => state.user)
  const [donVis, setDonVis] = useState<ICoCauToChuc[]>([])
  const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const quanHuyen = Form.useWatch("quanHuyen", form);
  const { datas: coCauToChucs, loading } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [userData, setUserData] = useState<IParseUserToken>();
  const catalog = Form.useWatch("catalog", form);

  const onSubmmit = (values: ThongKeHSLTParams) => {
    setSearchParams((curr) => ({ ...curr, ...values }))
    onFinish({
      ...searchParams,
      ...values,
      tiepNhanTuNgay: values.tiepNhanTuNgay ? values.tiepNhanTuNgay : undefined,
      tiepNhanDenNgay: values.tiepNhanDenNgay ? values.tiepNhanDenNgay : undefined,
      nopHoSoTuNgay: values.nopHoSoTuNgay ? values.nopHoSoTuNgay : undefined,
      nopHoSoDenNgay: values.nopHoSoDenNgay ? values.nopHoSoDenNgay : undefined,
      pageNumber: 1,
      pageSize: 50,
      maDinhdanh: values.maDinhDanhCha ? values.maDinhDanhCha : user?.maDinhDanh
    })
  }
  useEffect(() => {
    const now = new Date();
    var tuNgay = `01/01/${now.getFullYear()}`;
    var denNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    form.setFieldValue("tuNgay", tuNgay ? dayjs(tuNgay) : null);
    form.setFieldValue("denNgay", denNgay ? dayjs(denNgay) : null);
  }, [])
  useEffect(() => {
    if (cocautochucs) {
      var tmp = [{ maDinhDanh: "", groupName: "Tất cả" }] as ICoCauToChuc[];
      setDonVis([...tmp, ...cocautochucs])
    }
  }, [cocautochucs])
  const resetSearchParams = useCallback(() => {
    // setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true, catalog: 'quan-huyen' })
    form.resetFields()
  }, [])

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
  const handleMenuClick = (e: any) => {
    if (e.key === "excel") {
      downloadPhieuExcel("Thống kê số lượng hồ sơ trong ngày", "DanhSachThongKeHSTrongNgay");
    } else if (e.key === "word") {
      downloadPhieuWord("Thống kê số lượng hồ sơ trong ngày", true, "DanhSachThongKeHSTrongNgay");
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Xuất Word",
      key: "word",
      icon: <FileWordOutlined style={{ color: 'blue' }}></FileWordOutlined>
    },
    {
      label: "Xuất Excel",
      key: "excel",
      icon: <FileExcelOutlined style={{ color: 'green' }}></FileExcelOutlined>

    },

  ];
  return (
    <CollapseContent defaultVisible={true}
    >
      <Form style={{
        padding: "20px 20px",
        backgroundColor: "#f1f5f1",
        borderRadius: "5px",
        marginTop: "10px",
      }} name='ThongKeTheoDoiTrangThaiHoSoSearch' layout="vertical" onFinish={onSubmmit} form={form}>
        <Row gutter={[8, 8]} justify="center">
          <Col lg={6} md={12} span={24} hidden={thongKeToanHeThong ? false : true} >
            <Form.Item label="Cấp thực hiện" name="catalog">
              <AntdSelect
                options={CATALOG_OPTIONS}
                allowClear={false}
                defaultValue={""}
              />
            </Form.Item>
          </Col>
          <Col lg={6} md={12} span={24} hidden={catalog == 'xa-phuong' ? false : true}>
            <Form.Item name="quanHuyen"
              label={`Quận huyện`}
            >
              <AntdSelect
                allowClear
                generateOptions={{
                  model: tmpCoCauToChucHuyens,
                  value: "groupCode",
                  label: "groupName",
                }}
                showSearch
              />
            </Form.Item>
          </Col>
          <Col lg={thongKeToanHeThong ? 6 : 12} md={12} span={24} >
            <Form.Item label={`${catalog != '' && catalog ? CATALOG_OPTIONS?.find(x => x.value == catalog)?.label : 'Đơn vị'}`} name="MaDinhDanh">
              <AntdSelect
                allowClear
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
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit" >
                Thống kê
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams}>
                Tải lại
              </AntdButton>
              <Dropdown menu={{ items: items, onClick: handleMenuClick }} trigger={["click"]}>
                <AntdButton type="primary">
                  In danh sách <DownOutlined />
                </AntdButton>
              </Dropdown>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  )
}