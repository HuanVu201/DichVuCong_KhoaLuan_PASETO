import { useEffect, useMemo, useState } from "react";
import { AntdTable, AntdSpace, AntdModal } from "../../../lib/antd/components";

import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";

import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "../contexts/HoSoTheoBaoCaoTongHopContext";

import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { screenType } from "@/features/hoso/data";
import { useHoSoTheoBaoCaoTongHopColumn } from "../hooks/useHoSoTheoBaoCaoTongHopColumn";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import { EyeOutlined } from "@ant-design/icons";
import {
  ISearchHoSo,
  ISearchHoSoTheoBaoCaoTongHopParams,
} from "@/features/hoso/models";
import { SearchHoSoTheoBaoCaoTongHop } from "@/features/hoso/redux/action";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { Button, Col, DatePicker, Form, Row } from "antd";
import { ISearchBaoCaoThuTuc } from "@/features/baocaotonghop/model";
// import { XuatDanhSachHoSoTable } from "@/features/thongKe/components/XuatDanhSachHoSoTable";
import dayjs from "dayjs";
const DanhSachHoSosTable = ({
  searchHoSoParams,
}: {
  searchHoSoParams: ISearchHoSo;
}) => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const {
    datas: hoSos,
    count,
    loading,
  } = useAppSelector((state) => state.hoso);
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EyeOutlined
            title="Xem chi tiết"
            onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
          />
        ),
      },
    ],
    []
  );

  const { columns } = useHoSoTheoBaoCaoTongHopColumn(
    {
      pageNumber: hoSoTheoBaoCaoTongHopContext.searchParams.pageNumber,
      pageSize: hoSoTheoBaoCaoTongHopContext.searchParams.pageSize,
    },
    items
  );
  useEffect(() => {
    if (
      hoSoTheoBaoCaoTongHopContext.searchParams.TuNgay &&
      hoSoTheoBaoCaoTongHopContext.searchParams.DenNgay
    )
      dispatch(
        SearchHoSoTheoBaoCaoTongHop(hoSoTheoBaoCaoTongHopContext.searchParams)
      );
  }, [hoSoTheoBaoCaoTongHopContext.searchParams]);
  useEffect(() => {
    const currentDate = new Date(Date.now());

    var tuNgayStr = `${
      currentDate.getMonth() + 1
    }/01/${currentDate.getFullYear()}`;

    var denNgayStr = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    form.setFieldValue("tuNgay", tuNgayStr ? dayjs(tuNgayStr) : null);
    form.setFieldValue("denNgay", denNgayStr ? dayjs(denNgayStr) : null);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      ...hoSoTheoBaoCaoTongHopContext.searchParams,
      TuNgay: tuNgayStr ? dayjs(tuNgayStr).format("YYYY-MM-DD") : undefined,
      DenNgay: denNgayStr ? dayjs(denNgayStr).format("YYYY-MM-DD") : undefined,
    });
  }, []);

  const handleLoadHoSo = () => {
    var tuNgay = form.getFieldValue("tuNgay");
    var denNgay = form.getFieldValue("denNgay");
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      ...hoSoTheoBaoCaoTongHopContext.searchParams,
      TuNgay: tuNgay ? dayjs(tuNgay).format("YYYY-MM-DD") : undefined,
      DenNgay: denNgay ? dayjs(denNgay).format("YYYY-MM-DD") : undefined,
    });
  };

  return (
    <AntdModal
      visible={true}
      title={"Danh sách hồ sơ"}
      fullsizeScrollable
      footer={null}
      handlerCancel={() =>
        hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(false)
      }
    >
      <Form layout="vertical" form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12}>
            <Form.Item label="Từ ngày" name="tuNgay">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item label="Đến ngày" name="denNgay">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="row row-search">
          <Form.Item>
            <Button onClick={handleLoadHoSo}>Tìm kiếm</Button>
          </Form.Item>
        </div>
      </Form>
      <LazyActions
        setSearchParams={hoSoTheoBaoCaoTongHopContext.setSearchParams}
      >
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <AntdTable
            columns={columns}
            dataSource={hoSos}
            pagination={{
              total: count,
            }}
            loading={loading}
            searchParams={hoSoTheoBaoCaoTongHopContext.searchParams}
            setSearchParams={hoSoTheoBaoCaoTongHopContext.setSearchParams}
            onSearch={(params) => {}}
          />
        </AntdSpace>
        {/* <XuatDanhSachHoSoTable data = {ho} /> */}
      </LazyActions>
    </AntdModal>
  );
};
const DanhSachHoSoWrapper = ({
  searchHoSoParams,
}: {
  searchHoSoParams: ISearchHoSo;
}) => (
  <ButtonActionProvider>
    <DanhSachHoSosTable searchHoSoParams={searchHoSoParams} />
  </ButtonActionProvider>
);
export default DanhSachHoSoWrapper;
