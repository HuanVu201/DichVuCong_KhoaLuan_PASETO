import { CollapseContent } from "@/components/common";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Form, Input, Space, Row, Col, DatePicker, SelectProps, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import dayjs from "dayjs";
import { ISearchThongKeParams } from "../models/ThongKeQD766Search";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Quận huyện", value: "quan-huyen" },
  { label: "Xã phường", value: "xa-phuong" },
];
export const SearchThongKe = ({
  setSearchParams, resetSearchParams, onFinish }
  : { setSearchParams: any; resetSearchParams: () => void; onFinish: (value: ISearchThongKeParams) => void; }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const catalog = Form.useWatch("catalog", form);
  const [userData, setUserData] = useState<IParseUserToken>();
    console.log(coCauToChucs)


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
    // <Spin spinning={loading}
    //   indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Col
            style={{ flex: 1, margin: "0 5px" }}
            hidden={userData?.typeUser == "Admin" ? false : true}
          >
            <Form.Item label="Cấp thực hiện:" name="catalog">
              <AntdSelect
                options={CATALOG_OPTIONS}
                allowClear={false}
                defaultValue={""}
              />
            </Form.Item>
          </Col>
          <Col style={{ flex: 1, margin: "0 5px" }}>
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
        </div>
        <div style={{ display: "flex" }}>
          <Col md={12}>
            <Form.Item label="Từ ngày:" name="TuNgay">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Đến ngày:" name="DenNgay">
              <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
            </Form.Item>
          </Col>
        </div>
        {/* </Row> */}
      </Form>
    // </Spin>
  );
};
