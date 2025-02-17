import { Form, Input, Space, Row, Col, SelectProps } from "antd";

import { useCallback, useEffect, useMemo, useState } from "react";
import { filterOptions } from "@/utils";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { ISearchThuTuc } from "@/features/thutuc/models";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { CollapseContent } from "@/components/common";
import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { PortalSearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { ILinhVuc } from "@/features/linhvuc/models";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
export const SO_BAN_NGANH = "so-ban-nganh";
export const QUAN_HUYEN = "quan-huyen";
export const XA_PHUONG = "xa-phuong";
const capThucHiens = [
  { value: SO_BAN_NGANH, label: "Cấp tỉnh" },
  { value: QUAN_HUYEN, label: "Cấp huyện" },
  { value: XA_PHUONG, label: "Cấp xã" },
];

const suDungOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: "false" },
];
const mucDoOptions: SelectProps["options"] = [
  { label: "Dịch vụ công", value: "2" },
  {
    label: "Dịch vụ công trực tuyến một phần",
    value: "3",
  },
  {
    label: "Dịch vụ công trực tuyến toàn trình",
    value: "4",
  },
];
const phiLePhiOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: "false" },
];

export const DanhSachThuTucSearch = ({
  searchParams,
  setSearchParams,
  onFinish,
}: {
  searchParams: ISearchThuTuc;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchThuTuc>>;
  onFinish: (value: ISearchThuTuc) => void;
}) => {
  const dispatch = useAppDispatch();
  const { datas: linhvucs } = useAppSelector((state) => state.linhvuc);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const [form] = Form.useForm();
  const handleSubmit = (values: ISearchThuTuc) => {
    var donVi: string | undefined = undefined;
    if (capThucHien == SO_BAN_NGANH) {
      donVi = form.getFieldValue("maTinh");
    } else if (capThucHien == QUAN_HUYEN) {
      donVi = form.getFieldValue("maHuyen");
    } else if (capThucHien == XA_PHUONG) {
      donVi = form.getFieldValue("maXa");
    }
    setSearchParams((curr) => ({
      ...curr,
      pageNumber: 1,
      suDung: form.getFieldValue("suDung"),
      mucDo: form.getFieldValue("mucDo"),
      trangThaiPhiLePhi: form.getFieldValue("trangThaiPhiLePhi"),
      donVi: donVi,
    }));
    onFinish({
      ...searchParams,
      pageNumber: 1,
      suDung: form.getFieldValue("suDung"),
      mucDo: form.getFieldValue("mucDo"),
      trangThaiPhiLePhi: form.getFieldValue("trangThaiPhiLePhi"),
      donVi: donVi,
    });
  };

  useEffect(() => {
    form.setFieldValue("capThucHien", SO_BAN_NGANH);
    dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 250, reFetch: true }));
  }, []);
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 20, reFetch: true });
    form.resetFields();
  }, []);
  const capThucHien = Form.useWatch("capThucHien", form);
  const currentQuanHuyen = Form.useWatch("maHuyen", form);
  const { maHuyen, maTinh, maXa } = useAppSelector(
    (state) => state.cocautochuc
  );

  useEffect(() => {
    if (capThucHien) {
      if (capThucHien == XA_PHUONG)
        dispatch(
          PortalSearchCoCauToChuc({
            pageNumber: 1,
            pageSize: 5000,
            cataLog: QUAN_HUYEN,
          })
        );
      else
        dispatch(
          PortalSearchCoCauToChuc({
            pageNumber: 1,
            pageSize: 5000,
            cataLog: capThucHien,
          })
        );
    }
  }, [capThucHien]);
  useEffect(() => {
    form.setFieldValue("maXa", undefined);
    if (currentQuanHuyen) {
      dispatch(
        PortalSearchCoCauToChuc({
          pageNumber: 1,
          pageSize: 5000,
          cataLog: XA_PHUONG,
          ofGroupCode: currentQuanHuyen,
        })
      );
    }
  }, [currentQuanHuyen]);
  return (
    <CollapseContent
      defaultVisible={true}
      // extraButtons={[<AntdButton onClick={() => {ThuTucContext.setThuTucModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form
        name="ThuTucSearch"
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col md={8} span={24}>
            <Form.Item label="Từ khóa" name="tuKhoa">
              <Input placeholder="Nhập tên TTHC hoặc mã TTHC" />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Sử dụng" name="suDung">
              <AntdSelect allowClear options={suDungOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Mức độ" name="mucDo">
              <AntdSelect allowClear options={mucDoOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item name="capThucHien" label="Cấp thực hiện">
              <AntdSelect
                options={capThucHiens}
                allowClear
                showSearch
                placeholder="Chọn cấp thực hiện"
              />
            </Form.Item>
          </Col>
          <Col md={16} span={24}>
            <Row gutter={[8, 8]}>
              <Col md={12} hidden={capThucHien == SO_BAN_NGANH ? false : true}>
                <Form.Item name="maTinh" label="Đơn vị">
                  <AntdSelect
                    generateOptions={{
                      model: maTinh,
                      value: "groupCode",
                      label: "groupName",
                    }}
                    allowClear
                    showSearch
                    placeholder="Chọn đơn vị thực hiện"
                  />
                </Form.Item>
              </Col>
              <Col
                md={12}
                hidden={
                  capThucHien == QUAN_HUYEN || capThucHien == XA_PHUONG
                    ? false
                    : true
                }
              >
                <Form.Item name="maHuyen" label="Cấp huyện">
                  <AntdSelect
                    generateOptions={{
                      model: maHuyen,
                      value: "groupCode",
                      label: "groupName",
                    }}
                    allowClear
                    showSearch
                    placeholder="Chọn đơn vị cấp huyện"
                  />
                </Form.Item>
              </Col>
              <Col md={12} hidden={capThucHien == XA_PHUONG ? false : true}>
                <Form.Item name="maXa" label="Cấp xã">
                  <AntdSelect
                    generateOptions={{
                      model: maXa,
                      value: "groupCode",
                      label: "groupName",
                    }}
                    showSearch
                    allowClear
                    placeholder="Chọn đơn vị cấp xã"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col md={8} span={24}>
            <Form.Item label="Lĩnh vực" name="maLinhVucChinh">
              <AntdSelect
                generateOptions={{ model: linhvucs, label: "ten", value: "ma" }}
                showSearch
                allowClear
                filterOption={filterOptions}
              />
            </Form.Item>
          </Col>

          <Col md={8} span={24}>
            <Form.Item label="Phí lệ phí" name="trangThaiPhiLePhi">
              <AntdSelect allowClear options={phiLePhiOptions}></AntdSelect>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-around">
          <Space size="large">
            <AntdButton type="primary" htmlType="submit">
              Xác nhận
            </AntdButton>
            <AntdButton type="default" onClick={resetSearchParams}>
              Tải lại
            </AntdButton>
          </Space>
        </Row>
      </Form>
    </CollapseContent>
  );
};
