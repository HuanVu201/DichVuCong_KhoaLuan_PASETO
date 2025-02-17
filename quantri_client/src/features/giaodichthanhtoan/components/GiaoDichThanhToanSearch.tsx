import { Form, Input, Space, Row, Col, SelectProps, DatePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IGiaoDichThanhToan, ISearchGiaoDichThanhToan } from "../models"
import { useCallback, useEffect, useMemo, useState } from "react"
import { GiaoDichThanhToanDetail } from "./GiaoDichThanhToanDetail"
import { useGiaoDichThanhToanContext } from "../contexts/GiaoDichThanhToanContext"
import { IParseUserToken } from "@/models"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { parseJwt } from "@/utils/common"
import dayjs from 'dayjs'
import { FORMAT_DATE_ISO, FORMAT_ISO_DATE } from "@/data"
import { useParams, useSearchParams } from "react-router-dom"
const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
];
const TRANGTHAI_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Chờ xác nhận", value: "khoi-tao" },
  { label: "Thành công", value: "thanh-cong" },
  { label: "Thất bại", value: "that-bai" },
];
export const GiaoDichThanhToanSearch = ({ setSearchParams, inDanhSach }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiaoDichThanhToan>>, inDanhSach: () => void }) => {
  const giaoDichThanhToanContext = useGiaoDichThanhToanContext()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch();
  const onFinish = (values: ISearchGiaoDichThanhToan) => {
    setSearchParams((curr) => ({
      ...curr,
      DonViQuanLy: values.DonViQuanLy,
      hoSo: values.hoSo,
      tuNgay: values.tuNgay ? dayjs(values.tuNgay).format(FORMAT_ISO_DATE) : undefined,
      denNgay: values.denNgay ? dayjs(values.denNgay).format(FORMAT_ISO_DATE) : undefined,
      trangThai: values.trangThai
    }))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  const catalog = Form.useWatch("catalog", form);
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState<IParseUserToken>();
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
  useEffect(() => {
    if (searchParams) {
      const trangThai = searchParams.get('trangThai')
      if (trangThai) form.setFieldValue("trangThai", trangThai)

    }

  }, [searchParams])
  return (
    <CollapseContent

    >
      <Form name='GiaoDichThanhToanSearch' layout="vertical" onFinish={onFinish} form={form}
        onFieldsChange={(changedFields, allFields) => {
          if (
            changedFields[0] &&
            changedFields[0]["name"] &&
            changedFields[0]["name"][0] == "catalog"
          )
            form.setFieldValue("DonViQuanLy", undefined);


        }}>
        <Row gutter={[8, 8]}>
          <Col hidden={userData?.typeUser == "Admin" ? false : true} md={8}>
            <Form.Item label="Cấp thực hiện:" name="catalog">
              <AntdSelect
                options={CATALOG_OPTIONS}
                allowClear={false}
                defaultValue={""}
              />
            </Form.Item>
          </Col>
          <Col md={8}>
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
          <Col md={8} span={24}>
            <Form.Item
              label="Mã hồ sơ"
              name="hoSo"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Trạng thái"
              name="trangThai"
            >
              <AntdSelect options={TRANGTHAI_OPTIONS} showSearch />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item label="Từ ngày" name="tuNgay">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item label="Đến ngày" name="denNgay">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit" >
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams}>
                Tải lại
              </AntdButton>
              <AntdButton type="primary" onClick={inDanhSach}>
                In danh sách
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  )
}
