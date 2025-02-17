import { CollapseContent } from "@/components/common";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, TTHCCTH_GROUPCODE } from "@/data";
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
  Spin,
  Dropdown,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { DownOutlined, FileWordFilled, FileWordOutlined, LoadingOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { ISearchThongKe766TTHCParams } from "../models/ThongKe766TTHCModels";
import { userService } from "@/features/user/services";
import { IUserRole } from "@/features/user/models";
const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
];
const CATALOGTH_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
  { label: "Trung tâm Phục vụ hành chính công", value: TTHCCTH_GROUPCODE }

];
export const SearchThongKeBaoCaoTTHC = ({
  searchParams,
  setSearchParams,
  resetSearchParams,
  onFinish,
  items
}: {
  searchParams: ISearchThongKe766TTHCParams,
  setSearchParams: any;
  resetSearchParams: () => void;
  onFinish: (value: ISearchThongKe766TTHCParams) => void;
  items: any
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { datas: coCauToChucs, loading } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const catalog = Form.useWatch("catalog", form);
  const [userData, setUserData] = useState<IParseUserToken>();
  const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const { publicModule: config } = useAppSelector(state => state.config)
  const [maTinh, setMaTinh] = useState<string>();
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh') {
        setMaTinh(item.content)
      }
    })
  }, [config])
  useEffect(() => {
    dispatch(
      SearchCoCauToChuc({
        type: "don-vi",
        pageNumber: 1,
        pageSize: 1100,
        cataLog: catalog,
        // maDinhDanhCha:
        //   userData?.typeUser != "Admin" ? userData?.maDinhDanh : "",
        orderBy: ["MaDinhDanh"],
      })
    );
  }, [catalog]);
  // useEffect(() => {
  //   if (auth) {
  //     var user = parseJwt(auth.token) as IParseUserToken;

  //     setUserData(user);
  //   }
  // }, [auth]);

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


  const clearSearch = useCallback(() => {
    resetSearchParams();
    form.resetFields();
  }, []);

  return (
    <Spin spinning={loading || loadingRoles}
      indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}>
      <Form
        name="ThongKeSearch"
        layout="vertical"
        onFieldsChange={(changedFields, allFields) => {
          if (
            changedFields[0] &&
            changedFields[0]["name"] &&
            changedFields[0]["name"][0] == "catalog"
          ) {
            form.setFieldValue("groupCode", null);
          }
          setSearchParams(form.getFieldsValue());
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Col hidden={thongKeToanHeThong ? false : true} style={{ flex: 1, margin: "0 5px" }}>
            <Form.Item label="Cấp thực hiện:" name="catalog">
              <AntdSelect
                generateOptions={{
                  model: maTinh == "38" ? CATALOGTH_OPTIONS : CATALOG_OPTIONS,
                  value: "value",
                  label: "label",
                }}
                allowClear={false}
                defaultValue={""}
              />
            </Form.Item>
          </Col>
          <Col style={{ flex: 1, margin: "0 5px" }}>
            <Form.Item label="Đơn vị:" name="groupCode">
              <AntdSelect
                generateOptions={{
                  model: coCauToChucs,
                  value: "groupCode",
                  label: "groupName",
                }}
                showSearch
                allowClear
              />
            </Form.Item>
          </Col>
        </div>

        {/* </Row> */}

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
